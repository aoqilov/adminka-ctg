import { cn } from '@/utils/cn';

export type StepItem = {
  label: string;
};

type Props = {
  steps: readonly StepItem[];
  /** 0-dan boshlanadi */
  current: number;
  onPick?: (index: number) => void;
  className?: string;
};

/** Editor qadamlari — 1 Основное · 2 Варианты · 3 Цена */
export default function CusStepper({ steps, current, onPick, className }: Props) {
  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {steps.map((s, i) => {
        const active = i === current;
        const done = i < current;

        return (
          <button
            key={s.label}
            type="button"
            aria-current={active ? 'step' : undefined}
            onClick={() => onPick?.(i)}
            disabled={!onPick}
            className={cn(
              'inline-flex h-8 items-center gap-2 rounded-sm border px-3 text-tiny transition-colors',
              active
                ? 'border-primary bg-primary text-primary-fg'
                : done
                  ? 'border-border bg-primary-soft text-primary-hover'
                  : 'border-border bg-surface text-primary-hover',
              onPick && !active && 'hover:border-primary',
            )}
          >
            <span
              className={cn(
                'grid h-4 w-4 place-items-center rounded-full text-micro',
                active ? 'bg-primary-fg text-primary' : 'bg-primary-soft text-primary-hover',
              )}
            >
              {i + 1}
            </span>
            {s.label}
          </button>
        );
      })}
    </div>
  );
}
