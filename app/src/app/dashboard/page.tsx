"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  Wallet,
  TrendingUp,
  Building2,
  DollarSign,
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
        <h1 className="text-2xl font-bold text-slate-900">Подключите кошелёк</h1>
        <p className="mt-3 text-slate-600">
          Подключите Phantom кошелёк для просмотра портфолио, доходов от аренды и кампаний.
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
    { date: "15 Янв 2026", property: "1-комн., Бостандыкский район", amount: 8.1 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Панель управления</h1>
          <p className="mt-1 text-sm text-slate-500 font-mono">
            {publicKey?.toBase58().slice(0, 8)}...{publicKey?.toBase58().slice(-8)}
          </p>
        </div>
      </div>

      <div className="flex gap-1 bg-slate-100 rounded-lg p-1 w-fit mb-8">
        {(["investor", "buyer"] as const).map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}>
            {tab === "investor" ? "Инвестор" : "Покупатель"}
          </button>
        ))}
      </div>

      {activeTab === "investor" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-1"><DollarSign className="h-4 w-4" />Стоимость портфолио</div>
              <div className="text-2xl font-bold text-slate-900">${totalValue.toLocaleString()}</div>
              <div className="text-sm text-green-600 mt-1">{investorPortfolio.length} квартиры</div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-1"><TrendingUp className="h-4 w-4" />Доход от аренды</div>
              <div className="text-2xl font-bold text-green-600">${totalRent.toFixed(2)}</div>
              <div className="text-sm text-slate-500 mt-1">USDC получено</div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-1"><Building2 className="h-4 w-4" />Всего токенов</div>
              <div className="text-2xl font-bold text-slate-900">{investorPortfolio.reduce((s, p) => s + p.tokens, 0).toLocaleString()}</div>
              <div className="text-sm text-slate-500 mt-1">Во всех квартирах</div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200">
            <div className="p-6 border-b border-slate-200"><h2 className="font-semibold text-slate-900">Мои вложения</h2></div>
            <div className="divide-y divide-slate-200">
              {investorPortfolio.map((h) => (
                <Link key={h.id} href={`/properties/${h.id}`} className="flex items-center justify-between p-6 hover:bg-slate-50 transition-colors">
                  <div>
                    <div className="font-medium text-slate-900">{h.property}</div>
                    <div className="text-sm text-slate-500 mt-0.5">{h.tokens.toLocaleString()} токенов</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-slate-900">${h.value.toLocaleString()}</div>
                    <div className="text-sm text-green-600">{h.yield}% &middot; ${h.rentEarned} получено</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200">
            <div className="p-6 border-b border-slate-200"><h2 className="font-semibold text-slate-900">История выплат</h2></div>
            <div className="divide-y divide-slate-200">
              {rentHistory.map((tx, i) => (
                <div key={i} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                      <ArrowDownLeft className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-900">{tx.property}</div>
                      <div className="text-xs text-slate-500">{tx.date}</div>
                    </div>
                  </div>
                  <span className="font-medium text-green-600">+${tx.amount.toFixed(2)} USDC</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "buyer" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="text-sm text-slate-500 mb-1">Мои кампании</div>
              <div className="text-2xl font-bold text-slate-900">{buyerCampaigns.length}</div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="text-sm text-slate-500 mb-1">Аренда выплачено</div>
              <div className="text-2xl font-bold text-slate-900">${buyerCampaigns.reduce((s, c) => s + c.rentPaid, 0).toLocaleString()}</div>
            </div>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="text-sm text-slate-500 mb-1">Прогресс выкупа</div>
              <div className="text-2xl font-bold text-blue-600">{buyerCampaigns[0]?.buybackProgress || 0}%</div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200">
            <div className="p-6 border-b border-slate-200"><h2 className="font-semibold text-slate-900">Мои кампании</h2></div>
            {buyerCampaigns.map((c) => (
              <Link key={c.id} href={`/properties/${c.id}`} className="block p-6 hover:bg-slate-50 transition-colors">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-medium text-slate-900">{c.property}</div>
                    <div className="text-sm text-slate-500 mt-0.5">Сбор: {c.tokensSold.toLocaleString()} / {c.totalTokens.toLocaleString()}</div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Сбор средств</span>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Сбор средств</span>
                      <span className="font-medium">{((c.tokensSold / c.totalTokens) * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(c.tokensSold / c.totalTokens) * 100}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-600">Выкуп токенов</span>
                      <span className="font-medium">{c.buybackProgress}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${c.buybackProgress}%` }} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Link href="/create" className="block text-center py-4 border-2 border-dashed border-slate-300 rounded-xl text-slate-600 hover:border-blue-400 hover:text-blue-600 transition-colors">
            + Создать новую кампанию
          </Link>
        </div>
      )}
    </div>
  );
}
