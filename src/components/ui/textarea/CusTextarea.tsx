import { forwardRef, type TextareaHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string | null;
  hint?: string | null;
};

const CusTextarea = forwardRef<HTMLTextAreaElement, Props>(function CusTextarea(
  { label, error, hint, className, id, rows = 3, ...rest },
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

      <textarea
        {...rest}
        id={fieldId}
        ref={ref}
        rows={rows}
        className={cn(
          'w-full resize-y rounded-sm border bg-background px-3 py-2 text-body text-foreground outline-none',
          'placeholder:text-subtle disabled:cursor-not-allowed disabled:opacity-55',
          error
            ? 'border-danger'
            : 'border-border focus:border-primary focus:ring-2 focus:ring-primary/25',
          className,
        )}
      />

      {error ? (
        <p className="mt-1 text-micro text-danger">{error}</p>
      ) : (
        hint && <p className="mt-1 text-micro text-subtle">{hint}</p>
      )}
    </div>
  );
});

export default CusTextarea;
