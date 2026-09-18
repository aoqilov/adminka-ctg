import type { SchemaNote, SchemaRow, ValidationRule } from '@/features/schema/types';

/** Asosiy maydonlar — barcha tovarlar uchun umumiy */
export const BASE_FIELDS: readonly SchemaRow[] = [
  ['id', 'string (uuid)', 'авто', '—', 'URL, DTO'],
  ['kind', "'dress' | 'accessory'", 'да', 'segmented', 'Шаг 1, фильтр таблицы'],
  ['sku', 'string', 'да', 'text (AB-XX-000)', 'Таблица, карточка'],
  ['nameRu', 'string', 'да', 'text', 'Везде'],
  ['nameUz', 'string', 'нет', 'text', 'Сайт (uz)'],
  ['slug', 'string', 'авто', 'text (readonly)', 'URL'],
  ['descriptionRu', 'string (≥40)', 'да', 'rich text', 'Страница товара'],
  ['brand', 'string', 'нет', 'text', 'Карточка, фильтр'],
  ['categoryId', 'string', 'да', 'select', 'Навигация, хлебные крошки'],
  ['subcategoryId', 'string', 'да', 'select', 'Навигация, хлебные крошки'],
  ['colorName', 'string (из палитры)', 'да', 'select + swatch', 'Фильтр по цвету'],
  ['hex', 'string (#RRGGBB)', 'авто', '— (копия палитры)', 'Точка цвета в карточке'],
  ['variants', 'Variant[] (ровно 3, фото 0–6 в каждом)', 'да (≥1 фото)', 'drag & drop', 'Галерея товара'],
  ['qty', 'number', 'да', 'number', 'inStock, бейдж остатка'],
  ['price', 'number > 0', 'да', 'number', 'Карточка, таблица'],
  ['oldPrice', 'number | null', 'нет', 'number', 'Бейдж скидки'],
  ['currency', "'USD' | 'UZS'", 'да', 'select', 'Формат цены'],
  ['status', "'Draft' | 'Active' | 'Archived'", 'да', 'select', 'Бейдж в таблице'],
  ['isFeatured', 'boolean', 'нет', 'switch', 'Главная страница'],
  ['isNew', 'boolean', 'нет', 'switch', 'Бейдж карточки'],
  ['isBlurred', 'boolean', 'нет', 'switch', 'Фото на сайте размывается'],
  ['inStock', 'boolean (вычисляется)', 'авто', '—', 'Бейдж карточки'],
  ['tags', 'string[]', 'нет', 'multi-chip', 'Поиск, фильтр'],
  ['composition', 'string', 'нет', 'text', 'Страница товара'],
  ['careRu', 'string', 'нет', 'textarea', 'Страница товара'],
  ['madeIn', 'string', 'нет', 'text', 'Страница товара'],
  ['season', 'string', 'нет', 'select', 'Фильтр'],
  ['deliveryDays', 'number', 'да', 'number', 'Оформление'],
  ['rentalAvailable + rentPrice', 'boolean + number', 'нет', 'switch + number', 'Бронирование'],
  ['sortOrder', 'number', 'авто', 'number', 'Порядок списка'],
].map(([name, type, req, control, where]) => ({ name, type, req, control, where }));

export const DRESS_FIELDS: readonly SchemaRow[] = [
  ['silhouette', "'A-Line' | 'Mermaid' | 'Ballgown' | 'Sheath' | 'Empire'", 'да', 'select'],
  ['neckline', "'V' | 'Sweetheart' | 'Bateau' | 'Off-shoulder' | 'High'", 'нет', 'select'],
  ['sleeveType', "'Sleeveless' | 'Cap' | 'Long' | 'Detachable'", 'нет', 'select'],
  ['trainLength', "'None' | 'Sweep' | 'Chapel' | 'Cathedral'", 'нет', 'select'],
  ['fabricDetails', 'string[]', 'нет', 'multi-chip'],
  ['decorations', 'string[]', 'нет', 'multi-chip'],
  ['corsetType', "'None' | 'Lace-up' | 'Zip' | 'Boned'", 'нет', 'select'],
  ['hasLining', 'boolean', 'нет', 'switch'],
  ['sizeRu', 'number | null (RU 40–56)', 'да', 'size grid (один выбор)'],
].map(([name, type, req, control]) => ({ name, type, req, control }));

