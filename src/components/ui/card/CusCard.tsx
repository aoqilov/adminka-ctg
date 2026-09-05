import type { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

type Props = HTMLAttributes<HTMLDivElement> & {
  padding?: 'none' | 'sm' | 'md' | 'lg';
  /** Tanlangan/faol karta — accent ramka + yumshoq soya */
  active?: boolean;
  interactive?: boolean;
};

const PADDING: Record<NonNullable<Props['padding']>, string> = {
  none: '',
  sm: 'p-2.5',
  md: 'p-4',
  lg: 'p-4.5',
};

export default function CusCard({
  padding = 'md',
  active,
  interactive,
  className,
  children,
  ...rest
}: Props) {
  return (
    <div
      {...rest}
      className={cn(
        'rounded-sm border bg-surface text-foreground',
        active ? 'border-primary shadow-pop' : 'border-border',
        PADDING[padding],
        interactive && 'cursor-pointer transition-colors hover:border-primary',
        className,
      )}
    >
      {children}
    </div>
  );
}
