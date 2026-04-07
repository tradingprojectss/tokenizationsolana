"use client";

import Link from "next/link";
import { Building2, ArrowRight, Shield, Zap, TrendingUp, Users, DollarSign, Landmark, ChevronRight, BadgeCheck, Calculator, Sparkles, CheckCircle2 } from "lucide-react";
import { MortgageCalculator } from "@/components/MortgageCalculator";
import { useLang } from "@/lib/LangContext";

export default function HomePage() {
  const { t } = useLang();
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[80vh] sm:min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-20 left-10 w-72 sm:w-[500px] h-72 sm:h-[500px] bg-blue-600/8 rounded-full blur-[100px] animate-glow-pulse" />
        <div className="absolute bottom-10 right-10 w-72 sm:w-[400px] h-72 sm:h-[400px] bg-purple-600/8 rounded-full blur-[100px] animate-glow-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-600/3 rounded-full blur-[120px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl">
            {/* Live badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass border border-blue-500/20 text-xs sm:text-sm mb-8 animate-slide-up">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-semibold">{t("hero.badge.kase")}</span>
              <span className="text-slate-600">|</span>
              <span className="text-emerald-400 font-semibold">{t("hero.badge.tenge")}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <span className="text-white">{t("hero.title1")}</span>
              <br />
              <span className="text-gradient">{t("hero.title2")}</span>
            </h1>

            <p className="mt-5 sm:mt-6 text-base sm:text-xl text-slate-400 max-w-xl leading-relaxed font-medium animate-slide-up" style={{ animationDelay: "0.2s" }}>
              {t("hero.subtitle")}
            </p>

            {/* Key stats with animated feel */}
            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl glass border border-blue-500/10 hover:border-blue-500/30 transition-colors">
                <div className="text-2xl sm:text-3xl font-black text-gradient">$131K</div>
                <div className="text-xs text-slate-400 leading-tight font-semibold">{t("hero.savings")}<br/>{t("hero.vs_mortgage")}</div>
              </div>
              <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl glass border border-emerald-500/10 hover:border-emerald-500/30 transition-colors">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">5-7</div>
                <div className="text-xs text-slate-400 leading-tight font-semibold">{t("hero.years_to")}<br/>{t("hero.full_ownership")}</div>
              </div>
              <div className="flex items-center gap-3 px-5 py-3.5 rounded-2xl glass border border-purple-500/10 hover:border-purple-500/30 transition-colors">
                <div className="text-2xl sm:text-3xl font-black text-purple-400">$8</div>
                <div className="text-xs text-slate-400 leading-tight font-semibold">{t("props.per_token")}<br/>USDC</div>
              </div>
            </div>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <Link href="/properties" className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-blue-600 text-white rounded-xl font-bold text-base hover:bg-blue-500 hover:shadow-lg hover:shadow-blue-600/25 transition-all duration-200 animate-pulse-ring">
                {t("hero.browse")}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/create" className="inline-flex items-center justify-center gap-2 px-7 py-4 glass border border-white/10 text-white rounded-xl font-bold hover:bg-white/5 hover:border-white/20 transition-all">
                {t("hero.list")}
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-slate-500 font-medium animate-slide-up" style={{ animationDelay: "0.5s" }}>
              {["Solana Devnet", "SPL Token", "AIFC Legal", "Krisha.kz"].map((badge) => (
                <div key={badge} className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500/60" />
                  {badge}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats — animated on scroll feel */}
      <section className="border-y border-white/5 bg-[#0d1117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { value: "$250K", label: t("stats.mortgage_label"), sub: t("stats.mortgage_sub"), color: "text-red-400", border: "border-red-500/20", bg: "bg-red-500/5", icon: TrendingUp },
              { value: "$119K", label: t("stats.hc_label"), sub: t("stats.hc_sub"), color: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/5", icon: Building2 },
              { value: "$131K", label: t("stats.save_label"), sub: t("stats.save_sub"), color: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/5", icon: Sparkles },
            ].map((s) => (
              <div key={s.label} className={`text-center p-5 sm:p-6 rounded-2xl ${s.bg} border ${s.border} hover:scale-[1.02] transition-transform duration-200`}>
                <s.icon className={`h-5 w-5 ${s.color} mx-auto mb-2 opacity-60`} />
                <div className={`text-2xl sm:text-3xl font-black ${s.color}`}>{s.value}</div>
                <div className="text-sm text-slate-300 mt-1 font-semibold">{s.label}</div>
                <div className="text-xs text-slate-500 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs text-blue-400 font-bold mb-4 border border-blue-500/20">
              <Calculator className="h-3.5 w-3.5" /> {t("calc.title").split(" vs")[0]}
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">{t("calc.title")}</h2>
            <p className="mt-3 text-slate-400 font-medium max-w-lg mx-auto">{t("calc.subtitle")}</p>
          </div>
          <MortgageCalculator />
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-24 bg-[#0d1117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs text-blue-400 font-bold mb-4 border border-blue-500/20">
              <BadgeCheck className="h-3.5 w-3.5" /> 3 шага
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">{t("how.title")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {[
              { step: "01", icon: Building2, title: t("how.step1.title"), desc: t("how.step1.desc"), color: "bg-blue-600", glow: "group-hover:shadow-blue-500/20" },
              { step: "02", icon: Users, title: t("how.step2.title"), desc: t("how.step2.desc"), color: "bg-violet-600", glow: "group-hover:shadow-violet-500/20" },
              { step: "03", icon: TrendingUp, title: t("how.step3.title"), desc: t("how.step3.desc"), color: "bg-emerald-600", glow: "group-hover:shadow-emerald-500/20" },
            ].map((item, i) => (
              <div key={item.step} className={`group relative rounded-2xl bg-[#111827] border border-white/5 p-6 sm:p-7 hover:border-white/10 hover:shadow-xl ${item.glow} transition-all duration-300`}
                style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="text-6xl font-black text-white/[0.03] absolute top-3 right-4">{item.step}</div>
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Connection lines (desktop) */}
          <div className="hidden sm:flex justify-center mt-8 gap-4">
            {[1,2,3].map((n) => (
              <div key={n} className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-xs font-bold text-blue-400">{n}</div>
                {n < 3 && <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500/30 to-purple-500/30 rounded-full" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Asel's Story — improved */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              История Асель
            </h2>
            <p className="mt-3 text-slate-400 font-medium">Реальный сценарий · данные с krisha.kz</p>
          </div>

          <div className="rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-[#0d1117]">
            {/* Header */}
            <div className="p-6 sm:p-8 pb-0">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-500/20">А</div>
                <div>
                  <div className="font-bold text-white text-lg">Асель, 26 лет</div>
                  <div className="text-sm text-slate-500 font-medium">Астана · 500K ₸/мес · ЖК Namys</div>
                </div>
                <div className="ml-auto hidden sm:block">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400 border border-blue-500/30">krisha.kz</span>
                </div>
              </div>

              {/* Story steps */}
              <div className="space-y-4 text-slate-300 leading-relaxed font-medium text-sm sm:text-base">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-xs font-bold text-white">1</span></div>
                  <p>Нашла 1-комнатную квартиру за <span className="text-white font-bold">$46,400</span> в ЖК Namys, Астана. Накопила <span className="text-white font-bold">$10,000</span>.</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-xs font-bold text-white">2</span></div>
                  <p>Создаёт кампанию: <span className="text-blue-400 font-bold">5,800 токенов × $8</span>. Покупает 1,250 токенов (21.5%). <span className="text-purple-400 font-bold">85 инвесторов</span> покрывают $36,400.</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0 mt-0.5"><span className="text-xs font-bold text-white">3</span></div>
                  <p>Заселяется, платит <span className="text-white font-bold">$350/мес</span>. Выкупает токены → <span className="text-emerald-400 font-bold">100% владение за 5-6 лет</span>.</p>
                </div>
              </div>
            </div>

            {/* Comparison cards */}
            <div className="p-6 sm:p-8 pt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-red-500/5 border border-red-500/20 p-5 text-center">
                  <div className="text-xs text-red-400 font-bold mb-2 uppercase tracking-wide">Ипотека · 18% · 20 лет</div>
                  <div className="text-2xl sm:text-3xl font-black text-red-400">$145,000</div>
                  <div className="text-xs text-slate-500 mt-1 font-medium">переплата <span className="text-red-400">$99K</span></div>
                </div>
                <div className="rounded-2xl bg-emerald-500/5 border border-emerald-500/20 p-5 text-center relative overflow-hidden">
                  <div className="absolute top-2 right-2">
                    <Sparkles className="h-4 w-4 text-emerald-500/40" />
                  </div>
                  <div className="text-xs text-emerald-400 font-bold mb-2 uppercase tracking-wide">HomeCrowd · 5-6 лет</div>
                  <div className="text-2xl sm:text-3xl font-black text-emerald-400">$57,000</div>
                  <div className="text-xs text-slate-500 mt-1 font-medium">переплата <span className="text-emerald-400">$11K</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Solana */}
      <section className="py-16 sm:py-24 bg-[#0d1117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-xs text-purple-400 font-bold mb-4 border border-purple-500/20">
              <Zap className="h-3.5 w-3.5" /> {t("why.badge")}
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">{t("why.title")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {[
              { icon: Landmark, title: "KASE × Solana Foundation", desc: "Казахстанская фондовая биржа подписала меморандум с Solana Foundation. Институциональная поддержка.", color: "bg-violet-600" },
              { icon: DollarSign, title: "Digital Tenge на Solana", desc: "Digital Tenge выпущен в регуляторной песочнице Нацбанка при поддержке Mastercard.", color: "bg-emerald-600" },
              { icon: Zap, title: "$0.40 vs $800+ за 200 tx", desc: "Распределение аренды 200 держателям: $0.40 на Solana vs $800+ на Ethereum. Газ ETH превысит аренду.", color: "bg-blue-600" },
              { icon: Shield, title: "AIFC + English Law", desc: "ТОО в AIFC обеспечивает юридическую связь токенов и недвижимости. Цифровые активы регулируются.", color: "bg-sky-600" },
            ].map((item) => (
              <div key={item.title} className="group flex gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl glass border border-white/5 hover:border-blue-500/20 card-hover">
                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1.5">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-violet-700" />
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px]" />

        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-4xl font-black text-white">{t("cta.title")}</h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-blue-100/80 max-w-xl mx-auto font-medium">{t("cta.subtitle")}</p>
          <div className="mt-8 sm:mt-10">
            <Link href="/properties" className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-black text-lg hover:shadow-2xl hover:shadow-white/10 hover:scale-105 transition-all duration-200">
              {t("cta.button")}
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
