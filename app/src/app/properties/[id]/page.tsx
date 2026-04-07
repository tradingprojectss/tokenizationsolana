"use client";

import { use, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  MapPin,
  Clock,
  TrendingUp,
  FileText,
  Users,
  ArrowLeft,
  ExternalLink,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { MOCK_PROPERTIES } from "@/lib/constants";
import { calculateProgress, daysRemaining, shortenAddress } from "@/lib/utils";

export default function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { connected, publicKey } = useWallet();
  const [tokenAmount, setTokenAmount] = useState(10);
  const [buying, setBuying] = useState(false);

  const property = MOCK_PROPERTIES.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900">
          Property not found
        </h1>
        <Link href="/properties" className="text-blue-600 mt-4 inline-block">
          Back to properties
        </Link>
      </div>
    );
  }

  const progress = calculateProgress(property.tokensSold, property.totalTokens);
  const days = daysRemaining(property.deadline);
  const usdcCost = tokenAmount * 10;

  const handleBuy = async () => {
    if (!connected) return;
    setBuying(true);
    // Simulate transaction
    await new Promise((r) => setTimeout(r, 2000));
    setBuying(false);
    alert(
      `Demo: Would send ${usdcCost} USDC to buy ${tokenAmount} tokens on-chain. Connect to devnet with deployed program for real transactions.`
    );
  };

  // Mock investors
  const mockInvestors = [
    { wallet: "7xKX...9f2D", tokens: 500, pct: 1.4 },
    { wallet: "3mNP...kL8w", tokens: 1200, pct: 3.4 },
    { wallet: "9qRT...vH5j", tokens: 2000, pct: 5.7 },
    { wallet: "5fBZ...wN3m", tokens: 800, pct: 2.3 },
  ];

  // Mock rent history
  const mockRentHistory = [
    { month: "Mar 2026", amount: 2800, distributed: true },
    { month: "Feb 2026", amount: 2800, distributed: true },
    { month: "Jan 2026", amount: 2800, distributed: true },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/properties"
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-blue-600 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to properties
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image */}
          <div className="rounded-xl overflow-hidden h-[400px] bg-slate-200">
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info */}
          <div>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  {property.name}
                </h1>
                <div className="flex items-center gap-1 mt-1 text-slate-500">
                  <MapPin className="h-4 w-4" />
                  {property.location}
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  property.status === "Active"
                    ? "bg-green-100 text-green-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {property.status}
              </span>
            </div>
            <p className="mt-4 text-slate-600">{property.description}</p>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                label: "Property Value",
                value: `$${(property.totalPrice / 1_000_000).toLocaleString()}`,
              },
              {
                label: "Token Price",
                value: "$10",
              },
              {
                label: "Est. Annual Yield",
                value: `${property.annualYield}%`,
                icon: TrendingUp,
                green: true,
              },
              {
                label: property.status === "Active" ? "Status" : "Time Left",
                value:
                  property.status === "Active"
                    ? "Fully Funded"
                    : `${days} days`,
                icon: Clock,
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-lg border border-slate-200 p-4"
              >
                <div className="text-sm text-slate-500">{stat.label}</div>
                <div
                  className={`text-lg font-bold mt-1 ${
                    stat.green ? "text-green-600" : "text-slate-900"
                  }`}
                >
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Documents */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Property Documents
            </h2>
            <div className="space-y-3">
              {[
                "Property Appraisal Report",
                "Title Deed",
                "Inspection Report",
              ].map((doc) => (
                <div
                  key={doc}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50"
                >
                  <span className="text-sm text-slate-700">{doc}</span>
                  <a
                    href={`https://ipfs.io/ipfs/${property.ipfsHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                  >
                    View on IPFS
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Investors */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Users className="h-5 w-5" />
              Token Holders
            </h2>
            <div className="space-y-2">
              {mockInvestors.map((inv) => (
                <div
                  key={inv.wallet}
                  className="flex items-center justify-between p-3 rounded-lg bg-slate-50"
                >
                  <span className="text-sm font-mono text-slate-700">
                    {inv.wallet}
                  </span>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-slate-900">
                      {inv.tokens.toLocaleString()} tokens
                    </span>
                    <span className="text-xs text-slate-500 ml-2">
                      ({inv.pct}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rent History */}
          {property.status === "Active" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="font-semibold text-slate-900 mb-4">
                Rent Distribution History
              </h2>
              <div className="space-y-2">
                {mockRentHistory.map((rent) => (
                  <div
                    key={rent.month}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-50"
                  >
                    <span className="text-sm text-slate-700">{rent.month}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-slate-900">
                        ${rent.amount.toLocaleString()} USDC
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                        Distributed
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Buy Panel */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-24">
            <h2 className="font-semibold text-slate-900 text-lg mb-4">
              {property.status === "Active"
                ? "Investment Details"
                : "Buy Tokens"}
            </h2>

            {/* Progress */}
            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-slate-900">
                  {progress.toFixed(0)}% funded
                </span>
                <span className="text-slate-500">
                  {property.tokensSold.toLocaleString()} /{" "}
                  {property.totalTokens.toLocaleString()}
                </span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="mt-2 text-sm text-slate-500">
                $
                {(
                  (property.tokensSold * 10_000_000) /
                  1_000_000
                ).toLocaleString()}{" "}
                raised of $
                {(
                  (property.totalTokens * 10_000_000) /
                  1_000_000
                ).toLocaleString()}
              </div>
            </div>

            {property.status === "Funding" && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    Number of tokens
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={property.totalTokens - property.tokensSold}
                    value={tokenAmount}
                    onChange={(e) =>
                      setTokenAmount(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>

                <div className="bg-slate-50 rounded-lg p-4 mb-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Token price</span>
                    <span className="text-slate-900">$10.00 USDC</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Quantity</span>
                    <span className="text-slate-900">
                      {tokenAmount.toLocaleString()} tokens
                    </span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 flex justify-between font-semibold">
                    <span className="text-slate-900">Total</span>
                    <span className="text-blue-600">
                      ${usdcCost.toLocaleString()} USDC
                    </span>
                  </div>
                </div>

                {connected ? (
                  <button
                    onClick={handleBuy}
                    disabled={buying}
                    className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                  >
                    {buying ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Wallet className="h-5 w-5" />
                        Buy {tokenAmount} Tokens
                      </>
                    )}
                  </button>
                ) : (
                  <div className="text-center py-3 text-sm text-slate-500 border border-dashed border-slate-300 rounded-lg">
                    Connect your wallet to invest
                  </div>
                )}
              </>
            )}

            {property.status === "Active" && (
              <div className="space-y-3">
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-green-800 font-semibold">
                    Fully Funded
                  </div>
                  <div className="text-sm text-green-600 mt-1">
                    Property has been purchased. Rent is being distributed
                    monthly.
                  </div>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Monthly Rent</span>
                    <span className="font-semibold text-slate-900">
                      $2,800 USDC
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Per Token / Month</span>
                    <span className="font-semibold text-green-600">
                      $0.054 USDC
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Annual Yield</span>
                    <span className="font-semibold text-green-600">
                      {property.annualYield}%
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Network info */}
            <div className="mt-4 pt-4 border-t border-slate-200 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Network</span>
                <span className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  Solana Devnet
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Token Standard</span>
                <span>SPL Token</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Transaction Fee</span>
                <span>~$0.001</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
