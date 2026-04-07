"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Building2, Upload, Info, Sparkles } from "lucide-react";
import { KZT_PER_USD } from "@/lib/constants";

export default function CreateCampaignPage() {
  const { connected } = useWallet();
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
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mx-auto mb-6">
          <Sparkles className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold text-white">Кампания создана!</h1>
        <p className="mt-3 text-slate-400">В полной версии будет создан SPL токен и PDA аккаунт на Solana.</p>
        <div className="mt-8 glass rounded-2xl p-6 text-left max-w-sm mx-auto space-y-3">
          {[
            { label: "Квартира", value: form.name },
            { label: "Токенов", value: tokensNeeded.toLocaleString() },
            { label: "Ваша доля", value: `${buyerTokens.toLocaleString()} (${buyerPct.toFixed(0)}%)` },
            { label: "Для инвесторов", value: investorTokens.toLocaleString() },
          ].map((r) => (
            <div key={r.label} className="flex justify-between text-sm">
              <span className="text-slate-500">{r.label}</span>
              <span className="font-medium text-white">{r.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Создать кампанию</h1>
        <p className="mt-2 text-slate-400">Токенизируйте квартиру для краудфандинга на Solana</p>
      </div>

      <div className="glass rounded-2xl p-5 mb-8 flex gap-3 border-blue-500/20">
        <Info className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-slate-400">
          <strong className="text-blue-400">Как это работает:</strong> Укажите стоимость и взнос. Платформа создаст SPL токены по $8. Инвесторы покупают токены. Квартира оформляется на ТОО в AIFC.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="glass rounded-2xl p-6 space-y-5">
          <h2 className="font-bold text-white text-lg">Данные о квартире</h2>
          {[
            { label: "Название", placeholder: "напр., 1-комнатная, Бостандыкский район", key: "name" as const },
            { label: "Адрес", placeholder: "напр., ул. Тимирязева 42, Алматы", key: "location" as const },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-sm font-medium text-slate-400 mb-2">{f.label}</label>
              <input type="text" required placeholder={f.placeholder} value={form[f.key]}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none text-white placeholder:text-slate-600" />
            </div>
          ))}
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Описание</label>
            <textarea rows={3} placeholder="Опишите квартиру..." value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none text-white placeholder:text-slate-600 resize-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Фото</label>
            <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-blue-500/30 transition-colors cursor-pointer">
              <Upload className="h-8 w-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm text-slate-500">Загрузите фото (IPFS / Pinata)</p>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 space-y-5">
          <h2 className="font-bold text-white text-lg">Финансы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Стоимость квартиры ($)", placeholder: "80000", key: "totalPrice" as const, val: totalPrice },
              { label: "Ваш первоначальный взнос ($)", placeholder: "15000", key: "buyerContribution" as const, val: buyerContribution },
            ].map((f) => (
              <div key={f.key}>
                <label className="block text-sm font-medium text-slate-400 mb-2">{f.label}</label>
                <input type="number" required min={0} placeholder={f.placeholder} value={form[f.key]}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none text-white placeholder:text-slate-600" />
                {f.val > 0 && <div className="text-xs text-slate-500 mt-1">~{(f.val * KZT_PER_USD).toLocaleString()} ₸</div>}
              </div>
            ))}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-2">Дедлайн сбора</label>
            <input type="date" required value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none text-white" />
          </div>

          {totalPrice > 0 && (
            <div className="rounded-xl bg-white/3 p-5 space-y-2.5">
              <h3 className="text-sm font-bold text-white mb-3">Превью токенизации</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-500">Токенов</span><span className="text-white font-medium">{tokensNeeded.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Цена</span><span className="text-white font-medium">$8 USDC</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Ваши</span><span className="text-blue-400 font-medium">{buyerTokens.toLocaleString()} ({buyerPct.toFixed(0)}%)</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Инвесторы</span><span className="text-emerald-400 font-medium">{investorTokens.toLocaleString()}</span></div>
              </div>
            </div>
          )}
        </div>

        {connected ? (
          <button type="submit" disabled={submitting}
            className="w-full py-4 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2">
            {submitting ? (
              <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Создание на Solana...</>
            ) : (
              <><Building2 className="h-5 w-5" /> Создать кампанию</>
            )}
          </button>
        ) : (
          <div className="text-center py-4 border border-dashed border-white/10 rounded-xl text-slate-500">
            Подключите кошелёк для создания кампании
          </div>
        )}
      </form>
    </div>
  );
}