export const ACC_FIELDS: readonly SchemaRow[] = [
  ['accessoryType', "'Veil' | 'Shoes' | 'Jewelry' | 'Hijab' | 'Belt'", 'да', 'select'],
  ['oneSize', 'boolean', 'да', 'switch'],
  ['sizeLabel', 'string', 'если oneSize=false — да', 'chip (один выбор)'],
  ['material', 'string', 'нет', 'text'],
].map(([name, type, req, control]) => ({ name, type, req, control }));

export const VALIDATION_RULES: readonly ValidationRule[] = [
  ['nameRu', 'Название (RU) обязательно'],
  ['sku', 'Артикул обязателен и должен быть в формате AB-XX-000'],
  ['categoryId', 'Выберите категорию и подкатегорию'],
  ['descriptionRu', 'Описание должно содержать минимум 40 символов'],
  ['price', 'Цена должна быть больше 0'],
  ['oldPrice', 'Старая цена должна быть больше текущей'],
  ['deliveryDays', 'Укажите срок доставки в днях'],
  ['rentPrice', 'Укажите цену аренды'],
  ['colorName', 'Выберите цвет товара'],
  ['variants', 'Добавьте минимум одно фото'],
  ['sizeRu / sizeLabel', 'Выберите размер или включите «Один размер»'],
].map(([field, msg], i) => ({ n: String(i + 1).padStart(2, '0'), field, msg }));

export const DTO_LIST: readonly SchemaNote[] = [
  {
    name: 'CreateItemDto',
    body: 'Omit<CatalogItem, "id" | "slug" | "inStock" | "createdAt">',
  },
  { name: 'UpdateItemDto', body: 'Partial<CreateItemDto> & { id: string }' },
  {
    name: 'ItemListRowDto',
    body: 'id · sku · nameRu · thumbUrl · categoryPath · primaryPrice · discountPercent · stock · status',
  },
];

export const RELATED_LIST: readonly SchemaNote[] = [
  { name: 'Booking', body: 'itemId · fittingDate · clientPhone · status' },
  { name: 'Review', body: 'itemId · rating 1–5 · textRu · authorName · isPublished' },
  {
    name: 'Discount (акция)',
    body: 'id · titleRu · kicker · slug · from → to · status · items: [{ itemId, discountPercent }]',
  },
  {
    name: 'DiscountItemDto',
    body: 'itemId · discountPercent 1–90 · basePrice · finalPrice (вычисляется)',
  },
];

export const EMPTY_STATES: readonly SchemaNote[] = [
  { name: 'Нет цены', body: 'price = 0 → «Цена по запросу», кнопка заказа отключена.' },
  {
    name: 'Один цвет и размер',
    body: 'Салон берёт каждую модель в одном экземпляре — выбора цвета и размера на сайте нет. Три варианта хранят только фото.',
  },
  {
    name: 'Товар продан',
    body: 'qty = 0 → inStock = false → «Нет в наличии» + «Сообщить о поступлении».',
  },
  {
    name: 'Нет фото',
    body: 'Все три варианта пусты → рамка-заглушка + ошибка валидации в админке.',
  },
  { name: 'Пустая подкатегория', body: '0 товаров → CTA «Добавить первый товар».' },
];

export const JSON_SAMPLE = `{
  "id": "8f2c-dress-001",
  "kind": "dress",
  "sku": "AB-AL-001",
  "nameRu": "Celeste — кружевное платье",
  "slug": "celeste-lace-gown",
  "categoryId": "wedding",
  "subcategoryId": "a-line",
  "price": 4200, "oldPrice": 4800, "currency": "USD",
  "status": "Active", "isNew": true, "inStock": true,
  "isBlurred": false,
  "tags": ["bestseller", "exclusive"],
  "deliveryDays": 14,
  "rentalAvailable": true, "rentPrice": 900,
  "silhouette": "A-Line", "neckline": "Sweetheart",
  "fabricDetails": ["Silk", "French lace"],
  "decorations": ["Beading"],
  "hasLining": true,
  "colorName": "Ivory", "hex": "#F1E9E2", "qty": 1,
  "sizeRu": 44,
  "variants": [
    { "id": "v1", "media": ["celeste-lace-gown_ivory_v1_01.jpg", "celeste-lace-gown_ivory_v1_02.jpg"] },
    { "id": "v2", "media": ["celeste-lace-gown_ivory_v2_01.jpg"] },
    { "id": "v3", "media": [] }
  ],
  "computed": { "primaryPrice": 4800, "offerPrice": 4200, "discountPercent": 13 }
}`;
