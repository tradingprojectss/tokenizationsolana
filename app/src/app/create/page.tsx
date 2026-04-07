"use client";

import { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Building2, Info, Sparkles, CheckCircle2, ArrowRight, Home, MapPin, FileText, ImageIcon, DollarSign, Calendar, Layers, Ruler } from "lucide-react";
import Link from "next/link";
import { KZT_PER_USD } from "@/lib/constants";
import { useLang } from "@/lib/LangContext";
import { useCampaigns, buildCampaign } from "@/lib/campaignStore";

const INPUT_CLS = "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none text-white font-medium placeholder:text-slate-600 transition-colors";
const LABEL_CLS = "block text-sm font-bold text-slate-400 mb-2";

export default function CreateCampaignPage() {
  const { connected } = useWallet();
  const { t } = useLang();
  const { addCampaign } = useCampaigns();

  const [form, setForm] = useState({
    name: "",
    location: "",
    description: "",
    imageUrl: "",
    area: "",
    floor: "",
    buildYear: "",
    houseType: "монолитный",
    totalPrice: "",
    annualYield: "8.5",
    deadline: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [createdId, setCreatedId] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
    if (key === "imageUrl") setImageError(false);
  };

  const priceUSD = parseFloat(form.totalPrice) || 0;
  const totalTokens = priceUSD > 0 ? Math.ceil(priceUSD / 8) : 0;
  const yieldPct = parseFloat(form.annualYield) || 8.5;
  const monthlyRent = priceUSD > 0 ? Math.round((priceUSD * yieldPct) / 100 / 12) : 0;

  const previewImage = !imageError && form.imageUrl
    ? form.imageUrl
    : "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!connected || priceUSD <= 0) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 2000));
    const campaign = buildCampaign(form);
    addCampaign(campaign);
    setCreatedId(campaign.id);
    setSubmitting(false);
  };

  if (createdId) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 sm:py-20 text-center">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
          <Sparkles className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white mb-3">{t("create.success")}</h1>
        <p className="text-slate-400 font-medium mb-8">{t("create.success_sub")}</p>

        <div className="glass rounded-2xl p-6 text-left max-w-sm mx-auto space-y-3 mb-8">
          {[
            { label: t("create.property"), value: form.name },
            { label: t("create.tokens"), value: totalTokens.toLocaleString() },
            { label: "Доходность", value: `${yieldPct}% годовых` },
            { label: "Аренда/мес (прогноз)", value: `$${monthlyRent}` },
          ].map((r) => (
            <div key={r.label} className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium">{r.label}</span>
              <span className="font-bold text-white">{r.value}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href={`/properties/${createdId}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all">
            <CheckCircle2 className="h-5 w-5" /> Посмотреть кампанию
          </Link>
          <Link href="/properties"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 glass border border-white/10 hover:border-blue-500/30 text-white font-bold rounded-xl transition-all">
            Все квартиры <ArrowRight className="h-4 w-4" />
          </Link>
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

      <div className="glass rounded-2xl p-4 sm:p-5 mb-6 sm:mb-8 flex gap-3 border border-blue-500/20">
        <Info className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-slate-400 font-medium">
          <strong className="text-blue-400">{t("create.how")}</strong>{" "}
          {t("create.how_desc")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
        {/* Property info */}
        <div className="glass rounded-2xl p-5 sm:p-6 space-y-5">
          <h2 className="font-bold text-white text-lg flex items-center gap-2">
            <Home className="h-5 w-5 text-blue-400" /> {t("create.property_data")}
          </h2>

          <div>
            <label className={LABEL_CLS}>
              <span className="flex items-center gap-1.5"><FileText className="h-3.5 w-3.5" /> {t("create.name")}</span>
            </label>
            <input required type="text" placeholder="напр., 2-комнатная, 65 м², ЖК Alatau Park" value={form.name} onChange={set("name")} className={INPUT_CLS} />
          </div>

          <div>
            <label className={LABEL_CLS}>
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {t("create.address")}</span>
            </label>
            <input required type="text" placeholder="напр., ул. Тимирязева 42, Алматы" value={form.location} onChange={set("location")} className={INPUT_CLS} />
          </div>

          <div>
            <label className={LABEL_CLS}>Описание</label>
            <textarea required rows={3} placeholder="Опишите квартиру: планировка, ремонт, инфраструктура района..." value={form.description}
              onChange={set("description")}
              className={INPUT_CLS + " resize-none"} />
          </div>

          {/* Image URL */}
          <div>
            <label className={LABEL_CLS}>
              <span className="flex items-center gap-1.5"><ImageIcon className="h-3.5 w-3.5" /> Ссылка на фото</span>
            </label>
            <input type="url" placeholder="https://example.com/photo.jpg" value={form.imageUrl} onChange={set("imageUrl")} className={INPUT_CLS} />
            <p className="text-xs text-slate-600 mt-1.5">Вставьте прямую ссылку на фото (JPG/PNG). Оставьте пустым — подставится фото по умолчанию.</p>

            {/* Preview */}
            <div className="mt-3 rounded-xl overflow-hidden h-40 bg-white/5 border border-white/10 relative">
              <img
                src={previewImage}
                alt="preview"
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full bg-black/60 text-xs text-slate-400 font-medium backdrop-blur-sm">
                Preview
              </div>
            </div>
          </div>

          {/* Specs row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <label className={LABEL_CLS}>
                <span className="flex items-center gap-1.5"><Ruler className="h-3.5 w-3.5" /> Площадь (м²)</span>
              </label>
              <input required type="number" min={1} placeholder="65" value={form.area} onChange={set("area")} className={INPUT_CLS} />
            </div>
            <div>
              <label className={LABEL_CLS}>
                <span className="flex items-center gap-1.5"><Layers className="h-3.5 w-3.5" /> Этаж</span>
              </label>
              <input type="text" placeholder="5/12" value={form.floor} onChange={set("floor")} className={INPUT_CLS} />
            </div>
            <div>
              <label className={LABEL_CLS}>Год постройки</label>
              <input type="number" min={1950} max={2030} placeholder="2023" value={form.buildYear} onChange={set("buildYear")} className={INPUT_CLS} />
            </div>
            <div>
              <label className={LABEL_CLS}>Тип дома</label>
              <select value={form.houseType} onChange={set("houseType")} className={INPUT_CLS}>
                <option value="монолитный">монолитный</option>
                <option value="кирпичный">кирпичный</option>
                <option value="панельный">панельный</option>
                <option value="каркасный">каркасный</option>
              </select>
            </div>
          </div>
        </div>

        {/* Finance */}
        <div className="glass rounded-2xl p-5 sm:p-6 space-y-5">
          <h2 className="font-bold text-white text-lg flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-emerald-400" /> {t("create.finance")}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={LABEL_CLS}>{t("create.price")}</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">$</span>
                <input required type="number" min={5000} step={1000} placeholder="80000" value={form.totalPrice} onChange={set("totalPrice")}
                  className={INPUT_CLS + " pl-8"} />
              </div>
              {priceUSD > 0 && <div className="text-xs text-slate-500 mt-1.5">≈ {(priceUSD * KZT_PER_USD).toLocaleString()} ₸</div>}
            </div>

            <div>
              <label className={LABEL_CLS}>Ожидаемая доходность (%/год)</label>
              <div className="relative">
                <input required type="number" min={1} max={30} step={0.1} placeholder="8.5" value={form.annualYield} onChange={set("annualYield")}
                  className={INPUT_CLS + " pr-8"} />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold">%</span>
              </div>
              {priceUSD > 0 && <div className="text-xs text-slate-500 mt-1.5">≈ ${monthlyRent}/мес арендного дохода</div>}
            </div>
          </div>

          <div>
            <label className={LABEL_CLS}>
              <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" /> {t("create.deadline")}</span>
            </label>
            <input required type="date" value={form.deadline} min={new Date().toISOString().split("T")[0]}
              onChange={set("deadline")} className={INPUT_CLS} />
          </div>

          {/* Tokenization preview */}
          {priceUSD > 0 && (
            <div className="rounded-xl bg-gradient-to-br from-blue-500/10 to-emerald-500/10 border border-blue-500/20 p-4 sm:p-5">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-blue-400" /> {t("create.preview")}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Всего токенов", value: totalTokens.toLocaleString(), color: "text-white" },
                  { label: "Цена токена", value: "$8 USDC", color: "text-blue-400" },
                  { label: "Доходность", value: `${yieldPct}%`, color: "text-emerald-400" },
                  { label: "Аренда/мес", value: `$${monthlyRent}`, color: "text-emerald-400" },
                ].map((item) => (
                  <div key={item.label} className="bg-white/5 rounded-lg p-3 text-center">
                    <div className={`text-lg font-black ${item.color}`}>{item.value}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {connected ? (
          <button type="submit" disabled={submitting || priceUSD <= 0}
            className="w-full py-3.5 sm:py-4 px-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-bold text-base sm:text-lg hover:from-blue-500 hover:to-blue-600 hover:shadow-lg hover:shadow-blue-600/25 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2">
            {submitting
              ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> {t("create.submitting")}</>
              : <><Building2 className="h-5 w-5" /> {t("create.submit")}</>}
          </button>
        ) : (
          <div className="text-center py-5 border border-dashed border-white/10 rounded-xl text-slate-500 font-medium">
            {t("create.connect")}
          </div>
        )}
      </form>
    </div>
  );
}
