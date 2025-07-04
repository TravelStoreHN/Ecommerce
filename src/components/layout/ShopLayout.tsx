import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '@/components/layout/Footer'; // Changed to aliased import
import ChatBox from '../chat/ChatBox';
import { useSettings } from '../../contexts/SettingsContext'; // Import useSettings
import Navbar from '@/components/layout/Navbar'; // Import Navbar

const ShopLayout: React.FC = () => {
  const { language } = useSettings(); // Get language

  const hondurasBannerText = language === 'es' 
    ? "ENVÍO GRATIS A NIVEL NACIONAL 🇭🇳 🚛" 
    : "FREE SHIPPING NATIONWIDE 🇭🇳 🚛";

  const usaBannerText = language === 'es'
    ? "🇺🇸 ENVÍO GRATIS A USA 🚚"
    : "🇺🇸 FREE SHIPPING TO USA 🚚";

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 pb-24"> {/* Increased pb for double banners */}
      {/* USA Shipping Banner - Top */}
      <div 
        className="fixed top-0 left-0 right-0 h-12 bg-blue-600 text-white flex items-center justify-center text-base font-semibold animate-pulse z-50 border-b border-blue-300"
        role="banner"
        aria-label="Free shipping to USA"
      >
        {usaBannerText}
      </div>

      {/* Add top padding to account for fixed banner */}
      <div className="pt-12">
        <Navbar /> {/* Navbar only appears on /shop routes */}
        <main className="flex-grow container mx-auto px-4 py-8">
          <Outlet />
        </main>
      </div>
      
      {/* Honduras Banner - Bottom */}
      <div 
        className="fixed bottom-12 left-0 right-0 h-12 bg-purple-600 text-white flex items-center justify-center text-base font-semibold animate-pulse z-40 border-t border-purple-300"
        role="banner"
        aria-label="Free shipping nationwide"
      >
        {hondurasBannerText}
      </div>

      <Footer />
      <ChatBox />
    </div>
  );
};

export default ShopLayout;