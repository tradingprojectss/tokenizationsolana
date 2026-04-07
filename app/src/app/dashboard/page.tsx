"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Wallet, TrendingUp, Building2, DollarSign, ArrowDownLeft } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { connected, publicKey } = useWallet();
  const [activeTab, setActiveTab] = useState<"investor" | "buyer">("investor");

  if (!connected) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-28 text-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-6">
          <Wallet className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold text-white">Подключите кошелёк</h1>
        <p className="mt-3 text-slate-400 max-w-md mx-auto">
          Подключите Phantom для просмотра портфолио, доходов от аренды и кампаний.
        </p>
      </div>
    );
  }

  const investorPortfolio = [
    { property: "1-комн., Бостандыкский район", tokens: 150, value: 1200, rentEarned: 24.3, yield: 8.5, id: "prop1" },
    { property: "Студия, Назарбаев Университет", tokens: 300, value: 2400, rentEarned: 48.6, yield: 9.5, id: "prop3" },
  ];
  const buyerCampaigns = [
    { property: "2-комн., Достык Плаза", totalTokens: 15000, tokensSold: 3750, buyerTokens: 3000, rentPaid: 5400, buybackProgress: 20, id: "prop2" },
  ];

  const totalValue = investorPortfolio.reduce((s, p) => s + p.value, 0);
  const totalRent = investorPortfolio.reduce((s, p) => s + p.rentEarned, 0);

  const rentHistory = [
    { date: "15 Мар 2026", property: "1-комн., Бостандыкский район", amount: 8.1 },
    { date: "15 Мар 2026", property: "Студия, Назарбаев Университет", amount: 16.2 },
    { date: "15 Фев 2026", property: "1-комн., Бостандыкский район", amount: 8.1 },
    { date: "15 Фев 2026", property: "Студия, Назарбаев Университет", amount: 16.2 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Портфолио</h1>
          <p className="mt-1 text-sm text-slate-500 font-mono">
            {publicKey?.toBase58().slice(0, 8)}...{publicKey?.toBase58().slice(-8)}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl glass w-fit mb-8">
        {(["investor", "buyer"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20" : "text-slate-400 hover:text-white"
            }`}>
            {tab === "investor" ? "Инвестор" : "Покупатель"}
          </button>
        ))}
      </div>

      {activeTab === "investor" && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: DollarSign, label: "Стоимость портфолио", value: `$${totalValue.toLocaleString()}`, sub: `${investorPortfolio.length} квартиры`, color: "from-blue-500 to-cyan-500" },
              { icon: TrendingUp, label: "Доход от аренды", value: `$${totalRent.toFixed(2)}`, sub: "USDC получено", color: "from-emerald-500 to-teal-500", valueColor: "text-emerald-400" },
              { icon: Building2, label: "Всего токенов", value: investorPortfolio.reduce((s, p) => s + p.tokens, 0).toLocaleString(), sub: "во всех квартирах", color: "from-purple-500 to-pink-500" },
            ].map((stat) => (
              <div key={stat.label} className="glass rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm text-slate-500">{stat.label}</span>
                </div>
                <div className={`text-2xl font-extrabold ${stat.valueColor || "text-white"}`}>{stat.value}</div>
                <div className="text-xs text-slate-500 mt-1">{stat.sub}</div>
              </div>
            ))}
          </div>

          {/* Holdings */}
          <div className="glass rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/5"><h2 className="font-bold text-white">Мои вложения</h2></div>
            <div className="divide-y divide-white/5">
              {investorPortfolio.map((h) => (
                <Link key={h.id} href={`/properties/${h.id}`} className="flex items-center justify-between p-6 hover:bg-white/3 transition-colors">
                  <div>
                    <div className="font-medium text-white">{h.property}</div>
                    <div className="text-sm text-slate-500 mt-0.5">{h.tokens.toLocaleString()} токенов</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white">${h.value.toLocaleString()}</div>
                    <div className="text-sm text-emerald-400">{h.yield}% &middot; +${h.rentEarned}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Rent history */}
          <div className="glass rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/5"><h2 className="font-bold text-white">История выплат</h2></div>
            <div className="divide-y divide-white/5">
              {rentHistory.map((tx, i) => (
                <div key={i} className="flex items-center justify-between p-5">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <ArrowDownLeft className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{tx.property}</div>
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
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { label: "Мои кампании", value: buyerCampaigns.length.toString() },
              { label: "Аренда выплачено", value: `$${buyerCampaigns.reduce((s, c) => s + c.rentPaid, 0).toLocaleString()}` },
              { label: "Прогресс выкупа", value: `${buyerCampaigns[0]?.buybackProgress || 0}%`, color: "text-blue-400" },
            ].map((s) => (
              <div key={s.label} className="glass rounded-2xl p-6">
                <div className="text-sm text-slate-500 mb-2">{s.label}</div>
                <div className={`text-2xl font-extrabold ${s.color || "text-white"}`}>{s.value}</div>
              </div>
            ))}
          </div>

          <div className="glass rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-white/5"><h2 className="font-bold text-white">Мои кампании</h2></div>
            {buyerCampaigns.map((c) => (
              <Link key={c.id} href={`/properties/${c.id}`} className="block p-6 hover:bg-white/3 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-medium text-white">{c.property}</div>
                    <div className="text-sm text-slate-500 mt-0.5">{c.tokensSold.toLocaleString()} / {c.totalTokens.toLocaleString()}</div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">Сбор</span>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Сбор средств", pct: (c.tokensSold / c.totalTokens) * 100, color: "from-blue-500 to-purple-500" },
                    { label: "Выкуп токенов", pct: c.buybackProgress, color: "from-emerald-500 to-teal-500" },
                  ].map((bar) => (
                    <div key={bar.label}>
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-slate-500">{bar.label}</span>
                        <span className="text-white font-medium">{bar.pct.toFixed(0)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${bar.color} rounded-full`} style={{ width: `${bar.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          <Link href="/create" className="block text-center py-5 border border-dashed border-white/10 rounded-2xl text-slate-500 hover:border-blue-500/30 hover:text-blue-400 transition-all">
            + Создать новую кампанию
          </Link>
        </div>
      )}
    </div>
  );
}
