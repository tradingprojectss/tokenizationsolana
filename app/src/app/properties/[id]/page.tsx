"use client";

import { use, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  MapPin,
  FileText,
  Users,
  ArrowLeft,
  ExternalLink,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { MOCK_PROPERTIES, KZT_PER_USD } from "@/lib/constants";
import { calculateProgress, daysRemaining } from "@/lib/utils";

export default function PropertyDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { connected } = useWallet();
  const [tokenAmount, setTokenAmount] = useState(10);
  const [buying, setBuying] = useState(false);

  const property = MOCK_PROPERTIES.find((p) => p.id === id);

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Квартира не найдена</h1>
        <Link href="/properties" className="text-blue-600 mt-4 inline-block">
          Назад к квартирам
        </Link>
      </div>
    );
  }

  const progress = calculateProgress(property.tokensSold, property.totalTokens);
  const days = daysRemaining(property.deadline);
  const usdcCost = tokenAmount * 8;
  const kztCost = usdcCost * KZT_PER_USD;
  const priceUSD = property.totalPrice / 1_000_000;

  const handleBuy = async () => {
    if (!connected) return;
    setBuying(true);
    await new Promise((r) => setTimeout(r, 2000));
    setBuying(false);
    alert(
      `Демо: Отправка ${usdcCost} USDC за ${tokenAmount} токенов. Подключите программу на devnet для реальных транзакций.`
    );
  };

  const mockInvestors = [
    { wallet: "7xKX...9f2D", tokens: 500, pct: ((500 / property.totalTokens) * 100).toFixed(1) },
    { wallet: "3mNP...kL8w", tokens: 1200, pct: ((1200 / property.totalTokens) * 100).toFixed(1) },
    { wallet: "9qRT...vH5j", tokens: 800, pct: ((800 / property.totalTokens) * 100).toFixed(1) },
    { wallet: "5fBZ...wN3m", tokens: 300, pct: ((300 / property.totalTokens) * 100).toFixed(1) },
  ];

  const mockRentHistory = [
    { month: "Март 2026", amount: property.monthlyRent || 650, distributed: true },
    { month: "Февраль 2026", amount: property.monthlyRent || 650, distributed: true },
    { month: "Январь 2026", amount: property.monthlyRent || 650, distributed: true },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/properties"
        className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-blue-600 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Назад к квартирам
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl overflow-hidden h-[400px] bg-slate-200">
            <img src={property.image} alt={property.name} className="w-full h-full object-cover" />
          </div>

          <div>
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900">{property.name}</h1>
                <div className="flex items-center gap-1 mt-1 text-slate-500">
                  <MapPin className="h-4 w-4" />
                  {property.location}
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                property.status === "Active" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
              }`}>
                {property.status === "Funding" ? "Сбор средств" : "Активно"}
              </span>
            </div>
            <p className="mt-4 text-slate-600">{property.description}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Стоимость", value: `$${priceUSD.toLocaleString()}`, sub: `${(priceUSD * KZT_PER_USD / 1_000_000).toFixed(1)} млн ₸` },
              { label: "Цена токена", value: "$8 USDC", sub: `~${(8 * KZT_PER_USD).toLocaleString()} ₸` },
              { label: "Доходность", value: `${property.annualYield}%`, green: true, sub: "годовая" },
              { label: property.status === "Active" ? "Статус" : "Осталось", value: property.status === "Active" ? "Собрано" : `${days} дней` },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-lg border border-slate-200 p-4">
                <div className="text-sm text-slate-500">{stat.label}</div>
                <div className={`text-lg font-bold mt-1 ${stat.green ? "text-green-600" : "text-slate-900"}`}>
                  {stat.value}
                </div>
                {stat.sub && <div className="text-xs text-slate-400">{stat.sub}</div>}
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="h-5 w-5" /> Документы
            </h2>
            <div className="space-y-3">
              {["Отчёт оценщика", "Техпаспорт квартиры", "Акт осмотра"].map((doc) => (
                <div key={doc} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                  <span className="text-sm text-slate-700">{doc}</span>
                  <a href={`https://ipfs.io/ipfs/${property.ipfsHash}`} target="_blank" rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1">
                    IPFS <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Users className="h-5 w-5" /> Держатели токенов
            </h2>
            <div className="space-y-2">
              {mockInvestors.map((inv) => (
                <div key={inv.wallet} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                  <span className="text-sm font-mono text-slate-700">{inv.wallet}</span>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-slate-900">{inv.tokens.toLocaleString()} токенов</span>
                    <span className="text-xs text-slate-500 ml-2">({inv.pct}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {property.status === "Active" && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="font-semibold text-slate-900 mb-4">История выплат аренды</h2>
              <div className="space-y-2">
                {mockRentHistory.map((rent) => (
                  <div key={rent.month} className="flex items-center justify-between p-3 rounded-lg bg-slate-50">
                    <span className="text-sm text-slate-700">{rent.month}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-slate-900">${rent.amount} USDC</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">Выплачено</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 sticky top-24">
            <h2 className="font-semibold text-slate-900 text-lg mb-4">
              {property.status === "Active" ? "Детали инвестиции" : "Купить токены"}
            </h2>

            <div className="mb-6">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-slate-900">{progress.toFixed(0)}% собрано</span>
                <span className="text-slate-500">{property.tokensSold.toLocaleString()} / {property.totalTokens.toLocaleString()}</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full" style={{ width: `${progress}%` }} />
              </div>
              <div className="mt-2 text-sm text-slate-500">
                ${(property.tokensSold * 8).toLocaleString()} из ${(property.totalTokens * 8).toLocaleString()} USDC
              </div>
            </div>

            {property.status === "Funding" && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Количество токенов</label>
                  <input type="number" min={1} max={property.totalTokens - property.tokensSold} value={tokenAmount}
                    onChange={(e) => setTokenAmount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-3 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" />
                </div>
                <div className="bg-slate-50 rounded-lg p-4 mb-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Цена токена</span>
                    <span className="text-slate-900">$8.00 USDC</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Количество</span>
                    <span className="text-slate-900">{tokenAmount.toLocaleString()} токенов</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 flex justify-between font-semibold">
                    <span className="text-slate-900">Итого</span>
                    <div className="text-right">
                      <div className="text-blue-600">${usdcCost.toLocaleString()} USDC</div>
                      <div className="text-xs text-slate-500 font-normal">~{kztCost.toLocaleString()} ₸</div>
                    </div>
                  </div>
                </div>
                {connected ? (
                  <button onClick={handleBuy} disabled={buying}
                    className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2">
                    {buying ? (
                      <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Обработка...</>
                    ) : (
                      <><Wallet className="h-5 w-5" /> Купить {tokenAmount} токенов</>
                    )}
                  </button>
                ) : (
                  <div className="text-center py-3 text-sm text-slate-500 border border-dashed border-slate-300 rounded-lg">
                    Подключите кошелёк для инвестирования
                  </div>
                )}
              </>
            )}

            {property.status === "Active" && (
              <div className="space-y-3">
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-green-800 font-semibold">Полностью собрано</div>
                  <div className="text-sm text-green-600 mt-1">Квартира куплена. Аренда распределяется ежемесячно.</div>
                </div>
                <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Аренда/месяц</span>
                    <span className="font-semibold text-slate-900">${property.monthlyRent || 650} USDC</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">На токен/месяц</span>
                    <span className="font-semibold text-green-600">
                      ${((property.monthlyRent || 650) / property.totalTokens).toFixed(4)} USDC
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Годовая доходность</span>
                    <span className="font-semibold text-green-600">{property.annualYield}%</span>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 pt-4 border-t border-slate-200 space-y-1">
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Сеть</span>
                <span className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Solana Devnet
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Стандарт</span><span>SPL Token</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Комиссия</span><span>~$0.001</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Юр. структура</span><span>ТОО в AIFC</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
