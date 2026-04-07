"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Building2, Upload, Info } from "lucide-react";

export default function CreateCampaignPage() {
  const { connected } = useWallet();
  const [form, setForm] = useState({
    name: "",
    location: "",
    totalPrice: "",
    description: "",
    buyerContribution: "",
    deadline: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const totalPrice = parseFloat(form.totalPrice) || 0;
  const buyerContribution = parseFloat(form.buyerContribution) || 0;
  const tokensNeeded = totalPrice > 0 ? Math.ceil(totalPrice / 10) : 0;
  const buyerTokens =
    buyerContribution > 0 ? Math.ceil(buyerContribution / 10) : 0;
  const investorTokens = tokensNeeded - buyerTokens;
  const buyerPct = tokensNeeded > 0 ? (buyerTokens / tokensNeeded) * 100 : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Building2 className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">
          Campaign Created!
        </h1>
        <p className="mt-3 text-slate-600">
          Your property campaign has been submitted. In the full version, this
          would deploy an SPL token mint and create a property PDA on Solana
          devnet.
        </p>
        <div className="mt-6 bg-slate-50 rounded-lg p-4 text-left max-w-md mx-auto">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-slate-500">Property</span>
              <span className="font-medium text-slate-900">{form.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Total Tokens</span>
              <span className="font-medium text-slate-900">
                {tokensNeeded.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Your Share</span>
              <span className="font-medium text-slate-900">
                {buyerTokens.toLocaleString()} tokens ({buyerPct.toFixed(0)}%)
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">For Investors</span>
              <span className="font-medium text-slate-900">
                {investorTokens.toLocaleString()} tokens
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">
          Create a Property Campaign
        </h1>
        <p className="mt-2 text-slate-600">
          List your property for tokenized crowdfunding on Solana
        </p>
      </div>

      {/* Info box */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-8 flex gap-3">
        <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800">
          <strong>How it works:</strong> You specify the property price and your
          down payment. The platform creates SPL tokens ($10 each) for the
          remaining amount. Investors buy tokens to crowdfund the purchase.
          Once fully funded, you move in and pay rent to token holders while
          gradually buying back tokens.
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <h2 className="font-semibold text-slate-900">Property Details</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Property Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Modern Downtown Apartment"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Location / Address
            </label>
            <input
              type="text"
              required
              placeholder="e.g., 456 Main St, Austin, TX 78701"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Describe the property..."
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Property Photos
            </label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm text-slate-500">
                Upload photos (stored on IPFS via Pinata)
              </p>
              <p className="text-xs text-slate-400 mt-1">
                PNG, JPG up to 10MB each
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-5">
          <h2 className="font-semibold text-slate-900">Financials</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Total Property Price ($)
              </label>
              <input
                type="number"
                required
                min={10000}
                placeholder="350000"
                value={form.totalPrice}
                onChange={(e) =>
                  setForm({ ...form, totalPrice: e.target.value })
                }
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Your Down Payment ($)
              </label>
              <input
                type="number"
                required
                min={0}
                placeholder="35000"
                value={form.buyerContribution}
                onChange={(e) =>
                  setForm({ ...form, buyerContribution: e.target.value })
                }
                className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Funding Deadline
            </label>
            <input
              type="date"
              required
              value={form.deadline}
              onChange={(e) => setForm({ ...form, deadline: e.target.value })}
              className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Preview */}
          {totalPrice > 0 && (
            <div className="bg-slate-50 rounded-lg p-4 space-y-2">
              <h3 className="text-sm font-semibold text-slate-900">
                Token Preview
              </h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">Total Tokens</span>
                  <span className="font-medium">
                    {tokensNeeded.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Token Price</span>
                  <span className="font-medium">$10 USDC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Your Tokens</span>
                  <span className="font-medium text-blue-600">
                    {buyerTokens.toLocaleString()} ({buyerPct.toFixed(0)}%)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Investor Tokens</span>
                  <span className="font-medium text-green-600">
                    {investorTokens.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {connected ? (
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Creating on Solana...
              </>
            ) : (
              <>
                <Building2 className="h-5 w-5" />
                Create Campaign
              </>
            )}
          </button>
        ) : (
          <div className="text-center py-4 border border-dashed border-slate-300 rounded-lg text-slate-500">
            Connect your wallet to create a campaign
          </div>
        )}
      </form>
    </div>
  );
}
