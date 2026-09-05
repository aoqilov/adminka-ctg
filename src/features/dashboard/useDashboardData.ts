import { useMemo } from 'react';

import type {
  ChannelStat,
  RankedRow,
  RankedTile,
  StatTile,
} from '@/features/dashboard/types';
import { PRODUCTS, formatCompact, formatNumber, plural } from '@/lib/format';
import { useCatalogStore, useFlatProducts } from '@/store/useCatalogStore';

/** Mock ko'rsatkichlar SKU'dan barqaror hosil qilinadi — har renderda bir xil */
function seedOf(value: string): number {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) hash = (hash * 31 + value.charCodeAt(i)) % 9973;
  return hash;
}

const CHANNELS: readonly { label: string; value: number; note: string }[] = [
  { label: 'Telegram', value: 1840, note: 'сообщений' },
  { label: 'Звонок', value: 1120, note: 'вызовов' },
  { label: 'Instagram Direct', value: 760, note: 'сообщений' },
  { label: 'WhatsApp', value: 430, note: 'сообщений' },
  { label: 'Форма на сайте', value: 210, note: 'заявок' },
];

export function useDashboardData() {
  const cats = useCatalogStore((s) => s.cats);
  const products = useCatalogStore((s) => s.products);
  const flat = useFlatProducts();

  return useMemo(() => {
    const rows = flat.map((p) => {
      const base = seedOf(`${p.sku}v`);
      return { ...p, views: 400 + ((base * 3) % 9200), favs: 20 + (base % 780) };
    });

    const tile = (
      p: (typeof rows)[number],
      metric: number,
      metricLabel: string,
      rank: number,
    ): RankedTile => ({
      id: p.id,
      rank: String(rank).padStart(2, '0'),
      name: p.name,
      path: p.path,
      metric: formatCompact(metric),
      metricLabel,
      catId: p.catId,
      subId: p.subId,
    });

    const top = [...rows]
      .sort((a, b) => b.views - a.views)
      .slice(0, 30)
      .map((p, i) => tile(p, p.views, 'просмотров', i + 1));

    const favourites = [...rows]
      .sort((a, b) => b.favs - a.favs)
      .slice(0, 30)
      .map((p, i) => tile(p, p.favs, 'в избранном', i + 1));

    const catAgg = cats
      .map((c) => {
        const list = rows.filter((p) => p.catId === c.id);
        return {
          id: c.id,
          name: c.name,
          views: list.reduce((acc, p) => acc + p.views, 0),
          count: list.length,
        };
      })
      .sort((a, b) => b.views - a.views);
    const catMax = Math.max(1, ...catAgg.map((c) => c.views));

    const catRows: RankedRow[] = catAgg.map((c, i) => ({
      id: c.id,
      catId: c.id,
      rank: String(i + 1).padStart(2, '0'),
      name: c.name,
      views: `${formatCompact(c.views)} просмотров`,
      count: plural(c.count, PRODUCTS),
      bar: Math.round((c.views / catMax) * 100),
    }));

    const subAgg: {
      id: string;
      catId: string;
      name: string;
      path: string;
      views: number;
      count: number;
    }[] = [];

    cats.forEach((c) =>
      c.subs.forEach((s) => {
        const list = rows.filter((p) => p.subId === s.id);
        subAgg.push({
          id: s.id,
          catId: c.id,
          name: s.name,
          path: c.name,
          views: list.reduce((acc, p) => acc + p.views, 0),
          count: list.length,
        });
      }),
    );
    subAgg.sort((a, b) => b.views - a.views);
    const subMax = Math.max(1, ...subAgg.map((s) => s.views));

    const subRows: RankedRow[] = subAgg.map((s, i) => ({
      id: s.id,
      catId: s.catId,
      rank: String(i + 1).padStart(2, '0'),
      name: s.name,
      path: s.path,
      views: formatCompact(s.views),
      count: plural(s.count, PRODUCTS),
      bar: Math.round((s.views / subMax) * 100),
    }));

    const channelTotal = CHANNELS.reduce((acc, c) => acc + c.value, 0);
    const channels: ChannelStat[] = CHANNELS.map((c) => ({
      label: c.label,
      note: c.note,
      value: formatNumber(c.value),
      pct: `${Math.round((c.value / channelTotal) * 100)}%`,
      bar: Math.round((c.value / CHANNELS[0].value) * 100),
    }));

    const productTotal = Object.values(products).reduce((acc, list) => acc + list.length, 0);
    const lowStock = Object.values(products)
      .flat()
      .filter((p) => p.stock !== 'In Stock').length;

    const stats: StatTile[] = [
      { label: 'Категории', value: cats.length, delta: 'активных' },
      {
        label: 'Подкатегории',
        value: cats.reduce((acc, c) => acc + c.subs.length, 0),
        delta: '+2 за месяц',
      },
      { label: 'Товары', value: productTotal, delta: '+6 за неделю' },
      { label: 'Мало на складе', value: lowStock, delta: 'требует внимания' },
    ];

    return {
      stats,
      top,
      favourites,
      catRows,
      subRows,
      channels,
      channelTotal: `${formatNumber(channelTotal)} обращений за 30 дней`,
    };
  }, [cats, products, flat]);
}
