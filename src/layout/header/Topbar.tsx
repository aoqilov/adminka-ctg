import { FiBell, FiSearch } from 'react-icons/fi';
import { useSearchParams } from 'react-router-dom';

import { CusBreadcrumb, CusInput } from '@/components/ui';
import { useCrumbs } from '@/layout/header/useCrumbs';

/**
 * Yuqori panel. Qidiruv URL'da (`?q=`) saqlanadi — shunda sahifa
 * yangilansa ham holat yo'qolmaydi va feature'lar uni o'qiy oladi.
 */
export default function Topbar() {
  const crumbs = useCrumbs();
  const [params, setParams] = useSearchParams();
  const query = params.get('q') ?? '';

  const onSearch = (value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set('q', value);
    else next.delete('q');
    setParams(next, { replace: true });
  };

  return (
    <header className="flex shrink-0 items-center gap-4 border-b border-border px-7 py-3">
      <CusBreadcrumb className="flex-1" items={crumbs} />

      <div className="w-full min-w-40 max-w-85 shrink">
        <CusInput
          value={query}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Поиск…"
          leftIcon={<FiSearch size={14} />}
          aria-label="Поиск"
        />
      </div>

      <FiBell size={16} className="shrink-0 text-subtle" />
    </header>
  );
}
