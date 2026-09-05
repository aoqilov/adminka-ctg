import { CusChips, CusInput, CusRichEditor, CusSelect } from '@/components/ui';
import { TAGS } from '@/constants/catalog';
import type { ProductErrors } from '@/features/product-editor/types';
import type { CatalogItem } from '@/features/products/types';
import { toSlug } from '@/lib/slug';
import { useCatalogStore } from '@/store/useCatalogStore';

type Props = {
  data: CatalogItem;
  errors: ProductErrors;
  patch: (patch: Partial<CatalogItem>) => void;
};

const TAG_OPTIONS = TAGS.map((t) => ({ value: t, label: t }));

export default function StepBasics({ data, errors, patch }: Props) {
  const cats = useCatalogStore((s) => s.cats);
  const activeCat = cats.find((c) => c.id === data.categoryId) ?? cats[0];

  const descLength = data.descriptionRu.replace(/<[^>]+>/g, ' ').trim().length;

  return (
    <div className="grid max-w-3xl grid-cols-2 gap-4">
      <div className="col-span-2">
        <CusInput
          label="Название (RU)"
          value={data.nameRu}
          placeholder="Celeste — кружевное платье"
          error={errors.nameRu}
          onChange={(e) => patch({ nameRu: e.target.value })}
        />
      </div>

      <CusSelect
        label="Категория"
        options={cats.map((c) => ({ value: c.id, label: c.name }))}
        value={data.categoryId}
        error={errors.subcategoryId}
        onChange={(e) => {
          const next = cats.find((c) => c.id === e.target.value);
          patch({ categoryId: e.target.value, subcategoryId: next?.subs[0]?.id ?? '' });
        }}
      />

      <CusSelect
        label="Подкатегория"
        options={(activeCat?.subs ?? []).map((s) => ({ value: s.id, label: s.name }))}
        value={data.subcategoryId}
        onChange={(e) => patch({ subcategoryId: e.target.value })}
      />

      <div className="col-span-2">
        <CusRichEditor
          label="Описание (RU)"
          value={data.descriptionRu}
          placeholder="Минимум 40 символов…"
          error={errors.descriptionRu}
          hint={`${descLength} / 40 символов`}
          onChange={(html) => patch({ descriptionRu: html })}
        />
      </div>

      <CusInput
        label="Бренд"
        value={data.brand}
        onChange={(e) => patch({ brand: e.target.value })}
      />

      <CusInput
        label="Slug (авто)"
        value={toSlug(data.nameRu)}
        readOnly
        onChange={() => {}}
      />

      <div className="col-span-2">
        <CusChips
          label="Теги"
          options={TAG_OPTIONS}
          value={data.tags}
          onToggle={(tag) =>
            patch({
              tags: data.tags.includes(tag)
                ? data.tags.filter((t) => t !== tag)
                : [...data.tags, tag],
            })
          }
        />
      </div>
    </div>
  );
}
