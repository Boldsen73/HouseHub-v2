
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Enhanced Danish number formatting
export const formatDanishNumber = (num: number | undefined | null): string => {
  if (num === undefined || num === null || isNaN(num)) return '';
  return num.toLocaleString('da-DK');
};

// Format Danish currency
export const formatDanishCurrency = (num: number | undefined | null): string => {
  if (num === undefined || num === null || isNaN(num)) return '';
  return `${num.toLocaleString('da-DK')} kr`;
};

// Format Danish percentage
export const formatDanishPercentage = (num: number | undefined | null): string => {
  if (num === undefined || num === null || isNaN(num)) return '';
  return `${num.toLocaleString('da-DK', { minimumFractionDigits: 1, maximumFractionDigits: 2 })} %`;
};

// Parse a Danish formatted string to a number
export const parseDanishNumberString = (str: string | undefined | null): number => {
  if (!str) return NaN;
  const cleaned = String(str).replace(/[^\d]/g, '');
  if (cleaned === '') return NaN;
  return parseInt(cleaned, 10);
};
