"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, Building2, Plus } from "lucide-react";
import Link from "next/link";
import { PropertyCard } from "@/components/PropertyCard";
import { MOCK_PROPERTIES } from "@/lib/constants";
import { useLang } from "@/lib/LangContext";
import { useCampaigns } from "@/lib/campaignStore";

export default function PropertiesPage() {
  const { t } = useLang();
  const { campaigns } = useCampaigns();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // User campaigns first, then mock properties
  const allProperties = [
    ...campaigns,
    ...MOCK_PROPERTIES,
  ];

  const filtered = allProperties.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
      <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-blue-400 font-bold mb-3">
            <Building2 className="h-3.5 w-3.5" /> Алматы &middot; Астана &middot; Актобе
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white">{t("props.title")}</h1>
          <p className="mt-2 text-slate-400 font-medium text-sm sm:text-base">{t("props.subtitle")}</p>
        </div>
        <Link href="/create"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all text-sm flex-shrink-0 self-start sm:self-auto">
          <Plus className="h-4 w-4" /> Разместить квартиру
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
          <input
            type="text"
            placeholder={t("props.search")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#111827] border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none text-sm text-white font-medium placeholder:text-slate-500"
          />
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <SlidersHorizontal className="h-5 w-5 text-slate-500 flex-shrink-0" />
          {[
            { key: "all", label: t("props.all") },
            { key: "Funding", label: t("props.funding") },
            { key: "Active", label: t("props.active") },
          ].map((s) => (
            <button
              key={s.key}
              onClick={() => setStatusFilter(s.key)}
              className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                statusFilter === s.key
                  ? "bg-blue-600 text-white"
                  : "glass border border-white/5 text-slate-400 hover:text-white"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {campaigns.length > 0 && statusFilter !== "Active" && (
        <div className="mb-5 flex items-center gap-2">
          <div className="h-px flex-1 bg-white/5" />
          <span className="text-xs font-bold text-blue-400 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
            {campaigns.length} новых кампани{campaigns.length === 1 ? "я" : "и"} от пользователей
          </span>
          <div className="h-px flex-1 bg-white/5" />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
        {filtered.map((property) => (
          <PropertyCard key={property.id} {...property} isUserCreated={"isUserCreated" in property} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500 font-medium">{t("props.not_found")}</p>
          <Link href="/create" className="inline-flex items-center gap-2 mt-4 text-blue-400 hover:text-blue-300 font-bold text-sm transition-colors">
            <Plus className="h-4 w-4" /> Разместить первую квартиру
          </Link>
        </div>
      )}
    </div>
  );
}
