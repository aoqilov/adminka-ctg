import type { PromoItem } from '@/features/promotions/types';
import type { Id, Status } from '@/types/common';

/**
 * Yangilik. Aksiyadan farqi: bog'langan tovarlarda chegirma ko'rsatilmaydi
 * (`discount` har doim 0) — shuning uchun ikkalasi bitta editor'dan foydalanadi.
 */
export type Post = {
  id: Id;
  titleRu: string;
  slug: string;
  kicker: string;
  excerptRu: string;
  from: string;
  to: string;
  status: Status;
  items: PromoItem[];
};
