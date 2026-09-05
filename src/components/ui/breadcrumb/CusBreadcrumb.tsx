import { Link } from 'react-router-dom';
import { cn } from '@/utils/cn';

export type Crumb = {
  label: string;
  to?: string;
};

type Props = {
  items: readonly Crumb[];
  className?: string;
};

/** Header navigatsiyasi: Admin / Categories / Свадебные платья / A-Line */
export default function CusBreadcrumb({ items, className }: Props) {
  return (
    <nav
      aria-label="breadcrumb"
      className={cn('flex min-w-0 items-center gap-2 text-tiny', className)}
    >
      {items.map((item, i) => {
        const last = i === items.length - 1;

        return (
          <span key={`${item.label}-${i}`} className="flex min-w-0 items-center gap-2">
            {i > 0 && <span className="shrink-0 text-subtle">/</span>}
            {item.to && !last ? (
              <Link
                to={item.to}
                className="truncate text-subtle transition-colors hover:text-primary-hover"
              >
                {item.label}
              </Link>
            ) : (
              <span className={cn('truncate', last ? 'font-medium text-foreground' : 'text-subtle')}>
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
