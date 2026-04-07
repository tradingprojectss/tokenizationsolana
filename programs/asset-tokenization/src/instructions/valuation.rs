use anchor_lang::prelude::*;
use crate::state::*;
use crate::errors::TokenizationError;

#[derive(Accounts)]
pub struct UpdateValuation<'info> {
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

pub fn update_valuation(
    ctx: Context<UpdateValuation>,
    new_valuation_usd: u64,
    appraisal_uri: String,
) -> Result<()> {
    require!(new_valuation_usd > 0, TokenizationError::ZeroValuation);
    require!(appraisal_uri.len() <= RealWorldAsset::MAX_URI_LEN, TokenizationError::UriTooLong);

    let asset = &mut ctx.accounts.asset;
    let old_valuation = asset.valuation_usd;

    asset.valuation_usd = new_valuation_usd;
    asset.appraisal_uri = appraisal_uri;
    asset.last_appraisal_ts = Clock::get()?.unix_timestamp;

    msg!(
        "Valuation updated | asset={} | old={} | new={}",
        asset.key(),
        old_valuation,
        new_valuation_usd
    );

    Ok(())
}
