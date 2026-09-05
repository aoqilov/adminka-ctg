import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

export type SegmentItem<T extends string> = {
  value: T;
  label?: string;
  icon?: ReactNode;
  /** Tugma ostidagi kichik izoh (Магазин tab'lari uchun) */
  sub?: string;
  ariaLabel?: string;
};

type Props<T extends string> = {
  items: readonly SegmentItem<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  size?: 'sm' | 'md';
  fullWidth?: boolean;
};

/** Alohida ramkali tugmalar qatori — dizaynda tab va view switcher shu ko'rinishda */
export default function CusSegment<T extends string>({
  items,
  value,
  onChange,
  className,
  size = 'md',
  fullWidth = false,
}: Props<T>) {
  return (
    <div
      role="tablist"
      className={cn('flex flex-wrap gap-1.5', fullWidth && 'w-full', className)}
    >
      {items.map((item) => {
        const active = item.value === value;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={active}
            aria-label={item.ariaLabel ?? item.label}
            onClick={() => onChange(item.value)}
            className={cn(
              'inline-flex items-center gap-2 rounded-sm border transition-colors',
              size === 'sm' ? 'h-7 px-2.5 text-mini' : 'h-8 px-3 text-tiny',
              item.sub && 'h-auto flex-col items-start gap-0.5 py-1.5',
              fullWidth && 'flex-1 justify-center',
              active
                ? 'border-primary bg-primary-soft text-primary-hover'
                : 'border-border bg-surface text-muted hover:border-primary',
            )}
          >
            <span className="inline-flex items-center gap-1.5">
              {item.icon}
              {item.label}
            </span>
            {item.sub && <span className="text-micro text-subtle">{item.sub}</span>}
          </button>
        );
      })}
    </div>
  );
}
