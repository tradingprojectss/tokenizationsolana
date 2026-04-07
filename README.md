<p align="center">
  <img src="https://img.shields.io/badge/Solana-Devnet-blueviolet?logo=solana" alt="Solana Devnet" />
  <img src="https://img.shields.io/badge/Anchor-0.30.1-blue" alt="Anchor" />
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/Decentrathon-2026-green" alt="Decentrathon 2026" />
</p>

<h1 align="center">🏠 HomeCrowd</h1>

<p align="center">
  <strong>Own your home without a mortgage — through tokenized crowdfunding on Solana</strong>
</p>

<p align="center">
  Built for the National Solana Hackathon by Decentrathon 2026 — RWA Tokenization Track
</p>

---

## 👤 Team

| Name | Role | Links |
|------|------|-------|
| Ali Dar | Solo Developer | [GitHub](https://github.com/alidar) |

---

## 🔍 Problem

The average US home costs **$350,000–$400,000**. A typical first-time buyer has only ~$35K in savings.

With a traditional 30-year mortgage at 6.38%:
- **Total repayment: ~$707,000** for a $350K home
- **$357,000 in interest** goes to the bank
- Young people are locked out of homeownership

**There has to be a better way.**

## 💡 Solution

HomeCrowd lets a homebuyer create a **crowdfunding campaign** for a specific property on Solana. Here's how:

1. **Buyer lists a property** — uploads details, photos, appraisal documents
2. **Platform tokenizes it** — creates 35,000 SPL tokens at $10 each for a $350K home
3. **Buyer purchases their share** — e.g., 3,500 tokens ($35K = 10%)
4. **Investors buy remaining tokens** with USDC — crowdfunding the home
5. **Campaign reaches goal** → funds go to SPV (LLC) → property purchased
6. **Buyer moves in, pays rent** → smart contract distributes to all token holders proportionally
7. **Buyer gradually buys back tokens** → ownership % increases, rent decreases
8. **100% bought back** → property transferred to buyer

**Total overpayment: ~$100–130K** vs **$357K with a mortgage**. No bank needed.

If the campaign doesn't reach its goal within 30 days → **automatic refund** to all investors.

---

## ⚡ Why Solana (Not Any Other Chain)

> *"A good project is one where if you remove Solana, it completely breaks."*
> — Hackathon Mentor

HomeCrowd **cannot exist** on Ethereum, TON, or any other chain. Here's why:

### 1. Micro-transactions at Scale
Monthly rent distribution to **500+ token holders** costs:
- **Solana: ~$1 total** (500 transfers × $0.002)
- **Ethereum: ~$2,000+** (500 transfers × $4+ gas)

The entire business model collapses on any chain with high transaction fees.

### 2. 400ms Finality
Property token purchases need to feel instant — like buying stock. Solana's 400ms finality enables real-time trading. Ethereum's 12-second blocks make the UX feel broken.

### 3. Regulatory Alignment
- **KASE (Kazakhstan Stock Exchange)** signed a memorandum with Solana Foundation
- **Stablecoin Tenge** already issued on Solana in National Bank regulatory sandbox
- This creates a clear path to regulatory compliance for RWA tokenization

### 4. On-chain Document Management
Property appraisals, title deeds, and inspection reports stored via IPFS with hashes anchored on Solana — 1000x cheaper than any EVM chain for document management at scale.

---

## ✨ Features

- **Property Campaigns** — Create tokenized crowdfunding campaigns for real estate
- **SPL Token Minting** — Each property gets its own SPL token representing fractional ownership
- **USDC Payments** — All transactions in USDC stablecoin (no volatile crypto)
- **Automatic Rent Distribution** — Smart contract distributes monthly rent to all token holders
- **Token Buyback** — Buyer gradually repurchases tokens, increasing ownership percentage
- **Auto-Refund** — Failed campaigns automatically refund investors
- **IPFS Document Storage** — Property documents stored on IPFS, hashes anchored on-chain
- **Phantom Wallet Integration** — Seamless wallet connection for buying/selling tokens

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js 15)                     │
│  Landing │ Browse Properties │ Detail │ Create │ Dashboard   │
│                                                             │
│  @solana/wallet-adapter  │  @coral-xyz/anchor  │  USDC      │
└──────────────────────┬──────────────────────────────────────┘
                       │ RPC (JSON-RPC / WebSocket)
                       ▼
