import {
  CusChips,
  CusColorSwatch,
  CusImageSlot,
  CusInput,
  CusSelect,
  CusSwitch,
} from '@/components/ui';
import { ACC_SIZES, MAX_VARIANT_PHOTOS, MEDIA_POOL_SIZE, SIZE_GRID } from '@/constants/catalog';
import type { ProductErrors } from '@/features/product-editor/types';
import type { CatalogItem, Variant } from '@/features/products/types';
import { useMediaDrag } from '@/hooks/useMediaDrag';
import { toSlug } from '@/lib/slug';
import { useStoreSettingsStore } from '@/store/useStoreSettingsStore';
import { cn } from '@/utils/cn';

type Props = {
  data: CatalogItem;
  errors: ProductErrors;
  patch: (patch: Partial<CatalogItem>) => void;
};

const MEDIA_POOL = Array.from({ length: MEDIA_POOL_SIZE }, (_, i) => `M${String(i + 1).padStart(2, '0')}`);
const ACC_SIZE_OPTIONS = ACC_SIZES.map((s) => ({ value: s, label: s }));
const SIZE_OPTIONS = SIZE_GRID.map((s) => ({ value: String(s.ru), label: String(s.ru) }));

/** Saytga yuklanadigan fayl nomi — nom_rang_v1_01.jpg */
const fileName = (data: CatalogItem, variantIndex: number, photoIndex: number) =>
  [
    toSlug(data.nameRu) || 'item',
    toSlug(data.colorName) || 'color',
    `v${variantIndex + 1}`,
    `${String(photoIndex + 1).padStart(2, '0')}.jpg`,
  ].join('_');

/**
 * Bitta tovar — bitta rang, bitta o'lcham; ular tovarning o'z maydoni.
 * Variantlar esa faqat fotolarni guruhlaydi: soni qat'iy uchta, har birida
 * `MAX_VARIANT_PHOTOS` tagacha rasm.
 */
