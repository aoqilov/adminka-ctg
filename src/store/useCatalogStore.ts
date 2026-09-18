import { useMemo } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { Category, Subcategory } from '@/features/categories/types';
import type { FlatProduct, ProductRow } from '@/features/products/types';
import type { Post } from '@/features/posts/types';
import type { Promo, ProductPromoInfo } from '@/features/promotions/types';
import { moveItem } from '@/hooks/useDragSort';
import { makeId } from '@/lib/slug';
import {
  SEED_CATEGORIES,
  SEED_POSTS,
  SEED_PRODUCTS,
  SEED_PROMOS,
} from '@/store/seed';
import type { Id } from '@/types/common';

type CatalogState = {
  cats: Category[];
  /** subId → tovarlar */
  products: Record<Id, ProductRow[]>;
  promos: Promo[];
  posts: Post[];
};

type CatalogActions = {
  /* — kategoriyalar — */
  addCategory: (name: string) => Id;
  renameCategory: (id: Id, name: string) => void;
  removeCategory: (id: Id) => void;
  toggleCategoryHidden: (id: Id) => void;
  reorderCategories: (from: number, to: number) => void;

  /* — subkategoriyalar — */
  addSubcategory: (catId: Id, name: string) => Id;
  renameSubcategory: (catId: Id, subId: Id, name: string) => void;
  removeSubcategory: (catId: Id, subId: Id) => void;
  toggleSubcategoryHidden: (catId: Id, subId: Id) => void;
  reorderSubcategories: (catId: Id, from: number, to: number) => void;

  /* — tovarlar — */
  upsertProduct: (subId: Id, row: ProductRow) => void;
  removeProduct: (subId: Id, id: Id) => void;
  toggleProductHidden: (subId: Id, id: Id) => void;
  toggleProductBlurred: (subId: Id, id: Id) => void;

  /* — aksiyalar va yangiliklar — */
  upsertPromo: (promo: Promo) => void;
  removePromo: (id: Id) => void;
  upsertPost: (post: Post) => void;
  removePost: (id: Id) => void;
};

const initialState: CatalogState = {
  cats: SEED_CATEGORIES,
  products: SEED_PRODUCTS,
  promos: SEED_PROMOS,
  posts: SEED_POSTS,
};

/** Bitta kategoriya ichida `subs` ni almashtirish uchun yordamchi */
const patchCat = (cats: Category[], catId: Id, fn: (cat: Category) => Category): Category[] =>
  cats.map((c) => (c.id === catId ? fn(c) : c));

