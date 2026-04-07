"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, Building2 } from "lucide-react";
import { PropertyCard } from "@/components/PropertyCard";
import { MOCK_PROPERTIES } from "@/lib/constants";

export default function PropertiesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = MOCK_PROPERTIES.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs text-blue-400 font-medium mb-3">
          <Building2 className="h-3.5 w-3.5" /> Алматы &middot; Астана
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Квартиры</h1>
        <p className="mt-2 text-slate-400">
          Инвестируйте в токенизированную недвижимость от $8 за токен
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
          <input
            type="text"
            placeholder="Поиск по названию или адресу..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-[#111827] border border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 outline-none text-sm text-white placeholder:text-slate-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-slate-500" />
          {[
            { key: "all", label: "Все" },
            { key: "Funding", label: "Сбор средств" },
            { key: "Active", label: "Активные" },
          ].map((s) => (
            <button
              key={s.key}
              onClick={() => setStatusFilter(s.key)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                statusFilter === s.key
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "glass border border-white/5 text-slate-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((property) => (
          <PropertyCard key={property.id} {...property} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-500">Квартиры не найдены по вашим критериям.</p>
        </div>
      )}
    </div>
  );
}
