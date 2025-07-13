
import React, { useState, useMemo, useEffect } from 'react';
import ProductCard from '../components/product/ProductCard';
import { FunnelIcon, ArrowsUpDownIcon, BeakerIcon } from '@heroicons/react/24/outline';
import { useSettings } from '../contexts/SettingsContext';
import { mockProducts } from '../services/mockData';

const TravelSizeToiletriesPage: React.FC = () => {
  const { language } = useSettings();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');
  const [isFilterBarCollapsed, setIsFilterBarCollapsed] = useState(false);

  // Filter products that are in "Artículos de Tocador" category first
  const toiletryProducts = useMemo(() => {
    return mockProducts.filter(p => p.category === 'Artículos de Tocador');
  }, []);

  const subCategories = useMemo(() => {
    // 1. Get all subCategory values (string | undefined)[]
    // 2. Filter out undefined values using Boolean constructor as a type guard -> string[]
    // 3. Create a Set from the string[] to get unique subcategories -> Set<string>
    const allSubCategories = new Set(toiletryProducts.map(p => p.subCategory).filter(Boolean));
    // 4. Convert Set<string> to string[] and prepend 'all'
    return ['all', ...Array.from(allSubCategories)];
  }, [toiletryProducts]);

  const filteredAndSortedProducts = useMemo(() => {
    let tempProducts = toiletryProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedSubCategory !== 'all') {
      tempProducts = tempProducts.filter(product => product.subCategory === selectedSubCategory);
    }

    switch (sortBy) {
      case 'price-asc':
        tempProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        tempProducts.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        tempProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating-desc':
        tempProducts.sort((a,b) => (b.rating ?? 0) - (a.rating ?? 0));
        break;
      default:
        break;
    }
    return tempProducts;
  }, [toiletryProducts, searchTerm, selectedSubCategory, sortBy]);

  useEffect(() => {
    const handleScroll = () => {
      setIsFilterBarCollapsed(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const t = (key: string) => {
    const translations: Record<string, any> = {
      es: {
        pageTitle: "Artículos de Tocador Tamaño Viaje: Tu Compañero Perfecto",
        pageIntro: "Empacar para un viaje puede ser abrumador, pero los artículos de tocador de tamaño viaje hacen que sea fácil mantenerse fresco y seguro dondequiera que tus aventuras te lleven. Estos pequeños y ligeros esenciales están diseñados para deslizarse fácilmente en tu equipaje de mano, asegurando que estés preparado sin sacrificar espacio o conveniencia. Ya sea que viajes para una escapada de fin de semana o un largo viaje internacional, los artículos de tocador de tamaño viaje de TravelStoreHN están diseñados para que te sientas lo mejor posible mientras simplificas tu proceso de empaque.",
        tsaTitle: "¿Cuáles son los Tamaños Aprobados por la TSA para Artículos de Tocador de Viaje?",
        tsaContent: "La Administración de Seguridad en el Transporte (TSA) establece reglas claras para llevar líquidos, geles y aerosoles en tu equipaje de mano. Todos los artículos de tocador de tamaño viaje deben estar en envases de 3.4 onzas (100 mililitros) o más pequeños. Esto se aplica a esenciales como champú, acondicionador, loción y pasta de dientes. Para vuelos internacionales, las regulaciones pueden variar, por lo que es prudente verificar las pautas específicas para tu destino para asegurar una experiencia de viaje sin problemas.",
        containersTitle: "Envases de Viaje Compactos y Convenientes",
        containersContent: "TravelStoreHN ofrece una gama de envases aptos para viajes para mantener tus artículos de tocador seguros y organizados. Estos envases están diseñados para durabilidad, portabilidad y facilidad de uso, convirtiéndolos en un imprescindible para cualquier viajero. Aquí algunas opciones destacadas:",
        containerType1Title: "Botellas de Plástico Exprimibles:",
        containerType1Desc: "Ligeras y versátiles, son ideales para líquidos como gel de baño o limpiador facial, con tapas seguras para prevenir fugas.",
        containerType2Title: "Tubos de Silicona:",
        containerType2Desc: "Flexibles y ahorradores de espacio, estos envases suaves son perfectos para geles y cremas, y son fáciles de limpiar para reutilizar.",
        containerType3Title: "Estuches Metálicos Compactos:",
        containerType3Desc: "Geniales para artículos sólidos como bálsamos labiales, barras hidratantes o protectores solares en barra, estos estuches resistentes son prácticos y elegantes.",
        containersTip: "Opta por envases con diseños transparentes o superficies etiquetadas para una rápida identificación durante los controles de seguridad del aeropuerto. Para mayor conveniencia, considera un kit de aseo de TravelStoreHN, que incluye una selección curada de envases para optimizar tu empaque.",
        allowedTitle: "¿Qué Artículos de Tocador Puedes Llevar en un Avión?",
        allowedContent: "Entender las regulaciones de la TSA asegura un viaje sin complicaciones. Aquí un desglose de lo permitido en tu equipaje de mano:",
        allowedLiquids: "Líquidos, Geles y Aerosoles: Deben ser de 3.4 onzas o menos y empacados en una sola bolsa de plástico transparente de tamaño cuarto de galón.",
        allowedSolids: "Productos Sólidos: Artículos como desodorantes sólidos, maquillaje en polvo o jabones en barra no tienen restricciones de tamaño, siempre que no sean peligrosos.",
        allowedMeds: "Medicamentos: Medicamentos esenciales con receta o de venta libre pueden exceder el límite de 3.4 onzas si es necesario, pero mantenlos en su empaque original e informa a seguridad durante la revisión.",
        allowedPersonal: "Artículos de Cuidado Personal: Cepillos de dientes, rastrillos desechables, peines y pequeñas herramientas de aseo como cortaúñas están permitidos sin restricciones.",
        tsaWebsiteTip: "Mantente actualizado visitando el sitio web de la TSA para las últimas directrices, ya que las regulaciones pueden evolucionar.",
        whyChooseTitle: "¿Por Qué Elegir los Artículos de Tocador Tamaño Viaje de TravelStoreHN?",
        whyChooseContent: "Los artículos de tocador y envases de tamaño viaje de TravelStoreHN son tu clave para un viaje organizado y sin estrés. Ahorran espacio en el equipaje, cumplen con las reglas de las aerolíneas y mantienen tus esenciales seguros. Ya sea que explores un paraíso tropical o navegues por un concurrido centro urbano, nuestros productos cuidadosamente diseñados aseguran que estés listo para cualquier cosa. Empaca inteligentemente, viaja ligero y disfruta tu viaje con TravelStoreHN.",
        exploreMore: "Explora Más: ¡Descubre nuestra gama de productos de cuidado de la piel, cabello y cuidado personal de tamaño viaje para elevar tu experiencia de viaje!",
        searchLabel: "Buscar Artículos de Tocador",
        searchPlaceholder: "Ej., Champú, Protector Solar",
        subCategoryLabel: "Subcategoría",
        allSubCategories: "Todas las Subcategorías",
        sortByLabel: "Ordenar Por",
        defaultSort: "Por Defecto",
        priceAsc: "Precio: Menor a Mayor",
        priceDesc: "Precio: Mayor a Menor",
        nameAsc: "Nombre: A a Z",
        ratingDesc: "Calificación: Mayor a Menor",
        noProductsFound: "No se encontraron productos de tocador",
        noProductsAdvice: "Intenta ajustar tu búsqueda o filtros.",
      },
      en: {
        pageTitle: "Travel Size Toiletries: Your Perfect Travel Companion",
        pageIntro: "Packing for a trip can feel overwhelming, but travel-sized toiletries make it effortless to stay refreshed and confident wherever your adventures take you. These small, lightweight essentials are crafted to slip easily into your carry-on, ensuring you’re prepared without sacrificing space or convenience. Whether you’re jetting off for a weekend getaway or a long-haul international journey, TravelStoreHN’s travel-sized toiletries are designed to keep you feeling your best while simplifying your packing process.",
        tsaTitle: "What Are TSA-Approved Sizes for Travel Toiletries?",
        tsaContent: "The Transportation Security Administration (TSA) sets clear rules for carrying liquids, gels, and aerosols in your hand luggage. All travel-sized toiletries must be in containers of 3.4 ounces (100 milliliters) or smaller. This applies to essentials like shampoo, conditioner, lotion, and toothpaste. For international flights, regulations may vary, so it’s wise to check the specific guidelines for your destination to ensure a smooth travel experience.",
        containersTitle: "Compact and Convenient Travel Containers",
        containersContent: "TravelStoreHN offers a range of travel-friendly containers to keep your toiletries secure and organized. These containers are designed for durability, portability, and ease of use, making them a must-have for any traveler. Here are some top choices:",
        containerType1Title: "Plastic Squeeze Bottles:",
        containerType1Desc: "Lightweight and versatile, these are ideal for liquids like body wash or facial cleanser, with secure caps to prevent leaks.",
        containerType2Title: "Silicone Tubes:",
        containerType2Desc: "Flexible and space-saving, these soft containers are perfect for gels and creams, and they’re easy to clean for reuse.",
        containerType3Title: "Compact Metal Cases:",
        containerType3Desc: "Great for solid items like lip balms, moisturizing bars, or sunscreen sticks, these sturdy cases are both practical and stylish.",
        containersTip: "Opt for containers with clear designs or labeled surfaces for quick identification during airport security checks. For added convenience, consider a TravelStoreHN toiletry kit, which includes a curated selection of containers to streamline your packing.",
        allowedTitle: "What Toiletries Can You Bring on a Plane?",
        allowedContent: "Understanding TSA regulations ensures hassle-free travel. Here’s a breakdown of what’s allowed in your carry-on:",
        allowedLiquids: "Liquids, Gels, and Aerosols: Must be 3.4 ounces or less and packed in a single, quart-sized, transparent plastic bag.",
        allowedSolids: "Solid Products: Items like solid deodorants, powder makeup, or bar soaps face no size restrictions, as long as they’re non-hazardous.",
        allowedMeds: "Medications: Essential prescription or over-the-counter medications can exceed the 3.4-ounce limit if needed, but keep them in original packaging and inform security during screening.",
        allowedPersonal: "Personal Care Items: Toothbrushes, disposable razors, combs, and small grooming tools like nail clippers are permitted without restrictions.",
        tsaWebsiteTip: "Stay updated by visiting the TSA website for the latest guidelines, as regulations can evolve.",
        whyChooseTitle: "Why Choose TravelStoreHN Travel Size Toiletries?",
        whyChooseContent: "TravelStoreHN’s travel-sized toiletries and containers are your key to a stress-free, organized trip. They save luggage space, comply with airline rules, and keep your essentials secure. Whether you’re exploring a tropical paradise or navigating a busy urban hub, our thoughtfully designed products ensure you’re ready for anything. Pack smart, travel light, and enjoy your journey with TravelStoreHN.",
        exploreMore: "Explore More: Discover our range of travel-sized skincare, haircare, and personal care products to elevate your travel experience!",
        searchLabel: "Search Toiletries",
        searchPlaceholder: "e.g., Shampoo, Sunscreen",
        subCategoryLabel: "Sub-Category",
        allSubCategories: "All Sub-Categories",
        sortByLabel: "Sort By",
        defaultSort: "Default",
        priceAsc: "Price: Low to High",
        priceDesc: "Price: High to Low",
        nameAsc: "Name: A to Z",
        ratingDesc: "Rating: High to Low",
        noProductsFound: "No toiletry products found",
        noProductsAdvice: "Try adjusting your search or filters.",
      }
    };
    return translations[language]?.[key] || translations['en'][key];
  };

  const InfoSection: React.FC<{titleKey: string, contentKey: string, children?: React.ReactNode}> = ({ titleKey, contentKey, children }) => (
    <div className="bg-white p-6 rounded-xl shadow-md mb-8">
      <h2 className="text-2xl font-semibold text-purple-700 mb-3">{t(titleKey)}</h2>
      <div className="prose prose-sm sm:prose-base max-w-none text-gray-700 space-y-3">
        <p>{t(contentKey)}</p>
        {children}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <header className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-10 rounded-xl shadow-xl text-center">
        <BeakerIcon className="h-16 w-16 mx-auto mb-4" />
        <h1 className="text-4xl font-bold">{t('pageTitle')}</h1>
        <p className="text-lg mt-2 max-w-2xl mx-auto">{t('pageIntro')}</p>
      </header>

      {/* Product Filters and Listing */}
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow">
        <div className={`grid grid-cols-1 ${isFilterBarCollapsed ? 'md:grid-cols-1' : 'md:grid-cols-3'} gap-4 items-end`}>
          <div className={`${isFilterBarCollapsed ? 'md:col-span-1' : 'md:col-span-1'}`}>
            <label htmlFor="search-toiletries" className="block text-sm font-medium text-gray-700 mb-1">{t('searchLabel')}</label>
            <input
              type="text"
              id="search-toiletries"
              placeholder={t('searchPlaceholder')}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className={isFilterBarCollapsed ? 'hidden' : ''}>
            <label htmlFor="subcategory-toiletries" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FunnelIcon className="h-5 w-5 mr-1 text-gray-500"/> {t('subCategoryLabel')}
            </label>
            <select
              id="subcategory-toiletries"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 bg-white capitalize"
              value={selectedSubCategory}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
            >
              {subCategories.map(sc => (
                <option key={sc} value={sc} className="capitalize">{sc === 'all' ? t('allSubCategories') : sc}</option>
              ))}
            </select>
          </div>

          <div className={isFilterBarCollapsed ? 'hidden' : ''}>
            <label htmlFor="sort-toiletries" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <ArrowsUpDownIcon className="h-5 w-5 mr-1 text-gray-500" /> {t('sortByLabel')}
            </label>
            <select
              id="sort-toiletries"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 bg-white"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">{t('defaultSort')}</option>
              <option value="price-asc">{t('priceAsc')}</option>
              <option value="price-desc">{t('priceDesc')}</option>
              <option value="name-asc">{t('nameAsc')}</option>
              <option value="rating-desc">{t('ratingDesc')}</option>
            </select>
          </div>
        </div>
      </div>

      {filteredAndSortedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredAndSortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white p-6 rounded-xl shadow">
          <BeakerIcon className="h-20 w-20 text-gray-400 mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-700">{t('noProductsFound')}</h3>
          <p className="text-gray-500">{t('noProductsAdvice')}</p>
        </div>
      )}

      {/* Informational Content Sections */}
      <InfoSection titleKey="tsaTitle" contentKey="tsaContent" />
      
      <InfoSection titleKey="containersTitle" contentKey="containersContent">
        <ul className="list-disc list-inside space-y-2 mt-2">
          <li><strong>{t('containerType1Title')}</strong> {t('containerType1Desc')}</li>
          <li><strong>{t('containerType2Title')}</strong> {t('containerType2Desc')}</li>
          <li><strong>{t('containerType3Title')}</strong> {t('containerType3Desc')}</li>
        </ul>
        <p className="mt-2">{t('containersTip')}</p>
      </InfoSection>

      <InfoSection titleKey="allowedTitle" contentKey="allowedContent">
         <ul className="list-disc list-inside space-y-2 mt-2">
          <li>{t('allowedLiquids')}</li>
          <li>{t('allowedSolids')}</li>
          <li>{t('allowedMeds')}</li>
          <li>{t('allowedPersonal')}</li>
        </ul>
        <p className="mt-2">{t('tsaWebsiteTip')}</p>
      </InfoSection>

      <InfoSection titleKey="whyChooseTitle" contentKey="whyChooseContent" />

      <div className="text-center py-8 bg-purple-50 p-6 rounded-xl shadow-md">
        <p className="text-lg text-purple-800 font-semibold">{t('exploreMore')}</p>
        {/* You can add a button here if you want to link to a specific sub-category or all products */}
      </div>
    </div>
  );
};

export default TravelSizeToiletriesPage;