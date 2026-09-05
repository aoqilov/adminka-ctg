import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import type { AccentId, ThemeMode } from '@/features/settings/types';

type UiState = {
  theme: ThemeMode;
  accent: AccentId;
};

type UiActions = {
  setTheme: (theme: ThemeMode) => void;
  setAccent: (accent: AccentId) => void;
};

/**
 * Tema va accent. Qiymatlar `<html>` ga yoziladi:
 *   theme  → `.dark` klassi (index.css `@custom-variant dark`)
 *   accent → `data-accent` atributi (`[data-accent]` bloklari)
 */
export const useUiStore = create<UiState & UiActions>()(
  persist(
    (set) => ({
      theme: 'light',
      accent: 'gold',
      setTheme: (theme) => set({ theme }),
      setAccent: (accent) => set({ accent }),
    }),
    { name: 'bridal-ui', version: 1 },
  ),
);

/** `<html>` atributlarini store bilan sinxronlaydi — `AdminLayout` da chaqiriladi */
export function applyUiToDocument(theme: ThemeMode, accent: AccentId): void {
  const root = document.documentElement;
  root.classList.toggle('dark', theme === 'dark');
  root.dataset.accent = accent;
}
