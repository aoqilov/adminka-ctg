import { cn } from '@/utils/cn';

export type Swatch = {
  name: string;
  hex: string;
};

type Props = {
  swatches: readonly Swatch[];
  /** Tanlangan rang nomi */
  value?: string | null;
  onPick: (swatch: Swatch) => void;
  size?: 'sm' | 'md';
  className?: string;
};

/**
 * Rang tanlagich. `hex` — foydalanuvchi kiritgan ma'lumot (Магазин ▸ Цвета),
 * shuning uchun token emas, inline `background` bo'lib beriladi.
 */
export default function CusColorSwatch({
  swatches,
  value,
  onPick,
  size = 'md',
  className,
}: Props) {
  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {swatches.map((s) => {
        const on = value === s.name;

        return (
          <button
            key={s.name}
            type="button"
            title={s.name}
            aria-label={s.name}
            aria-pressed={on}
            onClick={() => onPick(s)}
            style={{ background: s.hex }}
            className={cn(
              'rounded-full transition-shadow',
              size === 'sm' ? 'h-4 w-4' : 'h-5 w-5',
              on
                ? 'ring-2 ring-primary ring-offset-2 ring-offset-surface'
                : 'ring-1 ring-border',
            )}
          />
        );
      })}
    </div>
  );
}
