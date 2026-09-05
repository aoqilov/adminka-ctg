import type { FlatProduct } from '@/features/products/types';

/** Uch ko'rinish (grid · table · gallery) uchun umumiy props */
export type ProductListProps = {
  items: FlatProduct[];
  onEdit: (product: FlatProduct) => void;
  onRemove: (product: FlatProduct) => void;
  onToggleHidden: (product: FlatProduct) => void;
  onToggleBlurred: (product: FlatProduct) => void;
  /** Ta'rif o'rniga kategoriya yo'lini ko'rsatish (Products bo'limi) */
  showPath?: boolean;
};
