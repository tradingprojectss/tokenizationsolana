use anchor_lang::prelude::*;
use crate::state::*;
use crate::errors::TokenizationError;

#[derive(AnchorSerialize, AnchorDeserialize)]
pub struct RegisterAssetParams {
    pub asset_id: [u8; 32],
    pub asset_class: AssetClass,
    pub name: String,
    pub metadata_uri: String,
    pub valuation_usd: u64,
    pub location: [i64; 2],
    pub jurisdiction: [u8; 2],
}

#[derive(Accounts)]
#[instruction(params: RegisterAssetParams)]
pub struct RegisterAsset<'info> {
    #[account(mut)]
    pub issuer: Signer<'info>,

    #[account(
        mut,
        seeds = [b"platform"],
        bump = platform.bump,
    )]
    pub platform: Account<'info, PlatformConfig>,

    #[account(
        init,
        payer = issuer,
        space = RealWorldAsset::LEN,
        seeds = [b"asset", params.asset_id.as_ref()],
        bump,
    )]
    pub asset: Account<'info, RealWorldAsset>,

    pub system_program: Program<'info, System>,
}

pub fn register_asset(
    ctx: Context<RegisterAsset>,
    params: RegisterAssetParams,
) -> Result<()> {
    require!(params.name.len() <= RealWorldAsset::MAX_NAME_LEN, TokenizationError::NameTooLong);
    require!(params.metadata_uri.len() <= RealWorldAsset::MAX_URI_LEN, TokenizationError::UriTooLong);
    require!(params.valuation_usd > 0, TokenizationError::ZeroValuation);

    let asset = &mut ctx.accounts.asset;
    let clock = Clock::get()?;

    asset.issuer = ctx.accounts.issuer.key();
    asset.asset_id = params.asset_id;
    asset.asset_class = params.asset_class;
    asset.status = AssetStatus::Registered;
    asset.valuation_usd = params.valuation_usd;
    asset.last_appraisal_ts = clock.unix_timestamp;
    asset.appraisal_uri = String::new();
    asset.token_mint = Pubkey::default();
    asset.total_supply = 0;
    asset.issue_price_lamports = 0;
    asset.tokens_sold = 0;
    asset.accumulated_yield_per_token = 0;
    asset.total_yield_distributed = 0;
    asset.name = params.name;
    asset.metadata_uri = params.metadata_uri;
    asset.location = params.location;
    asset.jurisdiction = params.jurisdiction;
    asset.created_at = clock.unix_timestamp;
    asset.bump = ctx.bumps.asset;

    let platform = &mut ctx.accounts.platform;
    platform.total_assets = platform.total_assets.checked_add(1).unwrap();

    msg!(
        "Asset registered | id={:?} | class={:?} | valuation={}",
        &asset.asset_id[..8],
        asset.asset_class as u8,
        asset.valuation_usd
    );

    Ok(())
}

#[derive(Accounts)]
pub struct TransferAssetOwnership<'info> {
    #[account(mut)]
    pub current_issuer: Signer<'info>,

    /// CHECK: New issuer receiving ownership
    pub new_issuer: UncheckedAccount<'info>,

    #[account(
        mut,
        has_one = issuer @ TokenizationError::Unauthorized,
    )]
    pub asset: Account<'info, RealWorldAsset>,

    /// Alias so has_one works
    /// CHECK: matches asset.issuer
    #[account(address = asset.issuer)]
    pub issuer: UncheckedAccount<'info>,
}

pub fn transfer_asset_ownership(ctx: Context<TransferAssetOwnership>) -> Result<()> {
    let asset = &mut ctx.accounts.asset;
    let old = asset.issuer;
    asset.issuer = ctx.accounts.new_issuer.key();

    msg!(
        "Ownership transferred | asset={} | from={} | to={}",
        asset.key(),
        old,
        asset.issuer
    );

    Ok(())
}
