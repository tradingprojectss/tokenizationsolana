use anchor_lang::prelude::*;
use anchor_spl::token::{self, Burn, Mint, MintTo, Token, TokenAccount, Transfer};

declare_id!("HtZ7iRQVbKKJHCcd4VajdHMf42NSuoW7g7AyoQWBQ68a");

#[program]
pub mod homecrowd {
    use super::*;

    /// Initialize a new property campaign.
    pub fn initialize_property(
        ctx: Context<InitializeProperty>,
        property_name: String,
        property_location: String,
        total_price: u64,
        token_price: u64,
        total_tokens: u64,
        buyer_tokens: u64,
        deadline: i64,
        ipfs_hash: String,
    ) -> Result<()> {
        require!(property_name.len() <= 64, HomeCrowdError::NameTooLong);
        require!(property_location.len() <= 128, HomeCrowdError::LocationTooLong);
        require!(ipfs_hash.len() <= 64, HomeCrowdError::IpfsHashTooLong);
        require!(total_price > 0, HomeCrowdError::InvalidPrice);
        require!(token_price > 0, HomeCrowdError::InvalidPrice);
        require!(total_tokens > 0, HomeCrowdError::InvalidTokenSupply);
        require!(buyer_tokens <= total_tokens, HomeCrowdError::InvalidBuyerTokens);

        let clock = Clock::get()?;
        require!(deadline > clock.unix_timestamp, HomeCrowdError::DeadlineInPast);

        // Save bump values before mutable borrow
        let bump = ctx.bumps.property;
        let vault_bump = ctx.bumps.usdc_vault;
        let rent_vault_bump = ctx.bumps.rent_vault;
        let buyer_key = ctx.accounts.buyer.key();
        let mint_key = ctx.accounts.property_mint.key();
        let usdc_vault_key = ctx.accounts.usdc_vault.key();
        let rent_vault_key = ctx.accounts.rent_vault.key();

        let property = &mut ctx.accounts.property;
        property.authority = buyer_key;
        property.property_name = property_name;
        property.property_location = property_location;
        property.total_price = total_price;
        property.token_price = token_price;
        property.total_tokens = total_tokens;
        property.tokens_sold = buyer_tokens;
        property.buyer_tokens = buyer_tokens;
        property.deadline = deadline;
        property.ipfs_hash = ipfs_hash;
        property.status = PropertyStatus::Funding;
        property.mint = mint_key;
        property.usdc_vault = usdc_vault_key;
        property.rent_vault = rent_vault_key;
        property.total_rent_distributed = 0;
        property.bump = bump;
        property.vault_bump = vault_bump;
        property.rent_vault_bump = rent_vault_bump;

        // Mint buyer's initial tokens
        if buyer_tokens > 0 {
            let name_bytes = property.property_name.as_bytes().to_vec();
            let prop_bump = property.bump;

            let seeds: &[&[u8]] = &[
                b"property",
                buyer_key.as_ref(),
                name_bytes.as_ref(),
                std::slice::from_ref(&prop_bump),
            ];
            let signer_seeds = &[seeds];

            token::mint_to(
                CpiContext::new_with_signer(
                    ctx.accounts.token_program.to_account_info(),
                    MintTo {
                        mint: ctx.accounts.property_mint.to_account_info(),
                        to: ctx.accounts.buyer_token_account.to_account_info(),
                        authority: ctx.accounts.property.to_account_info(),
                    },
                    signer_seeds,
                ),
                buyer_tokens,
            )?;
        }

        msg!("Property campaign initialized");
        Ok(())
    }

