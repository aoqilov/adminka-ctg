import { cn } from '@/utils/cn';

type Props = {
  /** 0–100 */
  value: number;
  /** Ikkilamchi rang — dashboard'da subkategoriya qatorlari uchun */
  tone?: 'primary' | 'accent-2';
  className?: string;
};

/** 4px balandlikdagi to'ldirish chizig'i — dashboard statistikasi */
export default function CusProgressBar({ value, tone = 'primary', className }: Props) {
  const width = Math.max(0, Math.min(100, value));

  return (
    <div
      role="progressbar"
      aria-valuenow={width}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('h-1 w-full overflow-hidden bg-primary-soft', className)}
    >
      <div
        className={cn('h-full', tone === 'primary' ? 'bg-primary' : 'bg-accent-2')}
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
