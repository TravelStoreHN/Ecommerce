import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '@/components/layout/Footer'; // Changed to aliased import
import ChatBox from '../chat/InstagramChatBox';
import UserActionPanel from '../ui/UserActionPanel';
import { useSettings } from '../../contexts/SettingsContext'; // Import useSettings
import Navbar from '@/components/layout/Navbar'; // Import Navbar
import LeftAdBanner from '@/components/ads/LeftAdBanner';
import RightAdBanner from '@/components/ads/RightAdBanner';

const ShopLayout: React.FC = () => {
  const { language } = useSettings(); // Get language
  const location = useLocation(); // Get current route
  
  // Check if we're on the travel agent page
  const isOnTravelAgentPage = location.pathname === '/shop/travel-agent';

  const hondurasBannerText = language === 'es' 
    ? "ENVÍO GRATIS A NIVEL NACIONAL 🇭🇳 🚛" 
    : "FREE SHIPPING NATIONWIDE 🇭🇳 🚛";

  const usaBannerText = language === 'es'
    ? "🇺🇸 ENVÍO GRATIS A USA 🚚"
    : "🇺🇸 FREE SHIPPING TO USA 🚚";

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Desktop-only Affiliate Ad Banners - Only show on Travel Agent page */}
      {isOnTravelAgentPage && (
        <>
          <LeftAdBanner />
          <RightAdBanner />
        </>
      )}

      {/* USA Shipping Banner - Top */}
      <div 
        className="fixed top-0 left-0 right-0 h-12 bg-blue-600 text-white flex items-center justify-center text-base font-semibold animate-pulse z-50 border-b border-blue-300"
        role="banner"
        aria-label="Free shipping to USA"
      >
        {usaBannerText}
      </div>

      {/* Add top padding to account for fixed banner */}
      <div className="pt-12 flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 w-full">
          <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-24">
            <Outlet />
          </main>
        </div>
      </div>
      
      {/* Footer with bottom padding to account for fixed banner */}
      <div className="pb-12">
        <Footer />
      </div>
      
      {/* Chat bubble positioned above the bottom banner */}
      <div className="fixed bottom-12 left-0 right-0 z-50">
        <div className="relative">
          <ChatBox />
        </div>
      </div>
      
      {/* User Action Panel positioned on the left side */}
      <UserActionPanel />
      
      {/* Honduras Banner - Bottom */}
      <div 
        className="fixed bottom-0 left-0 right-0 h-12 bg-purple-600 text-white flex items-center justify-center text-base font-semibold animate-pulse z-40 border-t border-purple-300"
        role="banner"
        aria-label="Free shipping nationwide"
      >
        {hondurasBannerText}
      </div>
    </div>
  );
};

export default ShopLayout;