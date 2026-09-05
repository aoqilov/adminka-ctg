import type { ProductErrorKey, ProductErrors } from '@/features/product-editor/types';
import type { CatalogItem } from '@/features/products/types';
import { toNumber } from '@/lib/format';

/** Har qadamda tekshiriladigan maydonlar */
export const STEP_ERROR_KEYS: readonly (readonly ProductErrorKey[])[] = [
  ['nameRu', 'subcategoryId', 'descriptionRu'],
  ['sizes', 'sizeLabels', 'variants', 'variantColor', 'variantPhotos'],
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

  if (!d.variants.length) errors.variants = 'Добавьте минимум один вариант';
  if (d.variants.some((v) => !v.colorName.trim())) {
    errors.variantColor = 'У каждого варианта должен быть указан цвет';
  }
  if (d.variants.some((v) => v.media.length < 1)) {
    errors.variantPhotos = 'Добавьте минимум одно фото для каждого варианта';
  }

  if (d.kind === 'dress') {
    if (!d.variants.some((v) => v.sizes.length)) {
      errors.sizes = 'Выберите хотя бы один размер у варианта';
    }
  } else if (!d.oneSize && !d.sizeLabels.length) {
    errors.sizeLabels = 'Укажите размеры или включите «Один размер»';
  }

  return errors;
}
