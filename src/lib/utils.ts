import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number | string | undefined | null): string {
  if (price === undefined || price === null) return '0.00 EGP';
  const val = typeof price === 'number' ? price : parseFloat(price);
  if (isNaN(val)) return '0.00 EGP';
  return `${val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} EGP`;
}
