/**
 * Barcha marshrutlar shu yerda. Komponentlarda `to="/products"` yozilmaydi —
 * `ROUTES.products` yoki path helper'i ishlatiladi.
 */
export const ROUTES = {
  dashboard: '/dashboard',

  products: '/products',
  productNew: '/products/new',
  /** :id — tovar id'si */
  product: '/products/:id',

  categories: '/categories',
  /** :catId/:subId — kategoriya ichidagi subkategoriya tovarlari */
  subcategory: '/categories/:catId/:subId',

  sale: '/sale',
  saleNew: '/sale/new',
  sale_: '/sale/:id',
  salePicker: '/sale/:id/picker',

  news: '/news',
  newsNew: '/news/new',
  news_: '/news/:id',
  newsPicker: '/news/:id/picker',

  /** :tab — socials | locations | contacts | services | colors */
  store: '/store/:tab',
  settings: '/settings',
  schema: '/schema',
} as const;

/* ——— path helper'lar ——— */

export const productPath = (id: string) => `/products/${id}`;
export const subcategoryPath = (catId: string, subId: string) => `/categories/${catId}/${subId}`;
export const salePath = (id: string) => `/sale/${id}`;
export const salePickerPath = (id: string) => `/sale/${id}/picker`;
export const newsPath = (id: string) => `/news/${id}`;
export const newsPickerPath = (id: string) => `/news/${id}/picker`;
export const storePath = (tab: string) => `/store/${tab}`;
