import { useState } from 'react';

import { CusConfirmModal, useToast } from '@/components/ui';
import CategoryPanel from '@/features/categories/components/CategoryPanel';
import SubcategoryPanel from '@/features/categories/components/SubcategoryPanel';
import CategoryFormModal from '@/features/categories/modals/CategoryFormModal';
import SubcategoryFormModal from '@/features/categories/modals/SubcategoryFormModal';
import type { Category, Subcategory } from '@/features/categories/types';
import { useCatalogStore } from '@/store/useCatalogStore';

type CategoryModal = { mode: 'create' } | { mode: 'edit'; cat: Category } | null;
type SubModal = { mode: 'create' } | { mode: 'edit'; sub: Subcategory } | null;
type Confirm = { kind: 'cat'; cat: Category } | { kind: 'sub'; sub: Subcategory } | null;

export default function FeatureCategories() {
  const cats = useCatalogStore((s) => s.cats);
  const addCategory = useCatalogStore((s) => s.addCategory);
  const renameCategory = useCatalogStore((s) => s.renameCategory);
  const removeCategory = useCatalogStore((s) => s.removeCategory);
  const addSubcategory = useCatalogStore((s) => s.addSubcategory);
  const renameSubcategory = useCatalogStore((s) => s.renameSubcategory);
  const removeSubcategory = useCatalogStore((s) => s.removeSubcategory);
  const { show } = useToast();

  const [activeId, setActiveId] = useState(cats[0]?.id ?? '');
  const [catModal, setCatModal] = useState<CategoryModal>(null);
  const [subModal, setSubModal] = useState<SubModal>(null);
  const [confirm, setConfirm] = useState<Confirm>(null);

  const activeCat = cats.find((c) => c.id === activeId) ?? cats[0];

  const onCategorySubmit = (name: string) => {
    if (catModal?.mode === 'edit') {
      renameCategory(catModal.cat.id, name);
    } else {
      setActiveId(addCategory(name));
    }
    show(`Сохранено: ${name}`);
  };

  const onSubSubmit = (name: string) => {
    if (!activeCat) return;

    if (subModal?.mode === 'edit') renameSubcategory(activeCat.id, subModal.sub.id, name);
    else addSubcategory(activeCat.id, name);

    show(`Сохранено: ${name}`);
  };

  const onConfirmDelete = () => {
    if (!confirm) return;

    if (confirm.kind === 'cat') {
      removeCategory(confirm.cat.id);
      if (confirm.cat.id === activeId) {
        setActiveId(cats.find((c) => c.id !== confirm.cat.id)?.id ?? '');
      }
      show(`${confirm.cat.name} удалена`);
    } else if (activeCat) {
      removeSubcategory(activeCat.id, confirm.sub.id);
      show(`${confirm.sub.name} удалена`);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="mb-1 font-serif text-[32px] leading-tight">
          Категории и подкатегории
        </h1>
        <p className="text-muted">Структура каталога — порядок, видимость и наполнение.</p>
      </div>

      <div className="grid grid-cols-2 items-start gap-6">
        <CategoryPanel
          cats={cats}
          activeId={activeCat?.id ?? ''}
          onPick={setActiveId}
          onAdd={() => setCatModal({ mode: 'create' })}
          onEdit={(cat) => setCatModal({ mode: 'edit', cat })}
          onRemove={(cat) => setConfirm({ kind: 'cat', cat })}
        />

        {activeCat && (
          <SubcategoryPanel
            cat={activeCat}
            onAdd={() => setSubModal({ mode: 'create' })}
            onEdit={(sub) => setSubModal({ mode: 'edit', sub })}
            onRemove={(sub) => setConfirm({ kind: 'sub', sub })}
          />
        )}
      </div>

      {catModal && (
        <CategoryFormModal
          onClose={() => setCatModal(null)}
          initialName={catModal.mode === 'edit' ? catModal.cat.name : undefined}
          onSubmit={onCategorySubmit}
        />
      )}

      {subModal && (
        <SubcategoryFormModal
          onClose={() => setSubModal(null)}
          categoryName={activeCat?.name ?? ''}
          initialName={subModal.mode === 'edit' ? subModal.sub.name : undefined}
          onSubmit={onSubSubmit}
        />
      )}

      <CusConfirmModal
        open={confirm !== null}
        onClose={() => setConfirm(null)}
        onConfirm={onConfirmDelete}
        target={confirm?.kind === 'cat' ? confirm.cat.name : confirm?.sub.name}
        description={
          confirm?.kind === 'cat'
            ? 'Все подкатегории и товары внутри будут удалены.'
            : 'Все товары подкатегории будут удалены.'
        }
      />
    </div>
  );
}
