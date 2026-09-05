import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { cn } from '@/utils/cn';

type BaseProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
  /** O'ng tomondagi qiymat yoki badge */
  trailing?: ReactNode;
  chevron?: boolean;
  danger?: boolean;
  className?: string;
};

type Props = BaseProps &
  (
    | { to: string; href?: never; onClick?: never }
    | { href: string; to?: never; onClick?: never }
    | { onClick: () => void; to?: never; href?: never }
    | { to?: never; href?: never; onClick?: never }
  );

/** Ro'yxatning bitta qatori — sozlamalar va yon menyular uchun */
export default function CusListItem({
  icon,
  title,
  description,
  trailing,
  chevron = true,
  danger,
  className,
  to,
  href,
  onClick,
}: Props) {
  const interactive = Boolean(to || href || onClick);

  const body = (
    <>
      {icon && (
        <span
          className={cn(
            'grid h-7 w-7 shrink-0 place-items-center rounded-sm',
            danger ? 'bg-danger-soft text-danger' : 'bg-primary-soft text-primary-hover',
          )}
        >
          {icon}
        </span>
      )}

      <span className="min-w-0 flex-1 text-left">
        <span
          className={cn(
            'block truncate text-body font-medium',
            danger ? 'text-danger' : 'text-foreground',
          )}
        >
          {title}
        </span>
        {description && (
          <span className="mt-0.5 block truncate text-micro text-subtle">{description}</span>
        )}
      </span>

      {trailing && <span className="shrink-0 text-mini text-muted">{trailing}</span>}

      {interactive && chevron && <FiChevronRight size={15} className="shrink-0 text-subtle" />}
    </>
  );

  const classes = cn(
    'flex w-full items-center gap-3 border-b border-border-subtle px-4 py-3 text-left transition-colors last:border-b-0',
    interactive && 'hover:bg-primary-soft',
    className,
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {body}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {body}
      </a>
    );
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {body}
      </button>
    );
  }

  return <div className={classes}>{body}</div>;
}
