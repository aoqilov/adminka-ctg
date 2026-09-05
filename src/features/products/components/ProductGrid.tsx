import { FiEyeOff, FiTrash2 } from 'react-icons/fi';

import { CusBadge, CusIconButton, CusSwitch } from '@/components/ui';
import ProductPhoto from '@/features/products/components/ProductPhoto';
import type { ProductListProps } from '@/features/products/components/types.product-views';
import { formatPrice } from '@/lib/format';
import { stockVariant } from '@/lib/status';
import { cn } from '@/utils/cn';

/** Kartalar ko'rinishi — subkategoriya ichidagi asosiy rejim */
export default function ProductGrid({
  items,
  onEdit,
  onRemove,
  onToggleHidden,
  onToggleBlurred,
  showPath,
}: ProductListProps) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4.5">
      {items.map((p) => (
        <div
          key={p.id}
          className="flex flex-col overflow-hidden rounded-sm border border-border bg-surface"
        >
          <ProductPhoto
            blurred={p.isBlurred}
            className={cn('h-45', p.isHidden && 'opacity-55')}
          >
            <span className="absolute right-2.5 top-2.5">
              <CusBadge variant={stockVariant(p.stock)}>{p.stock}</CusBadge>
            </span>

            {p.isHidden && (
              <span className="absolute inset-0 grid place-items-center bg-background/55 text-mini uppercase tracking-[0.14em] text-muted">
                Скрыто
              </span>
            )}
          </ProductPhoto>

          <div className="flex flex-1 flex-col gap-1.5 p-3.5">
            <CusSwitch
              checked={!p.isHidden}
              onChange={() => onToggleHidden(p)}
              label={p.isHidden ? 'Скрыт на сайте' : 'Виден на сайте'}
              valueLabel={p.isHidden ? 'Скрыт на сайте' : 'Виден на сайте'}
            />

            <div className="flex items-baseline gap-2.5">
              <div className="min-w-0 truncate font-serif text-lg text-primary-hover">{p.name}</div>
              <div className="ml-auto shrink-0 text-body font-semibold">{formatPrice(p.price)}</div>
            </div>

            <div className="truncate text-mini text-subtle">
              {showPath ? p.path : p.fabric}
            </div>

            <div className="mt-auto flex gap-2 pt-2.5">
              <button
                type="button"
                onClick={() => onEdit(p)}
                className="h-7.5 flex-1 rounded-sm border border-border bg-surface text-mini uppercase tracking-[0.1em] text-muted transition-colors hover:border-primary hover:text-primary-hover"
              >
                Редактировать
              </button>
              <CusIconButton
                variant="bordered"
                label={p.isBlurred ? 'Показывать фото обычным' : 'Размыть фото на сайте'}
                active={p.isBlurred}
                icon={<FiEyeOff size={13} />}
                className="h-7.5 w-8.5"
                onClick={() => onToggleBlurred(p)}
              />
              <CusIconButton
                variant="bordered"
                label="Удалить"
                icon={<FiTrash2 size={13} />}
                className="h-7.5 w-8.5 text-danger"
                onClick={() => onRemove(p)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
