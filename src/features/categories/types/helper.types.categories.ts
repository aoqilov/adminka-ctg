import type { Id, Status } from '@/types/common';

export type Subcategory = {
  id: Id;
  name: string;
  status: Status;
  /** Saytda yashirilgan */
  hidden?: boolean;
};

export type Category = {
  id: Id;
  name: string;
  /** "Bridal", "Modest", "Footwear" — kartadagi kicker */
  tag: string;
  subs: Subcategory[];
  hidden?: boolean;
};

/** Kategoriya/subkategoriya modalining formasi */
export type CategoryFormData = {
  name: string;
};
