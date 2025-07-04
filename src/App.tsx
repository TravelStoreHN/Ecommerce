import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ShopLayout from './components/layout/ShopLayout';
import ShopHomePage from './pages/ShopHomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage'; 
import MyAccountPage from './pages/MyAccountPage';
import SalesPage from './pages/SalesPage';
import BlogPage from './pages/BlogPage';
import TravelAgentPage from './pages/TravelAgentPage';
import LegalPage from './pages/LegalPage';
import NotFoundPage from './pages/NotFoundPage';
import TrackOrderPage from './pages/TrackOrderPage';
import TravelKitsPage from './pages/TravelKitsPage';
import CartPage from './pages/CartPage'; // Import CartPage
import ESimPage from './pages/ESimPage'; // Import ESimPage
import TravelSizeToiletriesPage from './pages/TravelSizeToiletriesPage'; // Import TravelSizeToiletriesPage
import { CartProvider } from './contexts/CartContext';
import Notification from './components/ui/Notification';
import { mockProducts, mockBlogPosts } from './services/mockData';
import ScrollToTop from './utils/ScrollToTop';
import { SettingsProvider } from './contexts/SettingsContext';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

const AppContent: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/shop" element={<ShopLayout />}>
        <Route index element={<ShopHomePage />} />
        <Route path="products" element={<ProductsPage products={mockProducts} />} />
        <Route path="product/:id" element={<ProductDetailPage products={mockProducts} />} />
        <Route path="kits" element={<TravelKitsPage />} />
        <Route path="esim" element={<ESimPage />} />
        <Route path="travel-size-toiletries" element={<TravelSizeToiletriesPage />} /> {/* Added TravelSizeToiletriesPage route */}
        <Route path="cart" element={<CartPage />} /> 
        <Route path="account" element={<MyAccountPage />} />
        <Route path="sales" element={<SalesPage />} />
        <Route path="blog" element={<BlogPage posts={mockBlogPosts} />} />
        <Route path="travel-agent" element={<TravelAgentPage />} />
        <Route path="legal/:policyType" element={<LegalPage />} />
        <Route path="track-order/:trackingNumber?" element={<TrackOrderPage />} />
        <Route path="not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="not-found" replace />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

const App: React.FC = () => (
  <BrowserRouter>
    <ScrollToTop />
    <SettingsProvider>
      <AuthProvider>
        <CartProvider>
          <NotificationProvider>
            <Notification /> {/* Add this line if you want to show notifications */}
            <AppContent />
          </NotificationProvider>
        </CartProvider>
      </AuthProvider>
    </SettingsProvider>
  </BrowserRouter>
);

export default App;