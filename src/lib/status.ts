import type { BadgeVariant } from '@/components/ui';
import type { Status } from '@/types/common';

/** Nashr holati → badge rangi */
export function statusVariant(status: Status): BadgeVariant {
  if (status === 'Active') return 'success';
  if (status === 'Archived') return 'danger';
  return 'neutral';
}

/** Ombor holati → badge rangi */
export function stockVariant(stock: string): BadgeVariant {
  if (stock === 'In Stock') return 'success';
  if (stock === 'Low Stock') return 'warning';
  if (stock === 'Out of Stock') return 'danger';
  return 'neutral';
}
