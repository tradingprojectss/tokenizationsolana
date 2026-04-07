"use client";

import { useState, useMemo } from "react";
import { TrendingDown, TrendingUp, Banknote, Home, Clock, Percent } from "lucide-react";
import { KZT_PER_USD } from "@/lib/constants";
import { useLang } from "@/lib/LangContext";

export function MortgageCalculator() {
  const { t } = useLang();
  const [price, setPrice] = useState(80000);
  const [savings, setSavings] = useState(15000);

  const calc = useMemo(() => {
    const downPayment = Math.min(savings, price);
    const loanAmount = Math.max(price - downPayment, 0);

    // Mortgage: 18% annual, 20 years, annuity
    const rate = 0.18;
    const monthlyRate = rate / 12;
    const months = 240;
    let totalMortgage = price;
    let monthlyPayment = 0;
    if (loanAmount > 0 && monthlyRate > 0) {
      monthlyPayment =
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);
      totalMortgage = downPayment + monthlyPayment * months;
    }

    // HomeCrowd: buyer pays rent (8.5% yield on remaining investor amount)
    // and buys back tokens monthly over ~6 years
    const investorAmount = loanAmount;
    const annualYield = 0.085;
    const buybackTarget = 72; // 6 years
    const monthlyBuyback = investorAmount > 0 ? investorAmount / buybackTarget : 0;

    let remaining = investorAmount;
    let totalRent = 0;
    let hcMonths = 0;

    while (remaining > 1 && hcMonths < 144) {
      const monthlyRent = (remaining * annualYield) / 12;
      totalRent += monthlyRent;
      remaining = Math.max(0, remaining - monthlyBuyback);
      hcMonths++;
    }

    const totalHomecrowd = price + totalRent;
    const savedAmount = Math.max(0, totalMortgage - totalHomecrowd);
    const initialMonthlyRent = investorAmount > 0 ? Math.round((investorAmount * annualYield) / 12) : 0;
    const hcYears = hcMonths > 0 ? Math.ceil(hcMonths / 12) : 0;

    return {
      loanAmount: Math.round(loanAmount),
      totalMortgage: Math.round(totalMortgage),
      totalHomecrowd: Math.round(totalHomecrowd),
      saved: Math.round(savedAmount),
      savedPct: totalMortgage > 0 ? Math.round((savedAmount / totalMortgage) * 100) : 0,
      monthlyPayment: Math.round(monthlyPayment),
      mortgageOverpay: Math.round(Math.max(0, totalMortgage - price)),
      hcOverpay: Math.round(totalRent),
      hcYears,
      hcMonths,
      initialMonthlyRent,
      monthlyBuyback: Math.round(monthlyBuyback),
      totalMonthlyHC: Math.round(initialMonthlyRent + monthlyBuyback),
    };
  }, [price, savings]);

  const maxBar = Math.max(calc.totalMortgage, calc.totalHomecrowd, 1);
  const mortgagePct = Math.max(8, (calc.totalMortgage / maxBar) * 100);
  const hcPct = Math.max(8, (calc.totalHomecrowd / maxBar) * 100);

  return (
    <div className="glass rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-white/10">
      {/* Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-8">
        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-3">
            <Home className="h-4 w-4 text-blue-400" />
            {t("calc.price")}
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
            <input type="number" min={10000} max={500000} step={5000} value={price}
              onChange={(e) => setPrice(Math.max(0, parseInt(e.target.value) || 0))}
              className="w-full pl-8 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none text-white text-xl font-black" />
          </div>
          <div className="text-xs text-slate-500 mt-1.5 font-medium">
            ≈ {(price * KZT_PER_USD).toLocaleString()} ₸
          </div>
          <input type="range" min={10000} max={300000} step={5000} value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            className="w-full mt-3 accent-blue-500 h-2 cursor-pointer" />
          <div className="flex justify-between text-xs text-slate-600 mt-1">
            <span>$10K</span><span>$300K</span>
          </div>
        </div>
        <div>
          <label className="flex items-center gap-2 text-sm font-bold text-slate-300 mb-3">
            <Banknote className="h-4 w-4 text-emerald-400" />
            {t("calc.savings")}
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
            <input type="number" min={0} max={price} step={1000} value={savings}
              onChange={(e) => setSavings(Math.max(0, Math.min(price, parseInt(e.target.value) || 0)))}
              className="w-full pl-8 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none text-white text-xl font-black" />
          </div>
          <div className="text-xs text-slate-500 mt-1.5 font-medium">
            ≈ {(savings * KZT_PER_USD).toLocaleString()} ₸ · {price > 0 ? Math.round((Math.min(savings, price) / price) * 100) : 0}% от стоимости
          </div>
          <input type="range" min={0} max={Math.max(price, 1000)} step={1000} value={Math.min(savings, price)}
            onChange={(e) => setSavings(parseInt(e.target.value))}
            className="w-full mt-3 accent-emerald-500 h-2 cursor-pointer" />
          <div className="flex justify-between text-xs text-slate-600 mt-1">
            <span>$0</span><span>${price > 0 ? price.toLocaleString() : '0'}</span>
          </div>
        </div>
      </div>

      {/* Visual comparison bars */}
      {calc.loanAmount > 0 && (
        <>
          <div className="space-y-5 mb-8">
            {/* Mortgage bar */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-red-400 font-bold flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 rounded-lg bg-red-500/20 flex items-center justify-center">
                    <TrendingDown className="h-3.5 w-3.5 text-red-400" />
                  </div>
                  {t("calc.mortgage")}
                </span>
                <span className="text-red-400 font-black text-lg">${calc.totalMortgage.toLocaleString()}</span>
              </div>
              <div className="w-full h-10 bg-white/5 rounded-2xl overflow-hidden">
                <div
                  className="h-full rounded-2xl bg-gradient-to-r from-red-600 to-red-500 transition-all duration-1000 ease-out flex items-center px-4"
                  style={{ width: `${mortgagePct}%` }}
                >
                  <span className="text-xs text-white font-bold whitespace-nowrap">
                    20 {t("calc.years")} · ${calc.monthlyPayment.toLocaleString()}/{t("calc.rent_mo").split('/')[1]}
                  </span>
                </div>
              </div>
            </div>

            {/* HomeCrowd bar */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-emerald-400 font-bold flex items-center gap-2 text-sm">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                    <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
                  </div>
                  HomeCrowd (~{calc.hcYears} {t("calc.years")})
                </span>
                <span className="text-emerald-400 font-black text-lg">${calc.totalHomecrowd.toLocaleString()}</span>
              </div>
              <div className="w-full h-10 bg-white/5 rounded-2xl overflow-hidden">
                <div
                  className="h-full rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-400 transition-all duration-1000 ease-out flex items-center px-4"
                  style={{ width: `${hcPct}%` }}
                >
                  <span className="text-xs text-white font-bold whitespace-nowrap">
                    ~{calc.hcYears} {t("calc.years")} · ${calc.totalMonthlyHC.toLocaleString()}/{t("calc.rent_mo").split('/')[1]}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Savings highlight — the wow moment */}
          {calc.saved > 0 && (
            <div className="relative rounded-2xl overflow-hidden mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-emerald-600/20 animate-gradient-slow" />
              <div className="relative border border-blue-500/30 rounded-2xl p-6 sm:p-8 text-center backdrop-blur-sm">
                <div className="text-sm text-blue-300 font-bold mb-2 tracking-wide uppercase">{t("calc.you_save")}</div>
                <div className="text-4xl sm:text-6xl font-black text-white mb-1">
                  ${calc.saved.toLocaleString()}
                </div>
                <div className="text-lg text-slate-400 font-bold">
                  ≈ {(calc.saved * KZT_PER_USD).toLocaleString()} ₸
                </div>
                <div className="mt-3 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                  <Percent className="h-3.5 w-3.5 text-emerald-400" />
                  <span className="text-sm font-bold text-emerald-400">{calc.savedPct}% экономии</span>
                </div>
              </div>
            </div>
          )}

          {/* Detail breakdown */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded-xl bg-red-500/5 border border-red-500/15 p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <span className="text-xs text-red-400 font-bold uppercase tracking-wide">{t("calc.mortgage").split(" (")[0]}</span>
              </div>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">{t("calc.monthly")}</span>
                  <span className="text-white font-extrabold">${calc.monthlyPayment.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{t("calc.overpay")}</span>
                  <span className="text-red-400 font-extrabold">${calc.mortgageOverpay.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{t("calc.term")}</span>
                  <span className="text-white font-bold">20 {t("calc.years")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500"><Clock className="h-3 w-3 inline mr-1" />Ставка</span>
                  <span className="text-red-400 font-bold">18%</span>
                </div>
              </div>
            </div>
            <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/15 p-4 sm:p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-xs text-emerald-400 font-bold uppercase tracking-wide">HomeCrowd</span>
              </div>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-500">{t("calc.rent_mo")}</span>
                  <span className="text-white font-extrabold">${calc.initialMonthlyRent.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{t("calc.overpay")}</span>
                  <span className="text-emerald-400 font-extrabold">${calc.hcOverpay.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{t("calc.term")}</span>
                  <span className="text-white font-bold">~{calc.hcYears} {t("calc.years")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500"><Clock className="h-3 w-3 inline mr-1" />Ставка</span>
                  <span className="text-emerald-400 font-bold">8.5%</span>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {calc.loanAmount <= 0 && (
        <div className="text-center py-8 text-slate-500 font-medium">
          Ваши накопления покрывают всю стоимость. Ипотека и HomeCrowd не нужны!
        </div>
      )}
    </div>
  );
}
