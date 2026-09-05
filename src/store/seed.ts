import type { Category } from '@/features/categories/types';
import type { ProductRow } from '@/features/products/types';
import type { Promo } from '@/features/promotions/types';
import type { Post } from '@/features/posts/types';
import type { Contact, Service, Social, StoreLocation } from '@/features/store/types';
import type { Id } from '@/types/common';

/** Mock bosqichning boshlang'ich ma'lumoti — dizayn prototipidan olingan */

export const SEED_CATEGORIES: Category[] = [
  {
    id: 'wedding',
    name: 'Свадебные платья',
    tag: 'Bridal',
    subs: [
      { id: 'a-line', name: 'A-Line Dresses', status: 'Active' },
      { id: 'mermaid', name: 'Mermaid Gowns', status: 'Active' },
      { id: 'ball', name: 'Ballgowns', status: 'Draft' },
    ],
  },
  {
    id: 'hijab',
    name: 'Hijab',
    tag: 'Modest',
    subs: [
      { id: 'scarf', name: 'Silk Scarves', status: 'Active' },
      { id: 'sets', name: 'Modest Sets', status: 'Active' },
    ],
  },
  {
    id: 'shoes',
    name: 'Обувь',
    tag: 'Footwear',
    subs: [
      { id: 'heels', name: 'Bridal Heels', status: 'Active' },
      { id: 'flats', name: 'Satin Flats', status: 'Active' },
      { id: 'oxford', name: 'Groom Oxfords', status: 'Draft' },
    ],
  },
];

export const SEED_PRODUCTS: Record<Id, ProductRow[]> = {
  'a-line': [
    {
      id: '1',
      name: 'Celeste Lace Gown',
      sku: 'AB-AL-001',
      fabric: 'Silk & French Lace',
      price: 4200,
      stock: 'In Stock',
      colors: ['Ivory', 'Champagne'],
    },
    {
      id: '2',
      name: 'Aura Satin Dress',
      sku: 'AB-AL-014',
      fabric: 'Mikado Duchess Satin',
      price: 3850,
      stock: 'Low Stock',
      colors: ['Champagne'],
    },
    {
      id: '3',
      name: 'Flore Tulle Dream',
      sku: 'AB-AL-022',
      fabric: 'Tulle & Beading',
      price: 5100,
      stock: 'Out of Stock',
      colors: ['White', 'Blush'],
    },
    {
      id: '4',
      name: 'Lyra Chiffon',
      sku: 'AB-AL-031',
      fabric: 'Chiffon',
      price: 2950,
      stock: 'In Stock',
      colors: ['Ivory'],
    },
  ],
  mermaid: [
    {
      id: '5',
      name: 'Sirena Fitted',
      sku: 'AB-MM-002',
      fabric: 'Crepe',
      price: 4600,
      stock: 'In Stock',
      colors: ['Ivory', 'Nude'],
    },
    {
      id: '6',
      name: 'Marea Trumpet',
      sku: 'AB-MM-009',
      fabric: 'Lace overlay',
      price: 4990,
      stock: 'Low Stock',
      colors: ['White'],
    },
  ],
  ball: [
    {
      id: '7',
      name: 'Regina Ballgown',
      sku: 'AB-BG-004',
      fabric: 'Organza',
      price: 6200,
      stock: 'In Stock',
      colors: ['Ivory'],
    },
  ],
  scarf: [
    {
      id: '8',
      name: 'Nur Silk Scarf',
      sku: 'AB-HJ-003',
      fabric: 'Mulberry silk',
      price: 180,
      stock: 'In Stock',
      colors: ['Blush', 'Powder Blue'],
    },
  ],
  sets: [
    {
      id: '9',
      name: 'Amal Two-Piece',
      sku: 'AB-HJ-011',
      fabric: 'Crepe set',
      price: 640,
      stock: 'In Stock',
      colors: ['Sage'],
    },
  ],
  heels: [
    {
      id: '10',
      name: 'Perla Heel 85',
      sku: 'AB-SH-101',
      fabric: 'Satin',
      price: 320,
      stock: 'Low Stock',
      colors: ['Champagne'],
    },
  ],
  flats: [
    {
      id: '11',
      name: 'Nube Flat',
      sku: 'AB-SH-118',
      fabric: 'Satin',
      price: 240,
      stock: 'In Stock',
      colors: ['Ivory'],
    },
  ],
  oxford: [
    {
      id: '12',
      name: 'Marlow Oxford',
      sku: 'AB-SH-204',
      fabric: 'Calf leather',
      price: 410,
      stock: 'In Stock',
      colors: ['Black'],
    },
  ],
};

export const SEED_PROMOS: Promo[] = [
  {
    id: 'n1',
    titleRu: 'Осенняя распродажа 2026',
    slug: 'autumn-2026',
    kicker: 'Сезонная скидка',
    excerptRu: '<p>Скидки на силуэты и ткани прошлого сезона.</p>',
    from: '2026-09-01',
    to: '2026-10-15',
    status: 'Active',
    items: [
      { pid: '1', discount: 15 },
      { pid: '5', discount: 10 },
    ],
  },
  {
    id: 'n2',
    titleRu: 'Скидки на аксессуары',
    slug: 'accessories-sale',
    kicker: 'Акция',
    excerptRu: '<p>Фата, обувь и украшения по специальной цене.</p>',
    from: '2026-08-20',
    to: '2026-09-05',
    status: 'Draft',
    items: [{ pid: '10', discount: 25 }],
  },
];

