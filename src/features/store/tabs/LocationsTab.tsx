import { FiMapPin, FiTrash2 } from 'react-icons/fi';

import { CusButton, CusIconButton, CusInput } from '@/components/ui';
import { useStoreSettingsStore } from '@/store/useStoreSettingsStore';
import { cn } from '@/utils/cn';

export default function LocationsTab() {
  const locations = useStoreSettingsStore((s) => s.locations);
  const patch = useStoreSettingsStore((s) => s.patchLocation);
  const setMain = useStoreSettingsStore((s) => s.setMainLocation);
  const add = useStoreSettingsStore((s) => s.addLocation);
  const remove = useStoreSettingsStore((s) => s.removeLocation);

  return (
    <div className="flex flex-col gap-3">
      {locations.map((l) => (
        <div key={l.id} className="rounded-sm border border-border bg-surface p-4">
          <div className="mb-3 flex items-center gap-2.5">
            <FiMapPin size={14} className="text-primary" />
            <span className="min-w-0 flex-1 truncate text-body font-medium">
              {l.name || 'Без названия'}
            </span>

            <button
              type="button"
              onClick={() => setMain(l.id)}
              className={cn(
                'h-7 shrink-0 whitespace-nowrap rounded-sm border px-2.5 text-mini transition-colors',
                l.main
                  ? 'border-primary bg-primary text-primary-fg'
                  : 'border-border bg-surface text-muted hover:border-primary',
              )}
            >
              {l.main ? 'Главный салон' : 'Сделать главным'}
            </button>

            <CusIconButton
              variant="danger"
              label="Удалить"
              icon={<FiTrash2 size={14} />}
              onClick={() => remove(l.id)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <CusInput
              label="Название"
              value={l.name}
              onChange={(e) => patch(l.id, { name: e.target.value })}
            />
            <CusInput
              label="Адрес"
              value={l.address}
              onChange={(e) => patch(l.id, { address: e.target.value })}
            />
            <CusInput
              label="Ориентир"
              value={l.note}
              onChange={(e) => patch(l.id, { note: e.target.value })}
            />
            <CusInput
              label="Часы работы"
              value={l.hours}
              onChange={(e) => patch(l.id, { hours: e.target.value })}
            />
            <CusInput
              label="Телефон"
              value={l.phone}
              onChange={(e) => patch(l.id, { phone: e.target.value })}
            />
          </div>
        </div>
      ))}

      <CusButton className="self-start" onClick={add}>
        + салон
      </CusButton>
    </div>
  );
}
