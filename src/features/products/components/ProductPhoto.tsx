import type { HTMLAttributes, ReactNode } from 'react';
import { FiEyeOff } from 'react-icons/fi';

import { cn } from '@/utils/cn';

type Props = HTMLAttributes<HTMLDivElement> & {
  /** Saytda foto xiralashtiriladi (nom va narx ko'rinib turaveradi) */
  blurred?: boolean;
  /** Xiralik belgisi: yorliq bilan, faqat ikonka yoki umuman ko'rsatmaslik */
  badge?: 'label' | 'icon' | 'none';
  className?: string;
  /** Sichqoncha ustiga kelganda rasm sekin kattalashadi (galereya) */
  hoverZoom?: boolean;
  /** Foto ustidagi elementlar — status badge, overlay va h.k. */
  children?: ReactNode;
};

/**
 * Tovar fotosi. Mock bosqichda haqiqiy rasm yo'q — `--color-photo` fon,
 * shuning uchun xiralik ko'zga faqat belgi orqali tashlanadi; haqiqiy rasm
 * ulanganda `blur-sm` o'z ishini qiladi.
 *
 * Blur faqat rasm qatlamiga tushadi — ustidagi badge'lar aniq qoladi.
 */
export default function ProductPhoto({
  blurred,
  badge = 'label',
  hoverZoom,
  className,
  children,
  ...rest
}: Props) {
  return (
    <div {...rest} className={cn('relative overflow-hidden bg-photo', className)}>
      <span
        className={cn(
          'absolute inset-0 bg-photo',
          blurred && 'blur-sm',
          hoverZoom && 'transition-transform duration-200 group-hover:scale-[1.04]',
        )}
      />

      {blurred && badge !== 'none' && (
        <span
          title="Фото размыто на сайте"
          className={cn(
            'absolute left-1.5 top-1.5 inline-flex items-center gap-1 rounded-xs bg-overlay-dark text-overlay-fg',
            badge === 'label' ? 'px-1.5 py-0.5 text-micro' : 'p-0.5',
          )}
        >
          <FiEyeOff size={10} />
          {badge === 'label' && 'Размыто'}
        </span>
      )}

      {children}
    </div>
  );
}
