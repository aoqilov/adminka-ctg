import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '@/utils/cn';

type TableProps = {
  children: ReactNode;
  className?: string;
};

/** Jadval qobig'i — bitta ramka, ichkarida qatorlar */
export default function CusTable({ children, className }: TableProps) {
  return (
    <div
      className={cn('min-w-0 overflow-hidden rounded-sm border border-border bg-surface', className)}
    >
      {children}
    </div>
  );
}

type RowProps = HTMLAttributes<HTMLDivElement> & {
  /** CSS grid ustunlari — "34px 1.6fr 1.4fr 80px" */
  cols: string;
  children: ReactNode;
};

/** Sarlavha qatori — kichik uppercase matn, boshqa fon */
export function CusTableHead({ cols, children, className, ...rest }: RowProps) {
  return (
    <div
      {...rest}
      style={{ gridTemplateColumns: cols, ...rest.style }}
      className={cn(
        'grid items-center gap-3 border-b border-border bg-background px-4 py-2.5',
        'text-micro uppercase tracking-[0.12em] text-subtle',
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Ma'lumot qatori */
export function CusTableRow({ cols, children, className, ...rest }: RowProps) {
  return (
    <div
      {...rest}
      style={{ gridTemplateColumns: cols, ...rest.style }}
      className={cn(
        'grid items-center gap-3 border-b border-border-subtle px-4 py-2.5 last:border-b-0',
        'text-body transition-colors',
        rest.onClick && 'cursor-pointer hover:bg-primary-soft',
        className,
      )}
    >
      {children}
    </div>
  );
}
