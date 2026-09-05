import { ACCENT_OPTIONS } from '@/constants/store';
import { CusCard, useToast } from '@/components/ui';
import type { ThemeMode } from '@/features/settings/types';
import { useUiStore } from '@/store/useUiStore';
import { cn } from '@/utils/cn';

const THEME_OPTIONS: readonly { value: ThemeMode; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

export default function FeatureSettings() {
  const theme = useUiStore((s) => s.theme);
  const accent = useUiStore((s) => s.accent);
  const setTheme = useUiStore((s) => s.setTheme);
  const setAccent = useUiStore((s) => s.setAccent);
  const { show } = useToast();

  return (
    <div>
      <h1 className="mb-1 font-serif text-[32px] leading-tight">Settings</h1>
      <p className="mb-6 text-muted">Оформление админ-панели.</p>

      <CusCard padding="none" className="max-w-2xl">
        <div className="flex items-center gap-4 border-b border-border-subtle px-4 py-4">
          <div className="min-w-0 flex-1">
            <div className="text-body font-medium text-foreground">Тема</div>
            <div className="mt-0.5 text-micro text-subtle">Светлое или тёмное оформление</div>
          </div>

          <div className="flex gap-1.5">
            {THEME_OPTIONS.map((o) => (
              <button
                key={o.value}
                type="button"
                onClick={() => setTheme(o.value)}
                className={cn(
                  'h-8 rounded-sm border px-3 text-tiny transition-colors',
                  theme === o.value
                    ? 'border-primary bg-primary text-primary-fg'
                    : 'border-border bg-surface text-muted hover:border-primary',
                )}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 px-4 py-4">
          <div className="min-w-0 flex-1">
            <div className="text-body font-medium text-foreground">Акцентный цвет</div>
            <div className="mt-0.5 text-micro text-subtle">
              Вся панель перекрашивается под выбранный цвет
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {ACCENT_OPTIONS.map((a) => {
              const on = accent === a.id;

              return (
                <button
                  key={a.id}
                  type="button"
                  title={a.label}
                  onClick={() => {
                    setAccent(a.id);
                    show(`${a.label} выбран`);
                  }}
                  className={cn(
                    'flex items-center gap-2 rounded-sm border px-2.5 py-1.5 text-mini transition-colors',
                    on ? 'border-primary text-primary-hover' : 'border-border text-muted',
                  )}
                >
                  {/* Swatch rangi — token emas, ro'yxatdagi namuna */}
                  <span
                    style={{ background: a.hex }}
                    className="h-4 w-4 shrink-0 rounded-full ring-1 ring-border"
                  />
                  {a.label}
                </button>
              );
            })}
          </div>
        </div>
      </CusCard>
    </div>
  );
}
