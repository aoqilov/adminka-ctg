import { createContext } from 'react';

export type ToastContextValue = {
  /** Qisqa xabar — dizaynda 2.2 s ko'rinadi */
  show: (message: string, durationMs?: number) => void;
};

export const ToastContext = createContext<ToastContextValue | null>(null);
