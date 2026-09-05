import type { Id } from '@/types/common';

export type StoreTab = 'socials' | 'locations' | 'contacts' | 'services' | 'colors';

export type Social = {
  id: Id;
  platform: string;
  handle: string;
  url: string;
  /** Platforma brend rangi — foydalanuvchi kiritadi, token emas */
  hex: string;
  active: boolean;
};

export type StoreLocation = {
  id: Id;
  name: string;
  address: string;
  note: string;
  hours: string;
  phone: string;
  /** Asosiy salon — saytda birinchi ko'rsatiladi */
  main: boolean;
};

export type Contact = {
  id: Id;
  name: string;
  role: string;
  phone: string;
  hours: string;
  telegram: boolean;
  tgUrl: string;
};

export type Service = {
  id: Id;
  /** "Аренда", "Продажа", "Пошив"… */
  icon: string;
  title: string;
  kicker: string;
  body: string;
  active: boolean;
  /** Saytda birinchi bo'lib ochiq turadi */
  open: boolean;
};

/** Магазин ▸ Цвета — mahsulot variantlarida select bo'lib chiqadi */
export type PaletteColor = {
  id: Id;
  name: string;
  hex: string;
};

export type StoreProfile = {
  title: string;
  tagline: string;
  badgeSocial: string;
  badgeHandle: string;
};
