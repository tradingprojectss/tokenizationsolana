import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClientProviders } from "@/components/ClientProviders";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HomeCrowd — Tokenized Real Estate on Solana",
  description:
    "Buy your home without a mortgage. Crowdfund real estate with tokenized ownership on Solana.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 font-sans">
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}
