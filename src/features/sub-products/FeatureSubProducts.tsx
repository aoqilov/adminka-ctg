import { useMemo, useState } from 'react';
import { FiGrid, FiImage, FiList } from 'react-icons/fi';
import { Link, useParams, useSearchParams } from 'react-router-dom';

import {
  CusButton,
  CusConfirmModal,
  CusEmptyState,
  CusIconButton,
  useToast,
} from '@/components/ui';
import { ROUTES } from '@/constants/routes';
import ProductGallery from '@/features/products/components/ProductGallery';
import ProductGrid from '@/features/products/components/ProductGrid';
import ProductTable from '@/features/products/components/ProductTable';
import type { FlatProduct } from '@/features/products/types';
import { useProductActions } from '@/features/products/useProductActions';
import { PRODUCTS, plural } from '@/lib/format';
import { useCatalogStore, useSubcategory } from '@/store/useCatalogStore';
import type { ViewMode } from '@/types/common';

export default function FeatureSubProducts() {
  const { catId = '', subId = '' } = useParams();
  const [params] = useSearchParams();
  const query = (params.get('q') ?? '').trim().toLowerCase();

  const [view, setView] = useState<ViewMode>('grid');
  const [confirm, setConfirm] = useState<FlatProduct | null>(null);

  const products = useCatalogStore((s) => s.products);
  const found = useSubcategory(subId);
  const { show } = useToast();
  const { openEditor, toggleHidden, toggleBlurred, remove } = useProductActions();

  const all: FlatProduct[] = useMemo(() => {
    if (!found) return [];
    const path = `${found.cat.name} / ${found.sub.name}`;
    return (products[subId] ?? []).map((p) => ({ ...p, catId, subId, path }));
  }, [products, subId, catId, found]);

  const items = useMemo(
    () =>
      query
        ? all.filter((p) =>
            `${p.name} ${p.sku} ${p.fabric}`.toLowerCase().includes(query),
          )
        : all,
    [all, query],
  );

  if (!found) {
    return (
      <CusEmptyState
        title="Подкатегория не найдена"
        description="Возможно, она была удалена."
        action={
          <Link to={ROUTES.categories}>
            <CusButton>К категориям</CusButton>
          </Link>
        }
      />
    );
  }

  const onRemove = () => {
    if (!confirm) return;
    remove(confirm);
    show(`${confirm.name} удалён`);
  };

  return (
    <div>
      <Link
        to={ROUTES.categories}
        className="mb-3 inline-block text-tiny text-primary-hover transition-colors hover:text-primary"
      >
        ← Назад к категориям
      </Link>

      <div className="mb-6 flex items-end gap-4">
        <div className="min-w-0">
          <h1 className="mb-1 font-serif text-[32px] leading-tight">{found.sub.name}</h1>
          <p className="text-muted">Товары внутри подкатегории.</p>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-1.5">
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
          <CusIconButton
            variant="bordered"
            label="Gallery"
            active={view === 'gallery'}
            icon={<FiImage size={14} />}
            onClick={() => setView('gallery')}
          />
          <CusButton onClick={() => openEditor(null, subId)}>+ Новый товар</CusButton>
        </div>
      </div>

      {items.length === 0 ? (
        <CusEmptyState
          title="Ничего не найдено"
          description={query ? 'Очистите поиск в шапке.' : 'Добавьте первый товар.'}
          action={
            query ? undefined : (
              <CusButton onClick={() => openEditor(null, subId)}>+ Новый товар</CusButton>
            )
          }
        />
      ) : view === 'table' ? (
        <ProductTable
          items={items}
          onEdit={(p) => openEditor(p.id, subId)}
          onRemove={setConfirm}
          onToggleHidden={toggleHidden}
          onToggleBlurred={toggleBlurred}
          countLine={`Показано ${items.length} из ${plural(all.length, PRODUCTS)}`}
        />
      ) : view === 'gallery' ? (
        <ProductGallery
          items={items}
          onEdit={(p) => openEditor(p.id, subId)}
          onRemove={setConfirm}
          onToggleHidden={toggleHidden}
          onToggleBlurred={toggleBlurred}
          onAdd={() => openEditor(null, subId)}
        />
      ) : (
        <ProductGrid
          items={items}
          onEdit={(p) => openEditor(p.id, subId)}
          onRemove={setConfirm}
          onToggleHidden={toggleHidden}
          onToggleBlurred={toggleBlurred}
        />
      )}

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
