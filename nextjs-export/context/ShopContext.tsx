"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import type { Product } from "@/lib/data";

export type { Product };

export interface CartItem extends Product {
  quantity: number;
}

interface ShopContextType {
  cart: CartItem[];
  favorites: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  isInCart: (productId: number) => boolean;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) =>
    setCart((prev) => prev.filter((i) => i.id !== productId));

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) return removeFromCart(productId);
    setCart((prev) =>
      prev.map((i) => (i.id === productId ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setCart([]);

  const addToFavorites = (product: Product) =>
    setFavorites((prev) =>
      prev.find((i) => i.id === product.id) ? prev : [...prev, product]
    );

  const removeFromFavorites = (productId: number) =>
    setFavorites((prev) => prev.filter((i) => i.id !== productId));

  const isFavorite = (productId: number) =>
    favorites.some((i) => i.id === productId);

  const isInCart = (productId: number) =>
    cart.some((i) => i.id === productId);

  const getCartTotal = () =>
    cart.reduce((total, i) => total + i.price * i.quantity, 0);

  const getCartCount = () =>
    cart.reduce((count, i) => count + i.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        cart,
        favorites,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        isInCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error("useShop must be used within ShopProvider");
  return context;
}
