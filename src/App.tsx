import { Navigate, Route, Routes } from 'react-router-dom';

import { ROUTES } from '@/constants/routes';
import AdminLayout from '@/layout/AdminLayout';
import CategoriesPage from '@/pages/CategoriesPage';
import DashboardPage from '@/pages/DashboardPage';
import NewsEditorPage from '@/pages/NewsEditorPage';
import NewsPage from '@/pages/NewsPage';
import NewsPickerPage from '@/pages/NewsPickerPage';
import NotFound from '@/pages/NotFound';
import ProductEditorPage from '@/pages/ProductEditorPage';
import ProductsPage from '@/pages/ProductsPage';
import SaleEditorPage from '@/pages/SaleEditorPage';
import SalePage from '@/pages/SalePage';
import SalePickerPage from '@/pages/SalePickerPage';
import SchemaPage from '@/pages/SchemaPage';
import SettingsPage from '@/pages/SettingsPage';
import StorePage from '@/pages/StorePage';
import SubcategoryPage from '@/pages/SubcategoryPage';

export default function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Navigate to={ROUTES.dashboard} replace />} />
        <Route path={ROUTES.dashboard} element={<DashboardPage />} />

        <Route path={ROUTES.products} element={<ProductsPage />} />
        <Route path={ROUTES.productNew} element={<ProductEditorPage />} />
        <Route path={ROUTES.product} element={<ProductEditorPage />} />

        <Route path={ROUTES.categories} element={<CategoriesPage />} />
        <Route path={ROUTES.subcategory} element={<SubcategoryPage />} />

        <Route path={ROUTES.sale} element={<SalePage />} />
        <Route path={ROUTES.saleNew} element={<SaleEditorPage />} />
        <Route path={ROUTES.salePicker} element={<SalePickerPage />} />
        <Route path={ROUTES.sale_} element={<SaleEditorPage />} />

        <Route path={ROUTES.news} element={<NewsPage />} />
        <Route path={ROUTES.newsNew} element={<NewsEditorPage />} />
        <Route path={ROUTES.newsPicker} element={<NewsPickerPage />} />
        <Route path={ROUTES.news_} element={<NewsEditorPage />} />

        <Route path={ROUTES.store} element={<StorePage />} />
        <Route path={ROUTES.settings} element={<SettingsPage />} />
        <Route path={ROUTES.schema} element={<SchemaPage />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
