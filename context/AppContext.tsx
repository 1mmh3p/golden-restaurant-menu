
import React, { createContext, useState, useEffect, useCallback } from 'react';
import { AppContextType, Language, Product, CartItem } from '../types';
import { initialProducts } from '../data/menuData';

export const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>(initialProducts);

  useEffect(() => {
    const storedLang = localStorage.getItem('language') as Language;
    if (storedLang) setLanguage(storedLang);
    
    const storedCart = localStorage.getItem('cart');
    if (storedCart) setCart(JSON.parse(storedCart));
    
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth) setIsAuthenticated(JSON.parse(storedAuth));

    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    } else {
      setProducts(initialProducts);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  useEffect(() => {
    localStorage.setItem('isAuthenticated', JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  useEffect(() => {
    // Only update localStorage if products are different from initial to avoid unnecessary writes
    if (JSON.stringify(products) !== JSON.stringify(initialProducts)) {
      localStorage.setItem('products', JSON.stringify(products));
    }
  }, [products]);

  const addToCart = (product: Product, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === productId 
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };
  
  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  }
  
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const login = (user: string, pass: string): boolean => {
    if (user === 'admin053' && pass === 'admin053') {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };
  
  const value = {
    language,
    setLanguage,
    products,
    setProducts,
    cart,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    isAuthenticated,
    login,
    logout,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
