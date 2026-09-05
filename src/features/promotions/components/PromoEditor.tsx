import { useEffect } from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { useNavigate, useParams } from 'react-router-dom';

import {
  CusButton,
  CusEmptyState,
  CusIconButton,
  CusInput,
  CusRichEditor,
  CusSelect,
  CusStepper,
  CusTable,
  CusTableHead,
  CusTableRow,
  useToast,
} from '@/components/ui';
import type { PromoModule } from '@/features/promotions/config';
import type { Promo } from '@/features/promotions/types';
import { emptyPromo, usePromoDraft } from '@/features/promotions/usePromoDraft';
import { PRODUCTS, formatPrice, plural } from '@/lib/format';
import { makeId, toSlug } from '@/lib/slug';
import { STATUS_OPTIONS } from '@/types/common';
import { useFlatProducts } from '@/store/useCatalogStore';

type Props = {
  module: PromoModule;
  /** Ro'yxatdan mavjud kartani topish */
  items: Promo[];
  onSave: (promo: Promo) => void;
};

const STATUS_SELECT = STATUS_OPTIONS.map((s) => ({ value: s, label: s }));

export default function PromoEditor({ module, items, onSave }: Props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const products = useFlatProducts();
  const { show } = useToast();

  const draft = usePromoDraft((s) => s.draft);
  const step = usePromoDraft((s) => s.step);
  const start = usePromoDraft((s) => s.start);
  const patch = usePromoDraft((s) => s.patch);
  const setStep = usePromoDraft((s) => s.setStep);
  const setDiscount = usePromoDraft((s) => s.setDiscount);
  const removeItem = usePromoDraft((s) => s.removeItem);
  const clear = usePromoDraft((s) => s.clear);

  /* Marshrutdan qoralamani tiklash — sahifa to'g'ridan-to'g'ri ochilgan bo'lsa ham */
  useEffect(() => {
    const existing = id ? items.find((n) => n.id === id) : null;
    if (existing) {
      if (draft?.id !== existing.id) start(structuredClone(existing));
    } else if (!draft || draft.id !== '') {
      start(emptyPromo(module.kicker));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, items]);

  if (!draft) return null;

  const linked = draft.items.map((it) => {
    const product = products.find((p) => p.id === it.pid);
    const price = product?.price ?? 0;
    return {
      ...it,
      name: product?.name ?? '—',
      path: product?.path ?? '',
      sku: product?.sku ?? '',
      stock: product?.stock ?? '—',
      subId: product?.subId ?? '',
      oldPrice: formatPrice(price),
      newPrice: formatPrice(Math.round(price * (1 - it.discount / 100))),
    };
  });

  const close = () => {
    clear();
    navigate(module.listPath);
  };

  const save = () => {
    if (!draft.titleRu.trim()) {
      setStep(0);
      show(module.nameError);
      return;
    }
    if (module.requireItems && draft.items.length === 0) {
      setStep(1);
      show('Добавьте хотя бы один товар со скидкой');
      return;
    }

    onSave({
      ...draft,
      id: draft.id || makeId(`${module.key}_`),
      slug: draft.slug || toSlug(draft.titleRu),
    });
    show(`Сохранено: ${draft.titleRu}`);
    close();
  };

  const cols = module.showDiscount
    ? 'minmax(0,1fr) 90px 90px 90px 62px'
    : 'minmax(0,1fr) 110px 110px 62px';

  return (
    <div>
      <button
        type="button"
        onClick={close}
        className="mb-3 text-tiny text-primary-hover transition-colors hover:text-primary"
      >
        {module.backLabel}
      </button>

      <h1 className="mb-4 font-serif text-[28px] leading-tight">
        {id ? 'Редактировать: ' : `${module.addLabel.replace('+ ', '')} — `}
        {draft.titleRu || 'без названия'}
      </h1>

      <CusStepper
        className="mb-6"
        current={step}
        onPick={(i) => setStep(i as 0 | 1)}
        steps={[
          { label: module.key === 'news' ? 'Данные новости' : 'Данные акции' },
          { label: module.step2Label },
        ]}
      />

      {step === 0 ? (
        <div className="grid max-w-3xl grid-cols-2 gap-4">
          <div className="col-span-2">
            <CusInput
              label={module.nameLabel}
              value={draft.titleRu}
              placeholder={module.namePlaceholder}
              onChange={(e) => patch({ titleRu: e.target.value })}
            />
          </div>

          <CusInput
            label="Кикер"
            value={draft.kicker}
            placeholder={module.kicker}
            onChange={(e) => patch({ kicker: e.target.value })}
          />
          <CusInput
            label={module.slugLabel}
            value={draft.slug}
            placeholder={toSlug(draft.titleRu) || 'autumn-2026'}
            onChange={(e) => patch({ slug: e.target.value })}
          />

          <div className="col-span-2">
            <CusRichEditor
              label="Краткий текст (RU)"
              value={draft.excerptRu}
              placeholder="Одно-два предложения для карточки…"
              onChange={(html) => patch({ excerptRu: html })}
            />
          </div>

          <CusInput
            label="Начало"
            value={draft.from}
            placeholder="2026-09-01"
            onChange={(e) => patch({ from: e.target.value })}
          />
          <CusInput
            label="Конец"
            value={draft.to}
            placeholder="2026-10-15"
            onChange={(e) => patch({ to: e.target.value })}
          />
          <CusSelect
            label="Статус"
            options={STATUS_SELECT}
            value={draft.status}
            onChange={(e) => patch({ status: e.target.value as Promo['status'] })}
          />
        </div>
      ) : (
        <div>
          <div className="mb-3 flex items-center gap-3">
            <div className="shrink-0 text-micro uppercase tracking-[0.12em] text-subtle">
              {module.itemsTitle}
            </div>
            <span className="min-w-0 flex-1 truncate text-mini text-subtle">
              {plural(draft.items.length, PRODUCTS)}{' '}
              {module.showDiscount ? 'в акции' : 'связано'}
            </span>
            <CusButton
              className="shrink-0"
              onClick={() => navigate(module.pickerPath(draft.id || 'new'))}
            >
              + Выбрать товары
            </CusButton>
          </div>

          {linked.length === 0 ? (
            <CusEmptyState
              title="Товары не выбраны"
              description="Нажмите «Выбрать товары», чтобы добавить их из каталога."
            />
          ) : (
            <CusTable>
              <CusTableHead cols={cols}>
                <div>Товар</div>
                {module.showDiscount && <div>Скидка %</div>}
                <div>{module.showDiscount ? 'Было' : 'Цена'}</div>
                <div>{module.showDiscount ? 'Стало' : 'Наличие'}</div>
                <div />
              </CusTableHead>

              {linked.map((it) => (
                <CusTableRow key={it.pid} cols={cols}>
                  <div className="min-w-0">
                    <div className="truncate font-medium">{it.name}</div>
                    <div className="truncate text-micro text-subtle">
                      {it.path} · {it.sku}
                    </div>
                  </div>

                  {module.showDiscount && (
                    <CusInput
                      value={String(it.discount)}
                      aria-label="Скидка"
                      onChange={(e) => setDiscount(it.pid, Number(e.target.value.replace(/\D/g, '')))}
                    />
                  )}

                  <div className="truncate text-mini text-subtle">{it.oldPrice}</div>
                  <div className="truncate font-semibold">
                    {module.showDiscount ? it.newPrice : it.stock}
                  </div>

                  <div className="flex gap-2">
                    <CusIconButton
                      label="Открыть товар"
                      icon={<FiEdit2 size={14} />}
                      onClick={() => navigate(`/products/${it.pid}?sub=${it.subId}`)}
                    />
                    <CusIconButton
                      variant="danger"
                      label="Убрать"
                      icon={<FiTrash2 size={14} />}
                      onClick={() => removeItem(it.pid)}
                    />
                  </div>
                </CusTableRow>
              ))}
            </CusTable>
          )}
        </div>
      )}

      <div className="mt-7 flex gap-2">
        {step === 1 && (
          <CusButton variant="secondary" onClick={() => setStep(0)}>
            Назад
          </CusButton>
        )}
        <CusButton variant="secondary" onClick={close}>
          Отмена
        </CusButton>
        {step === 0 ? (
          <CusButton
            onClick={() => {
              if (!draft.titleRu.trim()) {
                show(module.nameError);
                return;
              }
              setStep(1);
            }}
          >
            Далее
          </CusButton>
        ) : (
          <CusButton onClick={save}>Сохранить</CusButton>
        )}
      </div>
    </div>
  );
}
