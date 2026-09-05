# CLAUDE.md

Bridal Adminka — Amira Bridal kelinlik saloni uchun admin panel (SPA).
Dizayn manbasi: `example.html` (bundled prototip). Interfeys tili — **rus tili,
hardcode** (i18n yo'q).

## Stack

- **React 19** + **TypeScript** (strict)
- **React Router v7** (`react-router-dom`, `BrowserRouter`)
- **Tailwind CSS v4** (`@tailwindcss/vite`, `tailwind.config.js` YO'Q)
- **Vite 8**, **oxlint**
- **Zustand + persist** — mock ma'lumot va client state
- `clsx` + `tailwind-merge` → `cn()`, `react-icons`
- `@chakra-ui/react` — **faqat** `CusCalendar` ichida (preflight o'chirilgan)

## Komandalar

```bash
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build
npm run typecheck  # tsc -b --noEmit
npm run lint       # oxlint
```

## Struktura

```
src/
  main.tsx             # createRoot + BrowserRouter + CusToastProvider
  App.tsx              # faqat route'lar jadvali (ingichka)
  index.css            # @import "tailwindcss" + @theme + .dark + [data-accent]
  components/ui/       # Cus kit — har biri o'z papkasida + index.ts barrel
  constants/           # app.ts · routes.ts · nav.ts · catalog.ts · store.ts
  hooks/               # useDragSort · useMediaDrag
  layout/              # AdminLayout + sidebar/ + header/
  lib/                 # format.ts · slug.ts · status.ts
  store/               # useCatalogStore · useStoreSettingsStore · useUiStore · seed.ts
  types/               # common.ts — FAQAT kesishgan primitivlar (Id, Status, ViewMode)
  utils/               # cn.ts
  pages/               # route komponentlari (3–5 qator)
  features/
    dashboard/ categories/ sub-products/ products/ product-editor/
    promotions/ posts/ store/ settings/ schema/
```

Har feature ichida: `Feature<Name>.tsx` · `components/` · `modals/` · `types/`
· `index.ts`. Papka qo'shsangiz — shu ro'yxatni yangilang.

Hali yo'q: `api/` (server state tanlanmagan), `components/form/`, `components/data/`.

## Qat'iy qoidalar

1. **`@/` alias** — nisbiy `../../` yo'l yozilmaydi. [vite.config.ts](vite.config.ts) + `tsconfig.app.json`.
2. **Feature-based**: `Feature<Name>.tsx` + `types/helper.types.<name>.ts` + `index.ts` barrel.
3. **`pages/` ingichka** — sahifa faqat feature'ni chaqiradi, biznes-logika ichida yozilmaydi.
4. **UI kit `Cus` prefiksi** — shablon: [CusButton.tsx](src/components/ui/button/CusButton.tsx)
   (`Props` tipi, `Record<Variant, string>` map'lar, `cn()`, default export).
   Yangisini qo'shsangiz `components/ui/index.ts` barrel'iga eksport qiling.
5. **CSS token'lar** — `bg-primary`, `text-muted`, `border-border` va h.k.
   **Komponentlarda hex qat'iyan taqiqlangan.** Yangi rang faqat
   [src/index.css](src/index.css) `@theme` ichiga HEX sifatida qo'shiladi,
   `.dark` blokiga ham juftligi yoziladi.
   *Istisno:* foydalanuvchi kiritadigan ranglar (palitra, soцset brend rangi)
   — ular kontent, inline `style={{ background }}` bo'lib beriladi.
6. **Marshrutlar** — [constants/routes.ts](src/constants/routes.ts) + path helper'lar.
   Qidiruv va filtr URL'da (`?q=`, `?scope=`, `?sub=`).
7. **Domen tiplari feature'ga tegishli** — global `types/` da faqat kesishgan
   primitivlar. `CatalogItem` egasi — `features/products/types`, boshqalar
   `import type { CatalogItem } from '@/features/products/types'` bilan oladi.

## Dizayn tizimi

- Shell: sidebar 232px + main, ikkalasi `rounded-3xl` (18px), orasi 12px.
- Ichkarida hamma narsa `rounded-sm` (4px). Matn: `text-micro/mini/tiny/body`
  (10/11/12/13px). Sarlavhalar — `font-serif` (EB Garamond), tana — Inter.
- Tema: `.dark` klassi `<html>` da. Accent: `data-accent="gold|rose|sage|slate"`.
  Ikkalasini ham `useUiStore` + `applyUiToDocument()` boshqaradi.

## Kod uslubi

- Nuqtali vergul **bor**, single quote, `export default function X()`.
- Import tartibi: tashqi paketlar → `@/` modullar → css.
- `verbatimModuleSyntax` yoqilgan → tip importlari `import type { … }`.

## Ochiq savollar

- **Server state kutubxonasi** — hal qilinmagan. Tanlanmaguncha `api/` yozilmaydi,
  hamma narsa `store/seed.ts` mock'i ustida ishlaydi.
- **Tovarning to'liq modeli** — store hozir yengil `ProductRow` saqlaydi,
  editor esa to'liq `CatalogItem` bilan ishlaydi. API ulanganda birlashtiriladi.
- **Rasm yuklash** — `CusImageSlot` mock: fayl yo'q, faqat id va joylashuv.

## Muhim

- `CusCalendar` barrel'dan eksport qilinmaydi (Chakra ~150 kB tortadi) — `lazy()` bilan import qiling.
- `/schema` — dasturchilar uchun ma'lumotnoma sahifasi, sidebar'da yo'q.
- **Logotip** — `APP_LOGO_URL` ([constants/app.ts](src/constants/app.ts)) bo'sh bo'lsa
  `CusLogo` ichidagi vaqtinchalik belgi chiziladi. Salon o'z faylini bergach:
  faylni `public/` ga qo'ying va shu konstantaga yo'lini yozing.
- `dist/`, `node_modules/` commit qilinmaydi.
