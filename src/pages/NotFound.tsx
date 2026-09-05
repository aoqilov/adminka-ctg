import { Link } from 'react-router-dom';

import { CusButton, CusEmptyState } from '@/components/ui';
import { ROUTES } from '@/constants/routes';

export default function NotFound() {
  return (
    <CusEmptyState
      title="Страница не найдена"
      description="Проверьте адрес или вернитесь на дашборд."
      action={
        <Link to={ROUTES.dashboard}>
          <CusButton>На дашборд</CusButton>
        </Link>
      }
    />
  );
}
