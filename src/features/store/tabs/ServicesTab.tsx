import { FiMoreVertical, FiTrash2 } from 'react-icons/fi';

import {
  CusButton,
  CusIconButton,
  CusInput,
  CusSelect,
  CusSwitch,
  CusTextarea,
} from '@/components/ui';
import { SERVICE_ICONS } from '@/constants/store';
import { useDragSort } from '@/hooks/useDragSort';
import { useStoreSettingsStore } from '@/store/useStoreSettingsStore';
import { cn } from '@/utils/cn';

const ICON_OPTIONS = SERVICE_ICONS.map((i) => ({ value: i, label: i }));

export default function ServicesTab() {
  const services = useStoreSettingsStore((s) => s.services);
  const patch = useStoreSettingsStore((s) => s.patchService);
  const setOpen = useStoreSettingsStore((s) => s.setOpenService);
  const reorder = useStoreSettingsStore((s) => s.reorderServices);
  const add = useStoreSettingsStore((s) => s.addService);
  const remove = useStoreSettingsStore((s) => s.removeService);

  const drag = useDragSort(reorder);

  return (
    <div className="flex flex-col gap-3">
      {services.map((v, i) => (
        <div
          key={v.id}
          {...drag.getItemProps(i)}
          className={cn(
            'cursor-grab rounded-sm border border-border bg-surface p-4',
            drag.isDragging(i) && 'opacity-45',
            drag.isOver(i) && 'ring-2 ring-primary ring-inset',
            !v.active && 'opacity-55',
          )}
        >
          <div className="mb-3 flex items-center gap-2.5">
            <FiMoreVertical size={13} className="text-subtle" />
            <span className="text-mini text-subtle">#{i + 1}</span>
            <span className="min-w-0 flex-1 truncate text-body font-medium">
              {v.title || 'Новая услуга'}
            </span>

            <button
              type="button"
              onClick={() => setOpen(v.id)}
              className={cn(
                'h-7 shrink-0 whitespace-nowrap rounded-sm border px-2.5 text-mini transition-colors',
                v.open
                  ? 'border-primary bg-primary-soft text-primary-hover'
                  : 'border-border bg-surface text-muted hover:border-primary',
              )}
            >
              {v.open ? 'Раскрыт по умолчанию' : 'Свёрнут'}
            </button>

            <CusSwitch
              className="shrink-0"
              checked={v.active}
              onChange={(next) => patch(v.id, { active: next })}
              label={v.active ? 'Показывается' : 'Скрыт'}
              valueLabel={v.active ? 'Показывается' : 'Скрыт'}
            />

            <CusIconButton
              variant="danger"
              label="Удалить"
              icon={<FiTrash2 size={14} />}
              onClick={() => remove(v.id)}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <CusSelect
              label="Иконка"
              options={ICON_OPTIONS}
              value={v.icon}
              onChange={(e) => patch(v.id, { icon: e.target.value })}
            />
            <CusInput
              label="Заголовок"
              value={v.title}
              onChange={(e) => patch(v.id, { title: e.target.value })}
            />
            <CusInput
              label="Кикер"
              value={v.kicker}
              onChange={(e) => patch(v.id, { kicker: e.target.value })}
            />
          </div>

          <CusTextarea
            className="mt-3"
            label="Описание"
            value={v.body}
            onChange={(e) => patch(v.id, { body: e.target.value })}
          />
        </div>
      ))}

      <CusButton className="self-start" onClick={add}>
        + услуга
      </CusButton>
    </div>
  );
}