    /// Investor buys tokens with USDC during the funding phase.
    pub fn buy_tokens(ctx: Context<BuyTokens>, amount: u64) -> Result<()> {
        // Read needed values first
        let status = ctx.accounts.property.status;
        let deadline = ctx.accounts.property.deadline;
        let total_tokens = ctx.accounts.property.total_tokens;
        let tokens_sold = ctx.accounts.property.tokens_sold;
        let token_price = ctx.accounts.property.token_price;
        let authority_key = ctx.accounts.property.authority;
        let name_bytes = ctx.accounts.property.property_name.as_bytes().to_vec();
        let bump = ctx.accounts.property.bump;

        require!(status == PropertyStatus::Funding, HomeCrowdError::NotInFundingPhase);

        let clock = Clock::get()?;
        require!(clock.unix_timestamp <= deadline, HomeCrowdError::CampaignExpired);

        let remaining = total_tokens - tokens_sold;
        require!(amount <= remaining, HomeCrowdError::ExceedsAvailableTokens);

        let usdc_amount = amount
            .checked_mul(token_price)
            .ok_or(HomeCrowdError::Overflow)?;

        // Transfer USDC from investor to vault
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.investor_usdc.to_account_info(),
                    to: ctx.accounts.usdc_vault.to_account_info(),
                    authority: ctx.accounts.investor.to_account_info(),
                },
            ),
            usdc_amount,
        )?;

        // Mint property tokens to investor
        let seeds: &[&[u8]] = &[
            b"property",
            authority_key.as_ref(),
            name_bytes.as_ref(),
            std::slice::from_ref(&bump),
        ];
        let signer_seeds = &[seeds];

        token::mint_to(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                MintTo {
                    mint: ctx.accounts.property_mint.to_account_info(),
                    to: ctx.accounts.investor_token_account.to_account_info(),
                    authority: ctx.accounts.property.to_account_info(),
                },
                signer_seeds,
            ),
            amount,
        )?;

        // Update state
        ctx.accounts.property.tokens_sold = tokens_sold
            .checked_add(amount)
            .ok_or(HomeCrowdError::Overflow)?;

        msg!("Investor bought {} tokens for {} USDC", amount, usdc_amount);
        Ok(())
    }

    /// Finalize the campaign when funding goal is reached.
    pub fn finalize_campaign(ctx: Context<FinalizeCampaign>, spv_wallet: Pubkey) -> Result<()> {
        let status = ctx.accounts.property.status;
        let tokens_sold = ctx.accounts.property.tokens_sold;
        let total_tokens = ctx.accounts.property.total_tokens;
        let authority_key = ctx.accounts.property.authority;
        let name_bytes = ctx.accounts.property.property_name.as_bytes().to_vec();
        let vault_bump = ctx.accounts.property.vault_bump;

        require!(status == PropertyStatus::Funding, HomeCrowdError::NotInFundingPhase);
        require!(tokens_sold == total_tokens, HomeCrowdError::FundingNotComplete);

        let seeds: &[&[u8]] = &[
            b"usdc_vault",
            authority_key.as_ref(),
            name_bytes.as_ref(),
            std::slice::from_ref(&vault_bump),
        ];
        let signer_seeds = &[seeds];

        let vault_balance = ctx.accounts.usdc_vault.amount;
        token::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.usdc_vault.to_account_info(),
                    to: ctx.accounts.spv_usdc_account.to_account_info(),
                    authority: ctx.accounts.usdc_vault.to_account_info(),
                },
                signer_seeds,
            ),
            vault_balance,
        )?;

        let property = &mut ctx.accounts.property;
        property.status = PropertyStatus::Active;
        property.spv_wallet = Some(spv_wallet);

        msg!("Campaign finalized. {} USDC transferred to SPV", vault_balance);
        Ok(())
    }

    /// Deposit monthly rent for distribution.
    pub fn distribute_rent(ctx: Context<DistributeRent>, total_rent: u64) -> Result<()> {
        let status = ctx.accounts.property.status;
        require!(status == PropertyStatus::Active, HomeCrowdError::PropertyNotActive);

        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.payer_usdc.to_account_info(),
                    to: ctx.accounts.rent_vault.to_account_info(),
                    authority: ctx.accounts.payer.to_account_info(),
                },
            ),
            total_rent,
        )?;

        let prev = ctx.accounts.property.total_rent_distributed;
        ctx.accounts.property.total_rent_distributed = prev
            .checked_add(total_rent)
            .ok_or(HomeCrowdError::Overflow)?;

        msg!("Rent deposited: {} USDC", total_rent);
        Ok(())
    }

    /// Claim rent proportional to token holdings.
    pub fn claim_rent(ctx: Context<ClaimRent>, amount: u64) -> Result<()> {
        let status = ctx.accounts.property.status;
        let authority_key = ctx.accounts.property.authority;
        let name_bytes = ctx.accounts.property.property_name.as_bytes().to_vec();
        let rent_vault_bump = ctx.accounts.property.rent_vault_bump;

        require!(status == PropertyStatus::Active, HomeCrowdError::PropertyNotActive);

        let seeds: &[&[u8]] = &[
            b"rent_vault",
            authority_key.as_ref(),
            name_bytes.as_ref(),
            std::slice::from_ref(&rent_vault_bump),
        ];
        let signer_seeds = &[seeds];

        token::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.rent_vault.to_account_info(),
                    to: ctx.accounts.claimer_usdc.to_account_info(),
                    authority: ctx.accounts.rent_vault.to_account_info(),
                },
                signer_seeds,
            ),
            amount,
        )?;

        msg!("Rent claimed: {} USDC", amount);
        Ok(())
    }

    /// Buyer buys back tokens from an investor.
    pub fn buyback_tokens(ctx: Context<BuybackTokens>, amount: u64) -> Result<()> {
        let status = ctx.accounts.property.status;
        let token_price = ctx.accounts.property.token_price;
        let buyer_tokens = ctx.accounts.property.buyer_tokens;
        let total_tokens = ctx.accounts.property.total_tokens;

        require!(status == PropertyStatus::Active, HomeCrowdError::PropertyNotActive);

        let usdc_amount = amount
            .checked_mul(token_price)
            .ok_or(HomeCrowdError::Overflow)?;

        // Buyer pays USDC to investor
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.buyer_usdc.to_account_info(),
                    to: ctx.accounts.investor_usdc.to_account_info(),
                    authority: ctx.accounts.buyer.to_account_info(),
                },
            ),
            usdc_amount,
        )?;

        // Transfer tokens from investor to buyer
        token::transfer(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.investor_token_account.to_account_info(),
                    to: ctx.accounts.buyer_token_account.to_account_info(),
                    authority: ctx.accounts.investor.to_account_info(),
                },
            ),
            amount,
        )?;

        // Burn the bought-back tokens
        token::burn(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Burn {
                    mint: ctx.accounts.property_mint.to_account_info(),
                    from: ctx.accounts.buyer_token_account.to_account_info(),
                    authority: ctx.accounts.buyer.to_account_info(),
                },
            ),
            amount,
        )?;

        let new_buyer_tokens = buyer_tokens
            .checked_add(amount)
            .ok_or(HomeCrowdError::Overflow)?;
        ctx.accounts.property.buyer_tokens = new_buyer_tokens;

        if new_buyer_tokens >= total_tokens {
            ctx.accounts.property.status = PropertyStatus::Completed;
            msg!("All tokens bought back! Property fully owned by buyer.");
        } else {
            msg!("Buyback: {} tokens. Buyer now owns {}/{}", amount, new_buyer_tokens, total_tokens);
        }

        Ok(())
    }

    /// Claim refund if campaign deadline passed without reaching goal.
    pub fn claim_refund(ctx: Context<ClaimRefund>) -> Result<()> {
        // Read all needed values before any mutable borrow
        let status = ctx.accounts.property.status;
        let deadline = ctx.accounts.property.deadline;
        let tokens_sold = ctx.accounts.property.tokens_sold;
        let total_tokens = ctx.accounts.property.total_tokens;
        let token_price = ctx.accounts.property.token_price;
        let authority_key = ctx.accounts.property.authority;
        let name_bytes = ctx.accounts.property.property_name.as_bytes().to_vec();
        let vault_bump = ctx.accounts.property.vault_bump;
        let prop_bump = ctx.accounts.property.bump;
        let investor_tokens = ctx.accounts.investor_token_account.amount;

        let clock = Clock::get()?;

        // Transition status if needed
        let effective_status = if status == PropertyStatus::Funding {
            require!(clock.unix_timestamp > deadline, HomeCrowdError::CampaignNotExpired);
            require!(tokens_sold < total_tokens, HomeCrowdError::FundingComplete);
            ctx.accounts.property.status = PropertyStatus::Refunding;
            PropertyStatus::Refunding
        } else {
            status
        };

        require!(effective_status == PropertyStatus::Refunding, HomeCrowdError::NotRefunding);
        require!(investor_tokens > 0, HomeCrowdError::NoTokensToRefund);

        let refund_amount = investor_tokens
            .checked_mul(token_price)
            .ok_or(HomeCrowdError::Overflow)?;

        // Transfer USDC from vault back to investor
        let vault_seeds: &[&[u8]] = &[
            b"usdc_vault",
            authority_key.as_ref(),
            name_bytes.as_ref(),
            std::slice::from_ref(&vault_bump),
        ];
        let vault_signer_seeds = &[vault_seeds];

        token::transfer(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.usdc_vault.to_account_info(),
                    to: ctx.accounts.investor_usdc.to_account_info(),
                    authority: ctx.accounts.usdc_vault.to_account_info(),
                },
                vault_signer_seeds,
            ),
            refund_amount,
        )?;

        // Burn the investor's property tokens
        let prop_seeds: &[&[u8]] = &[
            b"property",
            authority_key.as_ref(),
            name_bytes.as_ref(),
            std::slice::from_ref(&prop_bump),
        ];
        let prop_signer_seeds = &[prop_seeds];

        token::burn(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                Burn {
                    mint: ctx.accounts.property_mint.to_account_info(),
                    from: ctx.accounts.investor_token_account.to_account_info(),
                    authority: ctx.accounts.property.to_account_info(),
                },
                prop_signer_seeds,
            ),
            investor_tokens,
        )?;

        msg!("Refunded {} USDC for {} tokens", refund_amount, investor_tokens);
        Ok(())
    }
}

