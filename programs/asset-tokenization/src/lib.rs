use anchor_lang::prelude::*;

pub mod instructions;
pub mod state;
pub mod errors;

use instructions::*;

declare_id!("TKNz8Qv2f7bRJPmGxKLdh4UT9qXvShNjSg7Rw1PuAE");

#[program]
pub mod asset_tokenization {
    use super::*;

    /// Initialize the platform with admin authority
    pub fn initialize_platform(
        ctx: Context<InitializePlatform>,
        platform_fee_bps: u16,
    ) -> Result<()> {
        instructions::platform::initialize_platform(ctx, platform_fee_bps)
    }

    /// Register a new real-world asset on-chain
    pub fn register_asset(
        ctx: Context<RegisterAsset>,
        params: RegisterAssetParams,
    ) -> Result<()> {
        instructions::asset::register_asset(ctx, params)
    }

    /// Tokenize a registered asset into fractional SPL tokens
    pub fn tokenize_asset(
        ctx: Context<TokenizeAsset>,
        total_supply: u64,
        price_per_token_lamports: u64,
    ) -> Result<()> {
        instructions::tokenize::tokenize_asset(ctx, total_supply, price_per_token_lamports)
    }

    /// Purchase fractional tokens of a tokenized asset
    pub fn purchase_tokens(
        ctx: Context<PurchaseTokens>,
        amount: u64,
    ) -> Result<()> {
        instructions::purchase::purchase_tokens(ctx, amount)
    }

    /// Distribute rental/dividend yield to all token holders
    pub fn distribute_yield(
        ctx: Context<DistributeYield>,
        total_yield_lamports: u64,
    ) -> Result<()> {
        instructions::yield_dist::distribute_yield(ctx, total_yield_lamports)
    }

    /// Claim accumulated yield for a token holder
    pub fn claim_yield(ctx: Context<ClaimYield>) -> Result<()> {
        instructions::yield_dist::claim_yield(ctx)
    }

    /// Update asset valuation (oracle or admin-triggered)
    pub fn update_valuation(
        ctx: Context<UpdateValuation>,
        new_valuation_usd: u64,
        appraisal_uri: String,
    ) -> Result<()> {
        instructions::valuation::update_valuation(ctx, new_valuation_usd, appraisal_uri)
    }

    /// Transfer ownership of an asset to a new issuer
    pub fn transfer_asset_ownership(
        ctx: Context<TransferAssetOwnership>,
    ) -> Result<()> {
        instructions::asset::transfer_asset_ownership(ctx)
    }

    /// Freeze/unfreeze trading for compliance
    pub fn set_trading_status(
        ctx: Context<SetTradingStatus>,
        frozen: bool,
    ) -> Result<()> {
        instructions::compliance::set_trading_status(ctx, frozen)
    }

    /// Add address to compliance whitelist
    pub fn add_to_whitelist(
        ctx: Context<ManageWhitelist>,
        investor: Pubkey,
    ) -> Result<()> {
        instructions::compliance::add_to_whitelist(ctx, investor)
    }
}
