import { useState } from 'react';
import { FiEdit2, FiGrid, FiList, FiMoreVertical, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

import {
  CusBadge,
  CusButton,
  CusIconButton,
  CusSwitch,
  CusTable,
  CusTableHead,
  CusTableRow,
  useToast,
} from '@/components/ui';
import { ROUTES, subcategoryPath } from '@/constants/routes';
import type { Category, Subcategory } from '@/features/categories/types';
import { useDragSort } from '@/hooks/useDragSort';
import { PRODUCTS, plural } from '@/lib/format';
import { statusVariant } from '@/lib/status';
import { useCatalogStore } from '@/store/useCatalogStore';
import { cn } from '@/utils/cn';

type Props = {
  cat: Category;
  onAdd: () => void;
  onEdit: (sub: Subcategory) => void;
  onRemove: (sub: Subcategory) => void;
};

type View = 'table' | 'grid';

const TABLE_COLS = '46px 38px minmax(0,1fr) 34px 46px';

export default function SubcategoryPanel({ cat, onAdd, onEdit, onRemove }: Props) {
  const [view, setView] = useState<View>('table');
  const navigate = useNavigate();
  const products = useCatalogStore((s) => s.products);
  const reorder = useCatalogStore((s) => s.reorderSubcategories);
  const toggleHidden = useCatalogStore((s) => s.toggleSubcategoryHidden);
  const { show } = useToast();

  const drag = useDragSort((from, to) => {
    reorder(cat.id, from, to);
    show('Порядок подкатегорий изменён');
  });

  const count = (sub: Subcategory) => products[sub.id]?.length ?? 0;
  const totalCount = cat.subs.reduce((acc, s) => acc + count(s), 0);

  const openAll = () => navigate(`${ROUTES.products}?scope=${cat.id}`);
  const openSub = (sub: Subcategory) => navigate(subcategoryPath(cat.id, sub.id));

  const onToggle = (sub: Subcategory) => {
    toggleHidden(cat.id, sub.id);
    show(`${sub.name} — ${sub.hidden ? 'видна на сайте' : 'скрыта с сайта'}`);
  };

  return (
    <div className="min-w-0">
      <div className="mb-2.5 flex items-center gap-3">
        <div className="min-w-0 truncate text-micro uppercase tracking-[0.12em] text-subtle">
          Подкатегории · {cat.name}
        </div>

        <div className="ml-auto flex shrink-0 gap-1.5">
          <CusIconButton
            variant="bordered"
            label="Table"
            active={view === 'table'}
            icon={<FiList size={14} />}
            onClick={() => setView('table')}
          />
          <CusIconButton
            variant="bordered"
            label="Cards"
            active={view === 'grid'}
            icon={<FiGrid size={14} />}
            onClick={() => setView('grid')}
          />
          <CusButton onClick={onAdd}>+ подкатегория</CusButton>
        </div>
      </div>

      {view === 'table' ? (
        <CusTable>
          <CusTableHead cols={TABLE_COLS}>
            <div>№</div>
            <div>Фото</div>
            <div>Название</div>
            <div />
            <div className="truncate">Действ.</div>
          </CusTableHead>

          <CusTableRow cols={TABLE_COLS} onClick={openAll} className="bg-primary-soft">
            <div className="text-mini text-primary-hover">Все</div>
            <span className="h-7 w-9.5 border border-primary" />
            <div className="truncate text-body font-semibold text-primary-hover">
              Все товары категории
            </div>
            <div />
            <div className="truncate text-mini text-subtle" title={plural(totalCount, PRODUCTS)}>
              {totalCount}
            </div>
          </CusTableRow>

          {cat.subs.map((sub, i) => (
            <CusTableRow
              key={sub.id}
              cols={TABLE_COLS}
              {...drag.getItemProps(i)}
              className={cn(
                'cursor-grab',
                drag.isDragging(i) && 'opacity-45',
                drag.isOver(i) && 'ring-2 ring-primary ring-inset',
                sub.hidden && 'opacity-55',
              )}
            >
              <div className="flex items-center gap-1 text-subtle">
                <FiMoreVertical size={12} />
                <span className="text-mini">{i + 1}</span>
              </div>
              <span className="h-7 w-9.5 bg-photo" />
              <div className="min-w-0">
                <button
                  type="button"
                  onClick={() => openSub(sub)}
                  className="block max-w-full truncate text-left text-body font-medium text-foreground"
                >
                  {sub.name}
                </button>
                <span className="mt-1 flex items-center gap-2">
                  <CusBadge variant={statusVariant(sub.status)}>{sub.status}</CusBadge>
                  <span className="shrink-0 text-micro text-subtle">
                    {plural(count(sub), PRODUCTS)}
                  </span>
                </span>
              </div>
              <CusSwitch
                checked={!sub.hidden}
                onChange={() => onToggle(sub)}
                label={sub.hidden ? 'Скрыта' : 'Видна'}
              />
              <div className="flex gap-2">
                <CusIconButton
                  label="Редактировать"
                  icon={<FiEdit2 size={14} />}
                  onClick={() => onEdit(sub)}
                />
                <CusIconButton
                  variant="danger"
                  label="Удалить"
                  icon={<FiTrash2 size={14} />}
                  onClick={() => onRemove(sub)}
                />
              </div>
            </CusTableRow>
          ))}
        </CusTable>
      ) : (
        <div className="grid grid-cols-2 gap-3.5">
          <div
            onClick={openAll}
            className="cursor-pointer overflow-hidden rounded-sm border border-primary bg-primary-soft"
          >
            <div className="grid h-30 place-items-center font-serif text-4xl text-primary-hover">
              {totalCount}
            </div>
            <div className="px-3.5 py-3">
              <div className="font-serif text-[17px] text-primary-hover">Все товары</div>
              <div className="text-mini text-subtle">по всей категории</div>
            </div>
          </div>

          {cat.subs.map((sub, i) => (
            <div
              key={sub.id}
              className={cn(
                'overflow-hidden rounded-sm border border-border bg-surface',
                sub.hidden && 'opacity-55',
              )}
            >
              <div
                {...drag.getItemProps(i)}
                className={cn(
                  'relative grid h-30 cursor-grab place-items-center bg-photo',
                  drag.isDragging(i) && 'opacity-45',
                  drag.isOver(i) && 'ring-2 ring-primary ring-inset',
                )}
              >
                <span className="absolute left-2.5 top-2 text-micro text-subtle">#{i + 1}</span>
                <FiMoreVertical size={12} className="absolute right-2.5 top-2 text-subtle" />
              </div>

              <div className="flex items-center gap-2.5 px-3.5 py-3">
                <div className="min-w-0">
                  <button
                    type="button"
                    onClick={() => openSub(sub)}
                    className="block max-w-full truncate text-left font-serif text-[17px] text-foreground"
                  >
                    {sub.name}
                  </button>
                  <div className="truncate text-mini text-subtle">{plural(count(sub), PRODUCTS)}</div>
                  <CusSwitch
                    className="mt-1.5"
                    checked={!sub.hidden}
                    onChange={() => onToggle(sub)}
                    label={sub.hidden ? 'Скрыта' : 'Видна'}
                    valueLabel={sub.hidden ? 'Скрыта' : 'Видна'}
                  />
                </div>

                <div className="ml-auto flex shrink-0 gap-2">
                  <CusIconButton
                    label="Редактировать"
                    icon={<FiEdit2 size={14} />}
                    onClick={() => onEdit(sub)}
                  />
                  <CusIconButton
                    variant="danger"
                    label="Удалить"
                    icon={<FiTrash2 size={14} />}
                    onClick={() => onRemove(sub)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
