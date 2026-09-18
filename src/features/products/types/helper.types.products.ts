import type { Id, Status } from '@/types/common';

export type ProductKind = 'dress' | 'accessory';
export type StockStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';
export type Currency = 'USD' | 'UZS';

export type Silhouette = 'A-Line' | 'Mermaid' | 'Ballgown' | 'Sheath' | 'Empire';
export type Neckline = 'V' | 'Sweetheart' | 'Bateau' | 'Off-shoulder' | 'High';
export type SleeveType = 'Sleeveless' | 'Cap' | 'Long' | 'Detachable';
export type TrainLength = 'None' | 'Sweep' | 'Chapel' | 'Cathedral';
export type CorsetType = 'None' | 'Lace-up' | 'Zip' | 'Boned';
export type AccessoryType = 'Veil' | 'Shoes' | 'Jewelry' | 'Hijab' | 'Belt';

/** RU o'lcham to'ri qatori — obhvatlar santimetrda */
export type DressSize = {
  ru: number;
  bust: number;
  waist: number;
  hips: number;
  label: string;
};

/**
 * Rasm varianti — bitta modelning bitta suratga olish to'plami.
 * Rang va o'lcham variantda emas, tovarning o'zida: variant faqat fotolarni
 * guruhlaydi. Tovarda variantlar soni qat'iy — `PRODUCT_VARIANTS`.
 */
export type Variant = {
  id: Id;
  /** Медиатека fayl id'lari, maksimum `MAX_VARIANT_PHOTOS` ta */
  media: string[];
};

type ItemBase = {
  id: Id;
  sku: string;
  nameRu: string;
  nameUz: string;
  slug: string;
  descriptionRu: string;
  brand: string;
  categoryId: Id;
  subcategoryId: Id;
  price: string;
  oldPrice: string;
  currency: Currency;
  status: Status;
  isFeatured: boolean;
  isNew: boolean;
  tags: string[];
  composition: string;
  careRu: string;
  madeIn: string;
  season: string;
  deliveryDays: string;
  saleAvailable: boolean;
  rentalAvailable: boolean;
  rentPrice: string;
  rentDays: string;
  sortOrder: string;
  /**
   * Saytda fotolar xiralashtiriladi, nom va narx ko'rinib turadi.
   * Juda qimmat modellarni ochiq ko'rsatmaslik uchun — salon egasi qaroriga ko'ra.
   */
  isBlurred: boolean;
  /**
   * Rang — bitta tovarga bitta rang. Salon har bir modelni alohida nusxada
   * oladi, shuning uchun rang varianti emas, tovarning o'z maydoni.
   * `colorName` palitradan (Магазин ▸ Цвета), `hex` esa o'sha rangning nusxasi.
   */
  colorName: string;
  hex: string;
  /** Rasm variantlari — qat'iy 3 ta, har birida 6 tagacha foto */
  variants: Variant[];
  /** Omborda necha dona bor */
  qty: number;
};

export type Dress = ItemBase & {
  kind: 'dress';
  silhouette: Silhouette | '';
  neckline: Neckline | '';
  sleeveType: SleeveType | '';
  trainLength: TrainLength;
  fabricDetails: string[];
  decorations: string[];
  corsetType: CorsetType;
  hasLining: boolean;
  /** RU o'lcham — bitta tovarga bitta o'lcham; tanlanmagan bo'lsa `null` */
  sizeRu: number | null;
};

export type Accessory = ItemBase & {
  kind: 'accessory';
  accessoryType: AccessoryType | '';
  oneSize: boolean;
  /** Bitta o'lcham yorlig'i — `oneSize` yoqilganda bo'sh qoladi */
  sizeLabel: string;
  material: string;
};

export type CatalogItem = Dress | Accessory;

/**
 * Ro'yxatlarda ko'rsatiladigan yengil qator. Mock bosqichda store shu
 * shaklni saqlaydi; editor saqlaganda `CatalogItem` dan shunga aylantiriladi.
 */
export type ProductRow = {
  id: Id;
  name: string;
  sku: string;
  fabric: string;
  price: number;
  stock: StockStatus;
  /** Tovar rangi — bitta tovarga bitta rang */
  color: string;
  /** Saytda yashirilgan, lekin bazada qoladi */
  isHidden?: boolean;
  /** Saytda fotolari xiralashtiriladi, nomi ko'rinadi */
  isBlurred?: boolean;
};

/** Kategoriya/subkategoriya yo'li bilan boyitilgan qator */
export type FlatProduct = ProductRow & {
  catId: Id;
  subId: Id;
  /** "Свадебные платья / A-Line Dresses" */
  path: string;
};

/** Products bo'limining narx/rang filtri */
export type ProductFilter = {
  /** 'all' | kategoriya id | 'hidden' | 'selected' */
  scope: string;
  subScope: string;
  priceMin: number | null;
  priceMax: number | null;
  color: string | null;
};
