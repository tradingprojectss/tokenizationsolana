# HomeCrowd Architecture

## Overview

HomeCrowd is a decentralized real estate crowdfunding platform built on Solana. It enables homebuyers to tokenize property purchases, allowing investors to buy fractional ownership through SPL tokens.

## System Components

### 1. Solana Program (Smart Contract)

Written in Rust using the Anchor framework (v0.30.1). The program manages the entire lifecycle of a property campaign.

#### Program Accounts (PDAs)

| Account | Seeds | Description |
|---------|-------|-------------|
| `PropertyAccount` | `["property", buyer_pubkey, property_name]` | Stores all property metadata, campaign status, and configuration |
| `USDC Vault` | `["usdc_vault", buyer_pubkey, property_name]` | Holds USDC during funding phase |
| `Rent Vault` | `["rent_vault", buyer_pubkey, property_name]` | Holds USDC from rent payments for distribution |
| `Property Mint` | Keypair (stored in PropertyAccount) | SPL Token mint for the property's fractional tokens |

#### State Machine

```
Funding → Active → Completed
   │
   └──→ Refunding
```

- **Funding**: Campaign is accepting investments. Investors can buy tokens.
- **Active**: Fully funded. Property purchased. Rent is distributed. Buyer can buyback tokens.
- **Completed**: Buyer has repurchased all tokens. Property transferred.
- **Refunding**: Deadline passed without full funding. Investors claim refunds.

#### Instructions

1. **initialize_property**: Creates PropertyAccount PDA, mints SPL tokens, sets up vaults
2. **buy_tokens**: Transfers USDC from investor to vault, mints property tokens to investor
3. **finalize_campaign**: Transfers vault USDC to SPV wallet, transitions to Active
4. **distribute_rent**: Buyer deposits rent USDC into rent vault
5. **claim_rent**: Token holders claim proportional rent from rent vault
6. **buyback_tokens**: Buyer pays USDC to investor, receives and burns their tokens
7. **claim_refund**: Burns investor tokens, returns USDC from vault

### 2. Frontend (Next.js 15)

Single-page application using App Router with the following pages:

- `/` — Landing page with value proposition
- `/properties` — Browse all property campaigns
- `/properties/[id]` — Property detail with buy form
- `/create` — Create new property campaign
- `/dashboard` — Investor/buyer portfolio view

### 3. External Integrations

- **Phantom Wallet**: Via `@solana/wallet-adapter-react`
- **IPFS (Pinata)**: Property document storage
- **SPV (LLC)**: Off-chain legal entity that holds property title

## Security Considerations

1. **PDA Authority**: All token minting is controlled by the PropertyAccount PDA — no admin keys
2. **Vault Security**: USDC vaults use PDA-derived authority — funds can only be moved by program logic
3. **Deadline Enforcement**: On-chain clock comparison prevents late investments
4. **Refund Protection**: Tokens must be burned before USDC is returned
5. **Overflow Protection**: All arithmetic uses `checked_mul` and `checked_add`

## Why Solana is Critical

The platform requires distributing rent to hundreds of token holders monthly. At ~$0.002 per transaction on Solana, distributing to 500 holders costs ~$1. On Ethereum at $4/tx, the same operation costs $2,000 — making the entire business model infeasible. The 400ms finality also enables a stock-like trading experience for property tokens.
