# HomeCrowd Architecture

## Overview

HomeCrowd is a decentralized real estate crowdfunding platform built on Solana, focused on the Kazakhstan residential market. It enables homebuyers to tokenize apartment purchases, allowing investors to buy fractional ownership through SPL tokens.

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

- **Funding**: Campaign accepting investments. Investors buy tokens with USDC.
- **Active**: Fully funded. Apartment purchased via SPV (ТОО in AIFC). Rent distributed. Buyer can buyback tokens.
- **Completed**: Buyer repurchased all tokens. Apartment transferred via notary + ЦОН.
- **Refunding**: Deadline passed without full funding. Investors claim USDC refunds.

#### Instructions

1. **initialize_property**: Creates PropertyAccount PDA, mints SPL tokens, sets up vaults
2. **buy_tokens**: Transfers USDC from investor to vault, mints property tokens
3. **finalize_campaign**: Transfers vault USDC to SPV (ТОО) wallet, transitions to Active
4. **distribute_rent**: Buyer deposits rent USDC into rent vault
5. **claim_rent**: Token holders claim proportional rent from rent vault
6. **buyback_tokens**: Buyer pays USDC to investor, receives and burns tokens
7. **claim_refund**: Burns investor tokens, returns USDC from vault

### 2. Frontend (Next.js 15)

Single-page application using App Router:

- `/` — Landing page with KZ market value proposition
- `/properties` — Browse Almaty/Astana apartment campaigns
- `/properties/[id]` — Apartment detail with buy form (USDC + KZT display)
- `/create` — Create new property campaign
- `/dashboard` — Investor/buyer portfolio view

### 3. Legal Structure

- **SPV**: ТОО (LLP) registered in AIFC (Astana International Financial Centre)
- **Law**: English common law (AIFC jurisdiction)
- **Flow**: SPV buys apartment → tokens represent shares → 100% buyback → transfer via notary + ЦОН
- **Appraisal**: Licensed KZ property evaluator (~$200-300)

### 4. External Integrations

- **Phantom Wallet**: Via `@solana/wallet-adapter-react`
- **IPFS (Pinata)**: Property document storage (appraisals, tech passports)
- **Future**: Stablecoin Tenge integration (National Bank sandbox)
- **Future**: KASE digital asset infrastructure

## Security Considerations

1. **PDA Authority**: All token minting controlled by PropertyAccount PDA
2. **Vault Security**: USDC vaults use PDA-derived authority
3. **Deadline Enforcement**: On-chain clock comparison prevents late investments
4. **Refund Protection**: Tokens burned before USDC returned
5. **Overflow Protection**: All arithmetic uses `checked_mul` and `checked_add`

## Why Solana is Critical

The platform distributes rent to 150-200 token holders monthly. At ~$0.002/tx on Solana, distributing to 200 holders costs ~$0.40. On Ethereum at $4/tx, the same costs $800 — exceeding the $650/month rent for a typical Almaty apartment. Combined with KASE memorandum and Digital Tenge on Solana, no other chain is viable for this use case in Kazakhstan.
