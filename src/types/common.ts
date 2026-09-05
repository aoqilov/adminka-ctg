/**
 * Bir nechta feature kesishgan joyda ishlatiladigan primitiv tiplar.
 * Domen tiplari bu yerda EMAS — ular o'z feature'ining `types/` papkasida.
 */

/** Mock bosqichda id — string yoki number bo'lishi mumkin. */
export type Id = string;

/** Kategoriya, tovar, aksiya va yangilik uchun umumiy nashr holati. */
export type Status = 'Draft' | 'Active' | 'Archived';

export const STATUS_OPTIONS: readonly Status[] = ['Draft', 'Active', 'Archived'];

/** Ro'yxatlarni ko'rsatish rejimi — bo'limlarga qarab qismi ishlatiladi. */
export type ViewMode = 'grid' | 'table' | 'gallery';
