import { cn } from '@/utils/cn';

type Props = {
  label: string;
  value: string | number;
  /** Qiymat ostidagi izoh — "+6 за неделю" */
  delta?: string;
  className?: string;
};

/** Dashboard KPI kartasi */
export default function CusStatCard({ label, value, delta, className }: Props) {
  return (
    <div className={cn('rounded-sm border border-border bg-surface p-4.5', className)}>
      <div className="text-micro uppercase tracking-[0.14em] text-subtle">{label}</div>
      <div className="mt-2 font-serif text-3xl text-foreground">{value}</div>
      {delta && <div className="mt-0.5 text-mini text-primary-hover">{delta}</div>}
    </div>
  );
}
