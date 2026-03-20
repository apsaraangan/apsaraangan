 "use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Heart, Sparkles, ArrowLeft, ChevronRight } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { categoryData, allCategorySlugs, type Product } from "@/lib/data";
import { fetchCategoryProducts } from "@/lib/api";
import { WhatsAppButton } from "@/components/WhatsAppButton";

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const { addToCart, addToFavorites, removeFromFavorites, isFavorite, isInCart } = useShop();

  const staticCategory = slug ? categoryData[slug] : null;
  const [products, setProducts] = useState<Product[]>(staticCategory?.products ?? []);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [slug]);

  useEffect(() => {
    if (!slug) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchCategoryProducts(slug)
      .then((items) => {
        if (cancelled) return;
        if (items.length > 0) {
          setProducts(items);
        }
      })
      .catch(() => {
        if (cancelled) return;
        setError("Could not load products from server. Showing any available static items.");
      })
      .finally(() => {
        if (!cancelled) {
          setLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const category = staticCategory
    ? { ...staticCategory, products }
    : { title: slug, subtitle: "", collection: "resin" as const, products };

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
        <Sparkles size={40} className="text-[var(--gold)]" />
        <h1 className="font-['Playfair_Display'] text-2xl md:text-4xl">Category Not Found</h1>
        <p className="opacity-60 text-sm md:text-base">We couldn't find what you're looking for.</p>
        <button
          onClick={() => router.back()}
          className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--blush-pink)] text-white hover:bg-[var(--blush-pink-dark)] transition-colors"
        >
          <ArrowLeft size={16} /> Go Back
        </button>
      </div>
    );
  }

  const isGold = category.collection === "traditional";
  const accentColor = isGold ? "var(--gold)" : "var(--blush-pink)";
  const accentDark = isGold ? "var(--gold)" : "var(--blush-pink-dark)";
  const gradientFrom = isGold
    ? "from-amber-50/80 via-white to-[var(--gold-light)]/30"
    : "from-[var(--blush-pink-light)]/60 via-white to-rose-50/30";

  const handleToggleFavorite = (e: React.MouseEvent, product: (typeof category.products)[0]) => {
    e.preventDefault();
    e.stopPropagation();
    isFavorite(product.id) ? removeFromFavorites(product.id) : addToFavorites(product);
  };

  return (
    <div className="min-h-screen py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs md:text-sm opacity-50 mb-4 leading-none">
            <Link href="/" className="hover:opacity-80 transition-opacity leading-none whitespace-nowrap">
              Home
            </Link>
            <ChevronRight size={12} className="shrink-0 relative top-[1px]" />
            <span
              className="cursor-pointer hover:opacity-80 transition-opacity leading-none whitespace-nowrap inline-flex items-center"
              onClick={() => router.back()}
            >
              Collections
            </span>
            <ChevronRight size={12} className="shrink-0 relative top-[1px]" />
            <span className="opacity-100 font-medium leading-none whitespace-nowrap">
              {category.title}
            </span>
          </div>

          {/* Collection badge */}
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-3 py-1 rounded-full text-[10px] md:text-xs font-medium tracking-wide mb-3"
            style={{
              backgroundColor: isGold ? "var(--gold-light)" : "var(--blush-pink-light)",
              color: accentDark,
            }}
          >
            {isGold ? "Heritage Craft" : "Handcrafted Art"}
          </motion.span>

          <h1 className="font-['Playfair_Display'] text-2xl md:text-4xl lg:text-5xl mb-3 md:mb-4">
            {category.title}
          </h1>
          <p className="text-sm md:text-lg opacity-60 max-w-2xl mx-auto px-4">
            {category.subtitle}
          </p>
        </motion.div>

        {/* Products Grid */}
        {loading && (
          <p className="text-center mb-4 text-sm opacity-60">Loading products...</p>
        )}
        {error && (
          <p className="text-center mb-4 text-xs text-red-500">{error}</p>
        )}
        {category.products.length === 0 && !loading && (
          <p className="text-center mb-8 text-sm opacity-70">
            No products found in this category yet.
          </p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-16">
          {category.products.map((product, index) => (
            <Link
              key={product.id}
              href={`/product/${encodeURIComponent(String(product.id))}`}
              className="group"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                className="relative bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
              >
                {/* Favourite */}
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => handleToggleFavorite(e, product)}
                  className="absolute top-2 right-2 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-[var(--blush-pink-light)] transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                  aria-label={isFavorite(product.id) ? "Remove from favourites" : "Add to favourites"}
                >
                  <Heart
                    size={15}
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
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: `linear-gradient(to top, ${
                        isGold
                          ? "rgba(191,152,48,0.3)"
                          : "rgba(212,137,154,0.3)"
                      }, transparent)`,
                    }}
                  />
                </div>

                {/* Info */}
                <div className="p-3 md:p-4">
                  <p className="text-[10px] md:text-xs opacity-50 mb-1 uppercase tracking-wide">
                    {product.category}
                  </p>
                  <h3 className="text-sm md:text-base font-medium mb-1 line-clamp-2 transition-colors duration-300 group-hover:text-[var(--blush-pink-dark)]">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-[10px] md:text-xs opacity-60 mb-2 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="text-sm md:text-lg font-medium"
                      style={{ color: accentDark }}
                    >
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.inStock && (
                      <span className="text-[10px] md:text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        In Stock
                      </span>
                    )}
                  </div>

                  {/* Add to Bag */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(product);
                    }}
                    disabled={isInCart(product.id)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 md:py-3 rounded-full font-medium text-xs md:text-sm transition-all min-h-[44px]"
                    style={
                      isInCart(product.id)
                        ? {
                            backgroundColor: "#e5e7eb",
                            color: "#9ca3af",
                            cursor: "not-allowed",
                          }
                        : {
                            background: isGold
                              ? "linear-gradient(to right, var(--gold), #a07a20)"
                              : "linear-gradient(to right, var(--blush-pink), var(--blush-pink-dark))",
                            color: "white",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                          }
                    }
                  >
                    <ShoppingBag size={14} />
                    {isInCart(product.id) ? "Added to Bag" : "Add to Bag"}
                  </motion.button>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Customize CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className={`rounded-2xl md:rounded-3xl p-6 md:p-12 bg-gradient-to-br ${gradientFrom} text-center shadow-xl`}
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <Sparkles size={36} style={{ color: accentColor }} className="mx-auto" />
          </motion.div>
          <h2 className="font-['Playfair_Display'] text-xl md:text-3xl lg:text-4xl mb-3 md:mb-4">
            Want a Custom {category.title} Piece?
          </h2>
          <p className="text-sm md:text-lg opacity-70 mb-6 max-w-xl mx-auto px-4">
            We craft each piece to your exact specifications — share your outfit and preferences with us
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <WhatsAppButton
              message={`Hi! I'd like to customize a ${category.title} piece. Can you help me?`}
              className="shadow-lg hover:shadow-xl min-h-[48px]"
            >
              Customize on WhatsApp
            </WhatsAppButton>
            {!isGold && (
              <Link href="/customize">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 font-medium transition-all min-h-[48px]"
                  style={{ borderColor: accentColor, color: accentDark }}
                >
                  View Customization Details
                  <ChevronRight size={16} />
                </motion.button>
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Generate static params for all category slugs at build time
export function generateStaticParams() {
  return allCategorySlugs.map((slug) => ({ slug }));
}
