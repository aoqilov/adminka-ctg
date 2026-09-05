import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/utils/cn';

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** Pastdagi tugmalar qatori */
  footer?: ReactNode;
  width?: 'sm' | 'md' | 'lg';
  className?: string;
};

const WIDTH: Record<NonNullable<Props['width']>, string> = {
  sm: 'max-w-95',
  md: 'max-w-115',
  lg: 'max-w-160',
};

/**
 * Modal qobig'i — faqat mexanika (portal, scrim, ESC, scroll lock).
 * Forma va saqlash logikasi chaqiruvchi feature ichida yoziladi.
 */
export default function CusModal({
  open,
  onClose,
  title,
  children,
  footer,
  width = 'md',
  className,
}: Props) {
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);

    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      role="presentation"
      onClick={onClose}
      className="fixed inset-0 z-50 grid place-items-center bg-scrim p-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'flex max-h-[85vh] w-full flex-col gap-4 rounded-lg border border-border bg-surface p-5 shadow-modal',
          WIDTH[width],
          className,
        )}
      >
        <h2 className="shrink-0 font-serif text-xl text-foreground">{title}</h2>

        <div className="-mx-1 flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-1">{children}</div>

        {footer && <div className="flex shrink-0 justify-end gap-2">{footer}</div>}
      </div>
    </div>,
    document.body,
  );
}
