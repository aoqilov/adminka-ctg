import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Topbar from '@/layout/header/Topbar';
import Sidebar from '@/layout/sidebar/Sidebar';
import { applyUiToDocument, useUiStore } from '@/store/useUiStore';

/** Ikki panelli qobiq: chapda sidebar, o'ngda kontent */
export default function AdminLayout() {
  const theme = useUiStore((s) => s.theme);
  const accent = useUiStore((s) => s.accent);

  useEffect(() => {
    applyUiToDocument(theme, accent);
  }, [theme, accent]);

  return (
    <div className="flex h-full min-h-160 gap-3 overflow-hidden bg-background p-3">
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-3xl border border-border bg-surface">
        <Topbar />

        <div className="flex-1 overflow-auto px-7 pb-12 pt-7">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
