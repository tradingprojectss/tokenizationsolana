"use client";

import { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { KZT_PER_USD } from "./constants";

export interface Campaign {
  id: string;
  name: string;
  location: string;
  totalPrice: number;      // in USD
  tokenPrice: number;      // always 8_000_000 (micro-USDC)
  totalTokens: number;
  tokensSold: number;
  buyerTokens: number;
  deadline: number;        // unix timestamp
  status: "Funding" | "Active";
  image: string;
  ipfsHash: string;
  annualYield: number;
  monthlyRent: number;
  priceKZT: number;
  krishaUrl?: string;
  area: number;
  floor: string | null;
  buildYear: number | null;
  houseType: string;
  description: string;
  isUserCreated: true;
}

interface CampaignContextType {
  campaigns: Campaign[];
  addCampaign: (c: Campaign) => void;
}

const CampaignContext = createContext<CampaignContextType>({
  campaigns: [],
  addCampaign: () => {},
});

export function CampaignProvider({ children }: { children: ReactNode }) {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  const addCampaign = useCallback((c: Campaign) => {
    setCampaigns((prev) => [c, ...prev]);
  }, []);

  return (
    <CampaignContext.Provider value={{ campaigns, addCampaign }}>
      {children}
    </CampaignContext.Provider>
  );
}

export function useCampaigns() {
  return useContext(CampaignContext);
}

/** Build a Campaign object from the create form values */
export function buildCampaign(form: {
  name: string;
  location: string;
  description: string;
  imageUrl: string;
  area: string;
  floor: string;
  buildYear: string;
  houseType: string;
  totalPrice: string;
  annualYield: string;
  deadline: string;
}): Campaign {
  const priceUSD = parseFloat(form.totalPrice) || 0;
  const totalTokens = Math.ceil(priceUSD / 8);
  const yieldPct = parseFloat(form.annualYield) || 8.5;
  const deadlineTs = form.deadline
    ? Math.floor(new Date(form.deadline).getTime() / 1000)
    : Math.floor(Date.now() / 1000) + 86400 * 30;

  return {
    id: `user-${Date.now()}`,
    name: form.name,
    location: form.location,
    description: form.description,
    image: form.imageUrl || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
    totalPrice: priceUSD * 1_000_000,   // stored as micro like MOCK_PROPERTIES
    tokenPrice: 8_000_000,
    totalTokens,
    tokensSold: 0,
    buyerTokens: 0,
    deadline: deadlineTs,
    status: "Funding",
    ipfsHash: "QmUserCampaign000000000000000000000000000000000",
    annualYield: yieldPct,
    monthlyRent: Math.round((priceUSD * yieldPct) / 100 / 12),
    priceKZT: Math.round(priceUSD * KZT_PER_USD),
    area: parseFloat(form.area) || 0,
    floor: form.floor || null,
    buildYear: form.buildYear ? parseInt(form.buildYear) : null,
    houseType: form.houseType || "монолитный",
    isUserCreated: true,
  };
}
