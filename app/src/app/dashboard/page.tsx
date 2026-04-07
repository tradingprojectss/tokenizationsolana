"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Wallet, TrendingUp, Building2, DollarSign, ArrowDownLeft } from "lucide-react";
import Link from "next/link";
import { useLang } from "@/lib/LangContext";

export default function DashboardPage() {
  const { connected, publicKey } = useWallet();
  const { t } = useLang();
  const [activeTab, setActiveTab] = useState<"investor" | "buyer">("investor");

  if (!connected) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 sm:py-28 text-center">
        <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-2xl bg-blue-600 flex items-center justify-center mx-auto mb-6">
          <Wallet className="h-8 sm:h-10 w-8 sm:w-10 text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">{t("dash.connect")}</h1>
        <p className="mt-3 text-slate-400 max-w-md mx-auto font-medium text-sm sm:text-base">{t("dash.connect_sub")}</p>
      </div>
    );
  }

  const investorPortfolio = [
    { property: "2-комн., 63 м², ЖК Seifullin", tokens: 150, value: 1200, rentEarned: 24.3, yield: 7.6, id: "prop1" },
    { property: "1-комн., 44.5 м², ЖК Namys", tokens: 300, value: 2400, rentEarned: 48.6, yield: 9.0, id: "prop2" },
  ];
  const buyerCampaigns = [
    { property: "1-комн., 54 м², мкр. Алтын Орда", totalTokens: 5825, tokensSold: 2330, buyerTokens: 1165, rentPaid: 1800, buybackProgress: 15, id: "prop3" },
  ];
  const totalValue = investorPortfolio.reduce((s, p) => s + p.value, 0);
  const totalRent = investorPortfolio.reduce((s, p) => s + p.rentEarned, 0);
  const rentHistory = [
    { date: "15 Мар 2026", property: "2-комн., ЖК Seifullin", amount: 7.6 },
    { date: "15 Мар 2026", property: "1-комн., ЖК Namys", amount: 18.1 },
    { date: "15 Фев 2026", property: "2-комн., ЖК Seifullin", amount: 7.6 },
    { date: "15 Фев 2026", property: "1-комн., ЖК Namys", amount: 18.1 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">{t("dash.title")}</h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 font-mono">{publicKey?.toBase58().slice(0, 8)}...{publicKey?.toBase58().slice(-8)}</p>
        </div>
      </div>

      <div className="flex gap-1 p-1 rounded-xl glass w-fit mb-6 sm:mb-8">
        {(["investor", "buyer"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === tab ? "bg-blue-600 text-white" : "text-slate-400 hover:text-white"}`}>
            {tab === "investor" ? t("dash.investor") : t("dash.buyer")}
          </button>
        ))}
      </div>

      {activeTab === "investor" && (
        <div className="space-y-5 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: DollarSign, label: t("dash.value"), value: `$${totalValue.toLocaleString()}`, sub: `${investorPortfolio.length} ${t("dash.apartments")}`, color: "bg-blue-600" },
              { icon: TrendingUp, label: t("dash.rent_income"), value: `$${totalRent.toFixed(2)}`, sub: t("dash.usdc_received"), color: "bg-emerald-600", valueColor: "text-emerald-400" },
              { icon: Building2, label: t("dash.total_tokens"), value: investorPortfolio.reduce((s, p) => s + p.tokens, 0).toLocaleString(), sub: t("dash.across_all"), color: "bg-violet-600" },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-2xl p-5 sm:p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-8 h-8 rounded-lg ${stat.color} flex items-center justify-center`}><stat.icon className="h-4 w-4 text-white" /></div>
                  <span className="text-sm text-slate-500 font-semibold">{stat.label}</span>
                </div>
                <div className={`text-xl sm:text-2xl font-black ${stat.valueColor || "text-white"}`}>{stat.value}</div>
                <div className="text-xs text-slate-500 mt-1">{stat.sub}</div>
              </div>
            ))}
          </div>

          <div className="glass rounded-2xl overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-white/5"><h2 className="font-bold text-white">{t("dash.holdings")}</h2></div>
            <div className="divide-y divide-white/5">
              {investorPortfolio.map((h) => (
                <Link key={h.id} href={`/properties/${h.id}`} className="flex items-center justify-between p-4 sm:p-6 hover:bg-white/3 transition-colors">
                  <div>
                    <div className="font-bold text-white text-sm sm:text-base">{h.property}</div>
                    <div className="text-xs sm:text-sm text-slate-500 mt-0.5">{h.tokens.toLocaleString()} {t("detail.tokens")}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white">${h.value.toLocaleString()}</div>
                    <div className="text-xs sm:text-sm text-emerald-400 font-bold">{h.yield}% &middot; +${h.rentEarned}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-white/5"><h2 className="font-bold text-white">{t("dash.history")}</h2></div>
            <div className="divide-y divide-white/5">
              {rentHistory.map((tx, i) => (
                <div key={i} className="flex items-center justify-between p-4 sm:p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center"><ArrowDownLeft className="h-4 w-4 text-emerald-400" /></div>
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-white">{tx.property}</div>
                      <div className="text-xs text-slate-500">{tx.date}</div>
                    </div>
                  </div>
                  <span className="font-bold text-emerald-400">+${tx.amount.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "buyer" && (
        <div className="space-y-5 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: t("dash.campaigns"), value: buyerCampaigns.length.toString() },
              { label: t("dash.rent_paid"), value: `$${buyerCampaigns.reduce((s, c) => s + c.rentPaid, 0).toLocaleString()}` },
              { label: t("dash.buyback"), value: `${buyerCampaigns[0]?.buybackProgress || 0}%`, color: "text-blue-400" },
            ].map((s) => (
              <div key={s.label} className="glass rounded-2xl p-5 sm:p-6">
                <div className="text-sm text-slate-500 mb-2 font-semibold">{s.label}</div>
                <div className={`text-xl sm:text-2xl font-black ${s.color || "text-white"}`}>{s.value}</div>
              </div>
            ))}
          </div>

          <div className="glass rounded-2xl overflow-hidden">
            <div className="p-5 sm:p-6 border-b border-white/5"><h2 className="font-bold text-white">{t("dash.campaigns")}</h2></div>
            {buyerCampaigns.map((c) => (
              <Link key={c.id} href={`/properties/${c.id}`} className="block p-5 sm:p-6 hover:bg-white/3 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-bold text-white">{c.property}</div>
                    <div className="text-sm text-slate-500 mt-0.5">{c.tokensSold.toLocaleString()} / {c.totalTokens.toLocaleString()}</div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">{t("common.funding")}</span>
                </div>
                <div className="space-y-3">
                  {[
                    { label: t("dash.fund_progress"), pct: (c.tokensSold / c.totalTokens) * 100, color: "bg-blue-600" },
                    { label: t("dash.buyback_progress"), pct: c.buybackProgress, color: "bg-emerald-500" },
                  ].map((bar) => (
                    <div key={bar.label}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-slate-500 font-medium">{bar.label}</span>
                        <span className="text-white font-bold">{bar.pct.toFixed(0)}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full ${bar.color} rounded-full`} style={{ width: `${bar.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          <Link href="/create" className="block text-center py-4 sm:py-5 border border-dashed border-white/10 rounded-2xl text-slate-500 hover:border-blue-500/30 hover:text-blue-400 transition-all font-bold">
            {t("dash.new_campaign")}
          </Link>
        </div>
      )}
    </div>
  );
}
