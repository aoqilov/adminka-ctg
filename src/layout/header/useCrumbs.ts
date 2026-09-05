import { useLocation } from 'react-router-dom';

import type { Crumb } from '@/components/ui';
import { ROUTES, subcategoryPath } from '@/constants/routes';
import { useCatalogStore, useFlatProducts } from '@/store/useCatalogStore';

const SECTION_LABEL: Record<string, string> = {
  dashboard: 'Dashboard',
  products: 'Products',
  categories: 'Categories',
  sale: 'Скидки',
  news: 'News',
  store: 'Магазин',
  settings: 'Settings',
  schema: 'Schema',
};

const SECTION_PATH: Record<string, string> = {
  store: '/store/socials',
};

/** Header breadcrumb'i — joriy URL va katalogdan yig'iladi */
export function useCrumbs(): Crumb[] {
  const { pathname } = useLocation();
  const cats = useCatalogStore((s) => s.cats);
  const promos = useCatalogStore((s) => s.promos);
  const posts = useCatalogStore((s) => s.posts);
  const products = useFlatProducts();

  const [section, second, third] = pathname.split('/').filter(Boolean);
  const crumbs: Crumb[] = [{ label: 'Admin', to: ROUTES.dashboard }];

  if (!section) return crumbs;

  crumbs.push({
    label: SECTION_LABEL[section] ?? section,
    to: SECTION_PATH[section] ?? `/${section}`,
  });

  if (section === 'categories' && second) {
    const cat = cats.find((c) => c.id === second);
    if (cat) crumbs.push({ label: cat.name, to: ROUTES.categories });

    const sub = cat?.subs.find((s) => s.id === third);
    if (cat && sub) crumbs.push({ label: sub.name, to: subcategoryPath(cat.id, sub.id) });
  }

  if (section === 'products' && second) {
    const product = products.find((p) => p.id === second);
    crumbs.push({ label: product ? product.name : 'Новый товар' });
  }

  if (section === 'sale' && second) {
    const promo = promos.find((p) => p.id === second);
    crumbs.push({ label: promo ? promo.titleRu : 'Новая скидка' });
    if (third === 'picker') crumbs.push({ label: 'Выбор товаров' });
  }

  if (section === 'news' && second) {
    const post = posts.find((p) => p.id === second);
    crumbs.push({ label: post ? post.titleRu : 'Новая новость' });
  }

  return crumbs;
}
