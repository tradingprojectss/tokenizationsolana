use anchor_lang::prelude::*;
use anchor_lang::system_program;
use crate::state::*;
use crate::errors::TokenizationError;

#[derive(Accounts)]
pub struct DistributeYield<'info> {
    #[account(mut)]
    pub issuer: Signer<'info>,

    #[account(
        mut,
        has_one = issuer @ TokenizationError::Unauthorized,
        constraint = asset.status == AssetStatus::Trading @ TokenizationError::InvalidAssetStatus,
    )]
    pub asset: Account<'info, RealWorldAsset>,

    pub system_program: Program<'info, System>,
}

/// Distribute yield (e.g., rental income) proportionally to all token holders.
/// This updates the global accumulated_yield_per_token; holders claim individually.
pub fn distribute_yield(
    ctx: Context<DistributeYield>,
    total_yield_lamports: u64,
) -> Result<()> {
    let asset = &mut ctx.accounts.asset;

    require!(asset.tokens_sold > 0, TokenizationError::ZeroSupply);

    // Scale yield per token by 1e12 for precision
    let yield_per_token = (total_yield_lamports as u128)
        .checked_mul(1_000_000_000_000)
        .ok_or(TokenizationError::MathOverflow)?
        .checked_div(asset.tokens_sold as u128)
        .ok_or(TokenizationError::MathOverflow)?;

    asset.accumulated_yield_per_token = asset
        .accumulated_yield_per_token
        .checked_add(yield_per_token)
        .ok_or(TokenizationError::MathOverflow)?;

    asset.total_yield_distributed = asset
        .total_yield_distributed
        .checked_add(total_yield_lamports)
        .unwrap();

    msg!(
        "Yield distributed | asset={} | amount={} | per_token={}",
        asset.key(),
        total_yield_lamports,
        yield_per_token
    );

    Ok(())
}

#[derive(Accounts)]
pub struct ClaimYield<'info> {
    #[account(mut)]
    pub investor_wallet: Signer<'info>,

    #[account(
        constraint = asset.status == AssetStatus::Trading @ TokenizationError::InvalidAssetStatus,
    )]
    pub asset: Account<'info, RealWorldAsset>,

    #[account(
        mut,
        seeds = [b"investor", asset.key().as_ref(), investor_wallet.key().as_ref()],
        bump = investor_account.bump,
        has_one = owner @ TokenizationError::Unauthorized,
    )]
    pub investor_account: Account<'info, InvestorAccount>,

    /// Alias for has_one constraint
    /// CHECK: matches investor_account.owner
    #[account(address = investor_account.owner)]
    pub owner: UncheckedAccount<'info>,

    /// CHECK: PDA holding yield funds — must be funded externally
    #[account(
        mut,
        seeds = [b"yield_vault", asset.key().as_ref()],
        bump,
    )]
    pub yield_vault: UncheckedAccount<'info>,

    pub system_program: Program<'info, System>,
}

pub fn claim_yield(ctx: Context<ClaimYield>) -> Result<()> {
    let asset = &ctx.accounts.asset;
    let investor = &mut ctx.accounts.investor_account;

    let claimable = investor.pending_yield(asset.accumulated_yield_per_token);
    require!(claimable > 0, TokenizationError::NoYieldAvailable);

    // Transfer from yield vault to investor
    let yield_vault = &ctx.accounts.yield_vault;
    let investor_wallet = &ctx.accounts.investor_wallet;

    **yield_vault.to_account_info().try_borrow_mut_lamports()? -= claimable;
    **investor_wallet.to_account_info().try_borrow_mut_lamports()? += claimable;

    // Update investor state
    investor.yield_claimed_per_token = asset.accumulated_yield_per_token;
    investor.total_claimed = investor.total_claimed.checked_add(claimable).unwrap();

    msg!(
        "Yield claimed | investor={} | amount={}",
        investor.owner,
        claimable
    );

    Ok(())
}
