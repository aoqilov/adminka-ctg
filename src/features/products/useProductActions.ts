import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useToast } from '@/components/ui';
import { ROUTES, productPath } from '@/constants/routes';
import type { FlatProduct } from '@/features/products/types';
import { useCatalogStore } from '@/store/useCatalogStore';
import type { Id } from '@/types/common';

/**
 * Tovar ustidagi umumiy amallar — Products, Sub-products va Dashboard
 * uchalasida bir xil ishlaydi.
 */
export function useProductActions() {
  const navigate = useNavigate();
  const toggleProductHidden = useCatalogStore((s) => s.toggleProductHidden);
  const toggleProductBlurred = useCatalogStore((s) => s.toggleProductBlurred);
  const removeProduct = useCatalogStore((s) => s.removeProduct);
  const { show } = useToast();

  /** `id === null` — yangi tovar */
  const openEditor = useCallback(
    (id: Id | null, subId: Id) => {
      const target = id ? productPath(id) : ROUTES.productNew;
      navigate(`${target}?sub=${subId}`);
    },
    [navigate],
  );

  const toggleHidden = useCallback(
    (product: FlatProduct) => {
      toggleProductHidden(product.subId, product.id);
      show(
        product.isHidden
          ? `${product.name} — виден на сайте`
          : `${product.name} — скрыт с сайта (остаётся в базе)`,
      );
    },
    [toggleProductHidden, show],
  );

  const toggleBlurred = useCallback(
    (product: FlatProduct) => {
      toggleProductBlurred(product.subId, product.id);
      show(
        product.isBlurred
          ? `${product.name} — фото показывается обычным`
          : `${product.name} — фото размыто на сайте`,
      );
    },
    [toggleProductBlurred, show],
  );

  const remove = useCallback(
    (product: FlatProduct) => removeProduct(product.subId, product.id),
    [removeProduct],
  );

  return { openEditor, toggleHidden, toggleBlurred, remove };
}
