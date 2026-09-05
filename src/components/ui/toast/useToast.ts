import { useContext } from 'react';

import { ToastContext } from '@/components/ui/toast/toast-context';

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within CusToastProvider');
  return ctx;
}
