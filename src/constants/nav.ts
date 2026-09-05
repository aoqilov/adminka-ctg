import type { IconType } from 'react-icons';
import {
  FiBox,
  FiFileText,
  FiHome,
  FiLayers,
  FiPercent,
  FiSettings,
  FiShoppingBag,
} from 'react-icons/fi';

import { ROUTES } from '@/constants/routes';

export type NavItem = {
  label: string;
  to: string;
  icon: IconType;
  /** Shu prefiks bilan boshlanadigan yo'llarda punkt faol hisoblanadi */
  match: string;
};

/** Sidebar navigatsiyasi — tartib dizayndagidek */
export const NAV_ITEMS: readonly NavItem[] = [
  { label: 'Dashboard', to: ROUTES.dashboard, icon: FiHome, match: '/dashboard' },
  { label: 'Products', to: ROUTES.products, icon: FiBox, match: '/products' },
  { label: 'Categories', to: ROUTES.categories, icon: FiLayers, match: '/categories' },
  { label: 'Скидки', to: ROUTES.sale, icon: FiPercent, match: '/sale' },
  { label: 'News', to: ROUTES.news, icon: FiFileText, match: '/news' },
  { label: 'Магазин', to: '/store/socials', icon: FiShoppingBag, match: '/store' },
  { label: 'Settings', to: ROUTES.settings, icon: FiSettings, match: '/settings' },
];
