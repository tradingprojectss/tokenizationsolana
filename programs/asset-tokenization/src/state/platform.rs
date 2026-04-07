use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct PlatformConfig {
    /// Admin authority that can manage the platform
    pub authority: Pubkey,
    /// Treasury wallet for collecting platform fees
    pub treasury: Pubkey,
    /// Platform fee in basis points (e.g., 250 = 2.5%)
    pub fee_bps: u16,
    /// Total number of assets registered on the platform
    pub total_assets: u64,
    /// Total value locked across all tokenized assets (in lamports)
    pub total_value_locked: u64,
    /// Bump seed for PDA derivation
    pub bump: u8,
}

impl PlatformConfig {
    pub const LEN: usize = 8 + 32 + 32 + 2 + 8 + 8 + 1;

    pub fn calculate_fee(&self, amount: u64) -> u64 {
        (amount as u128)
            .checked_mul(self.fee_bps as u128)
            .unwrap()
            .checked_div(10_000)
            .unwrap() as u64
    }
}
