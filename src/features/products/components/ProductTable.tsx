import { FiEdit2, FiEyeOff, FiTrash2 } from 'react-icons/fi';

import {
  CusBadge,
  CusIconButton,
  CusSwitch,
  CusTable,
  CusTableHead,
  CusTableRow,
} from '@/components/ui';
import ProductPhoto from '@/features/products/components/ProductPhoto';
import type { ProductListProps } from '@/features/products/components/types.product-views';
import { formatPrice } from '@/lib/format';
import { stockVariant } from '@/lib/status';

const COLS =
  'minmax(0,2.2fr) minmax(0,1.2fr) minmax(0,0.8fr) minmax(0,1fr) 88px';

type Props = ProductListProps & {
  /** "Показано 4 из 12" */
  countLine?: string;
};

export default function ProductTable({
  items,
  onEdit,
  onRemove,
  onToggleHidden,
  onToggleBlurred,
  showPath,
  countLine,
}: Props) {
  return (
    <CusTable>
      <CusTableHead cols={COLS}>
        <div>Товар</div>
        <div>{showPath ? 'Категория' : 'SKU / Ткань'}</div>
        <div>Цена</div>
        <div>Наличие</div>
        <div>Действия</div>
      </CusTableHead>

      {items.map((p) => (
        <CusTableRow key={p.id} cols={COLS}>
          <div className="flex items-center gap-2.5">
            <ProductPhoto
              blurred={p.isBlurred}
              badge="icon"
              className="h-8.5 w-8.5 shrink-0 rounded-xs"
            />
            <span className="min-w-0 truncate font-medium">{p.name}</span>
          </div>

          <div className="min-w-0 text-mini text-subtle">
            {showPath ? (
              <span className="block truncate">{p.path}</span>
            ) : (
              <>
                <span className="block truncate">{p.sku}</span>
                <span className="block truncate">{p.fabric}</span>
              </>
            )}
          </div>

          <div className="truncate font-semibold">{formatPrice(p.price)}</div>

          <div className="flex flex-col items-start gap-1.5">
            <CusBadge variant={stockVariant(p.stock)}>{p.stock}</CusBadge>
            <CusSwitch
              checked={!p.isHidden}
              onChange={() => onToggleHidden(p)}
              label={p.isHidden ? 'Скрыт' : 'Виден'}
              valueLabel={p.isHidden ? 'Скрыт' : 'Виден'}
            />
          </div>

          <div className="flex gap-2">
            <CusIconButton
              label="Редактировать"
              icon={<FiEdit2 size={14} />}
              onClick={() => onEdit(p)}
            />
            <CusIconButton
              label={p.isBlurred ? 'Показывать фото обычным' : 'Размыть фото на сайте'}
              className={p.isBlurred ? 'text-primary-hover' : 'text-subtle'}
              icon={<FiEyeOff size={14} />}
              onClick={() => onToggleBlurred(p)}
            />
            <CusIconButton
              variant="danger"
              label="Удалить"
              icon={<FiTrash2 size={14} />}
              onClick={() => onRemove(p)}
            />
          </div>
        </CusTableRow>
      ))}

      {countLine && <div className="px-4 py-2.5 text-mini text-subtle">{countLine}</div>}
    </CusTable>
  );
}
