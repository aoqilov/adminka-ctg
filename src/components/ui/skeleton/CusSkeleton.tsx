import type { HTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

type Props = HTMLAttributes<HTMLDivElement> & {
  variant?: 'rect' | 'circle' | 'text';
};

export default function CusSkeleton({ variant = 'rect', className, ...rest }: Props) {
  return (
    <div
      {...rest}
      className={cn(
        'animate-pulse bg-primary-soft',
        variant === 'rect' && 'rounded-sm',
        variant === 'circle' && 'rounded-full',
        variant === 'text' && 'h-3 rounded-xs',
        className,
      )}
    />
  );
}
