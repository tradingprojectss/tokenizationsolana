<p align="center">
  <img src="https://img.shields.io/badge/Solana-Devnet-blueviolet?logo=solana" alt="Solana Devnet" />
  <img src="https://img.shields.io/badge/Anchor-0.30.1-blue" alt="Anchor" />
  <img src="https://img.shields.io/badge/Next.js-15-black?logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/Decentrathon-2026-green" alt="Decentrathon 2026" />
</p>

<h1 align="center">🏠 HomeCrowd</h1>

<p align="center">
  <strong>Своя квартира без ипотеки — через токенизированный краудфандинг на Solana</strong>
</p>

<p align="center">
  Built for the National Solana Hackathon by Decentrathon 2026 — RWA Tokenization Track
</p>

---

## 👤 Team

| Name | Role | Links |
|------|------|-------|
| Alidar Zhaxybekov | Founder & Developer | [Telegram](https://t.me/) · [X](https://x.com/) · [GitHub](https://github.com/tradingprojectss) |

---

## 🔍 Problem

The average apartment in Almaty costs **$80,000–100,000**. A typical first-time buyer has only ~$10–15K in savings.

With a traditional 20-year mortgage in Kazakhstan at **18–20% annual rate**:
- **Total repayment: ~$250,000** for an $80K apartment
- **$170,000 in interest** goes to the bank
- **70% of Kazakhstan's population is under 35** — massive demand, zero access
- Average salary in Almaty: 500,000 KZT/month (~$1,000) — mortgage payments eat 60%+ of income

**There has to be a better way.**

## 💡 Solution

HomeCrowd lets a homebuyer create a **crowdfunding campaign** for a specific apartment on Solana. Here's how:

1. **Buyer lists a property** — uploads details, photos, appraisal documents
2. **Platform tokenizes it** — creates 10,000 SPL tokens at $8 each for an $80K apartment
3. **Buyer purchases their share** — e.g., 1,875 tokens ($15,000 = 18.75%)
4. **Investors buy remaining tokens** with USDC — crowdfunding the purchase
5. **Campaign reaches goal** → funds go to SPV (ТОО in AIFC) → apartment purchased
6. **Buyer moves in, pays rent** → smart contract distributes to all token holders proportionally
7. **Buyer gradually buys back tokens** → ownership % increases, rent decreases
8. **100% bought back** → apartment transferred to buyer via notary + ЦОН

**Total overpayment: ~$39K** vs **$170K with a KZ mortgage**. No bank needed.

If the campaign doesn't reach its goal within 30 days → **automatic refund** to all investors.

### Example: Asel's Journey

> Asel, 26, works in Almaty, salary 500K KZT. Found a 1-bedroom apartment for $80,000 in Bostandyk district. Has $15,000 saved.
>
> Creates campaign: 10,000 tokens at $8 each. Buys 1,875 tokens ($15,000 = 18.75%). 200 investors cover remaining $65,000. Asel moves in, pays $650/month rent (81.25% of market rent $800). Buys back tokens monthly — full ownership in 5–7 years.
>
> **Saved: $131,000 compared to a bank mortgage.**

---

## ⚡ Why Solana (Not Any Other Chain)

> *"A good project is one where if you remove Solana, it completely breaks."*
> — Hackathon Mentor

HomeCrowd **cannot exist** on Ethereum, TON, or any other chain. Here's why:

### 1. KASE × Solana Foundation
**KASE (Kazakhstan Stock Exchange)** signed a memorandum with Solana Foundation for digital asset infrastructure. This is not theoretical — it's institutional backing for RWA tokenization on Solana in Kazakhstan.

### 2. Stablecoin Tenge on Solana
**Digital Tenge** already issued on Solana in the **National Bank of Kazakhstan regulatory sandbox**, supported by Mastercard and Eurasian Bank as custodian. Future integration means investors can buy tokens directly in KZT — no USD conversion needed.

### 3. Micro-transactions at Scale
Monthly rent distribution to **200+ token holders** costs:
- **Solana: ~$0.40 total** (200 transfers × $0.002)
- **Ethereum: ~$800+** (200 transfers × $4+ gas)

The entire business model collapses on any chain with high transaction fees. For $650/month rent in Almaty, Ethereum gas fees would exceed the rent itself.

### 4. 400ms Finality
Property token purchases need to feel instant — like buying stock. Solana's 400ms finality enables real-time trading. Ethereum's 12-second blocks make the UX feel broken.

### 5. AIFC Legal Framework
**AIFC (Astana International Financial Centre)** operates under English common law — digital assets are already regulated. SPV (ТОО) can be structured in AIFC with full legal compliance, creating a clear path from on-chain tokens to off-chain property ownership.

---

## 💰 Economics

### For the Homebuyer

| | KZ Mortgage | HomeCrowd |
|---|---|---|
| Apartment price | $80,000 | $80,000 |
| Down payment | $15,000 | $15,000 |
| Duration | 20 years | 5–7 years |
| Interest rate | 18–20% | — |
| Total overpayment | **$170,000** | **~$39,000** |
| Total paid | $250,000 | $119,000 |
| Savings | — | **$131,000** |
| Flexibility | Locked to bank | Buy back at your pace |
| Job loss risk | Bank forecloses | Stop buying, keep living |

### For the Investor
- Rental yield: **6–10% annually** (KZ market rates, above bank deposits at 14%)
- Backed by real property in Almaty/Astana (not speculative)
- Liquid — sell tokens on secondary market anytime
- Transparent — every rent distribution visible on-chain

### Market Size
- **TAM**: KZ residential real estate market ~$50–60 billion
- **SAM**: Rental apartments in Almaty + Astana ~$15–20 billion
- **SOM** (2-year target): 50 properties × $80–100K = **$4–5M tokenized**

---

## ✨ Features

- **Property Campaigns** — Create tokenized crowdfunding campaigns for KZ real estate
- **SPL Token Minting** — Each property gets its own SPL token representing fractional ownership
- **USDC Payments** — All transactions in USDC stablecoin (future: Stablecoin Tenge)
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
         ┌─────────────┴──────────────┐
         ▼                            ▼
┌─────────────────┐      ┌────────────────────┐
│  IPFS (Pinata)  │      │  SPV (ТОО в AIFC)  │
│  Property docs  │      │  Legal ownership   │
└─────────────────┘      └────────────────────┘
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
   ├── YES → finalize_campaign → USDC to SPV (ТОО) → Apartment purchased
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
   │      100% bought back → Apartment transferred via notary + ЦОН
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
| Stablecoin | USDC (Devnet) / Future: Stablecoin Tenge |
| Documents | IPFS (Pinata) |
| Legal Structure | SPV (ТОО) in AIFC — off-chain |

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
- [x] Next.js frontend with 5 pages (KZ market focus)
- [x] Phantom wallet integration
- [x] Property browsing with Almaty/Astana listings
- [x] Campaign creation flow
- [x] Investor/buyer dashboard

### 🔜 Next
- [ ] Integration with KASE via Solana infrastructure
- [ ] Stablecoin Tenge support (post National Bank approval)
- [ ] KYC/AML via AIFC (Astana International Financial Centre)
- [ ] Partnership with KZ property management companies
- [ ] Secondary market for token trading (orderbook)
- [ ] Compressed NFTs for property documents

### 🔮 Future
- [ ] US market expansion (LLC in Delaware, $35T+ home equity market)
- [ ] Global expansion to other emerging markets
- [ ] Commercial real estate tokenization
- [ ] Oracle integration for real-time property valuations
- [ ] Multi-property portfolio management
- [ ] Institutional investor onboarding

---

## 📚 Resources

- [Solana Documentation](https://docs.solana.com)
- [Anchor Framework](https://www.anchor-lang.com)
- [AIFC Digital Asset Regulations](https://aifc.kz)
- [KASE × Solana Memorandum](https://kase.kz)

---

<p align="center">
  Built with ❤️ on Solana for Decentrathon 2026
</p>
