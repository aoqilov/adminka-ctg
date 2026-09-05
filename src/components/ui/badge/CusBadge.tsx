import type { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export type BadgeVariant =
  | 'neutral'
  | 'brand'
  | 'success'
  | 'warning'
  | 'danger'
  /* Rasm ustida turadigan to'ldirilgan variantlar */
  | 'solid'
  | 'overlay';

type Size = 'xs' | 'sm';

type Props = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant;
  size?: Size;
};

const VARIANT: Record<BadgeVariant, string> = {
  neutral: 'bg-primary-soft text-muted',
  brand: 'bg-primary-soft text-primary-hover',
  success: 'bg-success-soft text-success',
  warning: 'bg-warning-soft text-warning',
  danger: 'bg-danger-soft text-danger',

  solid: 'bg-primary text-primary-fg',
  overlay: 'bg-overlay-dark text-overlay-fg',
};

const SIZE: Record<Size, string> = {
  xs: 'px-1.5 py-0.5 text-micro',
  sm: 'px-2.5 py-1 text-mini',
};

export default function CusBadge({
  variant = 'neutral',
  size = 'xs',
  className,
  children,
  ...rest
}: Props) {
  return (
    <span
      {...rest}
      className={cn(
        'inline-flex items-center whitespace-nowrap rounded-xs font-medium',
        VARIANT[variant],
        SIZE[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
