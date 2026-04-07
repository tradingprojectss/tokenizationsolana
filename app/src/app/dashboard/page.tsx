"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Wallet,
  TrendingUp,
  Building2,
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { connected, publicKey } = useWallet();
  const [activeTab, setActiveTab] = useState<"investor" | "buyer">("investor");

  if (!connected) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Wallet className="h-8 w-8 text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">
          Connect Your Wallet
        </h1>
        <p className="mt-3 text-slate-600">
          Connect your Phantom wallet to view your portfolio, rent earnings, and
          property campaigns.
        </p>
      </div>
    );
  }

  // Mock portfolio data
  const investorPortfolio = [
    {
      property: "Modern Downtown Apartment",
      tokens: 150,
      value: 1500,
      rentEarned: 24.3,
      yield: 8.5,
      id: "prop1",
    },
    {
      property: "Beachfront Condo",
      tokens: 300,
      value: 3000,
      rentEarned: 48.6,
      yield: 9.1,
      id: "prop3",
    },
  ];

  const buyerCampaigns = [
    {
      property: "Suburban Family Home",
      totalTokens: 42500,
      tokensSold: 8500,
      buyerTokens: 4250,
      rentPaid: 5600,
      buybackProgress: 10,
      id: "prop2",
    },
  ];

  const totalValue = investorPortfolio.reduce((s, p) => s + p.value, 0);
  const totalRent = investorPortfolio.reduce((s, p) => s + p.rentEarned, 0);

  const rentHistory = [
    {
      date: "Mar 15, 2026",
      property: "Modern Downtown Apartment",
      amount: 8.1,
      type: "received",
    },
    {
      date: "Mar 15, 2026",
      property: "Beachfront Condo",
      amount: 16.2,
      type: "received",
    },
    {
      date: "Feb 15, 2026",
      property: "Modern Downtown Apartment",
      amount: 8.1,
      type: "received",
    },
    {
      date: "Feb 15, 2026",
      property: "Beachfront Condo",
      amount: 16.2,
      type: "received",
    },
    {
      date: "Jan 15, 2026",
      property: "Modern Downtown Apartment",
      amount: 8.1,
      type: "received",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500 font-mono">
            {publicKey?.toBase58().slice(0, 8)}...
            {publicKey?.toBase58().slice(-8)}
          </p>
        </div>
      </div>

      {/* Tab switch */}
      <div className="flex gap-1 bg-slate-100 rounded-lg p-1 w-fit mb-8">
        {(["investor", "buyer"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-white text-slate-900 shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {tab === "investor" ? "Investor" : "Homebuyer"}
          </button>
        ))}
      </div>

      {activeTab === "investor" && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                <DollarSign className="h-4 w-4" />
                Portfolio Value
              </div>
              <div className="text-2xl font-bold text-slate-900">
                ${totalValue.toLocaleString()}
              </div>
              <div className="text-sm text-green-600 mt-1">
                {investorPortfolio.length} properties
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                <TrendingUp className="h-4 w-4" />
                Total Rent Earned
              </div>
              <div className="text-2xl font-bold text-green-600">
                ${totalRent.toFixed(2)}
              </div>
              <div className="text-sm text-slate-500 mt-1">USDC received</div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
                <Building2 className="h-4 w-4" />
                Total Tokens
              </div>
              <div className="text-2xl font-bold text-slate-900">
                {investorPortfolio
                  .reduce((s, p) => s + p.tokens, 0)
                  .toLocaleString()}
              </div>
              <div className="text-sm text-slate-500 mt-1">
                Across all properties
              </div>
            </div>
          </div>

          {/* Holdings */}
          <div className="bg-white rounded-xl border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h2 className="font-semibold text-slate-900">My Holdings</h2>
            </div>
            <div className="divide-y divide-slate-200">
              {investorPortfolio.map((holding) => (
                <Link
                  key={holding.id}
                  href={`/properties/${holding.id}`}
                  className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <div className="font-medium text-slate-900">
                      {holding.property}
                    </div>
                    <div className="text-sm text-slate-500 mt-0.5">
                      {holding.tokens.toLocaleString()} tokens
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-slate-900">
                      ${holding.value.toLocaleString()}
                    </div>
                    <div className="text-sm text-green-600">
                      {holding.yield}% yield &middot; ${holding.rentEarned}{" "}
                      earned
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Rent history */}
          <div className="bg-white rounded-xl border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h2 className="font-semibold text-slate-900">
                Rent Distribution History
              </h2>
            </div>
            <div className="divide-y divide-slate-200">
              {rentHistory.map((tx, i) => (
                <div key={i} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <ArrowDownLeft className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-900">
                        {tx.property}
                      </div>
                      <div className="text-xs text-slate-500">{tx.date}</div>
                    </div>
                  </div>
                  <span className="font-medium text-green-600">
                    +${tx.amount.toFixed(2)} USDC
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "buyer" && (
        <div className="space-y-6">
          {/* Buyer stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="text-sm text-slate-500 mb-1">My Campaigns</div>
              <div className="text-2xl font-bold text-slate-900">
                {buyerCampaigns.length}
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="text-sm text-slate-500 mb-1">Total Rent Paid</div>
              <div className="text-2xl font-bold text-slate-900">
                ${buyerCampaigns
                  .reduce((s, c) => s + c.rentPaid, 0)
                  .toLocaleString()}
              </div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="text-sm text-slate-500 mb-1">
                Buyback Progress
              </div>
              <div className="text-2xl font-bold text-blue-600">
                {buyerCampaigns[0]?.buybackProgress || 0}%
              </div>
            </div>
          </div>

          {/* Campaigns */}
          <div className="bg-white rounded-xl border border-slate-200">
            <div className="p-6 border-b border-slate-200">
              <h2 className="font-semibold text-slate-900">
                My Property Campaigns
              </h2>
            </div>
            {buyerCampaigns.map((campaign) => (
              <Link
                key={campaign.id}
                href={`/properties/${campaign.id}`}
                className="block p-6 hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-medium text-slate-900">
                      {campaign.property}
                    </div>
                    <div className="text-sm text-slate-500 mt-0.5">
                      Funding: {campaign.tokensSold.toLocaleString()} /{" "}
                      {campaign.totalTokens.toLocaleString()} tokens
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Funding
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Funding Progress</span>
                      <span className="font-medium">
                        {(
                          (campaign.tokensSold / campaign.totalTokens) *
                          100
                        ).toFixed(0)}
                        %
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{
                          width: `${
                            (campaign.tokensSold / campaign.totalTokens) * 100
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Buyback Progress</span>
                      <span className="font-medium">
                        {campaign.buybackProgress}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{
                          width: `${campaign.buybackProgress}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Action */}
          <Link
            href="/create"
            className="block text-center py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-colors"
          >
            + Create New Campaign
          </Link>
        </div>
      )}
    </div>
  );
}
