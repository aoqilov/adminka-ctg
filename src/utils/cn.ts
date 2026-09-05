import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Tailwind klasslarini shartli birlashtiradi va ziddiyatlarni bartaraf qiladi.
 * `cn('p-2', condition && 'p-4')` -> 'p-4'
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
