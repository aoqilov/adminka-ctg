import ProductPicker from '@/features/promotions/components/ProductPicker';
import { SALE_MODULE } from '@/features/promotions/config';

export default function FeaturePromoPicker() {
  return <ProductPicker module={SALE_MODULE} />;
}
