import { CusBadge, CusSwitch } from '@/components/ui';
import ProductPhoto from '@/features/products/components/ProductPhoto';
import type { ProductListProps } from '@/features/products/components/types.product-views';
import { formatPrice } from '@/lib/format';
import { stockVariant } from '@/lib/status';
import { cn } from '@/utils/cn';

type Props = ProductListProps & {
  /** Oxirida "+ Добавить" katagi */
  onAdd?: () => void;
};

/** Zich foto-plitkalar — ma'lumot ustiga sichqoncha kelganda chiqadi */
export default function ProductGallery({
  items,
  onEdit,
  onRemove,
  onToggleHidden,
  onToggleBlurred,
  onAdd,
}: Props) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-1.5">
      {items.map((p) => (
        <ProductPhoto
          key={p.id}
          blurred={p.isBlurred}
          hoverZoom
          className={cn(
            'group aspect-[3/4] cursor-pointer',
            p.isHidden && 'opacity-55',
          )}
          onClick={() => onEdit(p)}
        >

          <span className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-2 flex-col gap-1.5 bg-gradient-to-t from-overlay-dark-strong to-transparent px-3 pb-3 pt-3.5 text-left text-overlay-fg opacity-0 transition-all group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
            <span className="truncate font-serif text-base">{p.name}</span>

            <span className="flex items-baseline gap-2">
              <span className="text-body font-semibold">{formatPrice(p.price)}</span>
              <span className="truncate text-micro opacity-75">{p.sku}</span>
            </span>

            <span>
              <CusBadge variant={stockVariant(p.stock)}>{p.stock}</CusBadge>
            </span>

            <CusSwitch
              checked={!p.isHidden}
              onChange={() => onToggleHidden(p)}
              label={p.isHidden ? 'Скрыт' : 'Виден'}
              valueLabel={p.isHidden ? 'Скрыт' : 'Виден'}
              className="text-overlay-fg"
            />

            <span className="mt-1 flex gap-1.5">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(p);
                }}
                className="h-7 flex-1 rounded-xs border border-overlay-fg/45 text-micro uppercase tracking-[0.1em]"
              >
                Изм.
              </button>
              <button
                type="button"
                title={p.isBlurred ? 'Показывать фото обычным' : 'Размыть фото на сайте'}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleBlurred(p);
                }}
                className={cn(
                  'h-7 flex-1 rounded-xs border text-micro uppercase tracking-[0.1em]',
                  p.isBlurred
                    ? 'border-overlay-fg bg-overlay-fg/20'
                    : 'border-overlay-fg/45',
                )}
              >
                Блюр
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(p);
                }}
                className="h-7 flex-1 rounded-xs border border-danger-soft/50 text-micro uppercase tracking-[0.1em]"
              >
                Удал.
              </button>
            </span>
          </span>
        </ProductPhoto>
      ))}

      {onAdd && (
        <button
          type="button"
          onClick={onAdd}
          className="aspect-[3/4] border border-dashed border-subtle bg-background text-tiny text-subtle transition-colors hover:border-primary hover:text-primary-hover"
        >
          + Добавить
        </button>
      )}
    </div>
  );
}
