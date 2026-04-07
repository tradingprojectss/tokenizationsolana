"use client";

import { useState, useMemo } from "react";
import { TrendingDown, TrendingUp } from "lucide-react";
import { KZT_PER_USD } from "@/lib/constants";
import { useLang } from "@/lib/LangContext";

export function MortgageCalculator() {
  const { t } = useLang();
  const [price, setPrice] = useState(80000);
  const [savings, setSavings] = useState(15000);

  const calc = useMemo(() => {
    const loanAmount = Math.max(price - savings, 0);
    const monthlyRate = 0.18 / 12;
    const months = 240;
    let totalMortgage = price;
    let monthlyPayment = 0;
    if (loanAmount > 0) {
      monthlyPayment = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
      totalMortgage = savings + monthlyPayment * months;
    }
    const investorAmount = Math.max(price - savings, 0);
    const annualYield = 0.085;
    const buybackMonths = 72;
    const monthlyBuyback = investorAmount / buybackMonths;
    let remaining = investorAmount;
    let totalRent = 0;
    let hcMonths = 0;
    while (remaining > 0 && hcMonths < 120) {
      totalRent += (remaining * annualYield) / 12;
      remaining = Math.max(0, remaining - monthlyBuyback);
      hcMonths++;
    }
    const totalHomecrowd = price + totalRent;
    return {
      totalMortgage: Math.round(totalMortgage),
      totalHomecrowd: Math.round(totalHomecrowd),
      saved: Math.round(totalMortgage - totalHomecrowd),
      monthlyPayment: Math.round(monthlyPayment),
      mortgageOverpay: Math.round(totalMortgage - price),
      hcOverpay: Math.round(totalRent),
      hcYears: Math.ceil(hcMonths / 12),
      initialRent: Math.round((investorAmount * annualYield) / 12),
    };
  }, [price, savings]);

  const maxBar = Math.max(calc.totalMortgage, calc.totalHomecrowd, 1);

  return (
    <div className="glass rounded-2xl sm:rounded-3xl p-5 sm:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 mb-6 sm:mb-8">
        <div>
          <label className="block text-sm font-bold text-slate-400 mb-2">{t("calc.price")}</label>
          <input type="number" min={20000} max={500000} step={5000} value={price}
            onChange={(e) => setPrice(Math.max(0, parseInt(e.target.value) || 0))}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none text-white text-lg font-bold" />
          <div className="text-xs text-slate-500 mt-1">~{(price * KZT_PER_USD).toLocaleString()} ₸</div>
          <input type="range" min={20000} max={300000} step={5000} value={price} onChange={(e) => setPrice(parseInt(e.target.value))} className="w-full mt-2 accent-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-400 mb-2">{t("calc.savings")}</label>
          <input type="number" min={0} max={price} step={1000} value={savings}
            onChange={(e) => setSavings(Math.max(0, Math.min(price, parseInt(e.target.value) || 0)))}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none text-white text-lg font-bold" />
          <div className="text-xs text-slate-500 mt-1">~{(savings * KZT_PER_USD).toLocaleString()} ₸</div>
          <input type="range" min={0} max={price} step={1000} value={savings} onChange={(e) => setSavings(parseInt(e.target.value))} className="w-full mt-2 accent-blue-500" />
        </div>
      </div>

      <div className="space-y-4 mb-6 sm:mb-8">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-red-400 font-bold flex items-center gap-1.5"><TrendingDown className="h-4 w-4" /> {t("calc.mortgage")}</span>
            <span className="text-red-400 font-extrabold">${calc.totalMortgage.toLocaleString()}</span>
          </div>
          <div className="w-full h-8 sm:h-9 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-red-500 transition-all duration-700 flex items-center justify-end pr-3" style={{ width: `${(calc.totalMortgage / maxBar) * 100}%` }}>
              <span className="text-xs text-white/80 font-bold whitespace-nowrap">20 {t("calc.years")}</span>
            </div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-emerald-400 font-bold flex items-center gap-1.5"><TrendingUp className="h-4 w-4" /> HomeCrowd (8.5%, ~{calc.hcYears} {t("calc.years")})</span>
            <span className="text-emerald-400 font-extrabold">${calc.totalHomecrowd.toLocaleString()}</span>
          </div>
          <div className="w-full h-8 sm:h-9 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full rounded-full bg-emerald-500 transition-all duration-700 flex items-center justify-end pr-3" style={{ width: `${(calc.totalHomecrowd / maxBar) * 100}%` }}>
              <span className="text-xs text-white/80 font-bold whitespace-nowrap">~{calc.hcYears} {t("calc.years")}</span>
            </div>
          </div>
        </div>
      </div>

      {calc.saved > 0 && (
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5 sm:p-6 text-center mb-6">
          <div className="text-sm text-slate-400 font-semibold mb-1">{t("calc.you_save")}</div>
          <div className="text-3xl sm:text-5xl font-black text-gradient">${calc.saved.toLocaleString()}</div>
          <div className="text-sm text-slate-500 mt-1">~{(calc.saved * KZT_PER_USD).toLocaleString()} ₸</div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div className="rounded-xl bg-red-500/5 border border-red-500/10 p-3 sm:p-4">
          <div className="text-xs text-red-400 font-bold mb-2 sm:mb-3">{t("calc.mortgage").split(" (")[0]}</div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-500">{t("calc.monthly")}</span><span className="text-white font-bold">${calc.monthlyPayment.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">{t("calc.overpay")}</span><span className="text-red-400 font-bold">${calc.mortgageOverpay.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">{t("calc.term")}</span><span className="text-white font-bold">20 {t("calc.years")}</span></div>
          </div>
        </div>
        <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/10 p-3 sm:p-4">
          <div className="text-xs text-emerald-400 font-bold mb-2 sm:mb-3">HomeCrowd</div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-slate-500">{t("calc.rent_mo")}</span><span className="text-white font-bold">~${calc.initialRent.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">{t("calc.overpay")}</span><span className="text-emerald-400 font-bold">${calc.hcOverpay.toLocaleString()}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">{t("calc.term")}</span><span className="text-white font-bold">~{calc.hcYears} {t("calc.years")}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
