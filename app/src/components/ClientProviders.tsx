"use client";

import { FC, ReactNode } from "react";
import { WalletProvider } from "./WalletProvider";
import { Navbar } from "./Navbar";

interface Props {
  children: ReactNode;
}

export const ClientProviders: FC<Props> = ({ children }) => {
  return (
    <WalletProvider>
      <Navbar />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <p className="text-sm text-slate-500">
              &copy; 2026 HomeCrowd. Built on Solana.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://solana.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-500 hover:text-blue-600 transition-colors"
              >
                Powered by Solana
              </a>
            </div>
          </div>
        </div>
      </footer>
    </WalletProvider>
  );
};
