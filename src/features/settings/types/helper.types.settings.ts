export type ThemeMode = 'light' | 'dark';

/** index.css dagi `[data-accent]` bloklariga mos */
export type AccentId = 'gold' | 'rose' | 'sage' | 'slate';

export type AccentOption = {
  id: AccentId;
  label: string;
  /** Swatch uchun namuna rang */
  hex: string;
};
