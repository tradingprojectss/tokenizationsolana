# 🏠 HomeCrowd

**Buy your own home without a mortgage — through tokenized crowdfunding on Solana.**

[![Solana](https://img.shields.io/badge/Solana-Devnet-blueviolet)](https://explorer.solana.com/?cluster=devnet)
[![Built with Anchor](https://img.shields.io/badge/Built%20with-Anchor-blue)](https://www.anchor-lang.com/)
[![Colosseum 2026](https://img.shields.io/badge/Colosseum-Frontier%202026-orange)](https://www.colosseum.org/)
[![National Solana Hackathon](https://img.shields.io/badge/Hackathon-Decentrathon%205.0-green)](https://decentrathon.com/)

---

## The Problem

A $350K home with a traditional 30-year mortgage at 6.38% costs **$707K total** — over $357K in overpayment. Young people are locked out of homeownership, trapped between unaffordable prices and predatory lending.

## The Solution

HomeCrowd lets a homebuyer create a crowdfunding campaign for a specific property on Solana. Investors purchase property tokens, the home is bought, and the buyer moves in — paying rent to token holders while gradually buying back their shares. Full ownership in 5–7 years with **~$130K overpayment instead of $357K**.

### How It Works

```
Buyer creates campaign → Investors fund with USDC → Home purchased via SPV (LLC)
    → Buyer moves in → Pays rent → Smart contract distributes to holders
        → Buyer buys back tokens monthly → 100% owned → Home transferred
```

## Why Solana

This isn't "Solana for a checkbox." Remove Solana and the product breaks:

- **Rent distribution to 200+ holders monthly** — costs $1 on Solana vs $2,000+ on Ethereum
- **400ms finality** — token purchases settle instantly, critical for financial UX
- **KASE × Solana Foundation** memorandum signed — Kazakhstan's stock exchange chose Solana for digital assets
- **Stablecoin Tenge on Solana** — already issued in National Bank regulatory sandbox, enabling future native fiat integration

## Features

- 🏗️ **Create Campaign** — List a property with documents, set funding goal and deadline
- 💰 **Buy Tokens** — Invest in property fractions with USDC via Phantom wallet
- 📊 **Rent Distribution** — Automated proportional payouts to all token holders on-chain
- 🔄 **Buyback Mechanism** — Buyer repurchases tokens over time, increasing ownership %
- 🛡️ **Auto Refund** — If campaign fails to reach goal, all investors get USDC back
- 📄 **Proof of Asset** — Property documents stored on IPFS, hashes recorded on-chain

## Architecture

```
┌─────────────┐     ┌──────────────────┐     ┌─────────────┐
│   Frontend   │────▶│  Solana Program   │────▶│   Devnet    │
│  (Next.js)   │     │    (Anchor)       │     │  Blockchain │
└──────┬───────┘     └────────┬──────────┘     └─────────────┘
       │                      │
       │                ┌─────┴──────┐
       │                │   PDAs     │
       │                ├────────────┤
       │                │ Property   │  ← metadata, goal, status
       │                │ Vault      │  ← USDC escrow
       │                │ RentVault  │  ← rent distribution pool
       │                │ TokenMint  │  ← SPL token per property
       │                └────────────┘
       │
  ┌────┴─────┐
  │  IPFS    │  ← property docs, appraisal, photos
  │ (Pinata) │
  └──────────┘
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Smart Contract | Anchor (Rust) on Solana |
| Frontend | Next.js, TypeScript, Tailwind CSS |
| Wallet | Phantom via @solana/wallet-adapter |
| Token Standard | SPL Token |
| Storage | IPFS (Pinata) |
| Payments | USDC (devnet) |
| Deployment | Solana Devnet |

## Economics

### For the Homebuyer

| | Mortgage | HomeCrowd |
|---|---|---|
| Home price | $350,000 | $350,000 |
| Down payment | $35,000 | $35,000 |
| Duration | 30 years | 5–7 years |
| Total overpayment | **$357,000** | **~$130,000** |
| Total paid | $707,000 | $480,000 |
| Flexibility | Locked to bank | Buy back at your pace |
| Job loss risk | Bank forecloses | Stop buying, keep living |

### For the Investor
- Rental yield: **5–8% annually** (above savings accounts)
- Backed by real property (not speculative)
- Liquid — sell tokens on secondary market anytime
- Transparent — every rent distribution visible on-chain

## Quick Start

### Prerequisites
- Rust, Solana CLI, Anchor CLI
- Node.js 18+, pnpm
- Phantom wallet (set to Devnet)

### Smart Contract
```bash
cd programs/homecrowd
anchor build
anchor deploy --provider.cluster devnet
```

### Frontend
```bash
cd app
pnpm install
pnpm dev
```

Open `http://localhost:3000` and connect your Phantom wallet (Devnet).

## Demo

> 🎬 [Video Demo](link) | 🌐 [Live Demo](link)

*Screenshots:*

<!-- Add screenshots here -->

## Roadmap

### ✅ Done (Hackathon MVP)
- [x] Property campaign creation with on-chain metadata
- [x] Token minting (SPL) for fractional ownership
- [x] USDC investment flow
- [x] Automated rent distribution to token holders
- [x] Buyback mechanism
- [x] Campaign auto-refund on failure
- [x] Web interface with wallet integration

### 🔜 Next
- [ ] KASE integration via Solana infrastructure
- [ ] Stablecoin Tenge support (post National Bank approval)
- [ ] Secondary market for token trading
- [ ] KYC/AML via AIFC (Astana International Financial Centre)

### 🔮 Future
- [ ] SPV (LLC) automation for legal property ownership
- [ ] Oracle integration for real-time property valuations
- [ ] Multi-property portfolio management
- [ ] Institutional investor onboarding
- [ ] Expansion to commercial real estate

## Team

| Name | Role | Links |
|------|------|-------|
| Alidar Zhaxybekov | Founder & Developer | [Telegram](https://t.me/) · [X](https://x.com/) · [GitHub](https://github.com/) |

## Smart Contract (Devnet)

| Program | Address |
|---------|---------|
| HomeCrowd Program | `<DEPLOY_ADDRESS>` |

## Resources

- [Pitch Deck](link)
- [Technical Demo Video](link)
- [Colosseum Submission](link)

## License

MIT