export const SEED_POSTS: Post[] = [
  {
    id: 'p1',
    titleRu: 'Открытие нового салона в Ташкенте',
    slug: 'new-showroom',
    kicker: 'Событие',
    excerptRu: '<p>Второй бутик Amira Bridal открылся в центре города — примерки по записи.</p>',
    from: '2026-08-10',
    to: '2026-08-30',
    status: 'Active',
    items: [{ pid: '2', discount: 0 }],
  },
  {
    id: 'p2',
    titleRu: 'Как выбрать силуэт платья',
    slug: 'silhouette-guide',
    kicker: 'Гид',
    excerptRu: '<h3>Пять силуэтов</h3><p>Короткий гид по силуэтам и тканям сезона.</p>',
    from: '2026-07-01',
    to: '2026-12-31',
    status: 'Draft',
    items: [],
  },
];

export const SEED_SOCIALS: Social[] = [
  {
    id: 's1',
    platform: 'Instagram',
    handle: '@amira_bridal',
    url: 'instagram.com/amira_bridal',
    hex: '#C13584',
    active: true,
  },
  {
    id: 's2',
    platform: 'Telegram',
    handle: '@amira_bridal',
    url: 't.me/amira_bridal',
    hex: '#2AABEE',
    active: true,
  },
  {
    id: 's3',
    platform: 'TikTok',
    handle: '@amira_bridal',
    url: 'tiktok.com/@amira_bridal',
    hex: '#1D1F20',
    active: true,
  },
  {
    id: 's4',
    platform: 'YouTube',
    handle: '@amira_bridal',
    url: 'youtube.com/@amira_bridal',
    hex: '#FF0000',
    active: true,
  },
  {
    id: 's5',
    platform: 'Pinterest',
    handle: 'amira_bridal',
    url: 'pinterest.com/amira_bridal',
    hex: '#E60023',
    active: false,
  },
];

export const SEED_LOCATIONS: StoreLocation[] = [
  {
    id: 'l1',
    name: 'Салон в Ташкенте',
    address: 'ул. Мустакиллик, 78',
    note: 'ТЦ «Малика», 2 этаж',
    hours: 'Пн–Вс · 10:00 – 20:00',
    phone: '+998 90 000 00 00',
    main: true,
  },
  {
    id: 'l2',
    name: 'Салон · Чиланзар',
    address: 'ул. Чиланзарская, 12',
    note: '1 этаж',
    hours: 'Пн–Вс · 10:00 – 20:00',
    phone: '+998 90 000 00 01',
    main: false,
  },
  {
    id: 'l3',
    name: 'Ателье · Юнусабад',
    address: 'ул. Амира Темура, 145',
    note: 'вход со двора',
    hours: 'Пн–Пт · 10:00 – 18:00',
    phone: '+998 90 000 00 02',
    main: false,
  },
];

export const SEED_CONTACTS: Contact[] = [
  {
    id: 'c1',
    name: 'Наргиза',
    role: 'Владелица салона',
    phone: '+998 90 000 00 00',
    hours: 'Пн–Вс · 10:00 – 20:00',
    telegram: true,
    tgUrl: 't.me/amira_nargiza',
  },
  {
    id: 'c2',
    name: 'Салон · Мустакиллик',
    role: 'Приём звонков и запись',
    phone: '+998 71 200 00 78',
    hours: 'Пн–Вс · 10:00 – 20:00',
    telegram: false,
    tgUrl: '',
  },
  {
    id: 'c3',
    name: 'Дилноза',
    role: 'Ателье · пошив на заказ',
    phone: '+998 90 000 00 02',
    hours: 'Пн–Пт · 10:00 – 18:00',
    telegram: true,
    tgUrl: 't.me/amira_dilnoza',
  },
];

export const SEED_SERVICES: Service[] = [
  {
    id: 'sv1',
    icon: 'Аренда',
    title: 'Аренда платья',
    kicker: '3 дня · химчистка включена',
    body: 'Платье выдаётся на 3 дня, химчистка после свадьбы уже входит в стоимость. Залог фиксированный, указан на странице модели, и возвращается полностью при возврате в срок и без повреждений.',
    active: true,
    open: true,
  },
  {
    id: 'sv2',
    icon: 'Продажа',
    title: 'Продажа',
    kicker: 'Оплата частями возможна',
    body: 'Платье остаётся у вас. Подгонка по фигуре входит в стоимость.',
    active: true,
    open: false,
  },
  {
    id: 'sv3',
    icon: 'Пошив',
    title: 'Пошив на заказ',
    kicker: 'от 3 недель',
    body: 'Индивидуальный пошив по вашим меркам и эскизу.',
    active: true,
    open: false,
  },
  {
    id: 'sv4',
    icon: 'Примерка',
    title: 'Бесплатная примерка',
    kicker: 'по записи',
    body: 'До 5 моделей за один визит, консультация стилиста бесплатно.',
    active: true,
    open: false,
  },
];
