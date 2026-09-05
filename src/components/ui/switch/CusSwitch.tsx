import { cn } from '@/utils/cn';

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  /** Ekranda ko'rinmaydi — skrinrider va tooltip uchun */
  label: string;
  /** Yonida ko'rinadigan matn ("Показывается" / "Скрыт") */
  valueLabel?: string;
  disabled?: boolean;
  className?: string;
};

/** 34×20 tugmacha — dizayndagi barcha ko'rinish/aktivlik pereklyuchateli */
export default function CusSwitch({
  checked,
  onChange,
  label,
  valueLabel,
  disabled,
  className,
}: Props) {
  const track = (
    <span
      className={cn(
        'relative inline-block h-5 w-8.5 shrink-0 rounded-full transition-colors',
        checked ? 'bg-primary' : 'bg-border',
      )}
    >
      {/*
        `left` ni aniq berish shart: <button> ichidagi absolyut element
        markazdan boshlanadi, aks holda knob yo'lakchadan chiqib ketadi.
        Yo'lak 34px, knob 16px, chetdan 2px joy.
      */}
      <span
        className={cn(
          'absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-surface shadow-card transition-transform',
          checked ? 'translate-x-3.5' : 'translate-x-0',
        )}
      />
    </span>
  );

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation();
        onChange(!checked);
      }}
      className={cn(
        'inline-flex items-center gap-2 text-mini text-muted',
        disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
    >
      {track}
      {valueLabel && <span>{valueLabel}</span>}
    </button>
  );
}
