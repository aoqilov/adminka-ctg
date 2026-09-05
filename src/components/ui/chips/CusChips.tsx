import { cn } from '@/utils/cn';

export type ChipOption = {
  value: string;
  label: string;
};

type Props = {
  options: readonly ChipOption[];
  /** Tanlangan qiymatlar */
  value: readonly string[];
  onToggle: (value: string) => void;
  label?: string;
  error?: string | null;
  hint?: string | null;
  disabled?: boolean;
  className?: string;
};

/** Ko'p tanlovli chip guruhi — теги, ткани, декор, размеры uchun */
export default function CusChips({
  options,
  value,
  onToggle,
  label,
  error,
  hint,
  disabled,
  className,
}: Props) {
  return (
    <div className={cn('w-full min-w-0', className)}>
      {label && <div className="mb-1.5 text-micro tracking-wide text-muted">{label}</div>}

      <div className={cn('flex flex-wrap gap-1.5', disabled && 'opacity-55')}>
        {options.map((o) => {
          const on = value.includes(o.value);
          return (
            <button
              key={o.value}
              type="button"
              disabled={disabled}
              aria-pressed={on}
              onClick={() => onToggle(o.value)}
              className={cn(
                'rounded-sm border px-2.5 py-1 text-mini transition-colors',
                on
                  ? 'border-primary bg-primary text-primary-fg'
                  : 'border-border bg-surface text-muted hover:border-primary hover:text-primary-hover',
                disabled && 'cursor-not-allowed',
              )}
            >
              {o.label}
            </button>
          );
        })}
      </div>

      {error ? (
        <p className="mt-1 text-micro text-danger">{error}</p>
      ) : (
        hint && <p className="mt-1 text-micro text-subtle">{hint}</p>
      )}
    </div>
  );
}
