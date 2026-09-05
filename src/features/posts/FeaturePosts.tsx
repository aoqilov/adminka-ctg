import PromoList from '@/features/promotions/components/PromoList';
import { NEWS_MODULE } from '@/features/promotions/config';
import { useCatalogStore } from '@/store/useCatalogStore';

export default function FeaturePosts() {
  const posts = useCatalogStore((s) => s.posts);
  const removePost = useCatalogStore((s) => s.removePost);

  return <PromoList module={NEWS_MODULE} items={posts} onRemove={removePost} />;
}
