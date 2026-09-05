import PromoEditor from '@/features/promotions/components/PromoEditor';
import { SALE_MODULE } from '@/features/promotions/config';
import { useCatalogStore } from '@/store/useCatalogStore';

export default function FeaturePromoEditor() {
  const promos = useCatalogStore((s) => s.promos);
  const upsertPromo = useCatalogStore((s) => s.upsertPromo);

  return <PromoEditor module={SALE_MODULE} items={promos} onSave={upsertPromo} />;
}
