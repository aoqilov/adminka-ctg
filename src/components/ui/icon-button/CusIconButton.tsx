import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Variant = 'bordered' | 'plain' | 'danger';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Tooltip va skrinrider uchun — majburiy */
  label: string;
  icon: ReactNode;
  variant?: Variant;
  /** Tanlangan holat (view switcher tugmalari uchun) */
  active?: boolean;
};

const VARIANT: Record<Variant, string> = {
  bordered: 'h-8 w-8.5 rounded-sm border border-border bg-surface text-muted hover:text-primary-hover',
  plain: 'text-primary hover:text-primary-hover',
  danger: 'text-danger hover:opacity-70',
};

export default function CusIconButton({
  label,
  icon,
  variant = 'plain',
  active,
  className,
  type = 'button',
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      type={type}
      title={label}
      aria-label={label}
      aria-pressed={active}
      className={cn(
        'inline-flex shrink-0 items-center justify-center transition-colors disabled:opacity-45',
        VARIANT[variant],
        active && variant === 'bordered' && 'border-primary bg-primary-soft text-primary-hover',
        className,
      )}
    >
      {icon}
    </button>
  );
}
