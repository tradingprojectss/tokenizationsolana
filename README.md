# Asset Tokenization Protocol — Solana

On-chain protocol for tokenizing real-world assets (RWA) into fractional SPL tokens on Solana.

## Overview

This protocol enables issuers to register physical assets — real estate, commercial property, land, infrastructure, commodities, private equity, art, and vehicles — and fractionalize ownership through SPL tokens. Investors can purchase fractional shares, receive yield distributions (e.g., rental income), and trade on secondary markets.

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Platform Config                      │
│  authority · treasury · fee_bps · total_value_locked  │
└──────────────────────┬──────────────────────────────┘
                       │
         ┌─────────────┼─────────────┐
         ▼             ▼             ▼
   ┌──────────┐  ┌──────────┐  ┌──────────┐
   │  Asset 1  │  │  Asset 2  │  │  Asset N  │
   │  RWA PDA  │  │  RWA PDA  │  │  RWA PDA  │
   └─────┬────┘  └──────────┘  └──────────┘
         │
    ┌────┼────────────┐
    ▼    ▼            ▼
 [Mint] [Vault]  [Yield Vault]
    │
    ├── Investor 1 (ATA + InvestorAccount PDA)
    ├── Investor 2
    └── Investor N
```

## Supported Asset Classes

| Class | Description | Example |
|-------|-------------|---------|
| `RealEstate` | Residential property | Condo units, apartments |
| `CommercialProperty` | Commercial real estate | Office buildings, retail |
| `Land` | Raw land parcels | Agricultural, development |
| `Infrastructure` | Infrastructure assets | Bridges, solar farms |
| `Commodity` | Physical commodities | Gold reserves, oil |
| `PrivateEquity` | Private company shares | Startup equity |
| `Art` | Fine art & collectibles | Paintings, sculptures |
| `Vehicle` | High-value vehicles | Classic cars, yachts |

## Instructions

| Instruction | Description |
|-------------|-------------|
| `initialize_platform` | Set up the platform with admin and fee config |
| `register_asset` | Register a new real-world asset on-chain |
| `tokenize_asset` | Mint fractional SPL tokens for an asset |
| `purchase_tokens` | Buy fractional tokens with SOL |
| `distribute_yield` | Distribute rental/dividend yield to holders |
| `claim_yield` | Claim accumulated yield as an investor |
| `update_valuation` | Update asset appraisal (admin/oracle) |
| `transfer_asset_ownership` | Transfer issuer role |
| `set_trading_status` | Freeze/unfreeze trading (compliance) |
| `add_to_whitelist` | KYC whitelist an investor for an asset |

## Getting Started

### Prerequisites

- [Rust](https://rustup.rs/) (1.70+)
- [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools) (1.16+)
- [Anchor](https://www.anchor-lang.com/docs/installation) (0.29+)
- [Node.js](https://nodejs.org/) (18+)

### Build & Test

```bash
# Install dependencies
yarn install

# Build the program
anchor build

# Run tests (starts local validator automatically)
anchor test

# Deploy to devnet
anchor deploy --provider.cluster devnet
```

## Program ID

```
TKNz8Qv2f7bRJPmGxKLdh4UT9qXvShNjSg7Rw1PuAE
```

## Security

- All purchase operations require KYC whitelist verification
- Platform admin can freeze trading for regulatory compliance
- Yield distribution uses scaled integer math to prevent rounding exploits
- Asset valuations can only be updated by platform authority

## License

MIT
