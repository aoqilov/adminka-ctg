import { useNavigate } from 'react-router-dom';

import { CusBadge, CusButton, CusInput, CusSwitch } from '@/components/ui';
import { ROUTES } from '@/constants/routes';
import type { ProductErrors } from '@/features/product-editor/types';
import type { CatalogItem } from '@/features/products/types';
import type { ProductPromoInfo } from '@/features/promotions/types';
import { formatPrice, toNumber } from '@/lib/format';
import { statusVariant } from '@/lib/status';

type Props = {
  data: CatalogItem;
  errors: ProductErrors;
  patch: (patch: Partial<CatalogItem>) => void;
  /** Tovar turgan aksiyalar — faqat o'qish uchun */
  promos: ProductPromoInfo[];
};

export default function StepPricing({ data, errors, patch, promos }: Props) {
  const navigate = useNavigate();
  const price = toNumber(data.price);
  const totalSizes = data.variants.reduce((acc, v) => acc + v.sizes.length, 0);

  return (
    <div className="max-w-3xl">
      {promos.length > 0 && (
        <div className="mb-5 rounded-sm border border-border bg-background p-4">
          <div className="flex items-center gap-2.5">
            <div className="shrink-0 text-micro uppercase tracking-[0.12em] text-subtle">
              Акции (только чтение)
            </div>
            <span className="min-w-0 flex-1 truncate text-mini text-subtle">
              Товар участвует в {promos.length} акциях
            </span>
            <CusButton
              className="shrink-0"
              variant="ghost"
              onClick={() => navigate(ROUTES.sale)}
            >
              Скидки →
            </CusButton>
          </div>

          <div className="mt-3 flex flex-col gap-2">
            {promos.map((p) => (
              <div key={p.title} className="flex items-center gap-2.5 text-tiny">
                <CusBadge variant="solid">−{p.discount}%</CusBadge>
                <span className="min-w-0 truncate">{p.title}</span>
                <span className="shrink-0 text-subtle">
                  → {price ? formatPrice(Math.round(price * (1 - p.discount / 100))) : '—'}
                </span>
                <CusBadge className="ml-auto shrink-0" variant={statusVariant(p.status)}>
                  {p.status}
                </CusBadge>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-4">
        <div className="rounded-sm border border-border bg-surface p-4">
          <div className="flex items-center gap-3">
            <span className="text-body font-medium">Аренда</span>
            <CusSwitch
              checked={data.rentalAvailable}
              onChange={(v) => patch({ rentalAvailable: v })}
              label="Аренда доступна"
              valueLabel={data.rentalAvailable ? 'Да' : 'Нет'}
            />
          </div>

          {data.rentalAvailable && (
            <div className="mt-3 flex items-end gap-3">
              <CusInput
                label="Сумма"
                value={data.rentPrice}
                placeholder="900"
                error={errors.rentPrice}
                onChange={(e) => patch({ rentPrice: e.target.value })}
              />
              <CusInput
                label="Срок, дней"
                value={data.rentDays}
                placeholder="3"
                error={errors.rentDays}
                onChange={(e) => patch({ rentDays: e.target.value })}
              />
            </div>
          )}
        </div>

        <div className="rounded-sm border border-border bg-surface p-4">
          <div className="flex items-center gap-3">
            <span className="text-body font-medium">Продажа</span>
            <CusSwitch
              checked={data.saleAvailable}
              onChange={(v) => patch({ saleAvailable: v })}
              label="Продажа доступна"
              valueLabel={data.saleAvailable ? 'Да' : 'Нет'}
            />
          </div>

          {data.saleAvailable && (
            <div className="mt-3 max-w-55">
              <CusInput
                label="Цена"
                value={data.price}
                placeholder="4200"
                error={errors.price}
                onChange={(e) => patch({ price: e.target.value })}
              />
            </div>
          )}

          {!data.saleAvailable && errors.price && (
            <p className="mt-2 text-micro text-danger">{errors.price}</p>
          )}
        </div>

        <div className="rounded-sm border border-border bg-surface p-4">
          <div className="flex items-center gap-3">
            <span className="text-body font-medium">Размыть фото на сайте</span>
            <CusSwitch
              checked={data.isBlurred}
              onChange={(v) => patch({ isBlurred: v })}
              label="Размыть фото на сайте"
              valueLabel={data.isBlurred ? 'Да' : 'Нет'}
            />
          </div>
          <p className="mt-2 text-mini text-subtle">
            Название, цена и описание остаются видимыми — размывается только фото.
            Для дорогих моделей, которые владелица не хочет показывать открыто.
          </p>
        </div>

        <div className="rounded-sm border border-border bg-background p-4 text-mini text-subtle">
          {totalSizes === 0
            ? 'inStock: false — размеры не выбраны'
            : `inStock: true · ${totalSizes} размеров по вариантам`}
        </div>
      </div>
    </div>
  );
}
