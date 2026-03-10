"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { Heart, ShoppingBag, ArrowRight, X } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export default function FavoritesPage() {
  const { favorites, removeFromFavorites, addToCart, isInCart } = useShop();

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen py-8 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="inline-block mb-6"
            >
              <Heart className="text-[var(--blush-pink)] mx-auto" size={64} />
            </motion.div>
            <h1 className="font-['Playfair_Display'] text-2xl md:text-4xl mb-4">No Favorites Yet</h1>
            <p className="text-sm md:text-lg opacity-70 mb-8">
              Save your favorite pieces and shop them later
            </p>
            <Link href="/#our-collections">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[var(--blush-pink)] to-[var(--blush-pink-dark)] text-white rounded-full shadow-lg hover:shadow-xl transition-all font-medium min-h-[48px]"
              >
                Explore Collection <ArrowRight size={20} />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="text-[var(--blush-pink)]" size={32} />
            <h1 className="font-['Playfair_Display'] text-2xl md:text-4xl lg:text-5xl">My Favorites</h1>
          </div>
          <p className="text-sm md:text-base opacity-70">
            {favorites.length} {favorites.length === 1 ? "item" : "items"} saved
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {favorites.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="group relative bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
            >
              {/* Remove */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeFromFavorites(product.id)}
                className="absolute top-2 right-2 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-red-50 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                aria-label="Remove from favorites"
              >
                <X size={16} className="text-red-500" />
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
                <h3 className="text-sm md:text-base font-medium mb-1 line-clamp-2 group-hover:text-[var(--blush-pink-dark)] transition-colors">
                  {product.name}
                </h3>
                <p className="text-xs md:text-sm opacity-60 mb-2">{product.category}</p>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm md:text-lg font-medium text-[var(--blush-pink-dark)]">
                    ₹{product.price.toLocaleString()}
                  </span>
                  {product.inStock && (
                    <span className="text-[10px] md:text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
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
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-gradient-to-r from-[var(--blush-pink)] to-[var(--blush-pink-dark)] text-white shadow-md hover:shadow-lg"
                  }`}
                >
                  <ShoppingBag size={16} />
                  {isInCart(product.id) ? "In Bag" : "Add to Bag"}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link href="/#our-collections">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 border-2 border-[var(--blush-pink)] text-[var(--blush-pink-dark)] rounded-full hover:bg-[var(--blush-pink-light)] transition-all font-medium min-h-[48px]"
            >
              Explore More Products <ArrowRight size={20} />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
