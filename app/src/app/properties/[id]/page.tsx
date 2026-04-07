"use client";

import { use, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { MapPin, FileText, Users, ArrowLeft, ExternalLink, Wallet, TrendingUp, Shield } from "lucide-react";
import Link from "next/link";
import { MOCK_PROPERTIES, KZT_PER_USD } from "@/lib/constants";
import { calculateProgress, daysRemaining } from "@/lib/utils";

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { connected } = useWallet();
  const [tokenAmount, setTokenAmount] = useState(10);
  const [buying, setBuying] = useState(false);

  const property = MOCK_PROPERTIES.find((p) => p.id === id);
  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white">Квартира не найдена</h1>
        <Link href="/properties" className="text-blue-400 mt-4 inline-block">Назад</Link>
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
    alert(`Демо: ${usdcCost} USDC за ${tokenAmount} токенов. Подключите devnet для реальных транзакций.`);
  };

  const mockInvestors = [
    { wallet: "7xKX...9f2D", tokens: 500 },
    { wallet: "3mNP...kL8w", tokens: 1200 },
    { wallet: "9qRT...vH5j", tokens: 800 },
    { wallet: "5fBZ...wN3m", tokens: 300 },
  ];

  const mockRentHistory = [
    { month: "Март 2026", amount: property.monthlyRent || 650 },
    { month: "Февраль 2026", amount: property.monthlyRent || 650 },
    { month: "Январь 2026", amount: property.monthlyRent || 650 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link href="/properties" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-blue-400 mb-6 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Назад к квартирам
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden h-[420px] relative">
            <img src={property.image} alt={property.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-2 mb-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md ${
                  property.status === "Active" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                }`}>
                  {property.status === "Funding" ? "Сбор средств" : "Активно"}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                  <TrendingUp className="h-3 w-3" /> {property.annualYield}% годовых
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{property.name}</h1>
              <div className="flex items-center gap-1.5 mt-1.5 text-slate-400 text-sm">
                <MapPin className="h-4 w-4" /> {property.location}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="glass rounded-2xl p-6">
            <p className="text-slate-300 leading-relaxed">{property.description}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Стоимость", value: `$${priceUSD.toLocaleString()}`, sub: `${(priceUSD * KZT_PER_USD / 1_000_000).toFixed(1)} млн ₸` },
              { label: "Цена токена", value: "$8", sub: `~${(8 * KZT_PER_USD).toLocaleString()} ₸` },
              { label: "Доходность", value: `${property.annualYield}%`, sub: "годовая", green: true },
              { label: property.status === "Active" ? "Аренда" : "Осталось", value: property.status === "Active" ? `$${property.monthlyRent}/мес` : `${days} дн.` },
            ].map((s) => (
              <div key={s.label} className="glass rounded-xl p-4">
                <div className="text-xs text-slate-500 mb-1">{s.label}</div>
                <div className={`text-lg font-bold ${s.green ? "text-emerald-400" : "text-white"}`}>{s.value}</div>
                {s.sub && <div className="text-xs text-slate-500">{s.sub}</div>}
              </div>
            ))}
          </div>

          {/* Documents */}
          <div className="glass rounded-2xl p-6">
            <h2 className="font-bold text-white mb-4 flex items-center gap-2"><FileText className="h-5 w-5 text-blue-400" /> Документы</h2>
            <div className="space-y-2">
              {["Отчёт оценщика", "Техпаспорт квартиры", "Акт осмотра"].map((doc) => (
                <div key={doc} className="flex items-center justify-between p-3 rounded-xl bg-white/3 hover:bg-white/5 transition-colors">
                  <span className="text-sm text-slate-300">{doc}</span>
                  <a href={`https://ipfs.io/ipfs/${property.ipfsHash}`} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                    IPFS <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Investors */}
          <div className="glass rounded-2xl p-6">
            <h2 className="font-bold text-white mb-4 flex items-center gap-2"><Users className="h-5 w-5 text-purple-400" /> Держатели токенов</h2>
            <div className="space-y-2">
              {mockInvestors.map((inv) => (
                <div key={inv.wallet} className="flex items-center justify-between p-3 rounded-xl bg-white/3">
                  <span className="text-sm font-mono text-slate-400">{inv.wallet}</span>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-white">{inv.tokens.toLocaleString()}</span>
                    <span className="text-xs text-slate-500 ml-2">({((inv.tokens / property.totalTokens) * 100).toFixed(1)}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rent history */}
          {property.status === "Active" && (
            <div className="glass rounded-2xl p-6">
              <h2 className="font-bold text-white mb-4">История выплат аренды</h2>
              <div className="space-y-2">
                {mockRentHistory.map((r) => (
                  <div key={r.month} className="flex items-center justify-between p-3 rounded-xl bg-white/3">
                    <span className="text-sm text-slate-400">{r.month}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-semibold text-white">${r.amount} USDC</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">Выплачено</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <div className="glass rounded-2xl p-6 sticky top-24 space-y-6">
            <h2 className="font-bold text-white text-lg">
              {property.status === "Active" ? "Детали инвестиции" : "Купить токены"}
            </h2>

            {/* Progress */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-white">{progress.toFixed(0)}%</span>
                <span className="text-slate-500">{property.tokensSold.toLocaleString()} / {property.totalTokens.toLocaleString()}</span>
              </div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full rounded-full progress-glow" style={{
                  width: `${progress}%`,
                  background: progress === 100 ? "linear-gradient(90deg, #10b981, #34d399)" : "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                }} />
              </div>
              <div className="mt-2 text-xs text-slate-500">
                ${(property.tokensSold * 8).toLocaleString()} / ${(property.totalTokens * 8).toLocaleString()} USDC
              </div>
            </div>

            {property.status === "Funding" && (
              <>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-2">Количество токенов</label>
                  <input type="number" min={1} max={property.totalTokens - property.tokensSold} value={tokenAmount}
                    onChange={(e) => setTokenAmount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none text-white" />
                </div>

                <div className="rounded-xl bg-white/3 p-4 space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Цена токена</span>
                    <span className="text-slate-300">$8.00 USDC</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Количество</span>
                    <span className="text-slate-300">{tokenAmount.toLocaleString()}</span>
                  </div>
                  <div className="border-t border-white/5 pt-2.5 flex justify-between font-bold">
                    <span className="text-white">Итого</span>
                    <div className="text-right">
                      <div className="text-blue-400">${usdcCost.toLocaleString()} USDC</div>
                      <div className="text-xs text-slate-500 font-normal">~{kztCost.toLocaleString()} ₸</div>
                    </div>
                  </div>
                </div>

                {connected ? (
                  <button onClick={handleBuy} disabled={buying}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2">
                    {buying ? (
                      <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Обработка...</>
                    ) : (
                      <><Wallet className="h-5 w-5" /> Купить {tokenAmount} токенов</>
                    )}
                  </button>
                ) : (
                  <div className="text-center py-4 text-sm text-slate-500 border border-dashed border-white/10 rounded-xl">
                    Подключите кошелёк
                  </div>
                )}
              </>
            )}

            {property.status === "Active" && (
              <div className="space-y-4">
                <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-4 text-center">
                  <div className="text-emerald-400 font-bold">Полностью собрано</div>
                  <div className="text-xs text-emerald-500/70 mt-1">Аренда распределяется ежемесячно</div>
                </div>
                <div className="rounded-xl bg-white/3 p-4 space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-slate-500">Аренда/мес</span><span className="text-white font-semibold">${property.monthlyRent} USDC</span></div>
                  <div className="flex justify-between text-sm"><span className="text-slate-500">На токен/мес</span><span className="text-emerald-400 font-semibold">${((property.monthlyRent || 650) / property.totalTokens).toFixed(4)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-slate-500">Доходность</span><span className="text-emerald-400 font-semibold">{property.annualYield}%</span></div>
                </div>
              </div>
            )}

            {/* Network info */}
            <div className="pt-4 border-t border-white/5 space-y-2">
              {[
                { label: "Сеть", value: "Solana Devnet", dot: true },
                { label: "Стандарт", value: "SPL Token" },
                { label: "Комиссия", value: "~$0.001" },
                { label: "Юр. структура", value: "ТОО в AIFC" },
              ].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">{item.label}</span>
                  <span className="text-slate-400 flex items-center gap-1">
                    {item.dot && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