// ============================================================
// ACCOUNTS
// ============================================================

#[derive(Accounts)]
#[instruction(
    property_name: String,
    property_location: String,
    total_price: u64,
    token_price: u64,
    total_tokens: u64,
    buyer_tokens: u64,
    deadline: i64,
    ipfs_hash: String,
)]
pub struct InitializeProperty<'info> {
    #[account(mut)]
    pub buyer: Signer<'info>,

    #[account(
        init,
        payer = buyer,
        space = PropertyAccount::space(&property_name, &property_location, &ipfs_hash),
        seeds = [b"property", buyer.key().as_ref(), property_name.as_bytes()],
        bump,
    )]
    pub property: Account<'info, PropertyAccount>,

    #[account(
        init,
        payer = buyer,
        mint::decimals = 0,
        mint::authority = property,
    )]
    pub property_mint: Account<'info, Mint>,

    /// USDC mint (devnet or mock)
    pub usdc_mint: Account<'info, Mint>,

    #[account(
        init,
        payer = buyer,
        token::mint = usdc_mint,
        token::authority = usdc_vault,
        seeds = [b"usdc_vault", buyer.key().as_ref(), property_name.as_bytes()],
        bump,
    )]
    pub usdc_vault: Account<'info, TokenAccount>,

    #[account(
        init,
        payer = buyer,
        token::mint = usdc_mint,
        token::authority = rent_vault,
        seeds = [b"rent_vault", buyer.key().as_ref(), property_name.as_bytes()],
        bump,
    )]
    pub rent_vault: Account<'info, TokenAccount>,

    #[account(
        init_if_needed,
        payer = buyer,
        associated_token::mint = property_mint,
        associated_token::authority = buyer,
    )]
    pub buyer_token_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, anchor_spl::associated_token::AssociatedToken>,
    pub system_program: Program<'info, System>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct BuyTokens<'info> {
    #[account(mut)]
    pub investor: Signer<'info>,

    #[account(
        mut,
        seeds = [b"property", property.authority.as_ref(), property.property_name.as_bytes()],
        bump = property.bump,
    )]
    pub property: Account<'info, PropertyAccount>,

    #[account(
        mut,
        address = property.mint,
    )]
    pub property_mint: Account<'info, Mint>,

    #[account(
        mut,
        constraint = investor_usdc.mint == usdc_vault.mint,
        constraint = investor_usdc.owner == investor.key(),
    )]
    pub investor_usdc: Account<'info, TokenAccount>,

    #[account(
        mut,
        address = property.usdc_vault,
    )]
    pub usdc_vault: Account<'info, TokenAccount>,

    #[account(
        init_if_needed,
        payer = investor,
        associated_token::mint = property_mint,
        associated_token::authority = investor,
    )]
    pub investor_token_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, anchor_spl::associated_token::AssociatedToken>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct FinalizeCampaign<'info> {
    #[account(
        mut,
        constraint = property.authority == authority.key(),
    )]
    pub authority: Signer<'info>,

    #[account(
        mut,
        seeds = [b"property", property.authority.as_ref(), property.property_name.as_bytes()],
        bump = property.bump,
    )]
    pub property: Account<'info, PropertyAccount>,

    #[account(
        mut,
        address = property.usdc_vault,
    )]
    pub usdc_vault: Account<'info, TokenAccount>,

    #[account(mut)]
    pub spv_usdc_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct DistributeRent<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
        mut,
        seeds = [b"property", property.authority.as_ref(), property.property_name.as_bytes()],
        bump = property.bump,
    )]
    pub property: Account<'info, PropertyAccount>,

    #[account(
        mut,
        constraint = payer_usdc.mint == rent_vault.mint,
        constraint = payer_usdc.owner == payer.key(),
    )]
    pub payer_usdc: Account<'info, TokenAccount>,

    #[account(
        mut,
        address = property.rent_vault,
    )]
    pub rent_vault: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct ClaimRent<'info> {
    pub claimer: Signer<'info>,

    #[account(
        seeds = [b"property", property.authority.as_ref(), property.property_name.as_bytes()],
        bump = property.bump,
    )]
    pub property: Account<'info, PropertyAccount>,

    #[account(
        constraint = claimer_token_account.mint == property.mint,
        constraint = claimer_token_account.owner == claimer.key(),
        constraint = claimer_token_account.amount > 0 @ HomeCrowdError::NoTokensToRefund,
    )]
    pub claimer_token_account: Account<'info, TokenAccount>,

    #[account(
        mut,
        address = property.rent_vault,
    )]
    pub rent_vault: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint = claimer_usdc.owner == claimer.key(),
    )]
    pub claimer_usdc: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct BuybackTokens<'info> {
    #[account(
        mut,
        constraint = property.authority == buyer.key(),
    )]
    pub buyer: Signer<'info>,

    pub investor: Signer<'info>,

    #[account(
        mut,
        seeds = [b"property", property.authority.as_ref(), property.property_name.as_bytes()],
        bump = property.bump,
    )]
    pub property: Account<'info, PropertyAccount>,

    #[account(
        mut,
        address = property.mint,
    )]
    pub property_mint: Account<'info, Mint>,

    #[account(
        mut,
        constraint = buyer_usdc.owner == buyer.key(),
    )]
    pub buyer_usdc: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint = investor_usdc.owner == investor.key(),
    )]
    pub investor_usdc: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint = investor_token_account.mint == property.mint,
        constraint = investor_token_account.owner == investor.key(),
    )]
    pub investor_token_account: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint = buyer_token_account.mint == property.mint,
        constraint = buyer_token_account.owner == buyer.key(),
    )]
    pub buyer_token_account: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
