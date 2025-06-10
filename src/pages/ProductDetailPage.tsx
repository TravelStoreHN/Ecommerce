
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import Button from '../components/ui/Button';
import ProductCard from '../components/product/ProductCard';
import { ArrowLeftIcon, ChatBubbleOvalLeftEllipsisIcon, StarIcon, ShoppingBagIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline'; // Added MinusIcon, PlusIcon
import { useSettings } from '../contexts/SettingsContext';
import { formatCurrency } from '../utils/localization';
import { useCart } from '../contexts/CartContext';
import { useNotification } from '../contexts/NotificationContext';

interface ProductDetailPageProps {
  products: Product[];
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ products }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, currency } = useSettings();
  const { cartItems, addItemToCart, increaseItemQuantity, decreaseItemQuantity } = useCart(); // Added cartItems, increase/decrease
  const { showNotification } = useNotification();
  
  const product = products.find(p => p.id === id);
  const cartItem = product ? cartItems.find(item => item.id === product.id) : undefined;

  const relatedProducts = product
    ? products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
    : [];

  const translations = {
    es: {
      productNotFound: 'Producto no encontrado',
      backToProducts: 'Volver a Productos',
      askAIAbout: 'Preguntar a la IA sobre este producto',
      addToCart: 'Añadir al Carrito',
      addToCartSuccess: (productName: string) => `${productName} añadido al carrito exitosamente!`,
      reviews: 'reseñas',
      keyFeatures: 'Características Clave:',
      youMightAlsoLike: 'También te podría gustar',
      noRelatedFoundInCategory: 'No se encontraron otros productos en esta categoría en este momento.',
      back: 'Volver',
      aiAlert: (productName: string) => `La asistencia de IA para "${productName}" se abriría en la ventana de chat.`,
      inCartSuffix: 'en carrito',
      decreaseQuantity: 'Disminuir cantidad de {productName}',
      increaseQuantity: 'Aumentar cantidad de {productName}',
    },
    en: {
      productNotFound: 'Product not found',
      backToProducts: 'Back to Products',
      askAIAbout: 'Ask AI About This Product',
      addToCart: 'Add to Cart',
      addToCartSuccess: (productName: string) => `${productName} successfully added to cart!`,
      reviews: 'reviews',
      keyFeatures: 'Key Features:',
      youMightAlsoLike: 'You Might Also Like',
      noRelatedFoundInCategory: 'No other products found in this category right now.',
      back: 'Back',
      aiAlert: (productName: string) => `AI assistance for "${productName}" would open in the chat window.`,
      inCartSuffix: 'in cart',
      decreaseQuantity: 'Decrease quantity of {productName}',
      increaseQuantity: 'Increase quantity of {productName}',
    }
  };

  const t = (key: keyof typeof translations['en'], data?: { productName?: string } | string) => {
    const selectedTranslations = language === 'es' ? translations.es : translations.en;
    const translationEntry = selectedTranslations[key as keyof typeof selectedTranslations];

    if (typeof translationEntry === 'function') {
      return (translationEntry as (productName: string) => string)(typeof data === 'string' ? data : (data as {productName: string})?.productName || '');
    }
    
    let text = translationEntry as string;
    const productNameVal = typeof data === 'object' ? data?.productName : undefined;

    if (productNameVal && text && text.includes('{productName}')) {
      text = text.replace('{productName}', productNameVal);
    }
    return text || key.toString();
  };


  if (!product) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold text-gray-700">{t('productNotFound')}</h2>
        <Link to="/shop/products" className="text-purple-600 hover:underline mt-4 inline-block">
          {t('backToProducts')}
        </Link>
      </div>
    );
  }
  
  const handleInitialAddToCart = () => {
    addItemToCart(product);
    showNotification(t('addToCartSuccess', product.name), 'success');
  };

  const handleAskAI = () => {
    console.log(`Ask AI about: ${product.name}`);
    alert(t('aiAlert', product.name));
  };

  const renderStars = (rating?: number) => {
    if (typeof rating !== 'number' || rating < 0 || rating > 5) return null;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0; 
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <StarIcon key={`full-${i}`} className="h-6 w-6 text-yellow-400 fill-yellow-400" />
        ))}
        {halfStar && <StarIcon key="half" className="h-6 w-6 text-yellow-400 fill-yellow-400 opacity-60" />} 
        {[...Array(emptyStars)].map((_, i) => (
          <StarIcon key={`empty-${i}`} className="h-6 w-6 text-gray-300" />
        ))}
      </div>
    );
  };
  
  const isOnSale = product.isSale && product.originalPrice && product.originalPrice > product.price;

  return (
    <div className="bg-white p-6 md:p-8 rounded-xl shadow-xl">
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => navigate(-1)} 
        className="mb-6 text-purple-600 hover:bg-purple-100"
        leftIcon={<ArrowLeftIcon className="h-5 w-5"/>}
      >
        {t('back')}
      </Button>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        <div className="relative aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg shadow-md">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
           {isOnSale && (
             <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2.5 py-1.5 rounded-md shadow">
                OFERTA
            </div>
          )}
        </div>

        <div className="flex flex-col">
          <p className="text-sm font-medium text-purple-600 uppercase tracking-wider">{product.category}</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mt-1 mb-3">{product.name}</h1>
          
          {product.rating !== undefined && product.reviews !== undefined && (
            <div className="mb-4 flex items-center space-x-2">
              {renderStars(product.rating)}
              <span className="text-sm text-gray-600">({product.reviews} {t('reviews')})</span>
            </div>
          )}

          <div className="flex items-baseline gap-2 mb-6">
             <p className={`text-3xl font-bold ${isOnSale ? 'text-red-600' : 'text-purple-700'}`}>
                {formatCurrency(product.price, currency)}
             </p>
             {isOnSale && (
                <p className="text-lg text-gray-500 line-through">
                    {formatCurrency(product.originalPrice!, currency)}
                </p>
             )}
          </div>
          
          <div className="prose prose-sm sm:prose-base text-gray-600 mb-6">
            <p>{product.description}</p>
            {product.details && product.details.length > 0 && (
              <>
                <h4 className="font-semibold mt-4 mb-1 text-gray-700">{t('keyFeatures')}</h4>
                <ul className="list-disc list-inside space-y-1">
                  {product.details.map((detail, index) => (
                    <li key={index}>{detail}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          <div className="mt-auto space-y-3">
            {cartItem && cartItem.quantity > 0 ? (
              <div className="flex items-center justify-between w-full bg-purple-100 p-2 rounded-lg">
                <Button 
                  variant="secondary" 
                  size="md" 
                  onClick={() => decreaseItemQuantity(product.id)}
                  aria-label={t('decreaseQuantity', { productName: product.name })}
                  className="!px-4 !py-3 text-purple-700 hover:bg-purple-200"
                >
                  <MinusIcon className="h-5 w-5" />
                </Button>
                <span className="font-semibold text-purple-700 text-lg tabular-nums px-3" aria-live="polite">
                  {cartItem.quantity} <span className="text-sm">{t('inCartSuffix')}</span>
                </span>
                <Button 
                  variant="secondary" 
                  size="md" 
                  onClick={() => increaseItemQuantity(product.id)}
                  aria-label={t('increaseQuantity', { productName: product.name })}
                  className="!px-4 !py-3 text-purple-700 hover:bg-purple-200"
                >
                  <PlusIcon className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button 
                variant="primary" 
                size="lg" 
                className="w-full text-base"
                onClick={handleInitialAddToCart}
                leftIcon={<ShoppingBagIcon className="h-5 w-5" />}
              >
                {t('addToCart')}
              </Button>
            )}
            <Button
              variant="secondary"
              size="lg"
              className="w-full text-base"
              onClick={handleAskAI}
              leftIcon={<ChatBubbleOvalLeftEllipsisIcon className="h-5 w-5" />}
            >
              {t('askAIAbout')}
            </Button>
          </div>
        </div>
      </div>
      
      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-2xl font-semibold text-gray-700 mb-6">{t('youMightAlsoLike')}</h3>
        {relatedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(relatedProduct => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">{t('noRelatedFoundInCategory')}</p>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
