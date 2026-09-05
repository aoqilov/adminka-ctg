import type { Id, Status } from '@/types/common';

/** Aksiyaga kiritilgan tovar va uning chegirmasi */
export type PromoItem = {
  pid: Id;
  /** 0–90 % */
  discount: number;
};

export type Promo = {
  id: Id;
  titleRu: string;
  slug: string;
  kicker: string;
  /** HTML — rich editor natijasi */
  excerptRu: string;
  from: string;
  to: string;
  status: Status;
  items: PromoItem[];
};

/** Aksiya editori 2 qadam: ma'lumot → tovarlar */
export type PromoStep = 0 | 1;

export type PromoEditorState = {
  id: Id | null;
  step: PromoStep;
  data: Promo;
};

/** Tovar ko'rsatkichlari — editorda "faqat o'qish" bloki */
export type ProductPromoInfo = {
  title: string;
  discount: number;
  status: Status;
};
