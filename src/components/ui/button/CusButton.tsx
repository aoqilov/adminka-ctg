import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
};

const VARIANT_STYLES: Record<Variant, string> = {
  primary: 'border-primary bg-primary text-primary-fg hover:bg-primary-hover',
  secondary: 'border-border bg-surface text-muted hover:bg-primary-soft hover:text-primary-hover',
  ghost: 'border-transparent bg-transparent text-muted hover:bg-primary-soft hover:text-primary-hover',
  danger: 'border-transparent bg-transparent text-danger hover:bg-danger-soft',
};

const SIZE_STYLES: Record<Size, string> = {
  sm: 'h-7 gap-1.5 px-2.5 text-mini',
  md: 'h-8 gap-2 px-3.5 text-tiny',
  lg: 'h-9 gap-2 px-4 text-body',
};

export default function CusButton({
  variant = 'primary',
  size = 'md',
  fullWidth,
  loading,
  leftIcon,
  rightIcon,
  disabled,
  className,
  children,
  type = 'button',
  ...rest
}: Props) {
  return (
    <button
      {...rest}
      type={type}
      disabled={disabled || loading}
      className={cn(
        'inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-sm border font-medium transition-colors',
        'disabled:cursor-not-allowed disabled:opacity-45',
        VARIANT_STYLES[variant],
        SIZE_STYLES[size],
        /* w-full flex qatorida siqila olishi kerak, aks holda yondosh
           element konteynerdan chiqib ketadi */
        fullWidth && 'w-full shrink',
        className,
      )}
    >
      {loading ? (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        leftIcon
      )}
      {children}
      {rightIcon}
    </button>
  );
}
