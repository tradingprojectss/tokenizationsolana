"use client";

import { FC, ReactNode } from "react";
import { WalletProvider } from "./WalletProvider";
import { Navbar } from "./Navbar";
import { Building2 } from "lucide-react";
import Link from "next/link";

interface Props {
  children: ReactNode;
}

export const ClientProviders: FC<Props> = ({ children }) => {
  return (
    <WalletProvider>
      <Navbar />
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#070a12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Building2 className="h-5 w-5 text-white" />
                </div>
                <span className="text-lg font-bold text-white">
                  Home<span className="text-gradient">Crowd</span>
                </span>
              </div>
              <p className="text-sm text-slate-500 max-w-md">
                Платформа токенизированного краудфандинга недвижимости на Solana.
                Своя квартира без ипотеки — экономия до $131,000 по сравнению с банком.
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs font-medium text-emerald-400">Solana Devnet</span>
                </div>
              </div>
            </div>

            {/* Links */}
            <div>
              <h3 className="text-sm font-semibold text-slate-300 mb-3">Платформа</h3>
              <div className="space-y-2">
                {[
                  { href: "/properties", label: "Квартиры" },
                  { href: "/create", label: "Создать кампанию" },
                  { href: "/dashboard", label: "Портфолио" },
                ].map((link) => (
                  <Link key={link.href} href={link.href} className="block text-sm text-slate-500 hover:text-blue-400 transition-colors">
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-slate-300 mb-3">Экосистема</h3>
              <div className="space-y-2">
                {[
                  { href: "https://solana.com", label: "Solana" },
                  { href: "https://aifc.kz", label: "AIFC" },
                  { href: "https://kase.kz", label: "KASE" },
                ].map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="block text-sm text-slate-500 hover:text-blue-400 transition-colors">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-slate-600">
              &copy; 2026 HomeCrowd. Decentrathon 5.0 — RWA Tokenization Track
            </p>
            <p className="text-xs text-slate-600">
              Powered by Solana &middot; KASE &middot; AIFC
            </p>
          </div>
        </div>
      </footer>
    </WalletProvider>
  );
};
