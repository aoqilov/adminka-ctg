import { PRODUCT_VARIANTS } from '@/constants/catalog';
import { DEFAULT_PALETTE } from '@/constants/store';
import type { CatalogItem, ProductKind, ProductRow, Variant } from '@/features/products/types';
import { makeId } from '@/lib/slug';
import type { Id } from '@/types/common';

/** Bo'sh variantlar — soni qat'iy, faqat fotolari to'ldiriladi */
const emptyVariants = (): Variant[] =>
  Array.from({ length: PRODUCT_VARIANTS }, () => ({ id: makeId('v_'), media: [] }));

/** Bo'sh tovar — dizayn prototipidagi `newItem()` bilan bir xil qiymatlar */
export function newItem(kind: ProductKind, categoryId: Id, subcategoryId: Id): CatalogItem {
  const base = {
    id: '',
    sku: '',
    nameRu: '',
    nameUz: '',
    slug: '',
    descriptionRu: '',
    brand: 'Amira Bridal',
    categoryId,
    subcategoryId,
    price: '',
    oldPrice: '',
    currency: 'USD' as const,
    status: 'Draft' as const,
    isFeatured: false,
    isNew: true,
    tags: [],
    composition: '',
    careRu: '',
    madeIn: 'Uzbekistan',
    season: 'All season',
    deliveryDays: '14',
    saleAvailable: true,
    rentalAvailable: false,
    rentPrice: '',
    rentDays: '3',
    sortOrder: '0',
    isBlurred: false,
    colorName: '',
    hex: '#F1E9E2',
    variants: emptyVariants(),
    qty: 1,
  };

  if (kind === 'dress') {
    return {
      ...base,
      kind: 'dress',
      silhouette: '',
      neckline: '',
      sleeveType: '',
      trainLength: 'None',
      fabricDetails: [],
      decorations: [],
      corsetType: 'None',
      hasLining: true,
      sizeRu: null,
    };
  }

  return {
    ...base,
    kind: 'accessory',
    accessoryType: '',
    oneSize: true,
    sizeLabel: '',
    material: '',
  };
}

/**
 * Mavjud ro'yxat qatoridan editor uchun to'liq ob'ekt yasaydi.
 * Mock bosqichda store faqat `ProductRow` saqlaydi, shuning uchun
 * qolgan maydonlar mos qiymatlar bilan to'ldiriladi.
 */
export function itemFromRow(
  row: ProductRow,
  kind: ProductKind,
  categoryId: Id,
  subcategoryId: Id,
): CatalogItem {
  const draft = newItem(kind, categoryId, subcategoryId);

  const common = {
    id: row.id,
    isBlurred: !!row.isBlurred,
    nameRu: row.name,
    sku: row.sku,
    composition: row.fabric,
    price: String(row.price),
    descriptionRu: `<p>${row.name} — ${row.fabric}. Изысканная модель из коллекции Amira Bridal.</p>`,
    status: 'Active' as const,
    colorName: row.color,
    hex: DEFAULT_PALETTE.find((c) => c.name === row.color)?.hex ?? draft.hex,
    variants: emptyVariants().map((v, i) => (i === 0 ? { ...v, media: ['M01'] } : v)),
  };

  return draft.kind === 'dress'
    ? { ...draft, ...common, sizeRu: 44 }
    : { ...draft, ...common };
}
