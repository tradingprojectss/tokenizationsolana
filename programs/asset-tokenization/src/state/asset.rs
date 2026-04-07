use anchor_lang::prelude::*;

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq, Eq)]
pub enum AssetClass {
    RealEstate,
    CommercialProperty,
    Land,
    Infrastructure,
    Commodity,
    PrivateEquity,
    Art,
    Vehicle,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq, Eq)]
pub enum AssetStatus {
    Registered,
    UnderReview,
    Tokenized,
    Trading,
    Frozen,
    Delisted,
}

#[account]
pub struct RealWorldAsset {
    /// Issuer/owner who registered the asset
    pub issuer: Pubkey,
    /// Unique asset identifier (e.g., property registration number)
    pub asset_id: [u8; 32],
    /// Asset classification
    pub asset_class: AssetClass,
    /// Current status in the lifecycle
    pub status: AssetStatus,

    // --- Valuation ---
    /// Current valuation in USD (6 decimals, e.g., 500_000_000000 = $500,000)
    pub valuation_usd: u64,
    /// Timestamp of last appraisal
    pub last_appraisal_ts: i64,
    /// URI pointing to off-chain appraisal document (IPFS/Arweave)
    pub appraisal_uri: String,

    // --- Tokenization ---
    /// SPL token mint for fractional ownership
    pub token_mint: Pubkey,
    /// Total fractional tokens minted
    pub total_supply: u64,
    /// Price per token in lamports at issuance
    pub issue_price_lamports: u64,
    /// Tokens currently in circulation (purchased by investors)
    pub tokens_sold: u64,

    // --- Yield ---
    /// Accumulated yield per token (scaled by 1e12 for precision)
    pub accumulated_yield_per_token: u128,
    /// Total yield distributed over lifetime
    pub total_yield_distributed: u64,

    // --- Metadata ---
    /// Human-readable name (e.g., "Marina Bay Tower Unit #2401")
    pub name: String,
    /// URI to full metadata JSON (legal docs, images, floor plans)
    pub metadata_uri: String,
    /// Geographic coordinates [lat, lng] scaled by 1e6
    pub location: [i64; 2],
    /// ISO 3166-1 alpha-2 country code
    pub jurisdiction: [u8; 2],

    /// Creation timestamp
    pub created_at: i64,
    /// Bump seed
    pub bump: u8,
}

impl RealWorldAsset {
    pub const MAX_NAME_LEN: usize = 64;
    pub const MAX_URI_LEN: usize = 200;

    pub const LEN: usize = 8   // discriminator
        + 32                    // issuer
        + 32                    // asset_id
        + 1                     // asset_class
        + 1                     // status
        + 8                     // valuation_usd
        + 8                     // last_appraisal_ts
        + (4 + Self::MAX_URI_LEN) // appraisal_uri
        + 32                    // token_mint
        + 8                     // total_supply
        + 8                     // issue_price_lamports
        + 8                     // tokens_sold
        + 16                    // accumulated_yield_per_token
        + 8                     // total_yield_distributed
        + (4 + Self::MAX_NAME_LEN) // name
        + (4 + Self::MAX_URI_LEN)  // metadata_uri
        + 16                    // location
        + 2                     // jurisdiction
        + 8                     // created_at
        + 1;                    // bump
}
