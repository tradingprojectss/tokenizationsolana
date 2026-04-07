"use client";

import { FC, ReactNode } from "react";
import { WalletProvider } from "./WalletProvider";
import { Navbar } from "./Navbar";
import { Building2 } from "lucide-react";
import Link from "next/link";
import { LangProvider, useLang } from "@/lib/LangContext";
import { CampaignProvider } from "@/lib/campaignStore";

interface Props { children: ReactNode }

const Footer = () => {
  const { t } = useLang();
  return (
    <footer className="border-t border-white/5 bg-[#070a12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-extrabold text-white">Home<span className="text-blue-400">Crowd</span></span>
            </div>
            <p className="text-sm text-slate-500 max-w-md">
              Платформа токенизированного краудфандинга недвижимости на Solana.
            </p>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mt-4 w-fit">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs font-bold text-emerald-400">Solana Devnet</span>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-300 mb-3">{t("footer.platform")}</h3>
            <div className="space-y-2.5">
              {[
                { href: "/properties", label: t("nav.properties") },
                { href: "/create", label: t("footer.create_campaign") },
                { href: "/dashboard", label: t("nav.portfolio") },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="block text-sm text-slate-500 hover:text-blue-400 transition-colors font-medium">{link.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-300 mb-3">{t("footer.ecosystem")}</h3>
            <div className="space-y-2.5">
              {[
                { href: "https://solana.com", label: "Solana" },
                { href: "https://aifc.kz", label: "AIFC" },
                { href: "https://kase.kz", label: "KASE" },
              ].map((link) => (
                <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="block text-sm text-slate-500 hover:text-blue-400 transition-colors font-medium">{link.label}</a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">&copy; 2026 HomeCrowd. Decentrathon 5.0</p>
          <p className="text-xs text-slate-600">Powered by Solana &middot; KASE &middot; AIFC</p>
        </div>
      </div>
    </footer>
  );
};

export const ClientProviders: FC<Props> = ({ children }) => {
  return (
    <LangProvider>
      <CampaignProvider>
        <WalletProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </WalletProvider>
      </CampaignProvider>
    </LangProvider>
  );
};
