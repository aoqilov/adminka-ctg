import { FiHeart } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import { CusProgressBar, CusStatCard, CusTable, CusTableHead, CusTableRow } from '@/components/ui';
import { ROUTES, subcategoryPath } from '@/constants/routes';
import type { RankedTile } from '@/features/dashboard/types';
import { useDashboardData } from '@/features/dashboard/useDashboardData';

/** Gorizontal top-30 lentasi */
function RankStrip({
  tiles,
  withHeart,
  onOpen,
}: {
  tiles: RankedTile[];
  withHeart?: boolean;
  onOpen: (tile: RankedTile) => void;
}) {
  return (
    <div className="mt-3 flex gap-2.5 overflow-x-auto pb-2.5">
      {tiles.map((t) => (
        <div
          key={t.id}
          onClick={() => onOpen(t)}
          className="w-37.5 shrink-0 cursor-pointer overflow-hidden rounded-sm border border-border bg-surface"
        >
          <div className="relative aspect-[3/4] bg-photo">
            <span className="absolute left-2 top-1.5 font-serif text-lg text-primary-hover">
              {t.rank}
            </span>
            {withHeart && <FiHeart size={13} className="absolute right-2 top-2 text-primary" />}
          </div>

          <div className="flex flex-col gap-1 px-2.5 pb-3 pt-2">
            <div className="truncate text-tiny font-medium">{t.name}</div>
            <div className="truncate text-micro text-subtle">{t.path}</div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-[17px] text-primary-hover">{t.metric}</span>
              <span className="text-micro text-subtle">{t.metricLabel}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

const SUB_COLS = '34px minmax(0,1.6fr) minmax(0,1.4fr) 64px';

export default function FeatureDashboard() {
  const navigate = useNavigate();
  const { stats, top, favourites, catRows, subRows, channels, channelTotal } = useDashboardData();

  const openProduct = (t: RankedTile) => navigate(subcategoryPath(t.catId, t.subId));

  return (
    <div>
      <h1 className="mb-1 font-serif text-[32px] leading-tight">Dashboard</h1>
      <p className="mb-6 text-muted">Последние 30 дней — просмотры, избранное и обращения.</p>

      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => (
          <CusStatCard key={s.label} label={s.label} value={s.value} delta={s.delta} />
        ))}
      </div>

      <div className="mt-8 flex items-baseline gap-3">
        <h2 className="font-serif text-[22px]">Самые просматриваемые</h2>
        <span className="text-mini uppercase tracking-[0.12em] text-subtle">Топ 30 · 30 дней</span>
      </div>
      <RankStrip tiles={top} onOpen={openProduct} />

      <div className="mt-6 flex items-baseline gap-3">
        <h2 className="font-serif text-[22px]">Чаще всего в избранном</h2>
        <span className="text-mini uppercase tracking-[0.12em] text-subtle">Топ 30</span>
      </div>
      <RankStrip tiles={favourites} withHeart onOpen={openProduct} />

      <div className="mt-7 grid grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] items-start gap-5">
        <div className="min-w-0">
          <h2 className="mb-3 font-serif text-[22px]">Категории по посещениям</h2>
          <CusTable>
            {catRows.map((c) => (
              <div
                key={c.id}
                onClick={() => navigate(`${ROUTES.products}?scope=${c.catId}`)}
                className="cursor-pointer border-b border-border-subtle px-4 py-3 last:border-b-0 transition-colors hover:bg-primary-soft"
              >
                <div className="flex items-baseline gap-2.5">
                  <span className="text-mini text-subtle">{c.rank}</span>
                  <span className="min-w-0 truncate text-body font-medium">{c.name}</span>
                  <span className="ml-auto shrink-0 text-tiny text-primary-hover">{c.views}</span>
                </div>
                <CusProgressBar className="mt-2" value={c.bar} />
                <div className="mt-1.5 text-micro text-subtle">{c.count}</div>
              </div>
            ))}
          </CusTable>
        </div>

        <div className="min-w-0">
          <h2 className="mb-3 font-serif text-[22px]">Подкатегории по посещениям</h2>
          <CusTable>
            <CusTableHead cols={SUB_COLS}>
              <div>#</div>
              <div>Подкатегория</div>
              <div>Активность</div>
              <div className="text-right">Визиты</div>
            </CusTableHead>

            {subRows.map((s) => (
              <CusTableRow
                key={s.id}
                cols={SUB_COLS}
                onClick={() => navigate(subcategoryPath(s.catId, s.id))}
              >
                <div className="text-mini text-subtle">{s.rank}</div>
                <div className="min-w-0">
                  <div className="truncate font-medium">{s.name}</div>
                  <div className="truncate text-micro text-subtle">
                    {s.path} · {s.count}
                  </div>
                </div>
                <CusProgressBar value={s.bar} tone="accent-2" />
                <div className="truncate text-right font-semibold">{s.views}</div>
              </CusTableRow>
            ))}
          </CusTable>
        </div>
      </div>

      <div className="mt-7">
        <div className="mb-3 flex items-baseline gap-3">
          <h2 className="font-serif text-[22px]">Как связываются клиенты</h2>
          <span className="text-mini text-subtle">{channelTotal}</span>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3.5">
          {channels.map((c) => (
            <div key={c.label} className="rounded-sm border border-border bg-surface p-4">
              <div className="truncate text-micro uppercase tracking-[0.12em] text-subtle">
                {c.label}
              </div>
              <div className="mt-1.5 flex items-baseline gap-2">
                <span className="min-w-0 truncate font-serif text-[28px]">{c.value}</span>
                <span className="shrink-0 text-tiny text-primary-hover">{c.pct}</span>
              </div>
              <CusProgressBar className="mt-2.5" value={c.bar} />
              <div className="mt-1.5 text-micro text-subtle">{c.note}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
