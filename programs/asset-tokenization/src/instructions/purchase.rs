use anchor_lang::prelude::*;
use anchor_lang::system_program;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};
use crate::state::*;
use crate::errors::TokenizationError;

#[derive(Accounts)]
pub struct PurchaseTokens<'info> {
    #[account(mut)]
    pub buyer: Signer<'info>,

    #[account(
        seeds = [b"platform"],
        bump = platform.bump,
    )]
    pub platform: Account<'info, PlatformConfig>,

    #[account(
        mut,
        constraint = asset.status == AssetStatus::Tokenized
            || asset.status == AssetStatus::Trading
            @ TokenizationError::InvalidAssetStatus,
    )]
    pub asset: Account<'info, RealWorldAsset>,

    #[account(
        init_if_needed,
        payer = buyer,
        space = InvestorAccount::LEN,
        seeds = [b"investor", asset.key().as_ref(), buyer.key().as_ref()],
        bump,
    )]
    pub investor_account: Account<'info, InvestorAccount>,

    /// Whitelist entry proving KYC approval
    #[account(
        seeds = [b"whitelist", asset.key().as_ref(), buyer.key().as_ref()],
        bump = whitelist.bump,
    )]
    pub whitelist: Account<'info, WhitelistEntry>,

    /// Vault holding unsold tokens
    #[account(
        mut,
        seeds = [b"vault", asset.key().as_ref()],
        bump,
    )]
    pub vault: Account<'info, TokenAccount>,

    /// Buyer's token account
    #[account(
        mut,
        constraint = buyer_token_account.owner == buyer.key(),
    )]
    pub buyer_token_account: Account<'info, TokenAccount>,

    /// CHECK: PDA authority for vault
    #[account(
        seeds = [b"authority", asset.key().as_ref()],
        bump,
    )]
    pub asset_authority: UncheckedAccount<'info>,

    /// CHECK: Issuer receiving SOL payment
    #[account(mut, address = asset.issuer)]
    pub issuer: UncheckedAccount<'info>,

    /// CHECK: Treasury receiving fees
    #[account(mut, address = platform.treasury)]
    pub treasury: UncheckedAccount<'info>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

pub fn purchase_tokens(ctx: Context<PurchaseTokens>, amount: u64) -> Result<()> {
    require!(amount > 0, TokenizationError::ZeroPurchaseAmount);

    let asset = &ctx.accounts.asset;
    let remaining = asset.total_supply.checked_sub(asset.tokens_sold).unwrap();
    require!(amount <= remaining, TokenizationError::InsufficientSupply);

    // Calculate costs
    let total_cost = amount
        .checked_mul(asset.issue_price_lamports)
        .ok_or(TokenizationError::MathOverflow)?;

    let platform_fee = ctx.accounts.platform.calculate_fee(total_cost);
    let issuer_payment = total_cost.checked_sub(platform_fee).unwrap();

    // Transfer SOL: buyer -> issuer
    system_program::transfer(
        CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            system_program::Transfer {
                from: ctx.accounts.buyer.to_account_info(),
                to: ctx.accounts.issuer.to_account_info(),
            },
        ),
        issuer_payment,
    )?;

    // Transfer SOL: buyer -> treasury (fee)
    if platform_fee > 0 {
        system_program::transfer(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                system_program::Transfer {
                    from: ctx.accounts.buyer.to_account_info(),
                    to: ctx.accounts.treasury.to_account_info(),
                },
            ),
            platform_fee,
        )?;
    }

    // Transfer tokens: vault -> buyer
    let asset_key = ctx.accounts.asset.key();
    let authority_seeds: &[&[u8]] = &[
        b"authority",
        asset_key.as_ref(),
        &[ctx.bumps.asset_authority],
    ];

    token::transfer(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            Transfer {
                from: ctx.accounts.vault.to_account_info(),
                to: ctx.accounts.buyer_token_account.to_account_info(),
                authority: ctx.accounts.asset_authority.to_account_info(),
            },
            &[authority_seeds],
        ),
        amount,
    )?;

    // Update state
    let asset = &mut ctx.accounts.asset;
    asset.tokens_sold = asset.tokens_sold.checked_add(amount).unwrap();
    if asset.status == AssetStatus::Tokenized {
        asset.status = AssetStatus::Trading;
    }

    let investor = &mut ctx.accounts.investor_account;
    if investor.first_purchase_ts == 0 {
        investor.owner = ctx.accounts.buyer.key();
        investor.asset = asset.key();
        investor.first_purchase_ts = Clock::get()?.unix_timestamp;
        investor.yield_claimed_per_token = asset.accumulated_yield_per_token;
        investor.is_verified = true;
        investor.bump = ctx.bumps.investor_account;
    }
    investor.token_balance = investor.token_balance.checked_add(amount).unwrap();

    msg!(
        "Purchase complete | buyer={} | tokens={} | cost={} | fee={}",
        ctx.accounts.buyer.key(),
        amount,
        total_cost,
        platform_fee
    );

    Ok(())
}
