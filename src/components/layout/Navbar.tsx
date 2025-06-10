import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { SITE_NAME } from '../../constants';
import { 
    Bars3Icon, XMarkIcon, ShoppingBagIcon, UserCircleIcon, TruckIcon, GiftIcon, WifiIcon, 
    ArrowRightOnRectangleIcon, ArrowLeftOnRectangleIcon,
    HomeIcon, // Added
    Squares2X2Icon, // Added
    TagIcon, // Added
    NewspaperIcon, // Added
    ChatBubbleOvalLeftEllipsisIcon, // Added
    BeakerIcon // Added for Travel Size
} from '@heroicons/react/24/outline';
import { useSettings } from '../../contexts/SettingsContext';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';

const Logo = (): React.ReactElement => (
    <Link to="/shop" className="text-3xl font-bold tracking-tight text-purple-600 hover:text-purple-700 transition-colors">
      {SITE_NAME}
    </Link>
);

interface NavItemProps {
  path: string;
  name: string;
  onClick?: () => void;
  mobile?: boolean;
  icon?: React.ElementType;
  end?: boolean;
}

const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language } = useSettings();
  const { isAuthenticated, user, login, logout } = useAuth();
  const { cartItemCount } = useCart();

  const commonNavLinks = [
    { nameKey: 'home', defaultText: 'Home', path: '/shop', end: true, icon: HomeIcon },
    { nameKey: 'products', defaultText: 'Products', path: '/shop/products', icon: Squares2X2Icon },
    { nameKey: 'travelKits', defaultText: 'Travel Kits', path: '/shop/kits', icon: GiftIcon },
    { nameKey: 'eSims', defaultText: 'E-Sims', path: '/shop/esim', icon: WifiIcon },
    { nameKey: 'travelSize', defaultText: 'Travel Size', path: '/shop/travel-size-toiletries', icon: BeakerIcon },
    { nameKey: 'sales', defaultText: 'Sales', path: '/shop/sales', icon: TagIcon },
    { nameKey: 'blog', defaultText: 'Blog', path: '/shop/blog', icon: NewspaperIcon },
    { nameKey: 'travelAgent', defaultText: 'Travel Agent', path: '/shop/travel-agent', icon: ChatBubbleOvalLeftEllipsisIcon },
    { nameKey: 'trackOrder', defaultText: 'Track Order', path: '/shop/track-order', icon: TruckIcon },
  ];

  const translations: Record<string, Record<string, string>> = {
    es: {
      home: 'Inicio',
      products: 'Productos',
      travelKits: 'Kits de Viaje',
      eSims: 'E-Sims',
      travelSize: 'Tamaño Viaje',
      sales: 'Ofertas',
      blog: 'Blog',
      travelAgent: 'Agente de Viajes',
      trackOrder: 'Rastrear Pedido',
      myAccount: 'Mi Cuenta',
      cart: 'Carrito',
      openMenu: 'Abrir menú principal',
      login: 'Iniciar Sesión',
      logout: 'Cerrar Sesión',
    },
    en: {
      home: 'Home',
      products: 'Products',
      travelKits: 'Travel Kits',
      eSims: 'E-Sims',
      travelSize: 'Travel Size',
      sales: 'Sales',
      blog: 'Blog',
      travelAgent: 'Travel Agent',
      trackOrder: 'Track Order',
      myAccount: 'My Account',
      cart: 'Cart',
      openMenu: 'Open main menu',
      login: 'Login',
      logout: 'Logout',
    }
  };

  const t = (key: string) => translations[language]?.[key] || translations['en'][key];

  const NavItem = ({ path, name, onClick, mobile = false, icon: IconComponent, end = false }: NavItemProps): React.ReactElement => {
    const getDynamicClasses = ({ isActive }: { isActive: boolean }): string => {
      const baseTransition = 'transition-colors';
      let specificStyles = '';

      if (mobile) {
        specificStyles = `flex items-center px-3 py-3 rounded-lg text-base font-medium ${
          isActive 
            ? 'bg-purple-100 text-purple-700' 
            : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
        }`;
      } else {
        specificStyles = `px-3 py-2 rounded-md text-sm font-medium flex items-center ${ // Added flex items-center
          isActive 
            ? 'bg-purple-600 text-white' 
            : 'text-gray-700 hover:bg-purple-100 hover:text-purple-700'
        }`;
      }
      return `${baseTransition} ${specificStyles}`;
    };
    
    return (
      <NavLink
        to={path}
        onClick={onClick}
        className={getDynamicClasses}
        end={end}
      >
        {IconComponent && <IconComponent className={`h-5 w-5 ${mobile ? 'mr-3 text-gray-500 group-hover:text-purple-600' : 'mr-1'}`} />}
        {name}
      </NavLink>
    );
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Logo />
          </div>
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {commonNavLinks.map((link) => (
              <NavItem key={link.nameKey} path={link.path} name={t(link.nameKey)} end={link.end} icon={link.icon}/>
            ))}
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && user ? (
              <>
                <Link to="/shop/account" className="text-gray-600 hover:text-purple-600 transition-colors" aria-label={t('myAccount')}>
                  {user.avatar ? <img src={user.avatar} alt={user.name} className="h-7 w-7 rounded-full" /> : <UserCircleIcon className="h-7 w-7" />}
                </Link>
                <button onClick={logout} className="text-gray-600 hover:text-purple-600 transition-colors flex items-center text-sm font-medium" aria-label={t('logout')}>
                  <ArrowRightOnRectangleIcon className="h-6 w-6 mr-1" /> {t('logout')}
                </button>
              </>
            ) : (
              <button onClick={login} className="text-gray-600 hover:text-purple-600 transition-colors flex items-center text-sm font-medium" aria-label={t('login')}>
                <ArrowLeftOnRectangleIcon className="h-6 w-6 mr-1" /> {t('login')}
              </button>
            )}
            <Link to="/shop/cart" className="text-gray-600 hover:text-purple-600 transition-colors relative" aria-label={t('cart')}>
              <ShoppingBagIcon className="h-7 w-7" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
          </div>
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-purple-600 focus:outline-none p-2"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">{t('openMenu')}</span>
              {isMobileMenuOpen ? <XMarkIcon className="h-7 w-7" /> : <Bars3Icon className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>
      
      <div
        id="mobile-menu"
        className={
          "md:hidden bg-white shadow-lg absolute w-full z-40 " +
          "transition-all duration-300 ease-in-out origin-top " +
          (isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-5 pointer-events-none')
        }
      >
        <div className="px-4 pt-3 pb-4 space-y-2 sm:px-5">
          {commonNavLinks.map((link) => (
            <NavItem 
              key={link.nameKey} 
              path={link.path} 
              name={t(link.nameKey)} 
              onClick={() => setIsMobileMenuOpen(false)}
              mobile
              icon={link.icon}
              end={link.end}
            />
          ))}
          {isAuthenticated ? (
            <>
              <NavLink
                to="/shop/account"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-3 py-3 rounded-lg text-base font-medium transition-colors group ${
                    isActive ? 'bg-purple-100 text-purple-700' : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                  }`
                }
              >
                <UserCircleIcon className="h-6 w-6 mr-3 text-gray-500 group-hover:text-purple-600" />
                {t('myAccount')}
              </NavLink>
              <button 
                onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                className="w-full flex items-center text-left px-3 py-3 rounded-lg text-base font-medium transition-colors text-gray-700 hover:bg-purple-50 hover:text-purple-600 group"
              >
                <ArrowRightOnRectangleIcon className="h-6 w-6 mr-3 text-gray-500 group-hover:text-purple-600" />
                {t('logout')}
              </button>
            </>
          ) : (
            <button 
              onClick={() => { login(); setIsMobileMenuOpen(false); }}
              className="w-full flex items-center text-left px-3 py-3 rounded-lg text-base font-medium transition-colors text-gray-700 hover:bg-purple-50 hover:text-purple-600 group"
            >
              <ArrowLeftOnRectangleIcon className="h-6 w-6 mr-3 text-gray-500 group-hover:text-purple-600" />
              {t('login')}
            </button>
          )}
          <Link 
            to="/shop/cart"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center px-3 py-3 rounded-lg text-base font-medium transition-colors text-gray-700 hover:bg-purple-50 hover:text-purple-600 group"
          >
            <ShoppingBagIcon className="h-6 w-6 mr-3 text-gray-500 group-hover:text-purple-600" />
            {t('cart')} ({cartItemCount})
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;