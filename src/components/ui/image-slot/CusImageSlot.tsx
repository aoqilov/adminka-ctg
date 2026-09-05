import type { HTMLAttributes } from 'react';
import { FiX } from 'react-icons/fi';
import { cn } from '@/utils/cn';

type Aspect = 'photo' | 'square' | 'wide';

type Props = HTMLAttributes<HTMLDivElement> & {
  /** Fayl biriktirilganmi */
  filled?: boolean;
  /** To'ldirilganda — fayl nomi; bo'shda — katak raqami */
  label?: string;
  aspect?: Aspect;
  /** Ustiga fayl sudrab kelinganda */
  dropActive?: boolean;
  onRemove?: () => void;
};

const ASPECT: Record<Aspect, string> = {
  photo: 'aspect-[3/4]',
  square: 'aspect-square',
  wide: 'aspect-[16/9]',
};

/**
 * Rasm katagi. Mock bosqichda haqiqiy fayl yo'q — `--color-photo` fon va
 * fayl nomi ko'rsatiladi; drag&drop hodisalari `rest` orqali o'tadi.
 */
export default function CusImageSlot({
  filled,
  label,
  aspect = 'photo',
  dropActive,
  onRemove,
  className,
  ...rest
}: Props) {
  return (
    <div
      {...rest}
      className={cn(
        'relative overflow-hidden rounded-xs',
        ASPECT[aspect],
        filled ? 'cursor-grab bg-photo' : 'border border-dashed border-border bg-background',
        dropActive && 'ring-2 ring-primary ring-inset',
        className,
      )}
    >
      {filled ? (
        <>
          {label && (
            <span className="absolute bottom-1 left-1 rounded-xs bg-overlay-dark px-1.5 py-px text-micro text-overlay-fg">
              {label}
            </span>
          )}
          {onRemove && (
            <button
              type="button"
              aria-label="Удалить фото"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="absolute right-1 top-1 grid h-5 w-5 place-items-center rounded-full bg-overlay-dark-strong text-overlay-fg"
            >
              <FiX size={11} />
            </button>
          )}
        </>
      ) : (
        <span className="absolute inset-0 grid place-items-center text-micro text-subtle">
          {label}
        </span>
      )}
    </div>
  );
}
