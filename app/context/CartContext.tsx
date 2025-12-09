"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("edison-cart");
    if (savedCart) setItems(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("edison-cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product: any) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...currentItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}