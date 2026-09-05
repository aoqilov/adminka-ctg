import type { PaletteColor } from '@/features/store/types';
import type { AccentOption } from '@/features/settings/types';

/** [nom, brend rangi, URL prefiksi] */
export const SOCIAL_PLATFORMS: readonly (readonly [string, string, string])[] = [
  ['Instagram', '#C13584', 'instagram.com/'],
  ['Telegram', '#2AABEE', 't.me/'],
  ['TikTok', '#1D1F20', 'tiktok.com/@'],
  ['YouTube', '#FF0000', 'youtube.com/@'],
  ['Pinterest', '#E60023', 'pinterest.com/'],
  ['Facebook', '#1877F2', 'facebook.com/'],
  ['WhatsApp', '#25D366', 'wa.me/'],
  ['Сайт', '#5980A6', ''],
];

/** Boshlang'ich rang palitrasi — Магазин ▸ Цвета da tahrirlanadi */
export const DEFAULT_PALETTE: readonly PaletteColor[] = [
  ['Ivory', '#F1E9E2'],
  ['Champagne', '#E7D7BE'],
  ['Blush', '#EBD3D0'],
  ['Nude', '#DFC7B2'],
  ['White', '#FBFAF8'],
  ['Powder Blue', '#CFDAE6'],
  ['Sage', '#CBD5C2'],
  ['Black', '#2B2622'],
].map(([name, hex], i) => ({ id: `pc${i}`, name, hex }));

export const SERVICE_ICONS = [
  'Аренда',
  'Продажа',
  'Пошив',
  'Примерка',
  'Доставка',
  'Химчистка',
] as const;

/**
 * Settings ▸ Акцентный цвет. `hex` faqat swatch namunasi uchun —
 * haqiqiy ranglar `index.css` dagi `[data-accent]` bloklarida.
 */
export const ACCENT_OPTIONS: readonly AccentOption[] = [
  { id: 'gold', label: 'Champagne Gold', hex: '#B08D57' },
  { id: 'rose', label: 'Dusty Rose', hex: '#B07A78' },
  { id: 'sage', label: 'Sage', hex: '#7C8F72' },
  { id: 'slate', label: 'Slate Blue', hex: '#7D94B7' },
];
