import { FiTrash2 } from 'react-icons/fi';

import { CusButton, CusIconButton, CusInput, CusSelect, CusSwitch } from '@/components/ui';
import { SOCIAL_PLATFORMS } from '@/constants/store';
import { useStoreSettingsStore } from '@/store/useStoreSettingsStore';
import { cn } from '@/utils/cn';

const PLATFORM_OPTIONS = SOCIAL_PLATFORMS.map(([name]) => ({ value: name, label: name }));

export default function SocialsTab() {
  const socials = useStoreSettingsStore((s) => s.socials);
  const patch = useStoreSettingsStore((s) => s.patchSocial);
  const add = useStoreSettingsStore((s) => s.addSocial);
  const remove = useStoreSettingsStore((s) => s.removeSocial);

  return (
    <div className="flex flex-col gap-3">
      {socials.map((s) => (
        <div
          key={s.id}
          className={cn(
            'rounded-sm border border-border bg-surface p-4',
            !s.active && 'opacity-55',
          )}
        >
          <div className="mb-3 flex items-center gap-2.5">
            {/* Brend rangi — foydalanuvchi kiritgan qiymat, token emas */}
            <span
              style={{ background: s.hex }}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-tiny font-semibold text-overlay-fg"
            >
              {s.platform.charAt(0)}
            </span>

            <span className="min-w-0 flex-1 truncate text-body font-medium">{s.platform}</span>

            <CusSwitch
              className="shrink-0"
              checked={s.active}
              onChange={(v) => patch(s.id, { active: v })}
              label={s.active ? 'Показывается' : 'Скрыт'}
              valueLabel={s.active ? 'Показывается' : 'Скрыт'}
            />

            <CusIconButton
              className="shrink-0"
              variant="danger"
              label="Удалить"
              icon={<FiTrash2 size={14} />}
              onClick={() => remove(s.id)}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <CusSelect
              label="Площадка"
              options={PLATFORM_OPTIONS}
              value={s.platform}
              onChange={(e) => {
                const name = e.target.value;
                const found = SOCIAL_PLATFORMS.find((p) => p[0] === name);
                patch(s.id, {
                  platform: name,
                  hex: found ? found[1] : s.hex,
                  url: found ? found[2] + s.handle.replace('@', '') : s.url,
                });
              }}
            />
            <CusInput
              label="Ник"
              value={s.handle}
              onChange={(e) => patch(s.id, { handle: e.target.value })}
            />
            <CusInput
              label="Ссылка"
              value={s.url}
              onChange={(e) => patch(s.id, { url: e.target.value })}
            />
          </div>
        </div>
      ))}

      <CusButton className="self-start" onClick={add}>
        + площадка
      </CusButton>
    </div>
  );
}
