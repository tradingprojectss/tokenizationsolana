import { PublicKey } from "@solana/web3.js";

// Program ID (will be updated after deployment)
export const PROGRAM_ID = new PublicKey(
  "HtZ7iRQVbKKJHCcd4VajdHMf42NSuoW7g7AyoQWBQ68a"
);

// USDC Devnet mint - we'll use a mock USDC
export const USDC_MINT = new PublicKey(
  "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU" // devnet USDC
);

export const SOLANA_RPC_URL = "https://api.devnet.solana.com";

// Mock data for demo
export const MOCK_PROPERTIES = [
  {
    id: "prop1",
    name: "Modern Downtown Apartment",
    location: "456 Main St, Austin, TX 78701",
    totalPrice: 350_000_000_000, // $350,000 in USDC (6 decimals)
    tokenPrice: 10_000_000, // $10 per token
    totalTokens: 35_000,
    tokensSold: 24_500,
    buyerTokens: 3_500,
    deadline: Math.floor(Date.now() / 1000) + 86400 * 15,
    status: "Funding" as const,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
    ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
    annualYield: 8.5,
    description:
      "Beautiful 2BR/2BA apartment in downtown Austin. Recently renovated with modern finishes, in-unit laundry, and a balcony overlooking Congress Ave.",
  },
  {
    id: "prop2",
    name: "Suburban Family Home",
    location: "123 Oak Lane, Frisco, TX 75034",
    totalPrice: 425_000_000_000,
    tokenPrice: 10_000_000,
    totalTokens: 42_500,
    tokensSold: 8_500,
    buyerTokens: 4_250,
    deadline: Math.floor(Date.now() / 1000) + 86400 * 25,
    status: "Funding" as const,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
    annualYield: 7.2,
    description:
      "Spacious 4BR/3BA family home in top-rated Frisco ISD school district. Large backyard, 2-car garage, and community pool access.",
  },
  {
    id: "prop3",
    name: "Beachfront Condo",
    location: "789 Ocean Drive, Miami, FL 33139",
    totalPrice: 520_000_000_000,
    tokenPrice: 10_000_000,
    totalTokens: 52_000,
    tokensSold: 52_000,
    buyerTokens: 5_200,
    deadline: Math.floor(Date.now() / 1000) - 86400 * 5,
    status: "Active" as const,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    ipfsHash: "QmZTR5bcpQD7cFgTorqxZDYaew1Wqgfbd2ud9QqGPAkK2V",
    annualYield: 9.1,
    description:
      "Stunning 3BR/2BA oceanfront condo with panoramic views. Resort-style amenities including pool, gym, and 24/7 concierge.",
  },
  {
    id: "prop4",
    name: "Mountain View Cabin",
    location: "321 Aspen Rd, Park City, UT 84060",
    totalPrice: 290_000_000_000,
    tokenPrice: 10_000_000,
    totalTokens: 29_000,
    tokensSold: 14_500,
    buyerTokens: 2_900,
    deadline: Math.floor(Date.now() / 1000) + 86400 * 20,
    status: "Funding" as const,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800",
    ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
    annualYield: 6.8,
    description:
      "Cozy 3BR/2BA cabin just minutes from Park City Mountain Resort. Perfect for year-round living with ski-in/ski-out access.",
  },
];
