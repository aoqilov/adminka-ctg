import { forwardRef, type SelectHTMLAttributes } from 'react';
import { FiChevronDown } from 'react-icons/fi';
import { cn } from '@/utils/cn';

export type SelectOption = {
  value: string;
  label: string;
};

type Props = Omit<SelectHTMLAttributes<HTMLSelectElement>, 'children'> & {
  label?: string;
  error?: string | null;
  hint?: string | null;
  options: readonly SelectOption[];
};

const CusSelect = forwardRef<HTMLSelectElement, Props>(function CusSelect(
  { label, error, hint, options, className, id, ...rest },
  ref,
) {
  const fieldId = id ?? rest.name;

  return (
    <div className="w-full min-w-0">
      {label && (
        <label htmlFor={fieldId} className="mb-1.5 block text-micro tracking-wide text-muted">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          {...rest}
          id={fieldId}
          ref={ref}
          className={cn(
            'h-8 w-full appearance-none rounded-sm border bg-background pl-3 pr-8 text-body text-foreground outline-none',
            'disabled:cursor-not-allowed disabled:opacity-55',
            error
              ? 'border-danger'
              : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/25',
            className,
          )}
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <FiChevronDown
          size={14}
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-subtle"
        />
      </div>

      {error ? (
        <p className="mt-1 text-micro text-danger">{error}</p>
      ) : (
        hint && <p className="mt-1 text-micro text-subtle">{hint}</p>
      )}
    </div>
  );
});

export default CusSelect;
