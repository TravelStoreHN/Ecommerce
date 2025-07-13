
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import Card from '../ui/Card';
import Button from '../ui/Button';
import { BuyNowButton } from '../checkout/BuyNowButton';
import { StarIcon as StarIconSolid } from '@heroicons/react/20/solid'; // Renamed to avoid conflict
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'; // Added
import { useSettings } from '../../contexts/SettingsContext';
import { formatCurrency } from '../../utils/localization';
import { useCart } from '../../contexts/CartContext';
import { useNotification } from '../../contexts/NotificationContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { language, currency } = useSettings();
  const { cartItems, addItemToCart, increaseItemQuantity, decreaseItemQuantity } = useCart();
  const { showNotification } = useNotification();

  const cartItem = cartItems.find(item => item.id === product.id);

  const translations = {
    es: {
      addToCart: 'Añadir al Carrito',
      reviews: 'reseñas',
      addToCartSuccess: '{productName} añadido al carrito exitosamente!',
      inCartSuffix: 'en carrito',
      decreaseQuantity: 'Disminuir cantidad de {productName}',
      increaseQuantity: 'Aumentar cantidad de {productName}',
    },
    en: {
      addToCart: 'Add to Cart',
      reviews: 'reviews',
      addToCartSuccess: '{productName} successfully added to cart!',
      inCartSuffix: 'in cart',
      decreaseQuantity: 'Decrease quantity of {productName}',
      increaseQuantity: 'Increase quantity of {productName}',
    }
  };

  const t = (key: keyof typeof translations['en'], data?: { productName?: string }) => {
    let text = language === 'es' ? translations.es[key as keyof typeof translations.es] : translations.en[key as keyof typeof translations.en];
    if (data?.productName && text && typeof text === 'string') {
      text = text.replace('{productName}', data.productName);
    }
    return text || key;
  };

  const handleInitialAddToCart = () => {
    addItemToCart(product);
    showNotification(t('addToCartSuccess', { productName: product.name }), 'success');
  };

  const renderStars = (rating?: number) => {
    if (typeof rating !== 'number' || rating < 0 || rating > 5) return null;
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0; 
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return (
      <div className="flex items-center">
        {[...Array(fullStars)].map((_, i) => (
          <StarIconSolid key={`full-${i}`} className="h-5 w-5 text-yellow-400" />
        ))}
        {halfStar && <StarIconSolid key="half" className="h-5 w-5 text-yellow-400 opacity-60" />} 
        {[...Array(emptyStars)].map((_, i) => (
          <StarIconSolid key={`empty-${i}`} className="h-5 w-5 text-gray-300" />
        ))}
      </div>
    );
  };

  const isOnSale = product.isSale && product.originalPrice && product.originalPrice > product.price;

  return (
    <Card className="flex flex-col h-full group">
      <Link to={`/shop/product/${product.id}`} className="block relative">
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.name} 
            className="w-full h-full object-cover object-center group-hover:opacity-75 transition-opacity duration-300"
          />
        </div>
        {isOnSale && (
             <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
                OFERTA
            </div>
        )}
      </Link>
      <div className="p-4 flex flex-col flex-grow">
        <Link to={`/shop/product/${product.id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600 transition-colors truncate h-14 flex items-center">{product.name}</h3>
        </Link>
        <p className="text-sm text-gray-500 mt-1">{product.category}</p>
        
        {product.rating !== undefined && product.reviews !== undefined && (
          <div className="mt-2 flex items-center">
            {renderStars(product.rating)}
            <span className="ml-2 text-xs text-gray-500">({product.reviews} {t('reviews')})</span>
          </div>
        )}

        <div className="mt-3 flex-grow flex items-end">
          <div className="flex items-baseline gap-2">
            <p className={`text-xl font-bold ${isOnSale ? 'text-red-600' : 'text-purple-700'}`}>
              {formatCurrency(product.price, currency)}
            </p>
            {isOnSale && (
              <p className="text-sm text-gray-500 line-through">
                {formatCurrency(product.originalPrice!, currency)}
              </p>
            )}
          </div>
        </div>
        
        <div className="mt-4 space-y-2">
          {cartItem && cartItem.quantity > 0 ? (
            <div className="flex items-center justify-between w-full bg-purple-50 p-1 rounded-lg">
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => decreaseItemQuantity(product.id)}
                aria-label={t('decreaseQuantity', { productName: product.name })}
                className="px-3 !py-2 text-purple-700 hover:bg-purple-200"
              >
                <MinusIcon className="h-4 w-4" />
              </Button>
              <span className="font-semibold text-purple-700 text-sm tabular-nums px-2" aria-live="polite">
                {cartItem.quantity} <span className="text-xs">{t('inCartSuffix')}</span>
              </span>
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => increaseItemQuantity(product.id)}
                aria-label={t('increaseQuantity', { productName: product.name })}
                className="px-3 !py-2 text-purple-700 hover:bg-purple-200"
              >
                <PlusIcon className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button 
              variant="primary" 
              size="md" 
              className="w-full"
              onClick={handleInitialAddToCart}
            >
              {t('addToCart')}
            </Button>
          )}
          
          {/* Buy Now Button - Always show */}
          <BuyNowButton
            product={{
              id: product.id,
              name: product.name,
              price: formatCurrency(product.price, currency),
              imageUrl: product.imageUrl,
              category: product.category
            }}
            size="sm"
            className="w-full"
            showAddToCart={false} // Don't show add to cart since ProductCard handles it
          />
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
