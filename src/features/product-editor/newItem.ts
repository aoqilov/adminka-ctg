import type { CatalogItem, ProductKind, ProductRow } from '@/features/products/types';
import { makeId } from '@/lib/slug';
import type { Id } from '@/types/common';

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
    variants: [
      { id: makeId('v_'), colorName: '', hex: '#F1E9E2', media: [], qty: 1, sizes: [] },
    ],
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
    };
  }

  return {
    ...base,
    kind: 'accessory',
    accessoryType: '',
    oneSize: true,
    sizeLabels: [],
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

  return {
    ...draft,
    id: row.id,
    isBlurred: !!row.isBlurred,
    nameRu: row.name,
    sku: row.sku,
    composition: row.fabric,
    price: String(row.price),
    descriptionRu: `<p>${row.name} — ${row.fabric}. Изысканная модель из коллекции Amira Bridal.</p>`,
    status: 'Active',
    variants: row.colors.length
      ? row.colors.map((colorName, i) => ({
          id: makeId(`v${i}_`),
          colorName,
          hex: '#F1E9E2',
          media: [`M${String(i + 1).padStart(2, '0')}`],
          qty: 1,
          sizes: [44, 46],
        }))
      : draft.variants,
  };
}