┌──────────────────────────────────────────────────────────────┐
│                  Solana Program (Anchor)                      │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │ initialize   │  │  buy_tokens  │  │ distribute_rent   │  │
│  │ _property    │  │              │  │                   │  │
│  └──────────────┘  └──────────────┘  └───────────────────┘  │
│  ┌──────────────┐  ┌──────────────┐  ┌───────────────────┐  │
│  │  buyback     │  │ claim_refund │  │ finalize_campaign │  │
│  │  _tokens     │  │              │  │                   │  │
│  └──────────────┘  └──────────────┘  └───────────────────┘  │
│                                                              │
│  PDAs: PropertyAccount │ PropertyMint │ USDC Vault │ Rent V. │
└──────────────────────────────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────────────┐
│  SPL Token Program  │  Associated Token  │  System Program   │
└──────────────────────────────────────────────────────────────┘
                       │
                       ▼
              ┌─────────────────┐
              │  IPFS (Pinata)  │ ← Property docs, photos
              └─────────────────┘
```

### User Flow
```
Buyer creates campaign
        │
        ▼
Platform mints SPL tokens (PDA-controlled)
        │
        ▼
Investors buy tokens with USDC ──→ USDC goes to vault
        │
        ▼
Campaign fully funded?
   ├── YES → finalize_campaign → USDC to SPV → Property purchased
   │           │
   │           ▼
   │      Buyer moves in, pays rent monthly
   │           │
   │           ▼
   │      distribute_rent → USDC proportional to token holders
   │           │
   │           ▼
   │      buyback_tokens → Buyer repurchases, burns tokens
   │           │
   │           ▼
   │      100% bought back → Property transferred to buyer
   │
   └── NO (deadline passed) → claim_refund → USDC returned to investors
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Blockchain | Solana (Devnet) |
| Smart Contract | Anchor 0.30.1 (Rust) |
| Token Standard | SPL Token |
| Frontend | Next.js 15, TypeScript, Tailwind CSS |
| Wallet | Phantom via @solana/wallet-adapter |
| Stablecoin | USDC (Devnet) |
| Documents | IPFS (Pinata) |
| Legal Structure | SPV (LLC) — off-chain |

---

## 🖥️ Smart Contract (Devnet)

| Item | Address |
|------|---------|
| Program ID | `HtZ7iRQVbKKJHCcd4VajdHMf42NSuoW7g7AyoQWBQ68a` |
| Network | Solana Devnet |

### Instructions
1. `initialize_property` — Create property campaign with metadata, mint SPL tokens
2. `buy_tokens` — Investor purchases tokens with USDC
3. `finalize_campaign` — Release funds to SPV when fully funded
4. `distribute_rent` — Deposit monthly rent for distribution
5. `claim_rent` — Token holders claim proportional rent
6. `buyback_tokens` — Buyer repurchases tokens from investors
7. `claim_refund` — Refund investors if campaign fails

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Rust & Cargo
- Solana CLI
- Anchor CLI 0.30.1
- Phantom Wallet (browser extension)

### Smart Contract
```bash
# Install dependencies
cd homecrowd
anchor build

# Deploy to devnet
solana config set --url devnet
solana airdrop 5
anchor deploy

# Run tests
anchor test
```

### Frontend
```bash
cd app
yarn install
yarn dev
# Open http://localhost:3000
```

---

## 🗺️ Roadmap

### ✅ Done (MVP)
- [x] Anchor smart contract with 7 instructions
- [x] SPL token minting per property
- [x] USDC vault for crowdfunding
- [x] Rent distribution mechanism
- [x] Token buyback with burn
- [x] Auto-refund for failed campaigns
- [x] Next.js frontend with 5 pages
- [x] Phantom wallet integration
- [x] Property browsing and detail views
- [x] Campaign creation flow
- [x] Investor dashboard

### 🔜 Next
- [ ] Secondary market for token trading (orderbook)
- [ ] Compressed NFTs for property documents
- [ ] Multi-sig SPV wallet
- [ ] Oracle integration for property valuation
- [ ] Mobile-responsive optimizations

### 🔮 Future
- [ ] KYC/AML integration
- [ ] Legal framework for multiple jurisdictions
- [ ] Insurance integration
- [ ] Property management marketplace
- [ ] Stablecoin Tenge integration (Kazakhstan)
- [ ] KASE listing for property tokens

---

## 📚 Resources

- [Solana Documentation](https://docs.solana.com)
- [Anchor Framework](https://www.anchor-lang.com)
- [SPL Token Program](https://spl.solana.com/token)
- [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter)

---

<p align="center">
  Built with ❤️ on Solana for Decentrathon 2026
</p>
