import { cn } from '@/utils/cn';

type Props = {
  min: number;
  max: number;
  valueMin: number;
  valueMax: number;
  onChangeMin: (value: number) => void;
  onChangeMax: (value: number) => void;
  label?: string;
  /** "$240 — $6 200" ko'rinishidagi tayyor matn */
  valueLabel?: string;
  step?: number;
  className?: string;
};

/** Narx oralig'i — ikkita mustaqil `input[type=range]` (dizayndagidek) */
export default function CusRangeSlider({
  min,
  max,
  valueMin,
  valueMax,
  onChangeMin,
  onChangeMax,
  label,
  valueLabel,
  step = 1,
  className,
}: Props) {
  return (
    <div className={cn('w-full', className)}>
      {label && <div className="mb-1.5 text-micro tracking-wide text-muted">{label}</div>}

      <input
        type="range"
        aria-label="Минимальная цена"
        min={min}
        max={max}
        step={step}
        value={valueMin}
        onChange={(e) => onChangeMin(Number(e.target.value))}
        className="h-1 w-full accent-primary"
      />
      <input
        type="range"
        aria-label="Максимальная цена"
        min={min}
        max={max}
        step={step}
        value={valueMax}
        onChange={(e) => onChangeMax(Number(e.target.value))}
        className="mt-2 h-1 w-full accent-primary"
      />

      {valueLabel && <div className="mt-2 text-mini text-muted">{valueLabel}</div>}
    </div>
  );
}
