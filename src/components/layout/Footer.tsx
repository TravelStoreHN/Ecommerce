// Trivial comment added to help ensure re-processing 2024-10-28
import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_NAME, FACEBOOK_PROFILE_URL, INSTAGRAM_PROFILE_URL, YOUTUBE_CHANNEL_URL, LEGAL_POLICY_TYPES } from '../../constants';
import { useSettings } from '../../contexts/SettingsContext';
import { GlobeAltIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';


// Basic SVG icons
const FacebookIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path fillRule="evenodd" d="M12.315 2.169a.39.39 0 01.37.246c.03.088.048.181.048.274v.851c0 .093-.018.187-.048.274a.39.39 0 01-.37.246A3.955 3.955 0 008.57 6.467a3.955 3.955 0 00-3.296 3.296A.39.39 0 015.028 10c-.088.03-.181.048-.274.048h-.851c-.093 0-.187-.018-.274-.048a.39.39 0 01-.246-.37c.01-.06.015-.12.015-.181A10.003 10.003 0 0112 2c.061 0 .121.005.181.015a.39.39 0 01.134.154zm5.586 4.304a1.002 1.002 0 100-2.004 1.002 1.002 0 000 2.004zM12 7.004a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zM5.004 12a7.002 7.002 0 1114 0 7.002 7.002 0 01-14 0zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 21.6A9.6 9.6 0 1012 2.4a9.6 9.6 0 000 19.2z" clipRule="evenodd" />
  </svg>
);

const YouTubeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M10,15L15.19,12L10,9V15M21.56,7.17C21.69,7.64 21.78,8.27 21.84,9.07C21.91,9.87 21.94,10.56 21.94,11.16L22,12C22,14.19 21.84,15.8 21.56,16.83C21.31,17.73 20.73,18.31 19.83,18.56C19.36,18.69 18.73,18.78 17.93,18.84C17.13,18.91 16.44,18.94 15.84,18.94L15,19C12.81,19 11.2,18.84 10.17,18.56C9.27,18.31 8.69,17.73 8.44,16.83C8.31,16.36 8.22,15.73 8.16,14.93C8.09,14.13 8.06,13.44 8.06,12.84L8,12C8,9.81 8.16,8.2 8.44,7.17C8.69,6.27 9.27,5.69 10.17,5.44C10.64,5.31 11.27,5.22 12.07,5.16C12.87,5.09 13.56,5.06 14.16,5.06L15,5C17.19,5 18.8,5.16 19.83,5.44C20.73,5.69 21.31,6.27 21.56,7.17Z" />
  </svg>
);

