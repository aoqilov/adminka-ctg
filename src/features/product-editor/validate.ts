import type { ProductErrorKey, ProductErrors } from '@/features/product-editor/types';
import type { CatalogItem } from '@/features/products/types';
import { toNumber } from '@/lib/format';

/** Har qadamda tekshiriladigan maydonlar */
export const STEP_ERROR_KEYS: readonly (readonly ProductErrorKey[])[] = [
  ['nameRu', 'subcategoryId', 'descriptionRu'],
  ['colorName', 'variants', 'sizeRu', 'sizeLabel'],
  ['price', 'rentPrice', 'rentDays'],
];

/** Ruscha xato matnlari — prototipdagi `itemErrors()` bilan bir xil qoidalar */
export function validateItem(d: CatalogItem): ProductErrors {
  const errors: ProductErrors = {};

  if (!d.nameRu.trim()) errors.nameRu = 'Название (RU) обязательно';
  if (!d.categoryId || !d.subcategoryId) {
    errors.subcategoryId = 'Выберите категорию и подкатегорию';
  }
  if (d.descriptionRu.replace(/<[^>]+>/g, ' ').trim().length < 40) {
    errors.descriptionRu = 'Описание должно содержать минимум 40 символов';
  }

  if (d.saleAvailable && !(toNumber(d.price) > 0)) {
    errors.price = 'Цена продажи должна быть больше 0';
  }
  if (!d.saleAvailable && !d.rentalAvailable) {
    errors.price = 'Включите продажу или аренду';
  }
  if (d.rentalAvailable && !(toNumber(d.rentPrice) > 0)) {
    errors.rentPrice = 'Укажите сумму аренды';
  }
  if (d.rentalAvailable && !(toNumber(d.rentDays) > 0)) {
    errors.rentDays = 'Укажите срок аренды в днях';
  }

  if (!d.colorName.trim()) errors.colorName = 'Выберите цвет товара';
  if (!d.variants.some((v) => v.media.length)) {
    errors.variants = 'Добавьте минимум одно фото';
  }

  if (d.kind === 'dress') {
    if (d.sizeRu === null) errors.sizeRu = 'Выберите размер товара';
  } else if (!d.oneSize && !d.sizeLabel) {
    errors.sizeLabel = 'Укажите размер или включите «Один размер»';
  }

  return errors;
}
