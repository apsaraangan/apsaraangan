"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Product } from "@/lib/data";
import {
  getSessionId,
  fetchCart,
  fetchFavorites,
  addToCartApi,
  removeFromCartApi,
  updateCartQuantityApi,
  addToFavoritesApi,
  removeFromFavoritesApi,
} from "@/lib/api";

export type { Product };

export interface CartItem extends Product {
  quantity: number;
}

type ProductId = string | number;

interface ShopContextType {
  cart: CartItem[];
  favorites: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: ProductId) => void;
  updateQuantity: (productId: ProductId, quantity: number) => void;
  clearCart: () => void;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: ProductId) => void;
  isFavorite: (productId: ProductId) => boolean;
  isInCart: (productId: ProductId) => boolean;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);

  useEffect(() => {
    const sessionId = getSessionId();
    if (!sessionId) return;
    Promise.all([fetchCart(sessionId), fetchFavorites(sessionId)])
      .then(([cartItems, favItems]) => {
        setCart(cartItems as CartItem[]);
        setFavorites(favItems);
      })
      .catch(() => {});
  }, []);

  const addToCart = (product: Product) => {
    const sessionId = getSessionId();
    const nextCart: CartItem[] = (() => {
      const existing = cart.find((i) => String(i.id) === String(product.id));
      if (existing) {
        return cart.map((i) =>
          String(i.id) === String(product.id)
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...cart, { ...product, quantity: 1 }];
    })();
    setCart(nextCart);
    if (sessionId) {
      addToCartApi(sessionId, product).catch(() => setCart(cart));
    }
  };

  const removeFromCart = (productId: ProductId) => {
    const sessionId = getSessionId();
    setCart((prev) => prev.filter((i) => String(i.id) !== String(productId)));
    if (sessionId) {
      removeFromCartApi(sessionId, productId).catch(() => {});
    }
  };

  const updateQuantity = (productId: ProductId, quantity: number) => {
    if (quantity <= 0) return removeFromCart(productId);
    setCart((prev) =>
      prev.map((i) =>
        String(i.id) === String(productId) ? { ...i, quantity } : i
      )
    );
    const sessionId = getSessionId();
    if (sessionId) {
      updateCartQuantityApi(sessionId, productId, quantity).catch(() => {});
    }
  };

  const clearCart = () => {
    setCart([]);
    const sessionId = getSessionId();
    if (sessionId) {
      cart.forEach((item) => removeFromCartApi(sessionId, item.id).catch(() => {}));
    }
  };

  const addToFavorites = (product: Product) => {
    if (favorites.some((i) => String(i.id) === String(product.id))) return;
    setFavorites((prev) => [...prev, product]);
    const sessionId = getSessionId();
    if (sessionId) {
      addToFavoritesApi(sessionId, product).catch(() =>
        setFavorites((prev) => prev.filter((i) => String(i.id) !== String(product.id)))
      );
    }
  };

  const removeFromFavorites = (productId: ProductId) => {
    setFavorites((prev) => prev.filter((i) => String(i.id) !== String(productId)));
    const sessionId = getSessionId();
    if (sessionId) {
      removeFromFavoritesApi(sessionId, productId).catch(() => {});
    }
  };

  const isFavorite = (productId: ProductId) =>
    favorites.some((i) => String(i.id) === String(productId));

  const isInCart = (productId: ProductId) =>
    cart.some((i) => String(i.id) === String(productId));

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
