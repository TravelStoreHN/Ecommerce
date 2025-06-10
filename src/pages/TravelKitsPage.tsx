
import React from 'react';
import ProductCard from '../components/product/ProductCard';
import { mockTravelKits } from '../services/mockData'; // Assuming mockTravelKits is exported from mockData
import { GiftIcon } from '@heroicons/react/24/outline';
import { useSettings } from '../contexts/SettingsContext';

const TravelKitsPage: React.FC = () => {
  const { language } = useSettings();

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      es: {
        title: "Descubre Nuestros Kits de Viaje",
        subtitle: "Paquetes cuidadosamente seleccionados para cada tipo de viajero. ¡Todo lo que necesitas en un solo lugar!",
        noKitsTitle: "No Hay Kits de Viaje Disponibles Actualmente",
        noKitsSubtitle: "Estamos preparando nuevos y emocionantes kits. ¡Vuelve pronto!",
      },
      en: {
        title: "Discover Our Travel Kits",
        subtitle: "Carefully curated packages for every type of traveler. Everything you need in one place!",
        noKitsTitle: "No Travel Kits Available Currently",
        noKitsSubtitle: "We're busy preparing new and exciting kits. Check back soon!",
      }
    };
    return translations[language]?.[key] || translations['en'][key];
  };

  return (
    <div className="space-y-8">
      <header className="bg-white p-8 rounded-xl shadow-lg text-center">
        <GiftIcon className="h-16 w-16 text-purple-600 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-purple-700">{t('title')}</h1>
        <p className="text-lg text-gray-600 mt-2 max-w-xl mx-auto">{t('subtitle')}</p>
      </header>
      
      {mockTravelKits.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockTravelKits.map(kit => (
            <ProductCard key={kit.id} product={kit} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white p-6 rounded-xl shadow">
          <GiftIcon className="h-20 w-20 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-700">{t('noKitsTitle')}</h2>
          <p className="text-gray-500 mt-2">{t('noKitsSubtitle')}</p>
        </div>
      )}
    </div>
  );
};

export default TravelKitsPage;