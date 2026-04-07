use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, MintTo, TokenAccount};
use crate::state::*;
use crate::errors::TokenizationError;

#[derive(Accounts)]
pub struct TokenizeAsset<'info> {
    #[account(mut)]
    pub issuer: Signer<'info>,

    #[account(
        seeds = [b"platform"],
        bump = platform.bump,
    )]
    pub platform: Account<'info, PlatformConfig>,

    #[account(
        mut,
        has_one = issuer @ TokenizationError::Unauthorized,
        constraint = asset.status == AssetStatus::Registered @ TokenizationError::AlreadyTokenized,
    )]
    pub asset: Account<'info, RealWorldAsset>,

    #[account(
        init,
        payer = issuer,
        mint::decimals = 6,
        mint::authority = asset_authority,
        seeds = [b"mint", asset.key().as_ref()],
        bump,
    )]
    pub token_mint: Account<'info, Mint>,

    /// CHECK: PDA authority for minting
    #[account(
        seeds = [b"authority", asset.key().as_ref()],
        bump,
    )]
    pub asset_authority: UncheckedAccount<'info>,

    /// Vault to hold unsold tokens
    #[account(
        init,
        payer = issuer,
        token::mint = token_mint,
        token::authority = asset_authority,
        seeds = [b"vault", asset.key().as_ref()],
        bump,
    )]
    pub vault: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

pub fn tokenize_asset(
    ctx: Context<TokenizeAsset>,
    total_supply: u64,
    price_per_token_lamports: u64,
) -> Result<()> {
    require!(total_supply > 0, TokenizationError::ZeroSupply);

    let asset = &mut ctx.accounts.asset;
    let asset_key = asset.key();

    // Mint total supply to vault
    let authority_seeds: &[&[u8]] = &[
        b"authority",
        asset_key.as_ref(),
        &[ctx.bumps.asset_authority],
    ];

    token::mint_to(
        CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            MintTo {
                mint: ctx.accounts.token_mint.to_account_info(),
                to: ctx.accounts.vault.to_account_info(),
                authority: ctx.accounts.asset_authority.to_account_info(),
            },
            &[authority_seeds],
        ),
        total_supply,
    )?;

    // Update asset state
    asset.token_mint = ctx.accounts.token_mint.key();
    asset.total_supply = total_supply;
    asset.issue_price_lamports = price_per_token_lamports;
    asset.status = AssetStatus::Tokenized;

    msg!(
        "Asset tokenized | mint={} | supply={} | price={}",
        asset.token_mint,
        total_supply,
        price_per_token_lamports
    );

    Ok(())
}