pub struct ClaimRefund<'info> {
    #[account(mut)]
    pub investor: Signer<'info>,

    #[account(
        mut,
        seeds = [b"property", property.authority.as_ref(), property.property_name.as_bytes()],
        bump = property.bump,
    )]
    pub property: Account<'info, PropertyAccount>,

    #[account(
        mut,
        address = property.mint,
    )]
    pub property_mint: Account<'info, Mint>,

    #[account(
        mut,
        constraint = investor_token_account.mint == property.mint,
        constraint = investor_token_account.owner == investor.key(),
    )]
    pub investor_token_account: Account<'info, TokenAccount>,

    #[account(
        mut,
        address = property.usdc_vault,
    )]
    pub usdc_vault: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint = investor_usdc.owner == investor.key(),
    )]
    pub investor_usdc: Account<'info, TokenAccount>,

    pub token_program: Program<'info, Token>,
}

// ============================================================
// STATE
// ============================================================

#[account]
pub struct PropertyAccount {
    pub authority: Pubkey,
    pub property_name: String,
    pub property_location: String,
    pub total_price: u64,
    pub token_price: u64,
    pub total_tokens: u64,
    pub tokens_sold: u64,
    pub buyer_tokens: u64,
    pub deadline: i64,
    pub ipfs_hash: String,
    pub status: PropertyStatus,
    pub mint: Pubkey,
    pub usdc_vault: Pubkey,
    pub rent_vault: Pubkey,
    pub spv_wallet: Option<Pubkey>,
    pub total_rent_distributed: u64,
    pub bump: u8,
    pub vault_bump: u8,
    pub rent_vault_bump: u8,
}

