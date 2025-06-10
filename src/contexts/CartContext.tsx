import React, { createContext, useState, useContext, ReactNode, useCallback, useMemo } from 'react';
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
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

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

  return (
    <CartContext.Provider value={{
        cartItems,
        addItemToCart,
        removeItemFromCart,
        increaseItemQuantity,
        decreaseItemQuantity,
        clearCart,
        cartItemCount,
        cartSubtotal
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