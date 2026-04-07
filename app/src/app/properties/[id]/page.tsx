"use client";

import { use, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { MapPin, FileText, Users, ArrowLeft, ExternalLink, Wallet, TrendingUp, Home, Calendar, Layers, Ruler, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { MOCK_PROPERTIES, KZT_PER_USD } from "@/lib/constants";
import { calculateProgress, daysRemaining } from "@/lib/utils";
import { useLang } from "@/lib/LangContext";
import { useCampaigns } from "@/lib/campaignStore";

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { connected } = useWallet();
  const { t } = useLang();
  const { campaigns } = useCampaigns();
  const [tokenAmount, setTokenAmount] = useState(10);
  const [buying, setBuying] = useState(false);
  const [bought, setBought] = useState(false);

  const property = MOCK_PROPERTIES.find((p) => p.id === id) ?? campaigns.find((c) => c.id === id);
  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white">{t("detail.not_found")}</h1>
        <Link href="/properties" className="text-blue-400 mt-4 inline-block font-semibold">{t("detail.back")}</Link>
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
    await new Promise((r) => setTimeout(r, 2500));
    setBuying(false);
    setBought(true);
    setTimeout(() => setBought(false), 5000);
  };

  const mockInvestors = [
    { wallet: "7xKX...9f2D", tokens: 500 }, { wallet: "3mNP...kL8w", tokens: 1200 },
    { wallet: "9qRT...vH5j", tokens: 800 }, { wallet: "5fBZ...wN3m", tokens: 300 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <Link href="/properties" className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-blue-400 mb-5 sm:mb-6 transition-colors font-semibold">
        <ArrowLeft className="h-4 w-4" /> {t("detail.back")}
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 space-y-5 sm:space-y-6">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden h-56 sm:h-[420px] relative">
            <img src={property.image} alt={property.name} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-md ${property.status === "Active" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-blue-500/20 text-blue-300 border border-blue-500/30"}`}>
                  {property.status === "Funding" ? t("common.funding") : t("common.active_status")}
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-black/40 text-emerald-300 border border-white/10 flex items-center gap-1 backdrop-blur-md">
                  <TrendingUp className="h-3 w-3" /> {property.annualYield}% {t("detail.yearly")}
                </span>
              </div>
              <h1 className="text-xl sm:text-3xl font-black text-white">{property.name}</h1>
              <div className="flex items-center gap-1.5 mt-1 text-white/80 text-sm font-medium">
                <MapPin className="h-4 w-4" /> {property.location}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="glass rounded-2xl p-5 sm:p-6">
            <p className="text-slate-300 leading-relaxed font-medium text-sm sm:text-base">{property.description}</p>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: Ruler, label: t("detail.area"), value: `${property.area} м²` },
              { icon: Layers, label: t("detail.floor"), value: property.floor || "—" },
              { icon: Calendar, label: t("detail.year"), value: property.buildYear?.toString() || "—" },
              { icon: Home, label: t("detail.type"), value: property.houseType || "—" },
            ].map((s) => (
              <div key={s.label} className="glass rounded-xl p-3 sm:p-4 flex items-center gap-3">
                <s.icon className="h-4 w-4 text-slate-500 flex-shrink-0" />
                <div>
                  <div className="text-xs text-slate-500">{s.label}</div>
                  <div className="text-sm font-bold text-white">{s.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Financial */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: t("detail.cost"), value: `$${priceUSD.toLocaleString()}`, sub: `${property.priceKZT ? (property.priceKZT / 1_000_000).toFixed(1) : (priceUSD * KZT_PER_USD / 1_000_000).toFixed(1)} млн ₸` },
              { label: t("detail.price"), value: "$8", sub: `~${(8 * KZT_PER_USD).toLocaleString()} ₸` },
              { label: t("detail.yield"), value: `${property.annualYield}%`, sub: t("detail.annual"), green: true },
              { label: property.status === "Active" ? t("detail.rent") : t("detail.remaining"), value: property.status === "Active" ? `$${property.monthlyRent}/мес` : `${days} ${t("props.days")}` },
            ].map((s) => (
              <div key={s.label} className="glass rounded-xl p-3 sm:p-4">
                <div className="text-xs text-slate-500 mb-1">{s.label}</div>
                <div className={`text-base sm:text-lg font-black ${s.green ? "text-emerald-400" : "text-white"}`}>{s.value}</div>
                {s.sub && <div className="text-xs text-slate-500">{s.sub}</div>}
              </div>
            ))}
          </div>

          {/* Krisha */}
          {property.krishaUrl && (
            <a href={property.krishaUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-4 rounded-2xl glass border border-blue-500/20 hover:border-blue-500/40 transition-colors group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                  <ExternalLink className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{t("detail.krisha")}</div>
                  <div className="text-xs text-slate-500 font-medium">{t("detail.krisha_sub")}</div>
                </div>
              </div>
              <span className="text-xs text-blue-400 font-bold hidden sm:block">{t("common.open")}</span>
            </a>
          )}

          {/* Documents */}
          <div className="glass rounded-2xl p-5 sm:p-6">
            <h2 className="font-bold text-white mb-4 flex items-center gap-2"><FileText className="h-5 w-5 text-blue-400" /> {t("detail.docs")}</h2>
            <div className="space-y-2">
              {["Отчёт оценщика", "Техпаспорт", "Акт осмотра"].map((doc) => (
                <div key={doc} className="flex items-center justify-between p-3 rounded-xl bg-white/3 hover:bg-white/5 transition-colors">
                  <span className="text-sm text-slate-300 font-medium">{doc}</span>
                  <a href={`https://ipfs.io/ipfs/${property.ipfsHash}`} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 font-bold flex items-center gap-1">IPFS <ExternalLink className="h-3 w-3" /></a>
                </div>
              ))}
            </div>
          </div>

          {/* Investors */}
          <div className="glass rounded-2xl p-5 sm:p-6">
            <h2 className="font-bold text-white mb-4 flex items-center gap-2"><Users className="h-5 w-5 text-purple-400" /> {t("detail.holders")}</h2>
            <div className="space-y-2">
              {mockInvestors.map((inv) => (
                <div key={inv.wallet} className="flex items-center justify-between p-3 rounded-xl bg-white/3">
                  <span className="text-sm font-mono text-slate-400">{inv.wallet}</span>
                  <div className="text-right">
                    <span className="text-sm font-bold text-white">{inv.tokens.toLocaleString()}</span>
                    <span className="text-xs text-slate-500 ml-2">({((inv.tokens / property.totalTokens) * 100).toFixed(1)}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rent history */}
          {property.status === "Active" && (
            <div className="glass rounded-2xl p-5 sm:p-6">
              <h2 className="font-bold text-white mb-4">{t("detail.rent_history")}</h2>
              <div className="space-y-2">
                {[{ month: "Март 2026", amount: property.monthlyRent || 350 }, { month: "Февраль 2026", amount: property.monthlyRent || 350 }, { month: "Январь 2026", amount: property.monthlyRent || 350 }].map((r) => (
                  <div key={r.month} className="flex items-center justify-between p-3 rounded-xl bg-white/3">
                    <span className="text-sm text-slate-400 font-medium">{r.month}</span>
                    <div className="flex items-center gap-2 sm:gap-3">
                      <span className="text-sm font-bold text-white">${r.amount} USDC</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">{t("detail.paid")}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div>
          <div className="glass rounded-2xl p-5 sm:p-6 lg:sticky lg:top-24 space-y-5 sm:space-y-6">
            <h2 className="font-bold text-white text-lg">{property.status === "Active" ? t("detail.investment") : t("detail.buy_tokens")}</h2>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-bold text-white">{progress.toFixed(0)}%</span>
                <span className="text-slate-500">{property.tokensSold.toLocaleString()} / {property.totalTokens.toLocaleString()}</span>
              </div>
              <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${progress}%`, background: progress === 100 ? "#10b981" : "#3b82f6" }} />
              </div>
              <div className="mt-2 text-xs text-slate-500">${(property.tokensSold * 8).toLocaleString()} / ${(property.totalTokens * 8).toLocaleString()} USDC</div>
            </div>

            {property.status === "Funding" && (
              <>
                <div>
                  <label className="block text-sm font-bold text-slate-400 mb-2">{t("detail.amount")}</label>
                  <input type="number" min={1} max={property.totalTokens - property.tokensSold} value={tokenAmount}
                    onChange={(e) => setTokenAmount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none text-white font-bold" />
                </div>
                <div className="rounded-xl bg-white/3 p-4 space-y-2.5">
                  <div className="flex justify-between text-sm"><span className="text-slate-500">{t("detail.price")}</span><span className="text-slate-300 font-semibold">$8.00 USDC</span></div>
                  <div className="flex justify-between text-sm"><span className="text-slate-500">{t("detail.quantity")}</span><span className="text-slate-300 font-semibold">{tokenAmount.toLocaleString()}</span></div>
                  <div className="border-t border-white/5 pt-2.5 flex justify-between font-bold">
                    <span className="text-white">{t("detail.total")}</span>
                    <div className="text-right">
                      <div className="text-blue-400">${usdcCost.toLocaleString()} USDC</div>
                      <div className="text-xs text-slate-500 font-normal">~{kztCost.toLocaleString()} ₸</div>
                    </div>
                  </div>
                </div>
                {bought ? (
                  <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-center space-y-2">
                    <CheckCircle2 className="h-8 w-8 text-emerald-400 mx-auto" />
                    <div className="text-emerald-400 font-bold text-sm">Транзакция подтверждена!</div>
                    <div className="text-xs text-slate-500">{tokenAmount} токенов · ${usdcCost} USDC</div>
                    <a href={`https://explorer.solana.com/address/HtZ7iRQVbKKJHCcd4VajdHMf42NSuoW7g7AyoQWBQ68a?cluster=devnet`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 font-bold">
                      Solana Explorer <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                ) : connected ? (
                  <button onClick={handleBuy} disabled={buying}
                    className="w-full py-3.5 px-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2">
                    {buying ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>{t("detail.processing")}</span>
                      </>
                    ) : (
                      <>
                        <Wallet className="h-5 w-5" />
                        {t("detail.buy_btn")} {tokenAmount} {t("detail.tokens")}
                      </>
                    )}
                  </button>
                ) : (
                  <div className="text-center py-4 text-sm text-slate-500 border border-dashed border-white/10 rounded-xl font-medium">{t("detail.connect")}</div>
                )}
              </>
            )}

            {property.status === "Active" && (
              <div className="space-y-4">
                <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-4 text-center">
                  <div className="text-emerald-400 font-bold">{t("detail.fully_funded")}</div>
                  <div className="text-xs text-emerald-500/70 mt-1">{t("detail.rent_monthly")}</div>
                </div>
                <div className="rounded-xl bg-white/3 p-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span className="text-slate-500">{t("detail.rent_mo")}</span><span className="text-white font-bold">${property.monthlyRent} USDC</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">{t("detail.rent_per_token")}</span><span className="text-emerald-400 font-bold">${((property.monthlyRent || 350) / property.totalTokens).toFixed(4)}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">{t("detail.yield")}</span><span className="text-emerald-400 font-bold">{property.annualYield}%</span></div>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-white/5 space-y-2">
              {[{ label: "Сеть", value: "Solana Devnet", dot: true }, { label: "Стандарт", value: "SPL Token" }, { label: "Комиссия", value: "~$0.001" }, { label: "Юр. структура", value: "ТОО в AIFC" }].map((item) => (
                <div key={item.label} className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">{item.label}</span>
                  <span className="text-slate-400 flex items-center gap-1 font-semibold">{item.dot && <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
