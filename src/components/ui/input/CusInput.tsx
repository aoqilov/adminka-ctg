import { forwardRef, type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string | null;
  hint?: string | null;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  /** Header qidiruvi kabi ramkasiz variant */
  bare?: boolean;
};

const CusInput = forwardRef<HTMLInputElement, Props>(function CusInput(
  { label, error, hint, leftIcon, rightIcon, bare, className, id, ...rest },
  ref,
) {
  const inputId = id ?? rest.name;

  return (
    <div className="w-full min-w-0">
      {label && (
        <label htmlFor={inputId} className="mb-1.5 block text-micro tracking-wide text-muted">
          {label}
        </label>
      )}

      <div
        className={cn(
          'relative flex items-center gap-2',
          !bare && 'rounded-sm border bg-background px-3',
          !bare &&
            (error
              ? 'border-danger'
              : 'border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/25'),
          !bare && 'h-8',
        )}
      >
        {leftIcon && <span className="shrink-0 text-subtle">{leftIcon}</span>}

        <input
          {...rest}
          id={inputId}
          ref={ref}
          className={cn(
            'min-w-0 flex-1 bg-transparent text-body text-foreground outline-none',
            'placeholder:text-subtle disabled:cursor-not-allowed disabled:opacity-55',
            'read-only:text-muted',
            className,
          )}
        />

        {rightIcon && <span className="shrink-0 text-subtle">{rightIcon}</span>}
      </div>

      {error ? (
        <p className="mt-1 text-micro text-danger">{error}</p>
      ) : (
        hint && <p className="mt-1 text-micro text-subtle">{hint}</p>
      )}
    </div>
  );
});

export default CusInput;
