import {
  CusButton,
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
import { makeId, toSlug } from '@/lib/slug';
import { useStoreSettingsStore } from '@/store/useStoreSettingsStore';
import { cn } from '@/utils/cn';

type Props = {
  data: CatalogItem;
  errors: ProductErrors;
  patch: (patch: Partial<CatalogItem>) => void;
};

const MEDIA_POOL = Array.from({ length: MEDIA_POOL_SIZE }, (_, i) => `M${String(i + 1).padStart(2, '0')}`);
const ACC_SIZE_OPTIONS = ACC_SIZES.map((s) => ({ value: s, label: s }));

export default function StepVariants({ data, errors, patch }: Props) {
  const palette = useStoreSettingsStore((s) => s.palette);
  const drag = useMediaDrag();

  const used = new Set(data.variants.flatMap((v) => v.media));
  const variantError = errors.variants ?? errors.variantColor ?? errors.variantPhotos ?? null;

  const patchVariant = (index: number, next: Partial<Variant>) =>
    patch({ variants: data.variants.map((v, i) => (i === index ? { ...v, ...next } : v)) });

  const colorOptions = [
    { value: '', label: '— выберите цвет —' },
    ...palette.map((c) => ({ value: c.name, label: `${c.name}  ·  ${c.hex}` })),
  ];

  /** Faylni katakka joylash: boshqa kataklardan olib tashlanadi */
  const dropMedia = (variantIndex: number, slotIndex: number, mediaId: string) => {
    const variant = data.variants[variantIndex];
    const list = variant.media.filter((m) => m !== mediaId);
    list[slotIndex] = mediaId;
    patchVariant(variantIndex, { media: list.filter(Boolean).slice(0, MAX_VARIANT_PHOTOS) });
  };

  return (
    <div className="grid grid-cols-[minmax(0,1fr)_260px] items-start gap-5">
      <div className="flex flex-col gap-4">
        {data.variants.map((v, vi) => (
          <div key={v.id} className="rounded-sm border border-border bg-surface p-4">
            <div className="mb-3 flex items-center gap-2.5">
              {/* Variant rangi — palitradan olingan qiymat */}
              <span
                style={{ background: v.hex }}
                className="h-5 w-5 shrink-0 rounded-full ring-1 ring-border"
              />
              <span className="min-w-0 flex-1 truncate text-body font-medium">
                Вариант {vi + 1}
              </span>

              {data.variants.length > 1 && (
                <CusButton
                  className="shrink-0"
                  variant="danger"
                  size="sm"
                  onClick={() => patch({ variants: data.variants.filter((_, i) => i !== vi) })}
                >
                  Удалить
                </CusButton>
              )}
            </div>

            <div className="grid grid-cols-[minmax(0,1fr)_90px] items-end gap-3">
              <CusSelect
                label="Цвет"
                options={colorOptions}
                value={v.colorName}
                onChange={(e) => {
                  const found = palette.find((c) => c.name === e.target.value);
                  patchVariant(vi, {
                    colorName: e.target.value,
                    hex: found ? found.hex : v.hex,
                  });
                }}
              />

              <CusInput
                label="Кол-во"
                value={String(v.qty)}
                onChange={(e) =>
                  patchVariant(vi, { qty: Number(e.target.value.replace(/\D/g, '')) || 0 })
                }
              />
            </div>

            {/* Palitra o'sishi mumkin — swatch'lar o'z qatorida, o'ralib ketadi */}
            <CusColorSwatch
              className="mt-3"
              swatches={palette}
              value={v.colorName}
              onPick={(s) => patchVariant(vi, { colorName: s.name, hex: s.hex })}
            />

            {data.kind === 'dress' ? (
              <CusChips
                className="mt-4"
                label="Размеры RU"
                options={SIZE_GRID.map((s) => ({ value: String(s.ru), label: String(s.ru) }))}
                value={v.sizes.map(String)}
                error={vi === 0 ? errors.sizes : null}
                onToggle={(size) => {
                  const ru = Number(size);
                  patchVariant(vi, {
                    sizes: v.sizes.includes(ru)
                      ? v.sizes.filter((x) => x !== ru)
                      : [...v.sizes, ru].sort((a, b) => a - b),
                  });
                }}
              />
            ) : null}

            <div className="mt-4">
              <div className="mb-1.5 flex items-center gap-2 text-micro tracking-wide text-muted">
                Фото
                <span className="text-subtle">
                  {v.media.length} / {MAX_VARIANT_PHOTOS}
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
                Имя файла:{' '}
                <span className="text-primary-hover">
                  {toSlug(data.nameRu) || 'item'}_{toSlug(v.colorName) || 'color'}_01.jpg
                </span>
              </div>
            </div>
          </div>
        ))}

        {data.kind === 'accessory' && (
          <div className="rounded-sm border border-border bg-surface p-4">
            <div className="mb-3 flex items-center gap-3">
              <span className="text-body font-medium">Один размер</span>
              <CusSwitch
                checked={data.oneSize}
                onChange={(next) => patch({ oneSize: next })}
                label="Один размер"
                valueLabel={data.oneSize ? 'Да' : 'Нет'}
              />
            </div>

            <CusChips
              label="Размеры аксессуара"
              options={ACC_SIZE_OPTIONS}
              value={data.sizeLabels}
              disabled={data.oneSize}
              error={errors.sizeLabels}
              hint={data.oneSize ? '«Один размер» включён — размеры отключены' : null}
              onToggle={(size) =>
                patch({
                  sizeLabels: data.sizeLabels.includes(size)
                    ? data.sizeLabels.filter((s) => s !== size)
                    : [...data.sizeLabels, size],
                })
              }
            />
          </div>
        )}

        <CusButton
          className="self-start"
          onClick={() =>
            patch({
              variants: [
                ...data.variants,
                { id: makeId('v_'), colorName: '', hex: '#EDE4DA', media: [], qty: 1, sizes: [] },
              ],
            })
          }
        >
          + Вариант (цвет)
        </CusButton>

        {variantError && <div className="text-mini text-danger">{variantError}</div>}
      </div>

      <aside className="sticky top-0 rounded-sm border border-border bg-background p-4">
        <div className="text-micro uppercase tracking-[0.12em] text-subtle">Медиатека</div>
        <p className="mt-1.5 text-mini leading-relaxed text-subtle">
          Перетащите фото в ячейки варианта слева.
        </p>

        <div className="mt-3 grid grid-cols-4 gap-2">
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
