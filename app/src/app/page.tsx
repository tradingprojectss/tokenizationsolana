"use client";

import Link from "next/link";
import { Building2, ArrowRight, Shield, Zap, TrendingUp, Users, DollarSign, Landmark, ChevronRight, BadgeCheck, Calculator } from "lucide-react";
import { MortgageCalculator } from "@/components/MortgageCalculator";
import { useLang } from "@/lib/LangContext";

export default function HomePage() {
  const { t } = useLang();
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[80vh] sm:min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-blue-500/10 rounded-full blur-3xl animate-glow-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-purple-500/10 rounded-full blur-3xl animate-glow-pulse" style={{ animationDelay: "1.5s" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full glass border border-blue-500/20 text-xs sm:text-sm mb-6 sm:mb-8 animate-slide-up">
              <span className="text-blue-400 font-semibold">{t("hero.badge.kase")}</span>
              <span className="text-slate-600">|</span>
              <span className="text-emerald-400 font-semibold">{t("hero.badge.tenge")}</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black leading-[1.08] tracking-tight animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <span className="text-white">{t("hero.title1")}</span>
              <br />
              <span className="text-gradient">{t("hero.title2")}</span>
            </h1>

            <p className="mt-5 sm:mt-6 text-base sm:text-xl text-slate-400 max-w-xl leading-relaxed font-medium animate-slide-up" style={{ animationDelay: "0.2s" }}>
              {t("hero.subtitle")}
            </p>

            <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-3 sm:gap-6 animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl glass">
                <div className="text-2xl sm:text-3xl font-black text-gradient">$131K</div>
                <div className="text-xs text-slate-400 leading-tight font-semibold">{t("hero.savings")}<br/>{t("hero.vs_mortgage")}</div>
              </div>
              <div className="flex items-center gap-3 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl glass">
                <div className="text-2xl sm:text-3xl font-black text-emerald-400">5-7</div>
                <div className="text-xs text-slate-400 leading-tight font-semibold">{t("hero.years_to")}<br/>{t("hero.full_ownership")}</div>
              </div>
            </div>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <Link href="/properties" className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 transition-all">
                {t("hero.browse")}
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/create" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 glass border border-white/10 text-white rounded-xl font-bold hover:bg-white/5 transition-all">
                {t("hero.list")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/5 bg-[#0d1117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { value: "$250K", label: t("stats.mortgage_label"), sub: t("stats.mortgage_sub"), color: "text-red-400", border: "border-red-500/20", bg: "bg-red-500/5" },
              { value: "$119K", label: t("stats.hc_label"), sub: t("stats.hc_sub"), color: "text-emerald-400", border: "border-emerald-500/20", bg: "bg-emerald-500/5" },
              { value: "$131K", label: t("stats.save_label"), sub: t("stats.save_sub"), color: "text-blue-400", border: "border-blue-500/20", bg: "bg-blue-500/5" },
            ].map((s) => (
              <div key={s.label} className={`text-center p-5 sm:p-6 rounded-2xl ${s.bg} border ${s.border}`}>
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
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-blue-400 font-bold mb-4">
              <Calculator className="h-3.5 w-3.5" /> {t("calc.title").split(" vs")[0]}
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">{t("calc.title")}</h2>
            <p className="mt-3 text-slate-400 font-medium">{t("calc.subtitle")}</p>
          </div>
          <MortgageCalculator />
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 sm:py-24 bg-[#0d1117]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-blue-400 font-bold mb-4">
              <BadgeCheck className="h-3.5 w-3.5" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">{t("how.title")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {[
              { step: "01", icon: Building2, title: t("how.step1.title"), desc: t("how.step1.desc"), color: "bg-blue-600" },
              { step: "02", icon: Users, title: t("how.step2.title"), desc: t("how.step2.desc"), color: "bg-violet-600" },
              { step: "03", icon: TrendingUp, title: t("how.step3.title"), desc: t("how.step3.desc"), color: "bg-emerald-600" },
            ].map((item) => (
              <div key={item.step} className="relative rounded-2xl bg-[#111827] border border-white/5 p-6 sm:p-7 hover:border-blue-500/20 transition-colors">
                <div className="text-5xl font-black text-white/5 absolute top-4 right-5">{item.step}</div>
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-5`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Solana */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-purple-400 font-bold mb-4">
              <Zap className="h-3.5 w-3.5" /> {t("why.badge")}
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">{t("why.title")}</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {[
              { icon: Landmark, title: "KASE × Solana Foundation", desc: "Казахстанская фондовая биржа подписала меморандум с Solana Foundation.", color: "bg-violet-600" },
              { icon: DollarSign, title: "Digital Tenge", desc: "Digital Tenge выпущен на Solana в регуляторной песочнице Нацбанка.", color: "bg-emerald-600" },
              { icon: Zap, title: "$0.001 per tx", desc: "Распределение аренды 200 держателям: $0.40 на Solana vs $800+ на Ethereum.", color: "bg-blue-600" },
              { icon: Shield, title: "AIFC + English Law", desc: "ТОО в AIFC обеспечивает юридическую связь токенов и недвижимости.", color: "bg-sky-600" },
            ].map((item) => (
              <div key={item.title} className="group flex gap-4 sm:gap-5 p-5 sm:p-6 rounded-2xl glass border border-white/5 hover:border-blue-500/20 transition-all">
                <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center flex-shrink-0`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-blue-600">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-4xl font-black text-white">{t("cta.title")}</h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg text-blue-100 max-w-xl mx-auto font-medium">{t("cta.subtitle")}</p>
          <div className="mt-8 sm:mt-10">
            <Link href="/properties" className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-xl font-black text-lg hover:shadow-xl transition-all">
              {t("cta.button")}
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
