import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from '@/App';
import { CusToastProvider } from '@/components/ui';
import '@/index.css';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element (#root) topilmadi');
}

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <CusToastProvider>
        <App />
      </CusToastProvider>
    </BrowserRouter>
  </StrictMode>,
);
