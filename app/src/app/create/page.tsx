"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Building2, Upload, Info, Sparkles } from "lucide-react";
import { KZT_PER_USD } from "@/lib/constants";
import { useLang } from "@/lib/LangContext";

export default function CreateCampaignPage() {
  const { connected } = useWallet();
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", location: "", totalPrice: "", description: "", buyerContribution: "", deadline: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const totalPrice = parseFloat(form.totalPrice) || 0;
  const buyerContribution = parseFloat(form.buyerContribution) || 0;
  const tokensNeeded = totalPrice > 0 ? Math.ceil(totalPrice / 8) : 0;
  const buyerTokens = buyerContribution > 0 ? Math.ceil(buyerContribution / 8) : 0;
  const investorTokens = tokensNeeded - buyerTokens;
  const buyerPct = tokensNeeded > 0 ? (buyerTokens / tokensNeeded) * 100 : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 sm:py-20 text-center">
        <div className="w-20 h-20 rounded-2xl bg-emerald-600 flex items-center justify-center mx-auto mb-6">
          <Sparkles className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">{t("create.success")}</h1>
        <p className="mt-3 text-slate-400 font-medium">{t("create.success_sub")}</p>
        <div className="mt-8 glass rounded-2xl p-6 text-left max-w-sm mx-auto space-y-3">
          {[
            { label: t("create.property"), value: form.name },
            { label: t("create.tokens"), value: tokensNeeded.toLocaleString() },
            { label: t("create.your_share"), value: `${buyerTokens.toLocaleString()} (${buyerPct.toFixed(0)}%)` },
            { label: t("create.for_investors"), value: investorTokens.toLocaleString() },
          ].map((r) => (
            <div key={r.label} className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium">{r.label}</span>
              <span className="font-bold text-white">{r.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-4xl font-black text-white">{t("create.title")}</h1>
        <p className="mt-2 text-slate-400 font-medium">{t("create.subtitle")}</p>
      </div>

      <div className="glass rounded-2xl p-4 sm:p-5 mb-6 sm:mb-8 flex gap-3 border-blue-500/20">
        <Info className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-slate-400 font-medium"><strong className="text-blue-400">{t("create.how")}</strong> {t("create.how_desc")}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        <div className="glass rounded-2xl p-5 sm:p-6 space-y-5">
          <h2 className="font-bold text-white text-lg">{t("create.property_data")}</h2>
          {[
            { label: t("create.name"), placeholder: "напр., 1-комнатная, Бостандыкский район", key: "name" as const },
            { label: t("create.address"), placeholder: "напр., ул. Тимирязева 42, Алматы", key: "location" as const },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-sm font-bold text-slate-400 mb-2">{f.label}</label>
              <input type="text" required placeholder={f.placeholder} value={form[f.key]}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none text-white font-medium placeholder:text-slate-600" />
            </div>
          ))}
          <div>
            <label className="block text-sm font-bold text-slate-400 mb-2">{t("create.description")}</label>
            <textarea rows={3} placeholder="..." value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none text-white font-medium placeholder:text-slate-600 resize-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-400 mb-2">{t("create.photos")}</label>
            <div className="border-2 border-dashed border-white/10 rounded-xl p-6 sm:p-8 text-center hover:border-blue-500/30 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm text-slate-500 font-medium">{t("create.upload")}</p>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-5 sm:p-6 space-y-5">
          <h2 className="font-bold text-white text-lg">{t("create.finance")}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { label: t("create.price"), placeholder: "80000", key: "totalPrice" as const, val: totalPrice },
              { label: t("create.contribution"), placeholder: "15000", key: "buyerContribution" as const, val: buyerContribution },
            ].map((f) => (
              <div key={f.key}>
                <label className="block text-sm font-bold text-slate-400 mb-2">{f.label}</label>
                <input type="number" required min={0} placeholder={f.placeholder} value={form[f.key]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none text-white font-medium placeholder:text-slate-600" />
                {f.val > 0 && <div className="text-xs text-slate-500 mt-1">~{(f.val * KZT_PER_USD).toLocaleString()} ₸</div>}
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-400 mb-2">{t("create.deadline")}</label>
            <input type="date" required value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 outline-none text-white font-medium" />
          </div>

          {totalPrice > 0 && (
            <div className="rounded-xl bg-white/3 p-4 sm:p-5 space-y-2.5">
              <h3 className="text-sm font-bold text-white mb-3">{t("create.preview")}</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">{t("create.tokens")}</span><span className="text-white font-bold">{tokensNeeded.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">{t("detail.price")}</span><span className="text-white font-bold">$8 USDC</span></div>
                <div className="flex justify-between"><span className="text-slate-500">{t("create.yours")}</span><span className="text-blue-400 font-bold">{buyerTokens.toLocaleString()} ({buyerPct.toFixed(0)}%)</span></div>
                <div className="flex justify-between"><span className="text-slate-500">{t("create.investors")}</span><span className="text-emerald-400 font-bold">{investorTokens.toLocaleString()}</span></div>
              </div>
            </div>
          )}
        </div>

        {connected ? (
          <button type="submit" disabled={submitting}
            className="w-full py-3.5 sm:py-4 px-4 bg-blue-600 text-white rounded-xl font-bold text-base sm:text-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2">
            {submitting ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {t("create.submitting")}</> : <><Building2 className="h-5 w-5" /> {t("create.submit")}</>}
          </button>
        ) : (
          <div className="text-center py-4 border border-dashed border-white/10 rounded-xl text-slate-500 font-medium">{t("create.connect")}</div>
        )}
      </form>
    </div>
  );
}
