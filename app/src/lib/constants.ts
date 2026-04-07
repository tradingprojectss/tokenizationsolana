import { PublicKey } from "@solana/web3.js";

// Program ID
export const PROGRAM_ID = new PublicKey(
  "HtZ7iRQVbKKJHCcd4VajdHMf42NSuoW7g7AyoQWBQ68a"
);

// USDC Devnet mint
export const USDC_MINT = new PublicKey(
  "4zMMC9srt5Ri5X14GAgXhaHii3GnPAEERYPJgZJDncDU"
);

export const SOLANA_RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || "https://api.devnet.solana.com";

// KZT to USD approximate rate
export const KZT_PER_USD = 470;

// Real properties from krisha.kz
export const MOCK_PROPERTIES = [
  {
    id: "prop1",
    name: "2-комнатная, 63 м², ЖК Seifullin",
    location: "ул. Сейфулина 162/3, Алматы, Алмалинский р-н",
    totalPrice: 125_500_000_000, // ~$125,500 (59 млн ₸ / 470)
    tokenPrice: 8_000_000,
    totalTokens: 15_688,
    tokensSold: 10_981,
    buyerTokens: 3_922,
    deadline: Math.floor(Date.now() / 1000) + 86400 * 18,
    status: "Funding" as const,
    image: "https://alakcell-photos-kr.kcdn.kz/webp/d0/d0c6f330-f050-414b-a7c6-85189d1cc7c9/22-750x470.jpg",
    ipfsHash: "QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco",
    annualYield: 7.6,
    monthlyRent: 800,
    priceKZT: 59_000_000,
    krishaUrl: "https://krisha.kz/a/show/1009444665",
    area: 63,
    floor: "1/12",
    buildYear: 2024,
    houseType: "монолитный",
    description:
      "2-комнатная квартира 63 м² в новом монолитном ЖК Seifullin, 1 этаж из 12. Год постройки 2024. Алмалинский район — центр Алматы, развитая инфраструктура, шаговая доступность метро и ТРЦ.",
  },
  {
    id: "prop2",
    name: "1-комнатная, 44.5 м², ЖК Namys",
    location: "ул. Сафуан Шаймерденов 1, Астана, Сарайшық р-н",
    totalPrice: 46_400_000_000, // ~$46,400 (21.8 млн ₸ / 470)
    tokenPrice: 8_000_000,
    totalTokens: 5_800,
    tokensSold: 5_800,
    buyerTokens: 1_450,
    deadline: Math.floor(Date.now() / 1000) - 86400 * 10,
    status: "Active" as const,
    image: "https://alakcell-photos-kr.kcdn.kz/webp/40/402d4b90-1796-43ff-a8c4-fe31ef9f121b/10-750x470.webp",
    ipfsHash: "QmYwAPJzv5CZsnA625s3Xf2nemtYgPpHdWEz79ojWnPbdG",
    annualYield: 9.0,
    monthlyRent: 350,
    priceKZT: 21_805_000,
    krishaUrl: "https://krisha.kz/a/show/1008271838",
    area: 44.5,
    floor: null,
    buildYear: 2026,
    houseType: "монолитный",
    description:
      "1-комнатная квартира 44.5 м² в новом ЖК Namys от застройщика Beles. Потолки 3 м, монолитный дом, сдача 2026. Район Сарайшық — быстрорастущий район Астаны с новой инфраструктурой.",
  },
  {
    id: "prop3",
    name: "1-комнатная, 54 м², мкр. Алтын Орда",
    location: "ул. Мустафа Шокай 11, Актобе",
    totalPrice: 46_600_000_000, // ~$46,600 (21.9 млн ₸ / 470)
    tokenPrice: 8_000_000,
    totalTokens: 5_825,
    tokensSold: 2_330,
    buyerTokens: 1_165,
    deadline: Math.floor(Date.now() / 1000) + 86400 * 30,
    status: "Funding" as const,
    image: "https://alakcell-photos-kr.kcdn.kz/webp/96/96e5cb8e-a3f7-4d14-9433-60beec3016f9/9-750x470.webp",
    ipfsHash: "QmZTR5bcpQD7cFgTorqxZDYaew1Wqgfbd2ud9QqGPAkK2V",
    annualYield: 7.7,
    monthlyRent: 300,
    priceKZT: 21_900_000,
    krishaUrl: "https://krisha.kz/a/show/1009842057",
    area: 54,
    floor: "2/6",
    buildYear: 2019,
    houseType: "кирпичный",
    description:
      "1-комнатная квартира 54 м² с кухней 15 м² в кирпичном доме 2019 года. Аккуратный ремонт, 2 этаж из 6. Мкр. Алтын Орда — спокойный жилой район Актобе с доступными ценами.",
  },
];
