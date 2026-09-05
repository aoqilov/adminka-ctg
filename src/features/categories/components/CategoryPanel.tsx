import { useState } from 'react';
import { FiEdit2, FiGrid, FiList, FiMoreVertical, FiTrash2 } from 'react-icons/fi';

import {
  CusButton,
  CusIconButton,
  CusSwitch,
  CusTable,
  CusTableHead,
  CusTableRow,
  useToast,
} from '@/components/ui';
import type { Category } from '@/features/categories/types';
import { useDragSort } from '@/hooks/useDragSort';
import { PRODUCTS, SUBCATEGORIES, plural } from '@/lib/format';
import { useCatalogStore } from '@/store/useCatalogStore';
import { cn } from '@/utils/cn';

type Props = {
  cats: Category[];
  activeId: string;
  onPick: (id: string) => void;
  onAdd: () => void;
  onEdit: (cat: Category) => void;
  onRemove: (cat: Category) => void;
};

type View = 'grid' | 'table';

const TABLE_COLS = '46px 38px minmax(0,1fr) 74px 34px 46px';

export default function CategoryPanel({
  cats,
  activeId,
  onPick,
  onAdd,
  onEdit,
  onRemove,
}: Props) {
  const [view, setView] = useState<View>('grid');
  const products = useCatalogStore((s) => s.products);
  const reorder = useCatalogStore((s) => s.reorderCategories);
  const toggleHidden = useCatalogStore((s) => s.toggleCategoryHidden);
  const { show } = useToast();

  const drag = useDragSort((from, to) => {
    reorder(from, to);
    show('Порядок категорий изменён');
  });

  const productCount = (cat: Category) =>
    cat.subs.reduce((acc, s) => acc + (products[s.id]?.length ?? 0), 0);

  const onToggle = (cat: Category) => {
    toggleHidden(cat.id);
    show(`${cat.name} — ${cat.hidden ? 'виден на сайте' : 'скрыт с сайта'}`);
  };

  return (
    <div className="min-w-0">
      <div className="mb-2.5 flex items-center gap-3">
        <div className="min-w-0 truncate text-micro uppercase tracking-[0.12em] text-subtle">
          Категории
        </div>

        <div className="ml-auto flex shrink-0 gap-1.5">
          <CusIconButton
            variant="bordered"
            label="Cards"
            active={view === 'grid'}
            icon={<FiGrid size={14} />}
            onClick={() => setView('grid')}
          />
          <CusIconButton
            variant="bordered"
            label="Table"
            active={view === 'table'}
            icon={<FiList size={14} />}
            onClick={() => setView('table')}
          />
          <CusButton onClick={onAdd}>+ категория</CusButton>
        </div>
      </div>

      {view === 'table' ? (
        <CusTable>
          <CusTableHead cols={TABLE_COLS}>
            <div>№</div>
            <div>Фото</div>
            <div>Категория</div>
            <div className="truncate">Товары</div>
            <div />
            <div className="truncate">Действ.</div>
          </CusTableHead>

          {cats.map((cat, i) => (
            <CusTableRow
              key={cat.id}
              cols={TABLE_COLS}
              onClick={() => onPick(cat.id)}
              {...drag.getItemProps(i)}
              className={cn(
                'cursor-grab',
                drag.isDragging(i) && 'opacity-45',
                drag.isOver(i) && 'ring-2 ring-primary ring-inset',
                cat.hidden && 'opacity-55',
              )}
            >
              <div className="flex items-center gap-1 text-subtle">
                <FiMoreVertical size={12} />
                <span className="text-mini">{i + 1}</span>
              </div>
              <span className="h-7 w-9.5 bg-photo" />
              <div className="min-w-0">
                <span className="block truncate text-body font-semibold">{cat.name}</span>
                <span className="block truncate text-micro text-subtle">
                  {plural(cat.subs.length, SUBCATEGORIES)}
                </span>
              </div>
              <div className="truncate text-mini text-subtle">{productCount(cat)}</div>
              <CusSwitch
                checked={!cat.hidden}
                onChange={() => onToggle(cat)}
                label={cat.hidden ? 'Скрыт' : 'Виден'}
              />
              <div className="flex gap-2">
                <CusIconButton
                  label="Редактировать"
                  icon={<FiEdit2 size={14} />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(cat);
                  }}
                />
                <CusIconButton
                  variant="danger"
                  label="Удалить"
                  icon={<FiTrash2 size={14} />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(cat);
                  }}
                />
              </div>
            </CusTableRow>
          ))}
        </CusTable>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3">
          {cats.map((cat, i) => {
            const active = cat.id === activeId;

            return (
              <div
                key={cat.id}
                onClick={() => onPick(cat.id)}
                {...drag.getItemProps(i)}
                className={cn(
                  'cursor-grab overflow-hidden rounded-sm border bg-surface',
                  active ? 'border-primary shadow-pop' : 'border-border',
                  drag.isOver(i) && 'ring-2 ring-primary ring-inset',
                  drag.isDragging(i) && 'opacity-45',
                  cat.hidden && 'opacity-55',
                )}
              >
                <div className="relative h-24 bg-photo">
                  <span className="absolute inset-x-2.5 top-2 flex items-center gap-1.5 overflow-hidden whitespace-nowrap text-micro text-subtle">
                    <span>#{i + 1}</span>
                    <span className="min-w-0 truncate uppercase tracking-[0.1em]">{cat.tag}</span>
                    <FiMoreVertical size={12} className="ml-auto" />
                  </span>
                </div>

                <div className="px-3 pb-3 pt-2.5">
                  <div className="truncate font-serif text-base">{cat.name}</div>
                  <div className="mt-0.5 truncate text-mini text-subtle">
                    {plural(cat.subs.length, SUBCATEGORIES)} · {plural(productCount(cat), PRODUCTS)}
                  </div>

                  <div className="mt-2.5 flex items-center gap-2">
                    <CusSwitch
                      checked={!cat.hidden}
                      onChange={() => onToggle(cat)}
                      label={cat.hidden ? 'Скрыт' : 'Виден'}
                    />
                    <CusIconButton
                      className="ml-auto"
                      label="Редактировать"
                      icon={<FiEdit2 size={14} />}
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit(cat);
                      }}
                    />
                    <CusIconButton
                      variant="danger"
                      label="Удалить"
                      icon={<FiTrash2 size={14} />}
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove(cat);
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
