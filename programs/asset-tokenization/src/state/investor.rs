use anchor_lang::prelude::*;

#[account]
pub struct InvestorAccount {
    /// The investor's wallet address
    pub owner: Pubkey,
    /// The asset this position relates to
    pub asset: Pubkey,
    /// Number of fractional tokens held
    pub token_balance: u64,
    /// Yield already claimed (used for delta calculation)
    pub yield_claimed_per_token: u128,
    /// Total yield claimed in lamports
    pub total_claimed: u64,
    /// Timestamp of first purchase
    pub first_purchase_ts: i64,
    /// KYC/AML verification status
    pub is_verified: bool,
    /// Bump seed
    pub bump: u8,
}

impl InvestorAccount {
    pub const LEN: usize = 8 + 32 + 32 + 8 + 16 + 8 + 8 + 1 + 1;

    pub fn pending_yield(&self, accumulated_yield_per_token: u128) -> u64 {
        let delta = accumulated_yield_per_token
            .checked_sub(self.yield_claimed_per_token)
            .unwrap_or(0);

        (delta
            .checked_mul(self.token_balance as u128)
            .unwrap_or(0)
            / 1_000_000_000_000) as u64
    }
}

#[account]
pub struct WhitelistEntry {
    pub investor: Pubkey,
    pub asset: Pubkey,
    pub approved_at: i64,
    pub approved_by: Pubkey,
    pub bump: u8,
}

impl WhitelistEntry {
    pub const LEN: usize = 8 + 32 + 32 + 8 + 32 + 1;
}
