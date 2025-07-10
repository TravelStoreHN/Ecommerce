import React, { useState } from 'react';
import { ChatBubbleOvalLeftEllipsisIcon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSettings } from '../../contexts/SettingsContext';
import { WHATSAPP_CONFIG } from '../../config/whatsapp';

const MultiChannelChatBox: React.FC = () => {
  const { language } = useSettings();
  const [isOpen, setIsOpen] = useState(false);

  const handleInstagramChat = () => {
    // Instagram direct message link using ig.me/m format
    window.open('https://ig.me/m/TravelStoreHN', '_blank', 'noopener,noreferrer');
  };

  const handleWhatsAppChat = () => {
    // WhatsApp direct message link with your actual phone number
    const message = encodeURIComponent(language === 'es' 
      ? '¡Hola! Me interesa conocer más sobre sus productos de viaje 🧳✈️' 
      : 'Hello! I\'m interested in learning more about your travel products 🧳✈️');
    window.open(`https://wa.me/${WHATSAPP_CONFIG.BUSINESS_PHONE.replace('+', '')}?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  const handleMessengerChat = () => {
    // Facebook Messenger direct link - corrected format
    window.open('https://m.me/TravelStoreHN', '_blank', 'noopener,noreferrer');
  };

  const handleGoogleSearch = () => {
    // Google search for @TravelStoreHN
    const searchQuery = encodeURIComponent('@TravelStoreHN');
    window.open(`https://www.google.com/search?q=${searchQuery}`, '_blank', 'noopener,noreferrer');
  };

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      es: {
        chatTitle: "¡Conecta con nosotros! ✨",
        chatDescription: "Escoge tu plataforma favorita para hablar con TravelStoreHN. ¡Estamos aquí para ayudarte!",
        instagramButton: "📱 Instagram",
        whatsappButton: "💬 WhatsApp",
        messengerButton: "💙 Messenger",
        googleButton: " Búscanos en Google",
        followText: "Todas nuestras redes: @TravelStoreHN",
        responseText: "¡Te responderemos lo más pronto posible!",
        chooseText: "Elige tu plataforma preferida:"
      },
      en: {
        chatTitle: "Connect with us! ✨",
        chatDescription: "Choose your favorite platform to chat with TravelStoreHN. We're here to help!",
        instagramButton: "📱 Instagram",
        whatsappButton: "💬 WhatsApp", 
        messengerButton: "💙 Messenger",
        googleButton: " Find us on Google",
        followText: "All our networks: @TravelStoreHN",
        responseText: "We'll respond as soon as possible!",
        chooseText: "Choose your preferred platform:"
      }
    };
    return translations[language]?.[key] || translations['en'][key];
  };

  return (
    <>
      {/* Chat Bubble Button - Only show when chat is closed */}
      {!isOpen && (
        <div className="absolute bottom-0 right-4 z-40">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
            aria-label="Open contact options"
          >
            <ChatBubbleOvalLeftEllipsisIcon className="h-6 w-6" />
          </button>
        </div>
      )}

      {/* Chat Widget - Show at the exact same position as the button */}
      {isOpen && (
        <div className="absolute bottom-0 right-4 z-40 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">✈️</span>
                </div>
                <div>
                  <h3 className="font-semibold">TravelStoreHN</h3>
                  <p className="text-xs opacity-90">Contact Options</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            <div>
              <h4 className="font-semibold text-gray-800 mb-1">{t('chatTitle')}</h4>
              <p className="text-xs text-gray-600">{t('chatDescription')}</p>
            </div>

            <div className="text-xs font-medium text-gray-700">{t('chooseText')}</div>

            {/* Contact Options Grid - 3 main chat platforms */}
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={handleInstagramChat}
                className="flex flex-col items-center p-2 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md"
              >
                <span className="text-sm mb-1">📱</span>
                <span className="text-xs font-medium">Instagram</span>
              </button>

              <button
                onClick={handleWhatsAppChat}
                className="flex flex-col items-center p-2 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md"
              >
                <span className="text-sm mb-1">💬</span>
                <span className="text-xs font-medium">WhatsApp</span>
              </button>

              <button
                onClick={handleMessengerChat}
                className="flex flex-col items-center p-2 bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md"
              >
                <span className="text-sm mb-1">💙</span>
                <span className="text-xs font-medium">Messenger</span>
              </button>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-2 rounded-lg border-l-4 border-purple-500">
              <p className="text-xs text-gray-700 font-medium text-center">{t('followText')}</p>
            </div>

            {/* Small Google search option */}
            <div className="text-center">
              <button
                onClick={handleGoogleSearch}
                className="text-xs text-gray-500 hover:text-gray-700 underline flex items-center justify-center space-x-1 mx-auto"
              >
                <MagnifyingGlassIcon className="h-3 w-3" />
                <span>{t('googleButton')}</span>
              </button>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">{t('responseText')}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MultiChannelChatBox;
