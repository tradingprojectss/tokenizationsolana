use anchor_lang::prelude::*;
use crate::state::PlatformConfig;
use crate::errors::TokenizationError;

#[derive(Accounts)]
pub struct InitializePlatform<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        init,
        payer = authority,
        space = PlatformConfig::LEN,
        seeds = [b"platform"],
        bump,
    )]
    pub platform: Account<'info, PlatformConfig>,

    /// CHECK: Treasury wallet to receive fees
    pub treasury: UncheckedAccount<'info>,

    pub system_program: Program<'info, System>,
}

pub fn initialize_platform(
    ctx: Context<InitializePlatform>,
    platform_fee_bps: u16,
) -> Result<()> {
    require!(platform_fee_bps <= 10_000, TokenizationError::InvalidFeeBps);

    let platform = &mut ctx.accounts.platform;
    platform.authority = ctx.accounts.authority.key();
    platform.treasury = ctx.accounts.treasury.key();
    platform.fee_bps = platform_fee_bps;
    platform.total_assets = 0;
    platform.total_value_locked = 0;
    platform.bump = ctx.bumps.platform;

    msg!(
        "Platform initialized | authority={} | fee={}bps",
        platform.authority,
        platform.fee_bps
    );

    Ok(())
}
