import { create } from 'zustand';

import type { Promo, PromoItem } from '@/features/promotions/types';
import type { Id } from '@/types/common';

type DraftState = {
  /** Tahrirlanayotgan karta; `null` — editor yopiq */
  draft: Promo | null;
  step: 0 | 1;
};

type DraftActions = {
  start: (draft: Promo) => void;
  patch: (patch: Partial<Promo>) => void;
  setStep: (step: 0 | 1) => void;
  toggleItem: (pid: Id, defaultDiscount: number) => void;
  setDiscount: (pid: Id, discount: number) => void;
  removeItem: (pid: Id) => void;
  clear: () => void;
};

/**
 * Aksiya/yangilik qoralamasi. Alohida store, chunki «Выбор товаров»
 * alohida marshrutda ochiladi va qoralama navigatsiyadan omon qolishi kerak.
 * Persist yo'q — faqat joriy sessiya uchun.
 */
export const usePromoDraft = create<DraftState & DraftActions>((set) => ({
  draft: null,
  step: 0,

  start: (draft) => set({ draft, step: 0 }),

  patch: (patch) =>
    set((s) => (s.draft ? { draft: { ...s.draft, ...patch } } : s)),

  setStep: (step) => set({ step }),

  toggleItem: (pid, defaultDiscount) =>
    set((s) => {
      if (!s.draft) return s;
      const on = s.draft.items.some((i) => i.pid === pid);
      const items: PromoItem[] = on
        ? s.draft.items.filter((i) => i.pid !== pid)
        : [...s.draft.items, { pid, discount: defaultDiscount }];
      return { draft: { ...s.draft, items } };
    }),

  setDiscount: (pid, discount) =>
    set((s) =>
      s.draft
        ? {
            draft: {
              ...s.draft,
              items: s.draft.items.map((i) =>
                i.pid === pid ? { ...i, discount: Math.min(90, Math.max(0, discount)) } : i,
              ),
            },
          }
        : s,
    ),

  removeItem: (pid) =>
    set((s) =>
      s.draft ? { draft: { ...s.draft, items: s.draft.items.filter((i) => i.pid !== pid) } } : s,
    ),

  clear: () => set({ draft: null, step: 0 }),
}));

/** Bo'sh karta — «Новая скидка» / «Новая новость» */
export function emptyPromo(kicker: string): Promo {
  return {
    id: '',
    titleRu: '',
    slug: '',
    kicker,
    excerptRu: '',
    from: '',
    to: '',
    status: 'Draft',
    items: [],
  };
}
