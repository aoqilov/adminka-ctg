import type { CatalogItem } from '@/features/products/types';
import type { Id } from '@/types/common';

/** 0 — Основное · 1 — Цвет и размер · 2 — Цена и публикация */
export type EditorStep = 0 | 1 | 2;

/** Медиатека elementi — mock bosqichda faqat id va yorliq */
export type MediaAsset = {
  id: string;
  label: string;
};

/** Maydon kaliti → ruscha xato matni */
export type ProductErrors = Partial<Record<ProductErrorKey, string>>;

export type ProductErrorKey =
  | 'nameRu'
  | 'subcategoryId'
  | 'descriptionRu'
  | 'price'
  | 'rentPrice'
  | 'rentDays'
  | 'colorName'
  | 'variants'
  | 'silhouette'
  | 'sizeRu'
  | 'sizeLabel';

export type EditorState = {
  /** Tahrirlanayotgan tovar id'si; yangi tovarda `null` */
  id: Id | null;
  subId: Id;
  subName: string;
  step: EditorStep;
  /** Save/Next bosilganidan keyin xatolarni ko'rsatish */
  touched: boolean;
  data: CatalogItem;
};
