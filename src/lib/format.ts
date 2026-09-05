import { APP_LOCALE } from '@/constants/app';

/** "$4 200" — dizayndagi narx formati */
export function formatPrice(value: number): string {
  return `$${value.toLocaleString('en-US')}`;
}

/** 9 200 → "9.2k" — dashboard statistikasi uchun */
export function formatCompact(value: number): string {
  if (value < 1000) return String(value);
  return `${(value / 1000).toFixed(1).replace('.0', '')}k`;
}

/** Ming ajratgichli oddiy son */
export function formatNumber(value: number): string {
  return value.toLocaleString(APP_LOCALE);
}

/** Matndan raqam ajratib olish — narx maydonlari uchun */
export function toNumber(value: string | number): number {
  return Number(String(value).replace(/[^0-9.]/g, '')) || 0;
}

/** "2026-09-01 → 2026-10-15" */
export function formatDateRange(from: string, to: string): string {
  return `${from} → ${to}`;
}

/**
 * Ruscha ko'plik shakli: plural(1, ['товар', 'товара', 'товаров']) → "1 товар"
 * Formalar tartibi: [1, 2–4, 5+]
 */
export function plural(count: number, forms: readonly [string, string, string]): string {
  const n = Math.abs(count) % 100;
  const n1 = n % 10;

  if (n > 10 && n < 20) return `${count} ${forms[2]}`;
  if (n1 > 1 && n1 < 5) return `${count} ${forms[1]}`;
  if (n1 === 1) return `${count} ${forms[0]}`;
  return `${count} ${forms[2]}`;
}

export const PRODUCTS = ['товар', 'товара', 'товаров'] as const;
export const SUBCATEGORIES = ['подкатегория', 'подкатегории', 'подкатегорий'] as const;
