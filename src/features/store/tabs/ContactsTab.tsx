import { FiTrash2 } from 'react-icons/fi';

import { CusButton, CusIconButton, CusInput, CusSwitch } from '@/components/ui';
import { useStoreSettingsStore } from '@/store/useStoreSettingsStore';

export default function ContactsTab() {
  const contacts = useStoreSettingsStore((s) => s.contacts);
  const patch = useStoreSettingsStore((s) => s.patchContact);
  const add = useStoreSettingsStore((s) => s.addContact);
  const remove = useStoreSettingsStore((s) => s.removeContact);

  return (
    <div className="flex flex-col gap-3">
      {contacts.map((c) => (
        <div key={c.id} className="rounded-sm border border-border bg-surface p-4">
          <div className="mb-3 flex items-center gap-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary-soft text-tiny font-semibold text-primary-hover">
              {c.name.charAt(0)}
            </span>
            <span className="min-w-0 flex-1 truncate text-body font-medium">
              {c.name || 'Без имени'}
            </span>

            <CusSwitch
              className="shrink-0"
              checked={c.telegram}
              onChange={(v) => patch(c.id, { telegram: v })}
              label={c.telegram ? 'Telegram есть' : 'Только звонок'}
              valueLabel={c.telegram ? 'Telegram есть' : 'Только звонок'}
            />

            <CusIconButton
              variant="danger"
              label="Удалить"
              icon={<FiTrash2 size={14} />}
              onClick={() => remove(c.id)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <CusInput
              label="Имя"
              value={c.name}
              onChange={(e) => patch(c.id, { name: e.target.value })}
            />
            <CusInput
              label="Роль"
              value={c.role}
              onChange={(e) => patch(c.id, { role: e.target.value })}
            />
            <CusInput
              label="Телефон"
              value={c.phone}
              onChange={(e) => patch(c.id, { phone: e.target.value })}
            />
            <CusInput
              label="Часы"
              value={c.hours}
              onChange={(e) => patch(c.id, { hours: e.target.value })}
            />
            {c.telegram && (
              <CusInput
                label="Telegram"
                value={c.tgUrl}
                placeholder="t.me/username"
                onChange={(e) => patch(c.id, { tgUrl: e.target.value })}
              />
            )}
          </div>
        </div>
      ))}

      <CusButton className="self-start" onClick={add}>
        + контакт
      </CusButton>
    </div>
  );
}
