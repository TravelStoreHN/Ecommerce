import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useCart } from '../contexts/CartContext';
import { useSettings } from '../contexts/SettingsContext';
import { formatCurrency } from '../utils/localization';
import { whatsappService } from '../services/whatsappService';
import { createCheckoutSession } from '../services/stripeService';
import Button from '../components/ui/Button';
import { ShoppingBagIcon, TrashIcon, ArrowLeftIcon, PlusIcon, MinusIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import FreeShippingProgressBar from '@/components/cart/FreeShippingProgressBar';

const CartPage: React.FC = () => {
  const { cartItems, removeItemFromCart, increaseItemQuantity, decreaseItemQuantity, cartItemCount, cartSubtotal } = useCart();
  const { language, currency } = useSettings();
  const { isAuthenticated, loginWithRedirect, user, getAccessTokenSilently } = useAuth0();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const t = (key: string, data?: any) => {
    const translations: Record<string, any> = {
      es: {
        pageTitle: "Tu Carrito de Compras",
        emptyCartTitle: "Tu Carrito está Vacío",
        emptyCartSubtitle: "Parece que no has añadido nada a tu carrito todavía.",
        continueShopping: "Continuar Comprando",
        product: "Producto",
        unitPrice: "Precio Unitario",
        quantity: "Cantidad",
        itemTotal: "Total Artículo",
        price: "Precio",
        remove: "Eliminar",
        subtotal: "Subtotal:",
        proceedToCheckout: "Proceder al Pago",
        orderViaWhatsApp: "Ordenar por WhatsApp",
        checkoutAlert: "La funcionalidad de pago se implementará pronto.",
        itemRemoved: (itemName: string) => `"${itemName}" eliminado del carrito.`,
        decreaseQuantity: (itemName: string) => `Disminuir cantidad de ${itemName}`,
        increaseQuantity: (itemName: string) => `Aumentar cantidad de ${itemName}`,
        unit: "unidad",
      },
      en: {
        pageTitle: "Your Shopping Cart",
        emptyCartTitle: "Your Cart is Empty",
        emptyCartSubtitle: "Looks like you haven't added anything to your cart yet.",
        continueShopping: "Continue Shopping",
        product: "Product",
        unitPrice: "Unit Price",
        quantity: "Quantity",
        itemTotal: "Item Total",
        price: "Price",
        remove: "Remove",
        subtotal: "Subtotal:",
        proceedToCheckout: "Proceed to Checkout",
        orderViaWhatsApp: "Order via WhatsApp",
        checkoutAlert: "Checkout functionality will be implemented soon.",
        itemRemoved: (itemName: string) => `"${itemName}" removed from cart.`,
        decreaseQuantity: (itemName: string) => `Decrease quantity of ${itemName}`,
        increaseQuantity: (itemName: string) => `Increase quantity of ${itemName}`,
        unit: "unit",
      }
    };
    let text = translations[language]?.[key] || translations['en'][key];
    if (typeof text === 'function' && data) return text(data);
    return text;
  };

  const handleRemoveItem = (itemId: string) => {
    removeItemFromCart(itemId);
  };
  
  const handleCheckout = async () => {
    if (!isAuthenticated) {
      loginWithRedirect({
        appState: { returnTo: '/cart' }
      });
      return;
    }

    if (cartItemCount === 0) {
      alert(language === 'es' ? 'Tu carrito está vacío' : 'Your cart is empty');
      return;
    }

    setIsCheckingOut(true);

    try {
      const accessToken = await getAccessTokenSilently();

      // Convert cart items to the format expected by Stripe
      const checkoutItems = cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: `L.${item.price.toFixed(2)}`,
        imageUrl: item.imageUrl,
        category: item.category,
        quantity: item.quantity
      }));

      const { url } = await createCheckoutSession({
        items: checkoutItems,
        customerEmail: user?.email,
        userId: user?.sub,
      }, accessToken);

      // Redirect to Stripe Checkout
      window.location.href = url;

    } catch (error) {
      console.error('Error creating checkout session:', error);
      const errorMessage = language === 'es' 
        ? 'Error al procesar el pago. Por favor, intenta de nuevo.'
        : 'Error processing payment. Please try again.';
      alert(errorMessage);
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleWhatsAppOrder = () => {
    whatsappService.sendOrderViaWhatsApp(cartItems, cartSubtotal, language, currency);
  };

  if (cartItemCount === 0) {
    return (
      <div className="text-center py-12 bg-white p-8 rounded-xl shadow-lg">
        <ShoppingBagIcon className="h-24 w-24 text-purple-400 mx-auto mb-6" />
        <h1 className="text-3xl font-bold text-purple-700 mb-3">{t('emptyCartTitle')}</h1>
        <p className="text-gray-600 mb-8">{t('emptyCartSubtitle')}</p>
        <Link to="/shop/products">
          <Button variant="primary" size="lg" leftIcon={<ArrowLeftIcon className="h-5 w-5"/>}>
            {t('continueShopping')}
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header className="bg-white p-6 rounded-xl shadow">
        <h1 className="text-3xl font-bold text-purple-700 flex items-center">
          <ShoppingBagIcon className="h-8 w-8 mr-3 text-purple-600" />
          {t('pageTitle')} ({cartItemCount} {cartItemCount === 1 ? t('unit') : language === 'es' ? 'unidades' : 'units'})
        </h1>
      </header>

      {/* 🚚 Free Shipping Progress Bar */}
      <FreeShippingProgressBar minimumForFreeShipping={25} />

      <div className="bg-white rounded-xl shadow overflow-hidden">
        {/* Optional Header for larger screens */}
        <div className="hidden sm:flex bg-gray-50 p-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <div className="flex-grow sm:w-2/5 lg:w-1/2">{t('product')}</div>
          <div className="sm:w-1/5 lg:w-1/6 text-right pr-2">{t('unitPrice')}</div>
          <div className="sm:w-1/5 lg:w-1/6 text-center">{t('quantity')}</div>
          <div className="sm:w-1/5 lg:w-1/6 text-right pr-2">{t('itemTotal')}</div>
          <div className="w-12 text-right"></div> {/* For remove button */}
        </div>

        <div className="divide-y divide-gray-200">
          {cartItems.map(item => (
            <div key={item.id} className="p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:items-start justify-between space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Product Info (Image + Name/Category) */}
              <div className="flex items-center space-x-3 sm:space-x-4 flex-grow w-full sm:w-2/5 lg:w-1/2">
                <Link to={`/shop/product/${item.id}`} className="flex-shrink-0">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-lg border border-gray-200 hover:opacity-80 transition-opacity"
                  />
                </Link>
                <div className="text-left">
                  <Link to={`/shop/product/${item.id}`} className="hover:text-purple-600 transition-colors">
                    <h2 className="text-sm sm:text-base font-semibold text-gray-800 ">{item.name}</h2>
                  </Link>
                  <p className="text-xs sm:text-sm text-gray-500">{item.category}</p>
                  {/* Unit Price for mobile */}
                  <p className="sm:hidden text-xs text-gray-500 mt-1">{formatCurrency(item.price, currency)} / {t('unit')}</p>
                </div>
              </div>

              {/* Unit Price (Desktop) */}
              <div className="hidden sm:flex flex-col items-end sm:w-1/5 lg:w-1/6 text-right pr-2">
                <p className="text-sm text-gray-700">{formatCurrency(item.price, currency)}</p>
              </div>

              {/* Quantity Controls */}
              <div className="flex flex-col items-center sm:w-1/5 lg:w-1/6">
                <p className="sm:hidden text-xs text-gray-500 mb-1">{t('quantity')}</p>
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => decreaseItemQuantity(item.id)}
                    className="p-1.5 h-7 w-7 rounded-md text-purple-600 bg-purple-100 hover:bg-purple-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                    aria-label={t('decreaseQuantity', {itemName: item.name})}
                    disabled={item.quantity <= 1 && cartItems.find(i => i.id === item.id)?.quantity === 1} // Disable if qty is 1 to prevent accidental removal here. Use trash icon for removal. Or remove this disabled logic if decrease should remove.
                  >
                    <MinusIcon className="h-4 w-4" />
                  </button>
                  <span className="text-sm font-medium w-10 text-center tabular-nums">{item.quantity}</span>
                  <button
                    onClick={() => increaseItemQuantity(item.id)}
                    className="p-1.5 h-7 w-7 rounded-md text-purple-600 bg-purple-100 hover:bg-purple-200 transition-colors flex items-center justify-center"
                    aria-label={t('increaseQuantity', {itemName: item.name})}
                  >
                    <PlusIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Item Total */}
              <div className="flex flex-col items-center sm:items-end sm:w-1/5 lg:w-1/6 text-right pr-2">
                 <p className="sm:hidden text-xs text-gray-500 mb-1">{t('itemTotal')}</p>
                <p className="text-base sm:text-lg font-semibold text-purple-700">{formatCurrency(item.price * item.quantity, currency)}</p>
              </div>
              
              {/* Remove Button */}
              <div className="w-full sm:w-12 flex justify-center sm:justify-end">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleRemoveItem(item.id)} 
                  className="text-red-500 hover:bg-red-50 p-2"
                  aria-label={`${t('remove')} ${item.name}`}
                >
                  <TrashIcon className="h-5 w-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
        <div className="text-xl font-semibold text-gray-800">
          {t('subtotal')} <span className="text-purple-700">{formatCurrency(cartSubtotal, currency)}</span>
        </div>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
          <Link to="/shop/products" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full">
              {t('continueShopping')}
            </Button>
          </Link>
          <Button 
            variant="primary" 
            size="lg" 
            onClick={handleWhatsAppOrder} 
            className="w-full sm:w-auto bg-green-600 hover:bg-green-700 focus:ring-green-500"
            leftIcon={<ChatBubbleBottomCenterTextIcon className="h-5 w-5" />}
          >
            {t('orderViaWhatsApp')}
          </Button>
          <Button 
            variant="primary" 
            size="lg" 
            onClick={handleCheckout} 
            className="w-full sm:w-auto"
            disabled={isCheckingOut}
          >
            {isCheckingOut 
              ? (language === 'es' ? 'Procesando...' : 'Processing...') 
              : (!isAuthenticated 
                ? (language === 'es' ? 'Iniciar Sesión para Comprar' : 'Login to Checkout')
                : t('proceedToCheckout')
              )
            }
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;