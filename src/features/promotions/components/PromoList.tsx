import { useState } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import {
  CusBadge,
  CusButton,
  CusConfirmModal,
  CusEmptyState,
  CusIconButton,
  useToast,
} from '@/components/ui';
import type { PromoModule } from '@/features/promotions/config';
import type { Promo } from '@/features/promotions/types';
import { PRODUCTS, formatDateRange, plural } from '@/lib/format';
import { statusVariant } from '@/lib/status';
import { useFlatProducts } from '@/store/useCatalogStore';

type Props = {
  module: PromoModule;
  items: Promo[];
  onRemove: (id: string) => void;
};

/** «Скидки» va «News» ro'yxati — bitta komponent, konfig bilan farqlanadi */
export default function PromoList({ module, items, onRemove }: Props) {
  const navigate = useNavigate();
  const products = useFlatProducts();
  const { show } = useToast();
  const [confirm, setConfirm] = useState<Promo | null>(null);

  return (
    <div>
      <div className="mb-6 flex items-end gap-4">
        <div className="min-w-0">
          <h1 className="mb-1 font-serif text-[32px] leading-tight">{module.title}</h1>
          <p className="text-muted">{module.lead}</p>
        </div>

        <CusButton className="ml-auto shrink-0" onClick={() => navigate(module.newPath)}>
          {module.addLabel}
        </CusButton>
      </div>

      {items.length === 0 ? (
        <CusEmptyState
          title="Пусто"
          description={module.emptyText}
          action={<CusButton onClick={() => navigate(module.newPath)}>{module.addLabel}</CusButton>}
        />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-4">
          {items.map((n) => {
            const maxDiscount = n.items.reduce((acc, i) => Math.max(acc, i.discount), 0);
            const excerpt = n.excerptRu.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

            return (
              <div
                key={n.id}
                className="flex h-full flex-col gap-2 rounded-sm border border-border bg-surface p-4"
              >
                <div className="flex items-center gap-2">
                  <span className="min-w-0 flex-1 truncate text-micro uppercase tracking-[0.12em] text-primary">
                    {n.kicker}
                  </span>
                  {maxDiscount > 0 && (
                    <CusBadge className="shrink-0" variant="solid">
                      −{maxDiscount}%
                    </CusBadge>
                  )}
                  <CusBadge className="shrink-0" variant={statusVariant(n.status)}>
                    {n.status}
                  </CusBadge>
                </div>

                <div className="truncate font-serif text-lg">{n.titleRu}</div>
                <div className="truncate text-micro text-subtle">
                  {module.urlBase}
                  {n.slug}
                </div>
                <p className="line-clamp-2 text-tiny text-muted">{excerpt}</p>

                <div className="flex flex-wrap gap-1.5">
                  {n.items.slice(0, 4).map((i) => {
                    const product = products.find((p) => p.id === i.pid);
                    return (
                      <span
                        key={i.pid}
                        className="max-w-full truncate rounded-xs bg-primary-soft px-2 py-0.5 text-micro text-muted"
                      >
                        {product?.name ?? '—'}
                        {i.discount > 0 && ` · −${i.discount}%`}
                      </span>
                    );
                  })}
                </div>

                <div className="mt-auto flex items-center gap-2 pt-1 text-micro text-subtle">
                  <span className="min-w-0 truncate">{formatDateRange(n.from, n.to)}</span>
                  <span className="ml-auto shrink-0">{plural(n.items.length, PRODUCTS)}</span>
                </div>

                <div className="mt-1 flex gap-2">
                  <CusButton
                    variant="secondary"
                    fullWidth
                    leftIcon={<FiEdit2 size={13} />}
                    onClick={() => navigate(module.itemPath(n.id))}
                  >
                    Редактировать
                  </CusButton>
                  <CusIconButton
                    variant="bordered"
                    label="Удалить"
                    className="text-danger"
                    icon={<FiTrash2 size={14} />}
                    onClick={() => setConfirm(n)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      <CusConfirmModal
        open={confirm !== null}
        onClose={() => setConfirm(null)}
        onConfirm={() => {
          if (!confirm) return;
          onRemove(confirm.id);
          show(`${confirm.titleRu} удалено`);
        }}
        target={confirm?.titleRu}
      />
    </div>
  );
}