export default function Footer(): React.ReactElement {
  const { language, setLanguage, currency, setCurrency, supportedLanguages, supportedCurrencies } = useSettings();

  const copyrightYearRange = "2022-2025";

  const content = {
    desc: language === 'es' ? 'Tu tienda única para esenciales de viaje y planificación de aventuras en Honduras con IA.' : 'Your one-stop shop for travel essentials and AI-powered Honduras adventure planning.',
    quickLinks: language === 'es' ? 'Enlaces Rápidos' : 'Quick Links',
    products: language === 'es' ? 'Productos' : 'Products',
    hondurasTravel: language === 'es' ? 'Viajes Honduras' : 'Honduras Travel',
    blog: language === 'es' ? 'Blog' : 'Blog',
    myAccount: language === 'es' ? 'Mi Cuenta' : 'My Account',
    trackOrder: language === 'es' ? 'Rastrear Pedido' : 'Track Your Order',
    legal: language === 'es' ? 'Legal' : 'Legal',
    terms: language === 'es' ? 'Términos y Condiciones' : 'Terms & Conditions',
    privacy: language === 'es' ? 'Política de Privacidad' : 'Privacy Policy',
    returns: language === 'es' ? 'Política de Devoluciones' : 'Return Policy',
    shipping: language === 'es' ? 'Política de Envíos' : 'Shipping Policy',
    allRightsReserved: language === 'es' ? `© ${copyrightYearRange} ${SITE_NAME}. Todos los derechos reservados.` : `© ${copyrightYearRange} ${SITE_NAME}. All rights reserved.`,
    poweredBy: language === 'es' ? 'Impulsado por GrupoSaubar ❤️' : 'Powered by GrupoSaubar ❤️',
    languageLabel: language === 'es' ? 'Idioma' : 'Language',
    currencyLabel: language === 'es' ? 'Moneda' : 'Currency',
  };

  return (
    <footer className="bg-purple-700 text-purple-100">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">{SITE_NAME}</h3>
            <p className="text-sm">{content.desc}</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{content.quickLinks}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop/products" className="hover:text-white">{content.products}</Link></li>
              <li><Link to="/shop/travel-agent" className="hover:text-white">{content.hondurasTravel}</Link></li>
              <li><Link to="/shop/blog" className="hover:text-white">{content.blog}</Link></li>
              <li><Link to="/shop/account" className="hover:text-white">{content.myAccount}</Link></li>
              <li><Link to="/shop/track-order" className="hover:text-white">{content.trackOrder}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">{content.legal}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to={`/shop/legal/${LEGAL_POLICY_TYPES.TERMS}`} className="hover:text-white">{content.terms}</Link></li>
              <li><Link to={`/shop/legal/${LEGAL_POLICY_TYPES.PRIVACY}`} className="hover:text-white">{content.privacy}</Link></li>
              <li><Link to={`/shop/legal/${LEGAL_POLICY_TYPES.RETURNS}`} className="hover:text-white">{content.returns}</Link></li>
              <li><Link to={`/shop/legal/${LEGAL_POLICY_TYPES.SHIPPING}`} className="hover:text-white">{content.shipping}</Link></li>
            </ul>
          </div>
           <div>
            <h4 className="text-lg font-semibold text-white mb-4">{language === 'es' ? 'Configuración' : 'Settings'}</h4>
            <div className="space-y-3">
              <div>
                <label htmlFor="language-select" className="block text-sm font-medium text-purple-200 mb-1 flex items-center">
                  <GlobeAltIcon className="h-5 w-5 mr-2"/> {content.languageLabel}
                </label>
                <select
                  id="language-select"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full bg-purple-600 border-purple-500 text-white p-2 rounded-md shadow-sm focus:ring-purple-400 focus:border-purple-400 text-sm"
                >
                  {supportedLanguages.map(lang => (
                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="currency-select" className="block text-sm font-medium text-purple-200 mb-1 flex items-center">
                   <CurrencyDollarIcon className="h-5 w-5 mr-2"/> {content.currencyLabel}
                </label>
                <select
                  id="currency-select"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full bg-purple-600 border-purple-500 text-white p-2 rounded-md shadow-sm focus:ring-purple-400 focus:border-purple-400 text-sm"
                >
                  {supportedCurrencies.map(curr => (
                    <option key={curr.code} value={curr.code}>{curr.name} ({curr.code})</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-purple-600 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-purple-200">{content.allRightsReserved}</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href={FACEBOOK_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="text-purple-200 hover:text-white" aria-label={`${SITE_NAME} on Facebook`}>
              <FacebookIcon className="h-6 w-6" />
            </a>
            <a href={INSTAGRAM_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="text-purple-200 hover:text-white" aria-label={`${SITE_NAME} on Instagram`}>
              <InstagramIcon className="h-6 w-6" />
            </a>
            <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer" className="text-purple-200 hover:text-white" aria-label={`${SITE_NAME} on YouTube`}>
              <YouTubeIcon className="h-6 w-6" />
            </a>
          </div>
        </div>
        <div className="text-center text-xs text-purple-300 pt-8">
          {content.poweredBy}
        </div>
      </div>
    </footer>
  );
}