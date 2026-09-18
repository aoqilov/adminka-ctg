import type { DressSize } from '@/features/products/types';

/** RU o'lcham to'ri: 40–56, har birida bust/waist/hips (sm) */
export const SIZE_GRID: readonly DressSize[] = [
  [40, 84, 66, 92],
  [42, 88, 70, 96],
  [44, 92, 74, 100],
  [46, 96, 78, 104],
  [48, 100, 82, 108],
  [50, 104, 86, 112],
  [52, 108, 90, 116],
  [54, 112, 94, 120],
  [56, 116, 98, 124],
].map(([ru, bust, waist, hips]) => ({ ru, bust, waist, hips, label: `RU ${ru}` }));

export const FABRICS = [
  'Silk',
  'French lace',
  'Tulle',
  'Mikado',
  'Organza',
  'Crepe',
  'Chiffon',
] as const;

export const DECORATIONS = [
  'Beading',
  'Embroidery',
  'Pearls',
  'Sequins',
  'Appliqué',
  '3D flowers',
] as const;

export const TAGS = ['bestseller', 'new-arrival', 'sale', 'exclusive', 'rental'] as const;

export const ACC_SIZES = ['XS', 'S', 'M', 'L', 'XL', '36', '37', '38', '39', '40'] as const;

export const SILHOUETTES = ['A-Line', 'Mermaid', 'Ballgown', 'Sheath', 'Empire'] as const;
export const NECKLINES = ['V', 'Sweetheart', 'Bateau', 'Off-shoulder', 'High'] as const;
export const SLEEVE_TYPES = ['Sleeveless', 'Cap', 'Long', 'Detachable'] as const;
export const TRAIN_LENGTHS = ['None', 'Sweep', 'Chapel', 'Cathedral'] as const;
export const CORSET_TYPES = ['None', 'Lace-up', 'Zip', 'Boned'] as const;
export const ACCESSORY_TYPES = ['Veil', 'Shoes', 'Jewelry', 'Hijab', 'Belt'] as const;

export const SEASONS = ['All season', 'Spring/Summer', 'Autumn/Winter'] as const;

/** Tovardagi rasm variantlari soni — statik */
export const PRODUCT_VARIANTS = 3;

/** Bitta variantga ruxsat etilgan maksimal foto soni */
export const MAX_VARIANT_PHOTOS = 6;

/** Медиатека mock hajmi */
export const MEDIA_POOL_SIZE = 12;
