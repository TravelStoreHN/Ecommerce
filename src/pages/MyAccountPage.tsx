
import React from 'react';
import { UserCircleIcon, ShoppingBagIcon, HeartIcon, Cog6ToothIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import { useSettings } from '../contexts/SettingsContext';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const MyAccountPage: React.FC = () => {
  const { language } = useSettings();
  const { isAuthenticated, isLoading, user, login, logout } = useAuth();

  // Show loading spinner while Auth0 is checking authentication
  if (isLoading) {
    return <LoadingSpinner />;
  }

  const t = (key: string, name?: string) => {
    const translations: Record<string, Record<string, string>> = {
      es: {
        title: "Mi Cuenta",
        subtitle: "Administra tu perfil, pedidos y preferencias.",
        memberSince: "Miembro desde:",
        editProfile: "Editar Perfil",
        orderHistory: "Historial de Pedidos",
        orderDesc: "Ve tus pedidos anteriores y rastrea envíos actuales.",
        wishlist: "Lista de Deseos",
        wishlistDesc: "Administra tus artículos guardados y productos favoritos.",
        profileSettings: "Configuración de Perfil",
        profileDesc: "Actualiza tu información personal y contraseña.",
        preferences: "Preferencias",
        preferencesDesc: "Administra tus preferencias de comunicación y del sitio.",
        logout: "Cerrar Sesión",
        logoutDesc: "Cierra sesión de forma segura.",
        loginPromptTitle: "Acceso Requerido",
        loginPrompt: "Por favor, inicia sesión para ver y administrar tu cuenta.",
        loginButton: "Iniciar Sesión",
        greeting: `Hola, ${name || ''}`,
      },
      en: {
        title: "My Account",
        subtitle: "Manage your profile, orders, and preferences.",
        memberSince: "Member since:",
        editProfile: "Edit Profile",
        orderHistory: "Order History",
        orderDesc: "View your past orders and track current shipments.",
        wishlist: "Wishlist",
        wishlistDesc: "Manage your saved items and favorite products.",
        profileSettings: "Profile Settings",
        profileDesc: "Update your personal information and password.",
        preferences: "Preferences",
        preferencesDesc: "Manage your communication and site preferences.",
        logout: "Logout",
        logoutDesc: "Securely sign out of your account.",
        loginPromptTitle: "Access Required",
        loginPrompt: "Please login to view and manage your account.",
        loginButton: "Login",
        greeting: `Hello, ${name || ''}`,
      }
    };
    let text = translations[language]?.[key] || translations['en'][key];
    if (name && key === 'greeting' && text.includes(name)) { // Ensure name is part of the template
      text = text.replace(name, name); // This replacement seems redundant, but is there if template changes
    }
    return text;
  };
  
  const accountSections = [
    { nameKey: 'orderHistory', descKey: 'orderDesc', icon: ShoppingBagIcon, path: '#' },
    { nameKey: 'wishlist', descKey: 'wishlistDesc', icon: HeartIcon, path: '#' },
    { nameKey: 'profileSettings', descKey: 'profileDesc', icon: UserCircleIcon, path: '#' },
    { nameKey: 'preferences', descKey: 'preferencesDesc', icon: Cog6ToothIcon, path: '#' },
  ];

  if (!isAuthenticated || !user) {
    return (
      <div className="space-y-8 text-center bg-white p-8 rounded-xl shadow-lg">
        <UserCircleIcon className="h-24 w-24 text-purple-400 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-purple-700">{t('loginPromptTitle')}</h1>
        <p className="text-gray-600 mt-1 mb-6 max-w-md mx-auto">{t('loginPrompt')}</p>
        <Button onClick={login} variant="primary" size="lg" leftIcon={<ArrowLeftOnRectangleIcon className="h-5 w-5"/>}>
          {t('loginButton')}
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="bg-white p-6 rounded-xl shadow">
        <h1 className="text-3xl font-bold text-purple-700">{t('title')}</h1>
        <p className="text-gray-600 mt-1">{t('subtitle')}</p>
      </header>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1 bg-white p-6 rounded-xl shadow">
          <div className="flex flex-col items-center text-center">
            {user.avatar || user.picture ? (
              <img src={user.avatar || user.picture} alt={user.name} className="h-24 w-24 rounded-full mb-4 object-cover" />
            ) : (
              <UserCircleIcon className="h-24 w-24 text-purple-500 mb-4" />
            )}
            <h2 className="text-2xl font-semibold text-gray-800">{t('greeting', user.name)}</h2>
            <p className="text-gray-600">{user.email}</p>
            {user.email_verified && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                ✓ Email Verified
              </span>
            )}
            {/* Show Auth0 creation date if available, otherwise mock date */}
            <p className="text-sm text-gray-500 mt-2">{t('memberSince')} {user.updated_at ? new Date(user.updated_at).toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US') : new Date('2023-05-15').toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US')}</p>
             <button className="mt-4 text-sm text-purple-600 hover:underline">{t('editProfile')}</button>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          {accountSections.map((section) => (
            <div key={section.nameKey} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition-shadow cursor-pointer" onClick={() => alert(`Navigate to ${section.nameKey}`)}>
              <div className="flex items-start space-x-4">
                <section.icon className="h-8 w-8 text-purple-600 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800">{t(section.nameKey)}</h3>
                  <p className="text-gray-600 text-sm">{t(section.descKey)}</p>
                </div>
              </div>
            </div>
          ))}
           <div onClick={logout} className="bg-red-50 p-6 rounded-xl shadow hover:shadow-lg transition-shadow cursor-pointer border border-red-200">
              <div className="flex items-start space-x-4">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-8 w-8 text-red-500 mt-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
                </svg>
                <div>
                  <h3 className="text-xl font-semibold text-red-700">{t('logout')}</h3>
                  <p className="text-red-600 text-sm">{t('logoutDesc')}</p>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccountPage;
