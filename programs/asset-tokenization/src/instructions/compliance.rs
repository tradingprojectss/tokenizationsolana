use anchor_lang::prelude::*;
use crate::state::*;
use crate::errors::TokenizationError;

#[derive(Accounts)]
pub struct SetTradingStatus<'info> {
    pub authority: Signer<'info>,

    #[account(
        seeds = [b"platform"],
        bump = platform.bump,
        has_one = authority @ TokenizationError::Unauthorized,
    )]
    pub platform: Account<'info, PlatformConfig>,

    #[account(mut)]
    pub asset: Account<'info, RealWorldAsset>,
}

pub fn set_trading_status(
    ctx: Context<SetTradingStatus>,
    frozen: bool,
) -> Result<()> {
    let asset = &mut ctx.accounts.asset;

    if frozen {
        asset.status = AssetStatus::Frozen;
    } else {
        asset.status = AssetStatus::Trading;
    }

    msg!(
        "Trading status updated | asset={} | frozen={}",
        asset.key(),
        frozen
    );

    Ok(())
}

#[derive(Accounts)]
#[instruction(investor: Pubkey)]
pub struct ManageWhitelist<'info> {
    #[account(mut)]
    pub authority: Signer<'info>,

    #[account(
        seeds = [b"platform"],
        bump = platform.bump,
        has_one = authority @ TokenizationError::Unauthorized,
    )]
    pub platform: Account<'info, PlatformConfig>,

    pub asset: Account<'info, RealWorldAsset>,

    #[account(
        init,
        payer = authority,
        space = WhitelistEntry::LEN,
        seeds = [b"whitelist", asset.key().as_ref(), investor.as_ref()],
        bump,
    )]
    pub whitelist_entry: Account<'info, WhitelistEntry>,

    pub system_program: Program<'info, System>,
}

pub fn add_to_whitelist(
    ctx: Context<ManageWhitelist>,
    investor: Pubkey,
) -> Result<()> {
    let entry = &mut ctx.accounts.whitelist_entry;
    entry.investor = investor;
    entry.asset = ctx.accounts.asset.key();
    entry.approved_at = Clock::get()?.unix_timestamp;
    entry.approved_by = ctx.accounts.authority.key();
    entry.bump = ctx.bumps.whitelist_entry;

    msg!(
        "Whitelist updated | asset={} | investor={}",
        entry.asset,
        investor
    );

    Ok(())
}
