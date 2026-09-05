import { Link, NavLink, useLocation } from 'react-router-dom';

import { CusLogo } from '@/components/ui';
import { APP_LOGO_URL, APP_NAME, APP_TAGLINE } from '@/constants/app';
import { NAV_ITEMS } from '@/constants/nav';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/utils/cn';

/** Chap panel — brend, navigatsiya, foydalanuvchi */
export default function Sidebar() {
  const { pathname } = useLocation();

  return (
    <aside className="flex w-58 shrink-0 flex-col overflow-hidden rounded-3xl border border-border bg-surface">
      <Link
        to={ROUTES.dashboard}
        aria-label={APP_NAME}
        className="block px-6 pb-5 pt-6"
      >
        <CusLogo src={APP_LOGO_URL} alt={APP_NAME} size={44} className="text-primary" />

        <span className="mt-2.5 block text-[9px] uppercase tracking-[0.18em] text-subtle">
          {APP_TAGLINE}
        </span>
      </Link>

      <nav className="flex flex-1 flex-col gap-0.5 px-3 py-2">
        {NAV_ITEMS.map((item) => {
          const active = pathname.startsWith(item.match);
          const Icon = item.icon;

          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={cn(
                'flex items-center gap-2.5 border-l-2 px-3 py-2.5 text-body transition-colors',
                active
                  ? 'border-l-primary bg-primary-soft font-semibold text-primary-hover'
                  : 'border-l-transparent text-muted hover:text-primary-hover',
              )}
            >
              <Icon size={16} className="shrink-0" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <div className="flex items-center gap-2.5 border-t border-border px-5 py-4">
        <span className="grid h-7.5 w-7.5 shrink-0 place-items-center rounded-full bg-primary text-mini font-semibold text-primary-fg">
          AU
        </span>
        <span className="min-w-0">
          <span className="block truncate text-tiny font-semibold text-foreground">Admin User</span>
          <span className="block truncate text-micro text-subtle">admin@amirabridal.com</span>
        </span>
      </div>
    </aside>
  );
}
