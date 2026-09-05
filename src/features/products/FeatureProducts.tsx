import { useMemo, useState } from 'react';
import { FiFilter, FiGrid, FiList } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';

import {
  CusButton,
  CusColorSwatch,
  CusConfirmModal,
  CusEmptyState,
  CusIconButton,
  CusRangeSlider,
  useToast,
} from '@/components/ui';
import ProductGallery from '@/features/products/components/ProductGallery';
import ProductTable from '@/features/products/components/ProductTable';
import type { FlatProduct } from '@/features/products/types';
import { useProductActions } from '@/features/products/useProductActions';
import { PRODUCTS, formatPrice, plural } from '@/lib/format';
import { useCatalogStore, useFlatProducts } from '@/store/useCatalogStore';
import { useStoreSettingsStore } from '@/store/useStoreSettingsStore';
import { cn } from '@/utils/cn';

type View = 'gallery' | 'table';

/** Filtr chiplari qatori */
function ChipRow({
  chips,
}: {
  chips: { label: string; on: boolean; pick: () => void }[];
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {chips.map((c) => (
        <button
          key={c.label}
          type="button"
          onClick={c.pick}
          className={cn(
            'rounded-sm border px-2.5 py-1 text-mini transition-colors',
            c.on
              ? 'border-primary bg-primary text-primary-fg'
              : 'border-border bg-surface text-muted hover:border-primary',
          )}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}

export default function FeatureProducts() {
  const [params, setParams] = useSearchParams();
  const query = (params.get('q') ?? '').trim().toLowerCase();
  const scope = params.get('scope') ?? 'all';
  const subScope = params.get('sub') ?? 'all';

  const [view, setView] = useState<View>('gallery');
  const [filterOpen, setFilterOpen] = useState(false);
  const [priceMin, setPriceMin] = useState<number | null>(null);
  const [priceMax, setPriceMax] = useState<number | null>(null);
  const [color, setColor] = useState<string | null>(null);
  const [confirm, setConfirm] = useState<FlatProduct | null>(null);

  const cats = useCatalogStore((s) => s.cats);
  const all = useFlatProducts();
  const palette = useStoreSettingsStore((s) => s.palette);
  const { show } = useToast();
  const { openEditor, toggleHidden, toggleBlurred, remove } = useProductActions();

  const setScope = (next: string) => {
    const p = new URLSearchParams(params);
    p.set('scope', next);
    p.delete('sub');
    setParams(p, { replace: true });
  };

  const setSubScope = (next: string) => {
    const p = new URLSearchParams(params);
    p.set('sub', next);
    setParams(p, { replace: true });
  };

  const prices = all.map((p) => p.price);
  const floor = prices.length ? Math.min(...prices) : 0;
  const ceil = prices.length ? Math.max(...prices) : 1000;
  const min = priceMin ?? floor;
  const max = priceMax ?? ceil;

  const items = useMemo(
    () =>
      all.filter((p) => {
        if (scope === 'hidden') {
          if (!p.isHidden) return false;
        } else if (scope !== 'all') {
          if (p.catId !== scope) return false;
          if (subScope !== 'all' && p.subId !== subScope) return false;
        }

        if (p.price < min || p.price > max) return false;
        if (color && !p.colors.includes(color)) return false;

        return !query || `${p.name} ${p.sku} ${p.fabric} ${p.path}`.toLowerCase().includes(query);
      }),
    [all, scope, subScope, min, max, color, query],
  );

  const activeCat = cats.find((c) => c.id === scope);

  const onRemove = () => {
    if (!confirm) return;
    remove(confirm);
    show(`${confirm.name} удалён`);
  };

  return (
    <div>
      <div className="mb-5 flex items-end gap-4">
        <div className="min-w-0">
          <h1 className="mb-1 font-serif text-[32px] leading-tight">Товары</h1>
          <p className="text-muted">Все товары каталога с фильтрами.</p>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1.5">
          <CusIconButton
            variant="bordered"
            label="Gallery"
            active={view === 'gallery'}
            icon={<FiGrid size={14} />}
            onClick={() => setView('gallery')}
          />
          <CusIconButton
            variant="bordered"
            label="Table"
            active={view === 'table'}
            icon={<FiList size={14} />}
            onClick={() => setView('table')}
          />
          <CusButton
            variant={filterOpen ? 'primary' : 'secondary'}
            leftIcon={<FiFilter size={13} />}
            onClick={() => setFilterOpen((v) => !v)}
          >
            Фильтры
          </CusButton>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-2">
        <ChipRow
          chips={[
            { label: 'Все', on: scope === 'all', pick: () => setScope('all') },
            { label: 'Скрытые', on: scope === 'hidden', pick: () => setScope('hidden') },
          ]}
        />
        <ChipRow
          chips={cats.map((c) => ({
            label: c.name,
            on: scope === c.id,
            pick: () => setScope(c.id),
          }))}
        />
        {activeCat && (
          <ChipRow
            chips={[
              { label: 'Все подкатегории', on: subScope === 'all', pick: () => setSubScope('all') },
              ...activeCat.subs.map((s) => ({
                label: s.name,
                on: subScope === s.id,
                pick: () => setSubScope(s.id),
              })),
            ]}
          />
        )}
      </div>

      <div className="mb-3 text-mini text-subtle">
        {items.length} / {plural(all.length, PRODUCTS)}
      </div>

      <div className={cn('grid items-start gap-5', filterOpen ? 'grid-cols-[minmax(0,1fr)_240px]' : 'grid-cols-1')}>
        <div className="min-w-0">
          {items.length === 0 ? (
            <CusEmptyState
              title="Ничего не найдено"
              description="Измените фильтры или очистите поиск."
            />
          ) : view === 'table' ? (
            <ProductTable
              items={items}
              showPath
              onEdit={(p) => openEditor(p.id, p.subId)}
              onRemove={setConfirm}
              onToggleHidden={toggleHidden}
              onToggleBlurred={toggleBlurred}
            />
          ) : (
            <ProductGallery
              items={items}
              onEdit={(p) => openEditor(p.id, p.subId)}
              onRemove={setConfirm}
              onToggleHidden={toggleHidden}
              onToggleBlurred={toggleBlurred}
            />
          )}
        </div>

        {filterOpen && (
          <aside className="sticky top-0 rounded-sm border border-border bg-background p-4">
            <div className="text-micro uppercase tracking-[0.12em] text-subtle">Фильтры</div>

            <div className="mt-4">
              <CusRangeSlider
                label="Цена"
                min={floor}
                max={ceil}
                valueMin={min}
                valueMax={max}
                onChangeMin={(v) => setPriceMin(Math.min(v, max))}
                onChangeMax={(v) => setPriceMax(Math.max(v, min))}
                valueLabel={`${formatPrice(min)} — ${formatPrice(max)}`}
              />
            </div>

            <div className="mt-5">
              <div className="mb-1.5 text-micro tracking-wide text-muted">
                Цвет: {color ?? 'любой'}
              </div>
              <CusColorSwatch
                swatches={palette}
                value={color}
                onPick={(s) => setColor((prev) => (prev === s.name ? null : s.name))}
              />
            </div>

            <CusButton
              variant="secondary"
              fullWidth
              className="mt-5"
              onClick={() => {
                setPriceMin(null);
                setPriceMax(null);
                setColor(null);
              }}
            >
              Сбросить
            </CusButton>
          </aside>
        )}
      </div>

      <CusConfirmModal
        open={confirm !== null}
        onClose={() => setConfirm(null)}
        onConfirm={onRemove}
        target={confirm?.name}
        description="Товар будет удалён из каталога."
      />
    </div>
  );
}
