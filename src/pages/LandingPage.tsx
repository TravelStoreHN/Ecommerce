import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useSettings } from '../contexts/SettingsContext';

interface FeatureBlockProps {
  title: string;
  imageUrl: string;
  linkTo: string;
}

const FeatureBlock: React.FC<FeatureBlockProps> = ({ title, imageUrl, linkTo }) => (
  <Link to={linkTo} className="group relative block w-full h-64 md:h-80 lg:h-96 overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
    <img src={imageUrl} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
    <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-opacity duration-300 flex items-end p-6">
      <h3 className="text-2xl font-semibold text-white tracking-tight">{title}</h3>
    </div>
  </Link>
);

const LandingPage: React.FC = () => {
  const { language } = useSettings();

  const t = (key: string, data?: any) => {
    const translations: Record<string, any> = {
      es: {
        pageSubtitle: "Tu viaje comienza aquí. Descubre los mejores esenciales de viaje y planificación de viajes a Honduras con IA.",
        featureGear: "Equipo Esencial",
        featureComfort: "Comodidad y Estilo",
        featureConnected: "Mantente Conectado",
        featureAdventures: "Aventuras en Honduras",
        readyToExplore: "¿Listo para explorar?",
        shopAndPlan: "Compra Ahora y Planifica Tu Viaje"
      },
      en: {
        pageSubtitle: "Your journey starts here. Discover top travel essentials and AI-powered Honduras trip planning.",
        featureGear: "Essential Gear",
        featureComfort: "Comfort & Style",
        featureConnected: "Stay Connected",
        featureAdventures: "Honduras Adventures",
        readyToExplore: "Ready to explore?",
        shopAndPlan: "Shop Now & Plan Your Trip"
      }
    };
    return translations[language]?.[key] || translations['en'][key];
  };


  const features = [
    {
      titleKey: 'featureGear',
      imageUrl: 'https://fastly.picsum.photos/id/16/2500/1667.jpg?hmac=uAkZwYc5phCRNFTrV_prJ_0rP0EdwJaZ4ctje2bY7aE',
      linkTo: '/shop/products?category=gear'
    },
    { titleKey: 'featureComfort', imageUrl: 'https://picsum.photos/seed/landing2/800/600', linkTo: '/shop/products?category=comfort' },
    { titleKey: 'featureConnected', imageUrl: 'https://picsum.photos/seed/landing3/800/600', linkTo: '/shop/products?category=electronics' },
    { titleKey: 'featureAdventures', imageUrl: 'https://picsum.photos/seed/landing4/800/600', linkTo: '/shop/travel-agent' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 flex flex-col items-center justify-center pt-10 pb-28">
      <div className="text-center mb-12 px-4">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">TravelStore<span className="text-purple-300">HN</span></h1>
        <p className="text-xl md:text-2xl text-purple-200 max-w-2xl mx-auto">
          {t('pageSubtitle')}
        </p>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map(feature => (
            <FeatureBlock key={feature.titleKey} title={t(feature.titleKey)} imageUrl={feature.imageUrl} linkTo={feature.linkTo} />
          ))}
        </div>
      </div>
      
      <div className="fixed bottom-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-sm p-4 shadow-top z-50">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center text-center sm:text-left">
          <p className="text-purple-700 font-semibold text-lg mb-3 sm:mb-0 sm:mr-6">{t('readyToExplore')}</p>
          <Link to="/shop">
            <Button variant="primary" size="lg" className="px-10 py-3 text-lg shadow-lg hover:shadow-xl transition-shadow">
              {t('shopAndPlan')}
            </Button>
          </Link>
        </div>
      </div>
       <style>{`
        .shadow-top {
          box-shadow: 0 -4px 6px -1px rgba(0, 0, 0, 0.1), 0 -2px 4px -1px rgba(0, 0, 0, 0.06);
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
