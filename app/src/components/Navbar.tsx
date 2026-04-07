"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import { Building2, Menu, X } from "lucide-react";
import { useLang } from "@/lib/LangContext";
import { LANGUAGES } from "@/lib/i18n";

const WalletMultiButton = dynamic(
  () => import("@solana/wallet-adapter-react-ui").then((m) => m.WalletMultiButton),
  { ssr: false }
);

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, setLang, t } = useLang();

  const navLinks = [
    { href: "/", label: t("nav.home") },
    { href: "/properties", label: t("nav.properties") },
    { href: "/create", label: t("nav.create") },
    { href: "/dashboard", label: t("nav.portfolio") },
  ];

  return (
    <nav className="sticky top-0 z-50 glass border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-extrabold text-white">Home<span className="text-blue-400">Crowd</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className={cn("px-4 py-2 rounded-xl text-sm font-semibold transition-all",
                  pathname === link.href ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
                )}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language switcher */}
            <div className="flex items-center gap-0.5 p-0.5 rounded-lg bg-white/5 border border-white/10">
              {LANGUAGES.map((l) => (
                <button key={l.code} onClick={() => setLang(l.code)}
                  className={cn("px-2 py-1 rounded-md text-xs font-bold transition-all",
                    lang === l.code ? "bg-blue-600 text-white" : "text-slate-500 hover:text-white"
                  )}>
                  {l.label}
                </button>
              ))}
            </div>

            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-emerald-400">Devnet</span>
            </div>

            <WalletMultiButton />

            <button onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-white/5 bg-[#0a0e1a]/95 backdrop-blur-xl">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                className={cn("block px-4 py-3 rounded-xl text-sm font-semibold transition-colors",
                  pathname === link.href ? "bg-white/10 text-white" : "text-slate-400 hover:text-white hover:bg-white/5"
                )}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
