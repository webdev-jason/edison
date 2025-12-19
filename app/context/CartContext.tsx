"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  customText?: string; // New: Optional text for engraving
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: any, text?: string) => void; // New: Accepts text
  removeFromCart: (id: number, text?: string) => void; // New: Needs text to know which one to remove
  clearCart: () => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load cart from LocalStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("edison-cart");
    if (savedCart) setItems(JSON.parse(savedCart));
  }, []);

  // Save cart to LocalStorage
  useEffect(() => {
    localStorage.setItem("edison-cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product: any, text?: string) => {
    setItems((currentItems) => {
      // Does this EXACT item (same ID and same Text) already exist?
      const existingItem = currentItems.find((item) => 
        item.id === product.id && item.customText === text
      );

      if (existingItem) {
        // If yes, just increase quantity
        return currentItems.map((item) =>
          (item.id === product.id && item.customText === text)
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      
      // If no, add it as a new line item
      return [...currentItems, { ...product, quantity: 1, customText: text }];
    });
  };

  const removeFromCart = (id: number, text?: string) => {
    setItems((currentItems) => 
      currentItems.filter((item) => !(item.id === id && item.customText === text))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, clearCart, cartCount }}>
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