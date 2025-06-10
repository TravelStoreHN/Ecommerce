
import React, { useState, useMemo, useEffect } from 'react';
import { Product } from '../types';
import ProductCard from '../components/product/ProductCard';
import { FunnelIcon, ArrowsUpDownIcon } from '@heroicons/react/24/outline';
import { useSettings } from '../contexts/SettingsContext';

interface ProductsPageProps {
  products: Product[];
}

const ProductsPage: React.FC<ProductsPageProps> = ({ products }) => {
  const { language } = useSettings();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('default');
  const [isFilterBarCollapsed, setIsFilterBarCollapsed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsFilterBarCollapsed(true);
      } else {
        setIsFilterBarCollapsed(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = useMemo(() => {
    const allCategories = new Set(products.map(p => p.category));
    return ['all', ...Array.from(allCategories)];
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let tempProducts = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedCategory !== 'all') {
      tempProducts = tempProducts.filter(product => product.category === selectedCategory);
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
        // No default sorting change needed here as it's the original order
        break;
    }
    return tempProducts;
  }, [products, searchTerm, selectedCategory, sortBy]);

  const t = (key: string) => {
    const translations: Record<string, Record<string, string>> = {
      es: {
        title: "Nuestros Esenciales de Viaje",
        subtitle: "Encuentra todo lo que necesitas para tu próxima aventura.",
        searchLabel: "Buscar Productos",
        searchPlaceholder: "Ej., Mochila, Botella de Agua",
        categoryLabel: "Categoría",
        allCategories: "Todas las Categorías",
        sortByLabel: "Ordenar Por",
        defaultSort: "Por Defecto",
        priceAsc: "Precio: Menor a Mayor",
        priceDesc: "Precio: Mayor a Menor",
        nameAsc: "Nombre: A a Z",
        ratingDesc: "Calificación: Mayor a Menor",
        noProductsFound: "No se encontraron productos",
        noProductsAdvice: "Intenta ajustar tu búsqueda o filtros.",
      },
      en: {
        title: "Our Travel Essentials",
        subtitle: "Find everything you need for your next adventure.",
        searchLabel: "Search Products",
        searchPlaceholder: "e.g., Backpack, Water Bottle",
        categoryLabel: "Category",
        allCategories: "All Categories",
        sortByLabel: "Sort By",
        defaultSort: "Default",
        priceAsc: "Price: Low to High",
        priceDesc: "Price: High to Low",
        nameAsc: "Name: A to Z",
        ratingDesc: "Rating: High to Low",
        noProductsFound: "No products found",
        noProductsAdvice: "Try adjusting your search or filters.",
      }
    };
    return translations[language]?.[key] || translations['en'][key];
  };


  return (
    <div className="space-y-8">
      <header className="bg-white p-6 rounded-xl shadow">
        <h1 className="text-4xl font-bold text-purple-700 mb-2">{t('title')}</h1>
        <p className="text-gray-600">{t('subtitle')}</p>
      </header>
      
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow sticky top-20 z-30">
        <div className={`grid grid-cols-1 ${isFilterBarCollapsed ? 'md:grid-cols-1' : 'md:grid-cols-3'} gap-4 items-end`}>
          {/* Search Input Div */}
          <div className={`${isFilterBarCollapsed ? 'md:col-span-1' : 'md:col-span-1'}`}>
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">{t('searchLabel')}</label>
            <input
              type="text"
              id="search"
              placeholder={t('searchPlaceholder')}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Category Select Div */}
          <div className={isFilterBarCollapsed ? 'hidden' : ''}>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <FunnelIcon className="h-5 w-5 mr-1 text-gray-500"/> {t('categoryLabel')}
            </label>
            <select
              id="category"
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500 bg-white"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category} className="capitalize">{category === 'all' ? t('allCategories') : category}</option>
              ))}
            </select>
          </div>

          {/* Sort By Select Div */}
          <div className={isFilterBarCollapsed ? 'hidden' : ''}>
            <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
              <ArrowsUpDownIcon className="h-5 w-5 mr-1 text-gray-500" /> {t('sortByLabel')}
            </label>
            <select
              id="sort"
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
        <div className="text-center py-12">
          <img src="https://picsum.photos/seed/noresult/300/300" alt={t('noProductsFound')} className="mx-auto mb-4 rounded-lg opacity-70" />
          <h3 className="text-2xl font-semibold text-gray-700">{t('noProductsFound')}</h3>
          <p className="text-gray-500">{t('noProductsAdvice')}</p>
        </div>
      )}
    </div>
  );
};

export default ProductsPage;
