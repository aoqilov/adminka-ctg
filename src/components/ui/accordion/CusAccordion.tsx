import { useState, type ReactNode } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { cn } from '@/utils/cn';

export type AccordionItem = {
  id: string;
  title: string;
  /** Sarlavha ostidagi kichik izoh */
  kicker?: string;
  icon?: ReactNode;
  content: ReactNode;
};

type Props = {
  items: readonly AccordionItem[];
  type?: 'single' | 'multiple';
  defaultOpenIds?: readonly string[];
  className?: string;
};

export default function CusAccordion({
  items,
  type = 'single',
  defaultOpenIds = [],
  className,
}: Props) {
  const [openIds, setOpenIds] = useState<Set<string>>(new Set(defaultOpenIds));

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      if (type === 'single') return prev.has(id) ? new Set() : new Set([id]);

      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className={cn('overflow-hidden rounded-sm border border-border bg-surface', className)}>
      {items.map((item) => {
        const open = openIds.has(item.id);

        return (
          <div key={item.id} className="border-b border-border-subtle last:border-b-0">
            <button
              type="button"
              aria-expanded={open}
              onClick={() => toggle(item.id)}
              className="flex w-full items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-primary-soft"
            >
              {item.icon && <span className="shrink-0 text-primary">{item.icon}</span>}

              <span className="min-w-0 flex-1">
                <span className="block truncate text-body font-medium text-foreground">
                  {item.title}
                </span>
                {item.kicker && (
                  <span className="mt-0.5 block truncate text-micro text-subtle">
                    {item.kicker}
                  </span>
                )}
              </span>

              <FiChevronDown
                size={15}
                className={cn('shrink-0 text-subtle transition-transform', open && 'rotate-180')}
              />
            </button>

            {open && <div className="px-4 pb-3 text-tiny text-muted">{item.content}</div>}
          </div>
        );
      })}
    </div>
  );
}
