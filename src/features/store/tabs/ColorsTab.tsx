import { FiTrash2 } from 'react-icons/fi';

import { CusButton, CusIconButton, CusInput } from '@/components/ui';
import { useStoreSettingsStore } from '@/store/useStoreSettingsStore';

export default function ColorsTab() {
  const palette = useStoreSettingsStore((s) => s.palette);
  const patch = useStoreSettingsStore((s) => s.patchColor);
  const add = useStoreSettingsStore((s) => s.addColor);
  const remove = useStoreSettingsStore((s) => s.removeColor);

  return (
    <div className="flex flex-col gap-3">
      <p className="text-tiny text-muted">
        Эти цвета появляются в вариантах товара и в фильтре по цвету.
      </p>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-3">
        {palette.map((c) => (
          <div key={c.id} className="rounded-sm border border-border bg-surface p-3">
            <div className="mb-2.5 flex items-center gap-2.5">
              {/* Palitra rangi — kontent, token emas */}
              <span
                style={{ background: c.hex }}
                className="h-7 w-7 shrink-0 rounded-full ring-1 ring-border"
              />
              <span className="min-w-0 flex-1 truncate text-body font-medium">
                {c.name || 'Без названия'}
              </span>
              <CusIconButton
                className="shrink-0"
                variant="danger"
                label="Удалить"
                icon={<FiTrash2 size={14} />}
                onClick={() => remove(c.id)}
              />
            </div>

            <div className="grid grid-cols-[minmax(0,1fr)_100px] gap-2.5">
              <CusInput
                label="Название"
                value={c.name}
                onChange={(e) => patch(c.id, { name: e.target.value })}
              />
              <CusInput
                label="HEX"
                value={c.hex}
                onChange={(e) => patch(c.id, { hex: e.target.value })}
              />
            </div>
          </div>
        ))}
      </div>

      <CusButton className="self-start" onClick={add}>
        + цвет
      </CusButton>
    </div>
  );
}
