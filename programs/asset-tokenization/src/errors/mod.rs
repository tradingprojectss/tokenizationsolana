use anchor_lang::prelude::*;

#[error_code]
pub enum TokenizationError {
    #[msg("Unauthorized: caller is not the platform authority")]
    Unauthorized,
    #[msg("Asset is not in the correct state for this operation")]
    InvalidAssetStatus,
    #[msg("Asset has already been tokenized")]
    AlreadyTokenized,
    #[msg("Insufficient tokens available for purchase")]
    InsufficientSupply,
    #[msg("Trading is currently frozen for this asset")]
    TradingFrozen,
    #[msg("Investor is not on the compliance whitelist")]
    NotWhitelisted,
    #[msg("Invalid fee: basis points must be <= 10000")]
    InvalidFeeBps,
    #[msg("Arithmetic overflow in calculation")]
    MathOverflow,
    #[msg("Asset name exceeds maximum length")]
    NameTooLong,
    #[msg("URI exceeds maximum length")]
    UriTooLong,
    #[msg("No yield available to claim")]
    NoYieldAvailable,
    #[msg("Token supply must be greater than zero")]
    ZeroSupply,
    #[msg("Valuation must be greater than zero")]
    ZeroValuation,
    #[msg("Purchase amount must be greater than zero")]
    ZeroPurchaseAmount,
}
