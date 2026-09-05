import { useCallback, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

import { ToastContext, type ToastContextValue } from '@/components/ui/toast/toast-context';

type Toast = {
  id: string;
  message: string;
};

const DEFAULT_DURATION = 2200;

export default function CusToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const show = useCallback<ToastContextValue['show']>(
    (message, durationMs = DEFAULT_DURATION) => {
      const id = crypto.randomUUID();
      setToasts((prev) => [...prev, { id, message }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, durationMs);
    },
    [],
  );

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      {createPortal(
        <div className="pointer-events-none fixed bottom-6 left-1/2 z-[60] flex -translate-x-1/2 flex-col items-center gap-2">
          {toasts.map((t) => (
            <div
              key={t.id}
              className="pointer-events-auto rounded-sm bg-foreground px-5 py-2.5 text-body text-primary-soft shadow-modal"
            >
              {t.message}
            </div>
          ))}
        </div>,
        document.body,
      )}
    </ToastContext.Provider>
  );
}
