"use client";

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ShoppingBag, Heart, Sparkles } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useShop } from "@/context/ShopContext";
import { readyToShipProducts } from "@/lib/data";

// Metadata for this page — move to a server wrapper if needed
// export const metadata: Metadata = { title: "Ready to Ship", ... };

export default function ShopPage() {
  const { addToCart, addToFavorites, removeFromFavorites, isFavorite, isInCart } = useShop();

  return (
    <div className="min-h-screen py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <ShoppingBag className="text-[var(--blush-pink)] mx-auto" size={40} />
          </motion.div>
          <h1 className="font-['Playfair_Display'] text-2xl md:text-4xl lg:text-5xl mb-3 md:mb-4">
            Ready to Ship
          </h1>
          <p className="text-sm md:text-lg opacity-70 max-w-2xl mx-auto px-4">
            Handcrafted pieces ready to be dispatched — no waiting, straight to your door
          </p>
        </motion.div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6">
          {readyToShipProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="group relative bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
            >
              {/* Favourite toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() =>
                  isFavorite(product.id)
                    ? removeFromFavorites(product.id)
                    : addToFavorites(product)
                }
                className="absolute top-2 right-2 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-[var(--blush-pink-light)] transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                aria-label={isFavorite(product.id) ? "Remove from favourites" : "Add to favourites"}
              >
                <Heart
                  size={16}
                  className={`transition-colors ${
                    isFavorite(product.id)
                      ? "fill-[var(--blush-pink)] text-[var(--blush-pink)]"
                      : "text-[var(--blush-pink)]"
                  }`}
                />
              </motion.button>

              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-[var(--secondary)]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Info */}
              <div className="p-3 md:p-4">
                <p className="text-[10px] md:text-xs opacity-50 mb-1 uppercase tracking-wide">
                  {product.category}
                </p>
                <h3 className="text-sm md:text-base font-medium mb-2 line-clamp-2 group-hover:text-[var(--blush-pink-dark)] transition-colors">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="text-[10px] md:text-xs opacity-60 mb-2 line-clamp-2">
                    {product.description}
                  </p>
                )}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm md:text-lg font-medium text-[var(--blush-pink-dark)]">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.inStock && (
                    <span className="text-[10px] md:text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      In Stock
                    </span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addToCart(product)}
                  disabled={isInCart(product.id)}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 md:py-3 rounded-full font-medium text-xs md:text-sm transition-all min-h-[44px] ${
                    isInCart(product.id)
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-[var(--blush-pink)] to-[var(--blush-pink-dark)] text-white shadow-md hover:shadow-lg"
                  }`}
                >
                  <ShoppingBag size={14} />
                  {isInCart(product.id) ? "Added to Bag" : "Add to Bag"}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Customize CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 md:mt-20 text-center bg-gradient-to-br from-[var(--blush-pink-light)] via-[var(--gold-light)]/50 to-[var(--blush-pink-light)] rounded-2xl md:rounded-3xl p-8 md:p-12 shadow-xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <Sparkles className="text-[var(--gold)] mx-auto" size={36} />
          </motion.div>
          <h2 className="font-['Playfair_Display'] text-xl md:text-3xl lg:text-4xl mb-3 md:mb-4">
            Don't See What You're Looking For?
          </h2>
          <p className="text-sm md:text-lg opacity-70 mb-6 max-w-xl mx-auto">
            We create completely custom pieces tailored to your style and occasion
          </p>
          <Link href="/customize">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[var(--blush-pink)] to-[var(--blush-pink-dark)] text-white rounded-full shadow-lg hover:shadow-xl font-medium min-h-[48px]"
            >
              <Sparkles size={20} />
              Customize Your Jewellery
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