export default function StepColorSize({ data, errors, patch }: Props) {
  const palette = useStoreSettingsStore((s) => s.palette);
  const drag = useMediaDrag();

  const used = new Set(data.variants.flatMap((v) => v.media));
  const swatch = palette.find((c) => c.name === data.colorName);

  const colorOptions = [
    { value: '', label: '— выберите цвет —' },
    ...palette.map((c) => ({ value: c.name, label: `${c.name}  ·  ${c.hex}` })),
  ];

  const patchVariant = (index: number, next: Partial<Variant>) =>
    patch({ variants: data.variants.map((v, i) => (i === index ? { ...v, ...next } : v)) });

  /** Faylni katakka joylash: boshqa kataklardan olib tashlanadi */
  const dropMedia = (variantIndex: number, slotIndex: number, mediaId: string) => {
    const list = data.variants[variantIndex].media.filter((m) => m !== mediaId);
    list[slotIndex] = mediaId;
    patchVariant(variantIndex, { media: list.filter(Boolean).slice(0, MAX_VARIANT_PHOTOS) });
  };

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_340px] items-start gap-5">
      <div className="flex flex-col gap-4">
        <div className="rounded-sm border border-border bg-surface p-4">
          <div className="mb-3 flex items-center gap-2.5">
            {/* Rang namunasi — palitradan olingan qiymat */}
            <span
              style={{ background: swatch?.hex ?? data.hex }}
              className="h-5 w-5 shrink-0 rounded-full ring-1 ring-border"
            />
            <span className="min-w-0 flex-1 truncate text-body font-medium">Цвет и размер</span>
            <span className="shrink-0 text-mini text-subtle">Один товар — один цвет</span>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_90px] items-end gap-3">
            <CusSelect
              label="Цвет"
              options={colorOptions}
              value={data.colorName}
              error={errors.colorName}
              onChange={(e) => {
                const found = palette.find((c) => c.name === e.target.value);
                patch({ colorName: e.target.value, hex: found ? found.hex : data.hex });
              }}
            />

            <CusInput
              label="Кол-во"
              value={String(data.qty)}
              onChange={(e) => patch({ qty: Number(e.target.value.replace(/\D/g, '')) || 0 })}
            />
          </div>

          {/* Palitra o'sishi mumkin — swatch'lar o'z qatorida, o'ralib ketadi */}
          <CusColorSwatch
            className="mt-3"
            swatches={palette}
            value={data.colorName}
            onPick={(s) => patch({ colorName: s.name, hex: s.hex })}
          />

          {data.kind === 'dress' ? (
            <CusChips
              className="mt-4"
              label="Размер RU"
              options={SIZE_OPTIONS}
              value={data.sizeRu === null ? [] : [String(data.sizeRu)]}
              error={errors.sizeRu}
              hint="Один товар — один размер"
              onToggle={(size) => {
                const ru = Number(size);
                patch({ sizeRu: data.sizeRu === ru ? null : ru });
              }}
            />
          ) : (
            <div className="mt-4">
              <div className="mb-3 flex items-center gap-3">
                <span className="text-body font-medium">Один размер</span>
                <CusSwitch
                  checked={data.oneSize}
                  onChange={(next) => patch({ oneSize: next, sizeLabel: '' })}
                  label="Один размер"
                  valueLabel={data.oneSize ? 'Да' : 'Нет'}
                />
              </div>

              <CusChips
                label="Размер аксессуара"
                options={ACC_SIZE_OPTIONS}
                value={data.sizeLabel ? [data.sizeLabel] : []}
                disabled={data.oneSize}
                error={errors.sizeLabel}
                hint={
                  data.oneSize
                    ? '«Один размер» включён — выбор размера отключён'
                    : 'Один товар — один размер'
                }
                onToggle={(size) => patch({ sizeLabel: data.sizeLabel === size ? '' : size })}
              />
            </div>
          )}
        </div>

        {/*
          Uchta statik variant — har biri alohida karta, ichida 6 ta foto katagi.
          Rang bilan o'lcham variantda emas, tovarning o'zida turadi.
        */}
        {data.variants.map((v, vi) => (
          <div key={v.id} className="rounded-sm border border-border bg-surface p-4">
            <div className="mb-3 flex items-center gap-2.5">
              <span className="min-w-0 flex-1 truncate text-body font-medium">
                Вариант {vi + 1}
              </span>
              <span className="shrink-0 text-mini text-subtle">
                {vi === 0 ? 'Главный' : 'Дополнительный'} · {v.media.length} / {MAX_VARIANT_PHOTOS}
              </span>
            </div>

            <div className="grid grid-cols-6 gap-1.5">
              {Array.from({ length: MAX_VARIANT_PHOTOS }, (_, si) => {
                const media = v.media[si];
                const key = `${vi}:${si}`;

                return (
                  <CusImageSlot
                    key={key}
                    filled={Boolean(media)}
                    label={media ?? String(si + 1).padStart(2, '0')}
                    dropActive={drag.dropKey === key}
                    {...drag.getSlotProps(key, (id) => dropMedia(vi, si, id))}
                    {...(media ? drag.getSourceProps(media) : {})}
                    onRemove={
                      media
                        ? () => patchVariant(vi, { media: v.media.filter((m) => m !== media) })
                        : undefined
                    }
                  />
                );
              })}
            </div>

            <div className="mt-2.5 truncate text-mini text-subtle">
              {v.media.length ? (
                <>
                  Имя файла:{' '}
                  <span className="text-primary-hover">{fileName(data, vi, 0)}</span>
                </>
              ) : (
                'Перетащите фото из медиатеки'
              )}
            </div>
          </div>
        ))}

        {errors.variants && <div className="text-mini text-danger">{errors.variants}</div>}
      </div>

      <aside className="sticky top-0 rounded-sm border border-border bg-background p-4">
        <div className="text-micro uppercase tracking-[0.12em] text-subtle">Медиатека</div>
        <p className="mt-1.5 text-mini leading-relaxed text-subtle">
          Перетащите фото в ячейки слева.
        </p>

        <div className="mt-3 grid grid-cols-3 gap-2">
          {MEDIA_POOL.map((id) => (
            <div
              key={id}
              {...drag.getSourceProps(id)}
              className={cn('cursor-grab', used.has(id) && 'opacity-45')}
            >
              <CusImageSlot filled label={id} />
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}
