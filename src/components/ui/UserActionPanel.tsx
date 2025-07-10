import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBagIcon, UserCircleIcon, TruckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useSettings } from '../../contexts/SettingsContext';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const UserActionPanel: React.FC = () => {
  const { language } = useSettings();
  const { isAuthenticated, user, login } = useAuth();
  const { cartItemCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      es: {
        userActions: "Acciones de Usuario",
        cart: "Carrito",
        login: "Iniciar Sesión",
        account: "Mi Cuenta",
        trackOrder: "Rastrear Pedido",
        items: "artículos"
      },
      en: {
        userActions: "User Actions",
        cart: "Cart",
        login: "Login",
        account: "My Account",
        trackOrder: "Track Order",
        items: "items"
      }
    };
    return translations[language]?.[key] || translations['en'][key];
  };

  return (
    <>
      {/* Action Panel Button - Only show on desktop when panel is closed */}
      {!isOpen && (
        <div className="fixed top-32 left-4 z-40 hidden lg:block">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
            aria-label="Open user actions"
          >
            <UserCircleIcon className="h-6 w-6" />
          </button>
        </div>
      )}

      {/* User Action Panel - Show on desktop only when open */}
      {isOpen && (
        <div className="fixed top-32 left-4 z-40 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden hidden lg:block">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-lg">👤</span>
                </div>
                <div>
                  <h3 className="font-semibold">TravelStoreHN</h3>
                  <p className="text-xs opacity-90">{t('userActions')}</p>
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
            {/* Shopping Cart */}
            <Link
              to="/shop/cart"
              onClick={() => setIsOpen(false)}
              className="flex items-center p-3 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 rounded-lg transition-all duration-200 group border border-green-200"
            >
              <div className="relative">
                <ShoppingBagIcon className="h-6 w-6 text-green-600" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <div className="ml-3 flex-1">
                <span className="font-medium text-green-800">{t('cart')}</span>
                {cartItemCount > 0 && (
                  <p className="text-xs text-green-600">{cartItemCount} {t('items')}</p>
                )}
              </div>
            </Link>

            {/* Login/Account */}
            {isAuthenticated ? (
              <Link
                to="/shop/account"
                onClick={() => setIsOpen(false)}
                className="flex items-center p-3 bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 rounded-lg transition-all duration-200 group border border-purple-200"
              >
                <UserCircleIcon className="h-6 w-6 text-purple-600" />
                <div className="ml-3 flex-1">
                  <span className="font-medium text-purple-800">{t('account')}</span>
                  <p className="text-xs text-purple-600">{user?.email}</p>
                </div>
              </Link>
            ) : (
              <button
                onClick={() => {
                  login();
                  setIsOpen(false);
                }}
                className="flex items-center p-3 bg-gradient-to-r from-purple-50 to-blue-50 hover:from-purple-100 hover:to-blue-100 rounded-lg transition-all duration-200 group border border-purple-200 w-full"
              >
                <UserCircleIcon className="h-6 w-6 text-purple-600" />
                <div className="ml-3 flex-1 text-left">
                  <span className="font-medium text-purple-800">{t('login')}</span>
                </div>
              </button>
            )}

            {/* Track Order */}
            <Link
              to="/shop/track-order"
              onClick={() => setIsOpen(false)}
              className="flex items-center p-3 bg-gradient-to-r from-orange-50 to-yellow-50 hover:from-orange-100 hover:to-yellow-100 rounded-lg transition-all duration-200 group border border-orange-200"
            >
              <TruckIcon className="h-6 w-6 text-orange-600" />
              <div className="ml-3 flex-1">
                <span className="font-medium text-orange-800">{t('trackOrder')}</span>
              </div>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default UserActionPanel;
