import PromoEditor from '@/features/promotions/components/PromoEditor';
import { NEWS_MODULE } from '@/features/promotions/config';
import { useCatalogStore } from '@/store/useCatalogStore';

export default function FeaturePostEditor() {
  const posts = useCatalogStore((s) => s.posts);
  const upsertPost = useCatalogStore((s) => s.upsertPost);

  return <PromoEditor module={NEWS_MODULE} items={posts} onSave={upsertPost} />;
}
