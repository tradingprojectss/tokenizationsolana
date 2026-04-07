"use client";

import Link from "next/link";
import { MapPin, Clock, TrendingUp, ArrowUpRight } from "lucide-react";
import { calculateProgress, daysRemaining } from "@/lib/utils";
import { KZT_PER_USD } from "@/lib/constants";
import { useLang } from "@/lib/LangContext";

interface PropertyCardProps {
  id: string; name: string; location: string; totalPrice: number; tokenPrice: number;
  totalTokens: number; tokensSold: number; deadline: number; status: string; image: string;
  annualYield: number; monthlyRent?: number; priceKZT?: number; area?: number; krishaUrl?: string;
  [key: string]: unknown;
}

export function PropertyCard({ id, name, location, totalPrice, totalTokens, tokensSold, deadline, status, image, annualYield, priceKZT, area, krishaUrl }: PropertyCardProps) {
  const { t } = useLang();
  const progress = calculateProgress(tokensSold, totalTokens);
  const days = daysRemaining(deadline);
  const priceUSD = totalPrice / 1_000_000;
  const kztDisplay = priceKZT ? `${(priceKZT / 1_000_000).toFixed(1)} млн ₸` : `${((priceUSD * KZT_PER_USD) / 1_000_000).toFixed(1)} млн ₸`;

  return (
    <Link href={`/properties/${id}`}>
      <div className="group relative rounded-2xl overflow-hidden card-hover bg-[#111827] border border-white/5 hover:border-blue-500/30">
        <div className="relative h-48 sm:h-52 overflow-hidden">
          <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />
          <div className="absolute top-3 left-3">
            <span className={`px-2.5 py-1 rounded-full text-xs font-bold backdrop-blur-md ${status === "Active" ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" : "bg-blue-500/20 text-blue-300 border border-blue-500/30"}`}>
              {status === "Funding" ? t("common.funding") : t("common.active_status")}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10">
              <TrendingUp className="h-3 w-3 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-300">{annualYield}%</span>
            </div>
          </div>
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
              <ArrowUpRight className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <h3 className="font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-1 text-sm sm:text-base">{name}</h3>
          <div className="flex items-center gap-1 mt-1 text-xs sm:text-sm text-slate-500">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </div>

          <div className="mt-3 sm:mt-4 flex items-end justify-between">
            <div>
              <div className="text-lg sm:text-xl font-extrabold text-white">${priceUSD.toLocaleString()}</div>
              <div className="text-xs text-slate-500 font-medium">{kztDisplay}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-blue-400">$8</div>
              <div className="text-xs text-slate-500">{t("props.per_token")}</div>
            </div>
          </div>

          <div className="mt-3 sm:mt-4">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-slate-400 font-semibold">{progress.toFixed(0)}% {t("props.collected_pct")}</span>
              <span className="text-slate-500">{tokensSold.toLocaleString()} / {totalTokens.toLocaleString()}</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: progress === 100 ? "#10b981" : "#3b82f6" }} />
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <Clock className="h-3 w-3" />
                {status === "Active" ? t("props.collected") : days > 0 ? `${days} ${t("props.days")}` : t("props.expired")}
              </div>
              {area && <span className="text-xs text-slate-500">{area} м²</span>}
            </div>
            {krishaUrl ? <span className="text-xs font-bold text-blue-400">krisha.kz</span> : <span className="text-xs text-slate-600">SPL Token</span>}
          </div>
        </div>
      </div>
    </Link>
  );
}
