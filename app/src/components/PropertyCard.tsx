"use client";

import Link from "next/link";
import { MapPin, Clock, TrendingUp, ArrowUpRight } from "lucide-react";
import { calculateProgress, daysRemaining } from "@/lib/utils";
import { KZT_PER_USD } from "@/lib/constants";

interface PropertyCardProps {
  id: string;
  name: string;
  location: string;
  totalPrice: number;
  tokenPrice: number;
  totalTokens: number;
  tokensSold: number;
  deadline: number;
  status: string;
  image: string;
  annualYield: number;
  monthlyRent?: number;
  priceKZT?: number;
}

export function PropertyCard({
  id,
  name,
  location,
  totalPrice,
  totalTokens,
  tokensSold,
  deadline,
  status,
  image,
  annualYield,
  priceKZT,
}: PropertyCardProps) {
  const progress = calculateProgress(tokensSold, totalTokens);
  const days = daysRemaining(deadline);
  const priceUSD = totalPrice / 1_000_000;
  const kztDisplay = priceKZT
    ? `${(priceKZT / 1_000_000).toFixed(1)} млн ₸`
    : `${((priceUSD * KZT_PER_USD) / 1_000_000).toFixed(1)} млн ₸`;

  return (
    <Link href={`/properties/${id}`}>
      <div className="group relative rounded-2xl overflow-hidden card-hover bg-[#111827] border border-white/5 hover:border-blue-500/30">
        {/* Image with overlay */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-transparent to-transparent" />

          {/* Status badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md ${
              status === "Active"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                : "bg-blue-500/20 text-blue-300 border border-blue-500/30"
            }`}>
              {status === "Funding" ? "Сбор средств" : "Активно"}
            </span>
          </div>

          {/* Yield badge */}
          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30">
              <TrendingUp className="h-3 w-3 text-emerald-400" />
              <span className="text-xs font-bold text-emerald-300">{annualYield}%</span>
            </div>
          </div>

          {/* Arrow icon on hover */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <ArrowUpRight className="h-4 w-4 text-white" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-semibold text-white group-hover:text-blue-400 transition-colors line-clamp-1">
            {name}
          </h3>
          <div className="flex items-center gap-1 mt-1.5 text-sm text-slate-500">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </div>

          {/* Price */}
          <div className="mt-4 flex items-end justify-between">
            <div>
              <div className="text-xl font-bold text-white">
                ${priceUSD.toLocaleString()}
              </div>
              <div className="text-xs text-slate-500">{kztDisplay}</div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-blue-400">$8</div>
              <div className="text-xs text-slate-500">за токен</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-400 font-medium">
                {progress.toFixed(0)}% собрано
              </span>
              <span className="text-slate-500">
                {tokensSold.toLocaleString()} / {totalTokens.toLocaleString()}
              </span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 progress-glow"
                style={{
                  width: `${progress}%`,
                  background: progress === 100
                    ? "linear-gradient(90deg, #10b981, #34d399)"
                    : "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                }}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <Clock className="h-3 w-3" />
              {status === "Active"
                ? "Полностью собрано"
                : days > 0
                ? `${days} дн. осталось`
                : "Истёк"}
            </div>
            <span className="text-xs font-medium text-slate-500">
              SPL Token
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
