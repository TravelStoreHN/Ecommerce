import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useCart } from '../../contexts/CartContext';
import { createCheckoutSession } from '../../services/stripeService';
import Button from '../ui/Button';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';

interface BuyNowButtonProps {
  product: {
    id: string;
    name: string;
    price: string;
    imageUrl: string;
    category?: string;
  };
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const BuyNowButton: React.FC<BuyNowButtonProps> = ({ 
  product, 
  className = '',
  size = 'md'
}) => {
  const { isAuthenticated, loginWithRedirect, user, getAccessTokenSilently } = useAuth0();
  const { addItemToCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      loginWithRedirect({
        appState: { returnTo: window.location.pathname }
      });
      return;
    }

    setIsLoading(true);

    try {
      // Get access token with Stripe customer ID
      const accessToken = await getAccessTokenSilently();

      // Create checkout session for single item
      const { url } = await createCheckoutSession({
        items: [{
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          category: product.category,
          quantity: 1
        }],
        customerEmail: user?.email,
        userId: user?.sub,
      }, accessToken);

      // Redirect to Stripe Checkout
      window.location.href = url;

    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Error al procesar el pago. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = () => {
    addItemToCart({
      id: product.id,
      name: product.name,
      price: parseFloat(product.price.replace('L.', '')),
      imageUrl: product.imageUrl,
      category: product.category || 'Travel Product',
      rating: 0,
      reviews: 0,
      description: 'Travel product'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col gap-2">
        <Button
          onClick={handleBuyNow}
          variant="primary"
          size={size}
          className={className}
          disabled={isLoading}
        >
          {isLoading ? 'Cargando...' : 'Iniciar Sesión para Comprar'}
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={handleBuyNow}
        variant="primary"
        size={size}
        className={className}
        disabled={isLoading}
      >
        {isLoading ? 'Procesando...' : 'Comprar Ahora'}
      </Button>
      
      <Button
        onClick={handleAddToCart}
        variant="secondary"
        size={size}
        className={`${className} flex items-center justify-center gap-2`}
      >
        <ShoppingCartIcon className="h-4 w-4" />
        Agregar al Carrito
      </Button>
    </div>
  );
};
