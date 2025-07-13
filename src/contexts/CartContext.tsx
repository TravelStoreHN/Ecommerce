import React, { createContext, useState, useContext, ReactNode, useCallback, useMemo, useEffect } from 'react';
import { Product } from '../types';

// Define CartItem by extending Product and adding quantity
export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addItemToCart: (product: Product) => void;
  removeItemFromCart: (itemId: string) => void;
  increaseItemQuantity: (itemId: string) => void;
  decreaseItemQuantity: (itemId: string) => void;
  clearCart: () => void;
  cartItemCount: number;
  cartSubtotal: number;
  isInCart: (productId: string) => boolean;
  getItemQuantity: (productId: string) => number;
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('travelstore-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('travelstore-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addItemToCart = useCallback((product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === product.id);
      if (existingItem) {
        // Item already in cart, update quantity.
        return prevItems.map(i =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      // Add new item with quantity 1
      return [...prevItems, { ...product, quantity: 1 }];
    });
  }, []);

  const removeItemFromCart = useCallback((itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  }, []);

  const increaseItemQuantity = useCallback((itemId: string) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  }, []);

  const decreaseItemQuantity = useCallback((itemId: string) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item =>
        item.id === itemId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
      );
      // Remove item if quantity becomes 0
      return updatedItems.filter(item => item.quantity > 0);
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const cartItemCount = useMemo(() => {
    // Sum of quantities of all items
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const cartSubtotal = useMemo(() => {
    // Sum of (price * quantity) for all items
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cartItems]);

  const isInCart = useCallback((productId: string) => {
    return cartItems.some(item => item.id === productId);
  }, [cartItems]);

  const getItemQuantity = useCallback((productId: string) => {
    const item = cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
  }, [cartItems]);

  const updateCartItemQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItemFromCart(itemId);
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  }, [removeItemFromCart]);

  return (
    <CartContext.Provider value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        increaseItemQuantity,
        decreaseItemQuantity,
        clearCart,
        cartItemCount,
        cartSubtotal,
        isInCart,
        getItemQuantity,
        updateCartItemQuantity
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};