import { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { CusButton, CusEmptyState, CusInput } from '@/components/ui';
import type { PromoModule } from '@/features/promotions/config';
import { usePromoDraft } from '@/features/promotions/usePromoDraft';
import { formatPrice } from '@/lib/format';
import { useCatalogStore, useFlatProducts } from '@/store/useCatalogStore';
import { cn } from '@/utils/cn';

type Props = {
  module: PromoModule;
};

/** Butun ekranli tovar tanlash — qidiruv + kategoriya filtrlari */
export default function ProductPicker({ module }: Props) {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const query = (params.get('q') ?? '').trim().toLowerCase();
  const scope = params.get('scope') ?? 'all';

  const cats = useCatalogStore((s) => s.cats);
  const products = useFlatProducts();

  const draft = usePromoDraft((s) => s.draft);
  const toggleItem = usePromoDraft((s) => s.toggleItem);
  const setDiscount = usePromoDraft((s) => s.setDiscount);

  const setScope = (next: string) => {
    const p = new URLSearchParams(params);
    p.set('scope', next);
    setParams(p, { replace: true });
  };

  const items = useMemo(
    () =>
      products.filter((p) => {
        if (scope === 'selected') {
          if (!draft?.items.some((i) => i.pid === p.id)) return false;
        } else if (scope !== 'all' && p.catId !== scope) {
          return false;
        }
        return !query || `${p.name} ${p.sku} ${p.fabric} ${p.path}`.toLowerCase().includes(query);
      }),
    [products, scope, query, draft],
  );

  if (!draft) {
    return (
      <CusEmptyState
        title="Черновик не найден"
        description="Откройте карточку заново."
        action={<CusButton onClick={() => navigate(module.listPath)}>Назад</CusButton>}
      />
    );
  }

  const chips = [
    { id: 'all', label: 'Все' },
    { id: 'selected', label: 'Выбранные' },
    ...cats.map((c) => ({ id: c.id, label: c.name })),
  ];

  return (
    <div>
      <div className="mb-5 flex items-end gap-4">
        <div className="min-w-0">
          <h1 className="mb-1 font-serif text-[28px] leading-tight">
            Выбор товаров — {draft.titleRu || 'без названия'}
          </h1>
          <p className="text-muted">
            {module.showDiscount
              ? 'Отмеченный товар попадает в акцию со скидкой.'
              : 'Отметьте товары, связанные с новостью — скидки не будет.'}
          </p>
        </div>

        <CusButton
          className="ml-auto shrink-0"
          onClick={() => navigate(module.itemPath(draft.id || 'new'))}
        >
          Готово
        </CusButton>
      </div>

      <div className="mb-4 flex flex-wrap gap-1.5">
        {chips.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setScope(c.id)}
            className={cn(
              'rounded-sm border px-2.5 py-1 text-mini transition-colors',
              scope === c.id
                ? 'border-primary bg-primary text-primary-fg'
                : 'border-border bg-surface text-muted hover:border-primary',
            )}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mb-3 text-mini text-subtle">
        {draft.items.length} выбрано · {items.length} показано
      </div>

      {items.length === 0 ? (
        <CusEmptyState title="Ничего не найдено" description="Измените фильтр или поиск." />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(210px,1fr))] gap-3">
          {items.map((p) => {
            const picked = draft.items.find((i) => i.pid === p.id);

            return (
              <div
                key={p.id}
                onClick={() => toggleItem(p.id, module.showDiscount ? 10 : 0)}
                className={cn(
                  'cursor-pointer overflow-hidden rounded-sm border bg-surface transition-colors',
                  picked ? 'border-primary ring-1 ring-primary ring-inset' : 'border-border',
                )}
              >
                <div className="h-28 bg-photo" />

                <div className="flex flex-col gap-1 p-3">
                  <div className="truncate text-tiny font-medium">{p.name}</div>
                  <div className="truncate text-micro text-subtle">{p.path}</div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-body font-semibold">{formatPrice(p.price)}</span>
                    {picked && module.showDiscount && picked.discount > 0 && (
                      <span className="text-mini text-primary-hover">
                        {formatPrice(Math.round(p.price * (1 - picked.discount / 100)))}
                      </span>
                    )}
                  </div>

                  {picked && module.showDiscount && (
                    <div onClick={(e) => e.stopPropagation()}>
                      <CusInput
                        label="Скидка %"
                        value={String(picked.discount)}
                        onChange={(e) =>
                          setDiscount(p.id, Number(e.target.value.replace(/\D/g, '')))
                        }
                      />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
