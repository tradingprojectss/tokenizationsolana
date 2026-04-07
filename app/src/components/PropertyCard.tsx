"use client";

import Link from "next/link";
import { MapPin, Clock, TrendingUp } from "lucide-react";
import { calculateProgress, daysRemaining } from "@/lib/utils";

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
}: PropertyCardProps) {
  const progress = calculateProgress(tokensSold, totalTokens);
  const days = daysRemaining(deadline);
  const priceDisplay = `$${(totalPrice / 1_000_000).toLocaleString()}`;

  return (
    <Link href={`/properties/${id}`}>
      <div className="group bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl hover:border-blue-300 transition-all duration-300">
        {/* Image */}
        <div className="relative h-48 overflow-hidden bg-slate-200">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-3 right-3">
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                status === "Active"
                  ? "bg-green-100 text-green-800"
                  : status === "Funding"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-slate-100 text-slate-800"
              }`}
            >
              {status}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
          <div className="flex items-center gap-1 mt-1 text-sm text-slate-500">
            <MapPin className="h-3.5 w-3.5" />
            {location}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div>
              <div className="text-lg font-bold text-slate-900">
                {priceDisplay}
              </div>
              <div className="text-xs text-slate-500">Property Value</div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-green-600 font-semibold">
                <TrendingUp className="h-4 w-4" />
                {annualYield}%
              </div>
              <div className="text-xs text-slate-500">Est. Annual Yield</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="text-slate-600 font-medium">
                {progress.toFixed(0)}% funded
              </span>
              <span className="text-slate-500">
                {tokensSold.toLocaleString()} / {totalTokens.toLocaleString()}{" "}
                tokens
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-1 text-sm text-slate-500">
              <Clock className="h-3.5 w-3.5" />
              {status === "Active"
                ? "Fully funded"
                : days > 0
                ? `${days} days left`
                : "Expired"}
            </div>
            <span className="text-sm font-medium text-blue-600">
              $10 / token
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
