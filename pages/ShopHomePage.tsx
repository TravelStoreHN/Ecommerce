
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import ProductCard from '../components/product/ProductCard';
import Button from '../components/ui/Button';
import { mockProducts } from '../services/mockData';
import { SparklesIcon, BookOpenIcon, MapPinIcon, TagIcon, CubeTransparentIcon, WifiIcon, BeakerIcon } from '@heroicons/react/24/outline'; // Added BeakerIcon
import { useSettings } from '../contexts/SettingsContext';

const ShopHomePage: React.FC = () => {
  const { language } = useSettings();
  const featuredProducts: Product[] = mockProducts.filter(p => !p.isSale).slice(0, 4);

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      es: {
        welcome: "Bienvenido a TravelStoreHN",
        heroSubtitle: "Descubre esenciales de viaje premium y obtén planes de viaje personalizados para Honduras con nuestro asistente IA.",
        shopAllProducts: "Comprar Todos los Productos",
        planYourTrip: "Planifica Tu Viaje",
        salesBannerTitle: "🎉 ¡No Te Pierdas Nuestras Súper Ofertas! 🎉",
        salesBannerSubtitle: "Ahorra en grande en esenciales de viaje seleccionados. ¡Tiempo limitado!",
        salesBannerButton: "Comprar Ofertas Ahora",
        featuredEssentials: "Esenciales Destacados",
        viewAll: "Ver Todos",
        aiTravelAgent: "Agente de Viajes IA",
        aiDescription: "Obtén recomendaciones personalizadas para tu viaje a Honduras. Desde itinerarios hasta joyas locales, nuestra IA está para ayudarte.",
        askOurAI: "Pregunta a Nuestra IA",
        travelBlog: "Blog de Viajes",
        blogDescription: "Lee nuestros últimos artículos para consejos de viaje, guías de destinos y recomendaciones de equipaje.",
        readBlog: "Leer Blog",
        exploreHonduras: "Explora Honduras",
        exploreDescription: "Descubre la belleza de Honduras. Nos especializamos en experiencias locales y tesoros escondidos.",
        discoverMore: "Descubre Más",
        travelKitsTitle: "Kits de Viaje Listos",
        travelKitsDescription: "Paquetes completos para tus aventuras. ¡Ahorra tiempo y dinero!",
        viewKits: "Ver Kits",
        eSimsTitle: "E-Sims Internacionales",
        eSimsDescription: "Mantente conectado en cualquier parte del mundo sin cambiar tu SIM física. ¡Próximamente!",
        travelSizeTitle: "Artículos de Tocador Tamaño Viaje",
        travelSizeDescription: "Perfectos para tu equipaje de mano. Mantente fresco y cumple con las normas TSA.",
        viewTravelSize: "Ver Tamaños de Viaje",
        learnMore: "Más Información",
      },
      en: {
        welcome: "Welcome to TravelStoreHN",
        heroSubtitle: "Discover premium travel essentials and get personalized Honduras travel plans powered by our AI assistant.",
        shopAllProducts: "Shop All Products",
        planYourTrip: "Plan Your Trip",
        salesBannerTitle: "🎉 Don't Miss Our Hot Deals! 🎉",
        salesBannerSubtitle: "Save big on select travel essentials. Limited time only!",
        salesBannerButton: "Shop Sales Now",
        featuredEssentials: "Featured Essentials",
        viewAll: "View All",
        aiTravelAgent: "AI Travel Agent",
        aiDescription: "Get personalized recommendations for your Honduras trip. From itineraries to local gems, our AI is here to help.",
        askOurAI: "Ask Our AI",
        travelBlog: "Travel Blog",
        blogDescription: "Read our latest articles for travel tips, destination guides, and packing advice.",
        readBlog: "Read Blog",
        exploreHonduras: "Explore Honduras",
        exploreDescription: "Discover the beauty of Honduras. We specialize in local experiences and hidden treasures.",
        discoverMore: "Discover More",
        travelKitsTitle: "Ready-Made Travel Kits",
        travelKitsDescription: "Complete packages for your adventures. Save time and money!",
        viewKits: "View Kits",
        eSimsTitle: "International E-Sims",
        eSimsDescription: "Stay connected anywhere in the world without changing your physical SIM. Coming soon!",
        travelSizeTitle: "Travel Size Toiletries",
        travelSizeDescription: "Perfect for your carry-on. Stay fresh and TSA-compliant.",
        viewTravelSize: "View Travel Sizes",
        learnMore: "Learn More",
      }
    };
    return translations[language]?.[key] || translations['en'][key];
  };

  return (
    <div className="space-y-12">
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20 px-4 rounded-xl shadow-xl">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('welcome')}</h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            {t('heroSubtitle')}
          </p>
          <div className="space-x-4">
            <Link to="/shop/products">
              <Button variant="secondary" size="lg" className="bg-white text-purple-700 hover:bg-gray-100">{t('shopAllProducts')}</Button>
            </Link>
            <Link to="/shop/travel-agent">
              <Button variant="ghost" size="lg" className="text-white border-2 border-white bg-black/10 hover:bg-purple-700 hover:border-white">{t('planYourTrip')}</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-orange-500 to-red-500 text-white py-12 px-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="container mx-auto text-center flex flex-col md:flex-row items-center justify-between">
          <div className="md:text-left mb-6 md:mb-0">
            <div className="flex items-center justify-center md:justify-start mb-2">
              <TagIcon className="h-10 w-10 mr-3" />
              <h2 className="text-3xl font-bold">{t('salesBannerTitle')}</h2>
            </div>
            <p className="text-lg">{t('salesBannerSubtitle')}</p>
          </div>
          <Link to="/shop/sales">
            <Button 
              variant="secondary" 
              size="lg" 
              className="bg-white text-red-600 hover:bg-gray-100 font-semibold px-8 py-3"
            >
              {t('salesBannerButton')}
            </Button>
          </Link>
        </div>
      </section>


      <section>
        <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-800">{t('featuredEssentials')}</h2>
            <Link to="/shop/products">
                 <Button variant="ghost" size="md">{t('viewAll')}</Button>
            </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-purple-200/50 transition-shadow">
          <SparklesIcon className="h-12 w-12 text-purple-600 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">{t('aiTravelAgent')}</h3>
          <p className="text-gray-600 mb-4 text-sm">
            {t('aiDescription')}
          </p>
          <Link to="/shop/travel-agent">
            <Button variant="primary" size="md">{t('askOurAI')}</Button>
          </Link>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-purple-200/50 transition-shadow">
          <BookOpenIcon className="h-12 w-12 text-purple-600 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">{t('travelBlog')}</h3>
          <p className="text-gray-600 mb-4 text-sm">
            {t('blogDescription')}
          </p>
          <Link to="/shop/blog">
            <Button variant="primary" size="md">{t('readBlog')}</Button>
          </Link>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-purple-200/50 transition-shadow">
          <CubeTransparentIcon className="h-12 w-12 text-purple-600 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">{t('travelKitsTitle')}</h3>
          <p className="text-gray-600 mb-4 text-sm">
            {t('travelKitsDescription')}
          </p>
          <Link to="/shop/kits">
             <Button variant="primary" size="md">{t('viewKits')}</Button>
          </Link>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-purple-200/50 transition-shadow">
          <WifiIcon className="h-12 w-12 text-purple-600 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">{t('eSimsTitle')}</h3>
          <p className="text-gray-600 mb-4 text-sm">
            {t('eSimsDescription')}
          </p>
          <Link to="/shop/esim">
             <Button variant="primary" size="md">{t('learnMore')}</Button>
          </Link>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-purple-200/50 transition-shadow">
          <BeakerIcon className="h-12 w-12 text-purple-600 mb-4" />
          <h3 className="text-2xl font-semibold text-gray-800 mb-2">{t('travelSizeTitle')}</h3>
          <p className="text-gray-600 mb-4 text-sm">
            {t('travelSizeDescription')}
          </p>
          <Link to="/shop/travel-size-toiletries">
             <Button variant="primary" size="md">{t('viewTravelSize')}</Button>
          </Link>
        </div>

      </section>
    </div>
  );
};

export default ShopHomePage;
