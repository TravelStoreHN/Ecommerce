
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from '@/components/layout/Footer'; // Changed to aliased import
import ChatBox from '../chat/ChatBox';
import { useSettings } from '../../contexts/SettingsContext'; // Import useSettings

const ShopLayout: React.FC = () => {
  const { language } = useSettings(); // Get language

  const bannerText = language === 'es' 
    ? "ENVÍO GRATIS A NIVEL NACIONAL 🇭🇳" 
    : "FREE SHIPPING NATIONWIDE 🇭🇳";

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 pb-12"> {/* Updated pb-12 for new banner height */}
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
      
      {/* Pulsing Banner */}
      <div 
        className="fixed bottom-0 left-0 right-0 h-12 bg-purple-600 text-white flex items-center justify-center text-base font-semibold animate-pulse z-40 border-t border-purple-300" /* Increased height, text size, added border */
        role="banner"
        aria-label="Free shipping nationwide"
      >
        {bannerText}
      </div>

      <Footer />
      <ChatBox />
    </div>
  );
};

export default ShopLayout;