impl PropertyAccount {
    pub fn space(name: &str, location: &str, ipfs_hash: &str) -> usize {
        8 +  // discriminator
        32 + // authority
        4 + name.len() +
        4 + location.len() +
        8 +  // total_price
        8 +  // token_price
        8 +  // total_tokens
        8 +  // tokens_sold
        8 +  // buyer_tokens
        8 +  // deadline
        4 + ipfs_hash.len() +
        1 +  // status
        32 + // mint
        32 + // usdc_vault
        32 + // rent_vault
        1 + 32 + // spv_wallet (Option<Pubkey>)
        8 +  // total_rent_distributed
        1 +  // bump
        1 +  // vault_bump
        1    // rent_vault_bump
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, PartialEq, Eq)]
pub enum PropertyStatus {
    Funding,
    Active,
    Completed,
    Refunding,
}

// ============================================================
// ERRORS
// ============================================================

#[error_code]
pub enum HomeCrowdError {
    #[msg("Property name too long (max 64 chars)")]
    NameTooLong,
    #[msg("Location too long (max 128 chars)")]
    LocationTooLong,
    #[msg("IPFS hash too long (max 64 chars)")]
    IpfsHashTooLong,
    #[msg("Invalid price")]
    InvalidPrice,
    #[msg("Invalid token supply")]
    InvalidTokenSupply,
    #[msg("Buyer tokens exceeds total supply")]
    InvalidBuyerTokens,
    #[msg("Deadline must be in the future")]
    DeadlineInPast,
    #[msg("Campaign is not in funding phase")]
    NotInFundingPhase,
    #[msg("Campaign has expired")]
    CampaignExpired,
    #[msg("Amount exceeds available tokens")]
    ExceedsAvailableTokens,
    #[msg("Arithmetic overflow")]
    Overflow,
    #[msg("Funding is not complete")]
    FundingNotComplete,
    #[msg("Property is not active")]
    PropertyNotActive,
    #[msg("Campaign has not expired yet")]
    CampaignNotExpired,
    #[msg("Funding is complete, no refunds available")]
    FundingComplete,
    #[msg("Not in refunding status")]
    NotRefunding,
    #[msg("No tokens to refund")]
    NoTokensToRefund,
}
