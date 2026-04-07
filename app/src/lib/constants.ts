import { PublicKey } from "@solana/web3.js";

// Program ID
export const PROGRAM_ID = new PublicKey(
  "HtZ7iRQVbKKJHCcd4VajdHMf42NSuoW7g7AyoQWBQ68a"
);

// USDC Devnet mint
export const USDC_MINT = new PublicKey(
  "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"
);

export const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || "http://localhost:8899";

// KZT to USD approximate rate
export const KZT_PER_USD = 470;

// Mock data for demo — Kazakhstan market
export const MOCK_PROPERTIES = [
  {
    id: "prop1",
    name: "1-комнатная квартира, Бостандыкский район",
    location: "ул. Тимирязева 42, Алматы",
    totalPrice: 80_000_000_000, // $80,000 in USDC (6 decimals)
    tokenPrice: 8_000_000, // $8 per token
    totalTokens: 10_000,
    tokensSold: 7_000,
    buyerTokens: 1_875,
    deadline: Math.floor(Date.now() / 1000) + 86400 * 15,
    status: "Funding" as const,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
    ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
    annualYield: 8.5,
    monthlyRent: 650,
    priceKZT: 37_600_000,
    description:
      "Светлая 1-комнатная квартира 45м² в Бостандыкском районе. Свежий ремонт, рядом метро Байконур, ТРЦ Мега. Идеально для молодого специалиста.",
  },
  {
    id: "prop2",
    name: "2-комнатная квартира, Достык Плаза",
    location: "пр. Достык 128, Алматы",
    totalPrice: 120_000_000_000, // $120,000
    tokenPrice: 8_000_000,
    totalTokens: 15_000,
    tokensSold: 3_750,
    buyerTokens: 3_000,
    deadline: Math.floor(Date.now() / 1000) + 86400 * 25,
    status: "Funding" as const,
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
    ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
    annualYield: 7.2,
    monthlyRent: 900,
    priceKZT: 56_400_000,
    description:
      "Просторная 2-комнатная квартира 72м² в элитном районе рядом с Достык Плаза. Панорамные окна, закрытый двор, подземный паркинг.",
  },
  {
    id: "prop3",
    name: "Студия рядом с Назарбаев Университетом",
    location: "ул. Кабанбай батыра 11, Астана",
    totalPrice: 60_000_000_000, // $60,000
    tokenPrice: 8_000_000,
    totalTokens: 7_500,
    tokensSold: 7_500,
    buyerTokens: 1_500,
    deadline: Math.floor(Date.now() / 1000) - 86400 * 5,
    status: "Active" as const,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    ipfsHash: "QmZTR5bcpQD7cFgTorqxZDYaew1Wqgfbd2ud9QqGPAkK2V",
    annualYield: 9.5,
    monthlyRent: 500,
    priceKZT: 28_200_000,
    description:
      "Уютная студия 32м² в новом ЖК рядом с Назарбаев Университетом. Полная меблировка, высокий спрос на аренду от студентов и преподавателей.",
  },
  {
    id: "prop4",
    name: "1-комнатная квартира, Алмалинский район",
    location: "ул. Жибек Жолы 85, Алматы",
    totalPrice: 70_000_000_000, // $70,000
    tokenPrice: 8_000_000,
    totalTokens: 8_750,
    tokensSold: 4_375,
    buyerTokens: 1_750,
    deadline: Math.floor(Date.now() / 1000) + 86400 * 20,
    status: "Funding" as const,
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800",
    ipfsHash: "QmPZ9gcCEpqKTo6aq61g2nXGUhM4iCL3ewB6LDXZCtioEB",
    annualYield: 8.0,
    monthlyRent: 550,
    priceKZT: 32_900_000,
    description:
      "1-комнатная квартира 40м² в самом центре Алматы. Пешая доступность до Арбата, Зелёного базара. Район с высоким арендным спросом.",
  },
];
