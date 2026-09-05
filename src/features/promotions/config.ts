import {
  ROUTES,
  newsPath,
  newsPickerPath,
  salePath,
  salePickerPath,
} from '@/constants/routes';

/**
 * «Скидки» va «News» bir xil ekranlardan foydalanadi — farqi shu konfigda.
 * Prototipdagi `modCfg()` ning o'rnini bosadi.
 */
export type PromoModule = {
  key: 'sale' | 'news';
  title: string;
  lead: string;
  addLabel: string;
  backLabel: string;
  urlBase: string;
  kicker: string;
  nameLabel: string;
  namePlaceholder: string;
  slugLabel: string;
  itemsTitle: string;
  step2Label: string;
  /** Tovarlarda chegirma foizi tahrirlanadimi */
  showDiscount: boolean;
  emptyText: string;
  /** Saqlash uchun kamida bitta tovar shartmi */
  requireItems: boolean;
  nameError: string;
  listPath: string;
  newPath: string;
  itemPath: (id: string) => string;
  pickerPath: (id: string) => string;
};

export const SALE_MODULE: PromoModule = {
  key: 'sale',
  title: 'Скидки',
  lead: 'Сначала создаётся карточка акции — затем внутрь добавляются товары с процентом скидки.',
  addLabel: '+ Новая скидка',
  backLabel: '← Скидки',
  urlBase: '/sale/',
  kicker: 'Скидка',
  nameLabel: 'Название акции (RU)',
  namePlaceholder: 'Осенняя распродажа 2026',
  slugLabel: 'Slug (/sale/…)',
  itemsTitle: 'Товары со скидкой',
  step2Label: 'Товары со скидкой',
  showDiscount: true,
  emptyText: 'Пока нет акций — нажмите «Новая скидка».',
  requireItems: true,
  nameError: 'Название акции обязательно',
  listPath: ROUTES.sale,
  newPath: ROUTES.saleNew,
  itemPath: salePath,
  pickerPath: salePickerPath,
};

export const NEWS_MODULE: PromoModule = {
  key: 'news',
  title: 'News',
  lead: 'Карточка новости — текст, обложка и (по желанию) связанные товары.',
  addLabel: '+ Новая новость',
  backLabel: '← News',
  urlBase: '/news/',
  kicker: 'Событие',
  nameLabel: 'Заголовок (RU)',
  namePlaceholder: 'Открытие нового салона',
  slugLabel: 'Slug (/news/…)',
  itemsTitle: 'Связанные товары',
  step2Label: 'Связанные товары',
  showDiscount: false,
  emptyText: 'Пока нет новостей — нажмите «Новая новость».',
  requireItems: false,
  nameError: 'Заголовок обязателен',
  listPath: ROUTES.news,
  newPath: ROUTES.newsNew,
  itemPath: newsPath,
  pickerPath: newsPickerPath,
};
