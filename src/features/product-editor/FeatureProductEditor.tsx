import { useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';

import { CusButton, CusEmptyState, CusStepper, useToast } from '@/components/ui';
import { ROUTES, subcategoryPath } from '@/constants/routes';
import { itemFromRow, newItem } from '@/features/product-editor/newItem';
import StepBasics from '@/features/product-editor/steps/StepBasics';
import StepPricing from '@/features/product-editor/steps/StepPricing';
import StepVariants from '@/features/product-editor/steps/StepVariants';
import type { EditorStep } from '@/features/product-editor/types';
import { STEP_ERROR_KEYS, validateItem } from '@/features/product-editor/validate';
import type { CatalogItem, ProductKind, StockStatus } from '@/features/products/types';
import { toNumber } from '@/lib/format';
import { makeId } from '@/lib/slug';
import { useCatalogStore, usePromosFor, useSubcategory } from '@/store/useCatalogStore';

const STEPS = [
  { label: 'Основное' },
  { label: 'Варианты и размеры' },
  { label: 'Цена и публикация' },
];

/** Aksessuar kategoriyalari — qolganlari ko'ylak */
const ACCESSORY_CATS = new Set(['shoes', 'hijab']);

/**
 * Marshrut o'zgarganda (bir tovardan ikkinchisiga o'tish) React Router
 * komponentni qayta yaratmaydi — shuning uchun forma `key` orqali
 * majburan yangilanadi, aks holda eski qiymatlar qolib ketadi.
 */
export default function FeatureProductEditor() {
  const { id } = useParams();
  const [params] = useSearchParams();

  return <ProductEditorForm key={`${id ?? 'new'}:${params.get('sub') ?? ''}`} />;
}

function ProductEditorForm() {
  const { id } = useParams();
  const [params] = useSearchParams();
  const subId = params.get('sub') ?? '';
  const navigate = useNavigate();
  const { show } = useToast();

  const products = useCatalogStore((s) => s.products);
  const found = useSubcategory(subId);
  const upsertProduct = useCatalogStore((s) => s.upsertProduct);
  const promos = usePromosFor(id ?? null);

  const [step, setStep] = useState<EditorStep>(0);
  const [touched, setTouched] = useState(false);

  const initial = useMemo(() => {
    const catId = found?.cat.id ?? '';
    const kind: ProductKind = ACCESSORY_CATS.has(catId) ? 'accessory' : 'dress';
    const row = id ? (products[subId] ?? []).find((p) => p.id === id) : null;

    return row ? itemFromRow(row, kind, catId, subId) : newItem(kind, catId, subId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, subId, found?.cat.id]);

  const [data, setData] = useState<CatalogItem>(initial);

  const errors = validateItem(data);
  const visible = touched ? errors : {};
  const patch = (next: Partial<CatalogItem>) =>
    setData((prev) => ({ ...prev, ...next }) as CatalogItem);

  if (!found) {
    return (
      <CusEmptyState
        title="Подкатегория не указана"
        description="Откройте товар из списка подкатегории."
        action={<CusButton onClick={() => navigate(ROUTES.categories)}>К категориям</CusButton>}
      />
    );
  }

  const back = () => navigate(subcategoryPath(found.cat.id, subId));

  const next = () => {
    const failed = STEP_ERROR_KEYS[step].find((key) => errors[key]);
    if (failed) {
      setTouched(true);
      show(errors[failed] as string);
      return;
    }
    setTouched(false);
    setStep((s) => Math.min(2, s + 1) as EditorStep);
  };

  const save = () => {
    const count = Object.keys(errors).length;
    if (count > 0) {
      setTouched(true);
      show(`Нарушено правил: ${count}`);
      return;
    }

    const totalSizes = data.variants.reduce((acc, v) => acc + v.sizes.length, 0);
    const stock: StockStatus =
      totalSizes === 0 ? 'Out of Stock' : totalSizes < 3 ? 'Low Stock' : 'In Stock';

    const existing = id ? (products[subId] ?? []).find((p) => p.id === id) : null;

    upsertProduct(subId, {
      id: data.id || makeId('p_'),
      name: data.nameRu,
      sku: data.sku || `AB-${data.kind === 'dress' ? 'DR' : 'AC'}-${makeId('').slice(0, 3)}`,
      fabric:
        data.kind === 'dress'
          ? data.fabricDetails.join(', ') || data.composition || 'Не указано'
          : data.material || 'Не указано',
      price: toNumber(data.price),
      stock,
      colors: data.variants.map((v) => v.colorName).filter(Boolean),
      isHidden: existing?.isHidden,
      isBlurred: data.isBlurred,
    });

    show(`Сохранено: ${data.nameRu}`);
    back();
  };

  const errorCount = Object.keys(errors).length;

  return (
    <div>
      <button
        type="button"
        onClick={back}
        className="mb-3 text-tiny text-primary-hover transition-colors hover:text-primary"
      >
        ← {found.sub.name}
      </button>

      <h1 className="mb-4 font-serif text-[28px] leading-tight">
        {id ? 'Редактировать: ' : 'Новый товар — '}
        {data.nameRu || 'без названия'}
      </h1>

      <CusStepper
        className="mb-6"
        steps={STEPS}
        current={step}
        onPick={(i) => setStep(i as EditorStep)}
      />

      {step === 0 && <StepBasics data={data} errors={visible} patch={patch} />}
      {step === 1 && <StepVariants data={data} errors={visible} patch={patch} />}
      {step === 2 && (
        <StepPricing data={data} errors={visible} patch={patch} promos={promos} />
      )}

      <div className="mt-7 flex items-center gap-2">
        {step > 0 && (
          <CusButton variant="secondary" onClick={() => setStep((s) => (s - 1) as EditorStep)}>
            Назад
          </CusButton>
        )}
        <CusButton variant="secondary" onClick={back}>
          Отмена
        </CusButton>

        {step < 2 ? (
          <CusButton onClick={next}>Далее</CusButton>
        ) : (
          <CusButton onClick={save}>Сохранить</CusButton>
        )}

        <span className="ml-auto min-w-0 truncate text-mini text-subtle">
          {errorCount ? `${errorCount} ошибок — покажем при сохранении` : 'Валидация пройдена'}
        </span>
      </div>
    </div>
  );
}
