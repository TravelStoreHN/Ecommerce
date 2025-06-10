
import React from 'react';
import ProductCard from '../components/product/ProductCard';
import { mockProducts } from '../services/mockData';
import { TagIcon } from '@heroicons/react/24/outline';
import { useSettings } from '../contexts/SettingsContext';
// formatCurrency is available via ProductCard, but if needed directly:
// import { formatCurrency } from '../utils/localization'; 

const SalesPage: React.FC = () => {
  const { language } = useSettings(); // currency is handled by ProductCard

  const saleProducts = mockProducts.filter(p => p.isSale && p.originalPrice && p.originalPrice > p.price);

  const t = (key: string, percentageValue?: number) => {
    const translations: Record<string, Record<string, string | ((p: number) => string)>> = {
      es: {
        title: "Ofertas y Promociones Actuales",
        subtitle: "¡Aprovecha estas increíbles ofertas antes de que se acaben!",
        hotDeals: "Ofertas Calientes 🔥",
        noSalesTitle: "No Hay Ofertas Activas en Este Momento",
        noSalesSubtitle: "¡Vuelve pronto para emocionantes ofertas y descuentos en tus esenciales de viaje favoritos!",
        stayUpdated: "¡Mantente Actualizado!",
        subscribePrompt: "Suscríbete a nuestro boletín para ser el primero en conocer nuevas ofertas y promociones exclusivas.",
        emailPlaceholder: "Ingresa tu correo electrónico",
        subscribeButton: "Suscribirse",
        saleOff: (percentage: number) => `${percentage}% DE DESCUENTO`
      },
      en: {
        title: "Current Sales & Promotions",
        subtitle: "Grab these amazing deals before they're gone!",
        hotDeals: "Hot Deals 🔥",
        noSalesTitle: "No Active Sales Right Now",
        noSalesSubtitle: "Check back soon for exciting deals and discounts on your favorite travel essentials!",
        stayUpdated: "Stay Updated!",
        subscribePrompt: "Subscribe to our newsletter to be the first to know about new sales and exclusive offers.",
        emailPlaceholder: "Enter your email",
        subscribeButton: "Subscribe",
        saleOff: (percentage: number) => `${percentage}% OFF`
      }
    };
    const entry = translations[language === 'es' ? 'es' : 'en'][key];
    if (typeof entry === 'function') {
      if (key === 'saleOff' && percentageValue !== undefined) {
        return entry(percentageValue);
      }
      return `Error: Func ${key}`; 
    }
    return entry; 
  };

  return (
    <div className="space-y-8">
      <header className="bg-gradient-to-r from-red-500 to-orange-500 text-white p-8 rounded-xl shadow-lg text-center">
        <TagIcon className="h-16 w-16 mx-auto mb-4" />
        <h1 className="text-4xl font-bold">{t('title')}</h1>
        <p className="text-lg mt-2">{t('subtitle')}</p>
      </header>
      
      {saleProducts.length > 0 ? (
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">{t('hotDeals')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {saleProducts.map(product => (
              <div key={product.id} className="relative">
                 <ProductCard product={product} />
                 {/* The "OFERTA" badge is now part of ProductCard itself, 
                     but if you want a different style specific to sales page, you can add it here too.
                     The ProductCard will show its own "OFERTA" badge.
                     This dynamic badge here shows the percentage.
                 */}
                 {product.originalPrice && (
                    <div className="absolute top-3 right-3 bg-yellow-400 text-black text-xs font-bold px-2.5 py-1.5 rounded-full shadow-md">
                        {t('saleOff', Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100))}
                    </div>
                 )}
              </div>
            ))}
          </div>
        </section>
      ) : (
        <div className="text-center py-12 bg-white p-6 rounded-xl shadow">
          <TagIcon className="h-20 w-20 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700">{t('noSalesTitle')}</h2>
          <p className="text-gray-500 mt-2">{t('noSalesSubtitle')}</p>
        </div>
      )}

      <section className="bg-white p-8 rounded-xl shadow">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">{t('stayUpdated')}</h3>
        <p className="text-gray-600 mb-4">{t('subscribePrompt')}</p>
        <form className="flex flex-col sm:flex-row gap-3">
          <input 
            type="email" 
            placeholder={t('emailPlaceholder') as string}
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            aria-label={t('emailPlaceholder') as string}
          />
          <button 
            type="submit" 
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors font-semibold"
          >
            {t('subscribeButton')}
          </button>
        </form>
      </section>
    </div>
  );
};

export default SalesPage;