export const useCatalogStore = create<CatalogState & CatalogActions>()(
  persist(
    (set) => ({
      ...initialState,

      addCategory: (name) => {
        const id = makeId('cat_');
        set((s) => ({ cats: [...s.cats, { id, name, tag: 'New', subs: [] }] }));
        return id;
      },

      renameCategory: (id, name) =>
        set((s) => ({ cats: s.cats.map((c) => (c.id === id ? { ...c, name } : c)) })),

      removeCategory: (id) =>
        set((s) => {
          const cat = s.cats.find((c) => c.id === id);
          const products = { ...s.products };
          cat?.subs.forEach((sub) => delete products[sub.id]);
          return { cats: s.cats.filter((c) => c.id !== id), products };
        }),

      toggleCategoryHidden: (id) =>
        set((s) => ({
          cats: s.cats.map((c) => (c.id === id ? { ...c, hidden: !c.hidden } : c)),
        })),

      reorderCategories: (from, to) => set((s) => ({ cats: moveItem(s.cats, from, to) })),

      addSubcategory: (catId, name) => {
        const id = makeId('sub_');
        const sub: Subcategory = { id, name, status: 'Draft' };
        set((s) => ({
          cats: patchCat(s.cats, catId, (c) => ({ ...c, subs: [...c.subs, sub] })),
          products: { ...s.products, [id]: [] },
        }));
        return id;
      },

      renameSubcategory: (catId, subId, name) =>
        set((s) => ({
          cats: patchCat(s.cats, catId, (c) => ({
            ...c,
            subs: c.subs.map((x) => (x.id === subId ? { ...x, name } : x)),
          })),
        })),

      removeSubcategory: (catId, subId) =>
        set((s) => {
          const products = { ...s.products };
          delete products[subId];
          return {
            cats: patchCat(s.cats, catId, (c) => ({
              ...c,
              subs: c.subs.filter((x) => x.id !== subId),
            })),
            products,
          };
        }),

      toggleSubcategoryHidden: (catId, subId) =>
        set((s) => ({
          cats: patchCat(s.cats, catId, (c) => ({
            ...c,
            subs: c.subs.map((x) => (x.id === subId ? { ...x, hidden: !x.hidden } : x)),
          })),
        })),

      reorderSubcategories: (catId, from, to) =>
        set((s) => ({
          cats: patchCat(s.cats, catId, (c) => ({ ...c, subs: moveItem(c.subs, from, to) })),
        })),

      upsertProduct: (subId, row) =>
        set((s) => {
          const list = s.products[subId] ?? [];
          const exists = list.some((p) => p.id === row.id);
          return {
            products: {
              ...s.products,
              [subId]: exists ? list.map((p) => (p.id === row.id ? row : p)) : [...list, row],
            },
          };
        }),

      removeProduct: (subId, id) =>
        set((s) => ({
          products: { ...s.products, [subId]: (s.products[subId] ?? []).filter((p) => p.id !== id) },
        })),

      toggleProductHidden: (subId, id) =>
        set((s) => ({
          products: {
            ...s.products,
            [subId]: (s.products[subId] ?? []).map((p) =>
              p.id === id ? { ...p, isHidden: !p.isHidden } : p,
            ),
          },
        })),

      toggleProductBlurred: (subId, id) =>
        set((s) => ({
          products: {
            ...s.products,
            [subId]: (s.products[subId] ?? []).map((p) =>
              p.id === id ? { ...p, isBlurred: !p.isBlurred } : p,
            ),
          },
        })),

      upsertPromo: (promo) =>
        set((s) => ({
          promos: s.promos.some((n) => n.id === promo.id)
            ? s.promos.map((n) => (n.id === promo.id ? promo : n))
            : [...s.promos, promo],
        })),

      removePromo: (id) => set((s) => ({ promos: s.promos.filter((n) => n.id !== id) })),

      upsertPost: (post) =>
        set((s) => ({
          posts: s.posts.some((n) => n.id === post.id)
            ? s.posts.map((n) => (n.id === post.id ? post : n))
            : [...s.posts, post],
        })),

      removePost: (id) => set((s) => ({ posts: s.posts.filter((n) => n.id !== id) })),
    }),
    {
      name: 'bridal-catalog',
      version: 2,
      /**
       * v1 → v2: rang varianti o'rniga bitta rang. Eski qatorlarda
       * `colors: string[]` bo'lgan — birinchisi tovar rangi bo'lib qoladi,
       * qolgan ma'lumot (kategoriyalar, aksiyalar, postlar) saqlanadi.
       */
      migrate: (persisted, version) => {
        const state = persisted as CatalogState;
        if (version >= 2) return state as CatalogState & CatalogActions;

        const products = Object.fromEntries(
          Object.entries(state.products ?? {}).map(([subId, rows]) => [
            subId,
            (rows as (ProductRow & { colors?: string[] })[]).map(({ colors, ...row }) => ({
              ...row,
              color: row.color || colors?.[0] || '',
            })),
          ]),
        );

        return { ...state, products } as CatalogState & CatalogActions;
      },
    },
  ),
);

/* ———————————————————————————————————————————————————————————————
   Selektorlar hook sifatida yoziladi.

   Zustand v5 `useSyncExternalStore` ustida ishlaydi: selektor har chaqiruvda
   YANGI massiv/ob'ekt qaytarsa, React uni o'zgargan deb hisoblab cheksiz
   render qiladi. Shuning uchun store'dan faqat xom bo'laklar olinadi,
   hosila qiymat esa `useMemo` bilan hisoblanadi.
   ——————————————————————————————————————————————————————————————— */

/** Barcha kategoriya/subkategoriyadagi tovarlar bitta ro'yxatda */
export function useFlatProducts(): FlatProduct[] {
  const cats = useCatalogStore((s) => s.cats);
  const products = useCatalogStore((s) => s.products);

  return useMemo(() => {
    const out: FlatProduct[] = [];

    cats.forEach((c) =>
      c.subs.forEach((s) =>
        (products[s.id] ?? []).forEach((p) =>
          out.push({ ...p, catId: c.id, subId: s.id, path: `${c.name} / ${s.name}` }),
        ),
      ),
    );

    return out;
  }, [cats, products]);
}

/** Tovar qaysi aksiyalarda turgani va foizi */
export function usePromosFor(pid: Id | null): ProductPromoInfo[] {
  const promos = useCatalogStore((s) => s.promos);

  return useMemo(() => {
    if (!pid) return [];

    return promos
      .filter((n) => n.items.some((i) => i.pid === pid))
      .map((n) => {
        const item = n.items.find((i) => i.pid === pid);
        return { title: n.titleRu, discount: item?.discount ?? 0, status: n.status };
      });
  }, [promos, pid]);
}

/** Subkategoriyani id bo'yicha topish (kategoriyasi bilan birga) */
export function useSubcategory(subId: Id) {
  const cats = useCatalogStore((s) => s.cats);

  return useMemo(() => {
    const cat = cats.find((c) => c.subs.some((s) => s.id === subId));
    const sub = cat?.subs.find((s) => s.id === subId);
    return cat && sub ? { cat, sub } : null;
  }, [cats, subId]);
}
