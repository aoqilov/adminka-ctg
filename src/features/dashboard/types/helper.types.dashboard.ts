import type { Id } from '@/types/common';

export type StatTile = {
  label: string;
  value: number | string;
  delta: string;
};

/** Top-30 ro'yxatidagi karta */
export type RankedTile = {
  id: Id;
  rank: string;
  name: string;
  path: string;
  metric: string;
  metricLabel: string;
  catId: Id;
  subId: Id;
};

/** Kategoriya/subkategoriya bo'yicha tashriflar */
export type RankedRow = {
  id: Id;
  rank: string;
  name: string;
  path?: string;
  views: string;
  count: string;
  /** 0–100 */
  bar: number;
  catId: Id;
};

/** "Как связываются клиенты" bloki */
export type ChannelStat = {
  label: string;
  value: string;
  pct: string;
  bar: number;
  note: string;
};
