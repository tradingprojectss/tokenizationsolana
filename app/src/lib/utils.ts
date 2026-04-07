import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatUSDC(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount / 1_000_000);
}

export function formatTokens(amount: number): string {
  return new Intl.NumberFormat("en-US").format(amount);
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

export function calculateProgress(sold: number, total: number): number {
  if (total === 0) return 0;
  return Math.min((sold / total) * 100, 100);
}

export function daysRemaining(deadline: number): number {
  const now = Math.floor(Date.now() / 1000);
  const remaining = deadline - now;
  return Math.max(0, Math.ceil(remaining / 86400));
}
