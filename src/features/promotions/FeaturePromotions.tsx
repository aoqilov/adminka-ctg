import PromoList from '@/features/promotions/components/PromoList';
import { SALE_MODULE } from '@/features/promotions/config';
import { useCatalogStore } from '@/store/useCatalogStore';

export default function FeaturePromotions() {
  const promos = useCatalogStore((s) => s.promos);
  const removePromo = useCatalogStore((s) => s.removePromo);

  return <PromoList module={SALE_MODULE} items={promos} onRemove={removePromo} />;
}
