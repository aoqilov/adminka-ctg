import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Props = {
  title: string;
  description?: string;
  /** CTA tugmasi */
  action?: ReactNode;
  className?: string;
};

export default function CusEmptyState({ title, description, action, className }: Props) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-2 rounded-sm border border-dashed border-border bg-surface px-6 py-12 text-center',
        className,
      )}
    >
      <p className="font-serif text-lg text-foreground">{title}</p>
      {description && <p className="max-w-sm text-tiny text-muted">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
