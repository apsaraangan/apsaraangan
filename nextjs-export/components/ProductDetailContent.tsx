"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingBag, Heart, ArrowLeft, Star, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";

import { useShop } from "@/context/ShopContext";
import { categoryData, readyToShipProducts, type Product } from "@/lib/data";
import { fetchProductById } from "@/lib/api";
import { WhatsAppButton } from "@/components/WhatsAppButton";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const staticReviews: Review[] = [
  {
    id: 1,
    name: "Priya Sharma",
    rating: 5,
    comment:
      "Absolutely in love with this piece! The detailing and finish are even more beautiful in person.",
    date: "February 2026",
  },
  {
    id: 2,
    name: "Ananya Desai",
    rating: 5,
    comment:
      "Perfect for my mehendi function. Lightweight, comfortable and matched my outfit perfectly.",
    date: "January 2026",
  },
  {
    id: 3,
    name: "Simran Kaur",
    rating: 4,
    comment:
      "Craftsmanship is stunning. The team was very helpful with customisation options as well.",
    date: "December 2025",
  },
];

function findStaticProductById(id: string): {
  product: Product | null;
  suggested: Product[];
} {
  const numericId = Number(id);
  if (!Number.isFinite(numericId)) {
    return { product: null, suggested: [] };
  }

  let foundCategoryKey: string | null = null;
  let foundProduct: Product | null = null;

  for (const [slug, category] of Object.entries(categoryData)) {
    const match = category.products.find((p) => p.id === numericId);
    if (match) {
      foundCategoryKey = slug;
      foundProduct = match;
      break;
    }
  }

  if (!foundProduct) {
    const match =
      readyToShipProducts.find((p) => p.id === numericId) || null;
    return {
      product: match,
      suggested: readyToShipProducts
        .filter((p) => p.id !== numericId)
        .slice(0, 4),
    };
  }

  const suggested =
    foundCategoryKey && categoryData[foundCategoryKey]
      ? categoryData[foundCategoryKey].products
          .filter((p) => p.id !== numericId)
          .slice(0, 4)
      : [];

  return { product: foundProduct, suggested };
}

function ProductMediaCarousel({ product }: { product: Product | null }) {
  const media = useMemo(() => {
    if (!product) return [];
    const images = product.images?.length ? product.images : [product.image];
    const list: { type: "image" | "video"; url: string }[] = images.map((url) => ({ type: "image" as const, url }));
    if (product.videoUrl) list.push({ type: "video", url: product.videoUrl });
    return list;
  }, [product]);

  const [index, setIndex] = useState(0);
  const current = media[index];

  useEffect(() => {
    setIndex(0);
  }, [product?.id]);

  if (!product || media.length === 0) {
    return (
      <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[var(--secondary)] shadow-xl" />
    );
  }

  return (
    <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[var(--secondary)] shadow-xl">
      <AnimatePresence mode="wait">
        {current && (
          <motion.div
            key={`${product.id}-${index}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0"
          >
            {current.type === "video" ? (
              <video
                src={current.url}
                controls
                playsInline
                className="w-full h-full object-contain bg-black"
              />
            ) : (
              <Image
                src={current.url}
                alt={`${product.name} - ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority={index === 0}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {media.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => setIndex((i) => (i - 1 + media.length) % media.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center text-gray-800 transition-colors z-10"
            aria-label="Previous"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            onClick={() => setIndex((i) => (i + 1) % media.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center text-gray-800 transition-colors z-10"
            aria-label="Next"
          >
            <ChevronRight size={24} />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {media.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === index ? "bg-white" : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function ProductDetailContent({
  id,
  onBack,
}: {
  id: string;
  onBack?: () => void;
}) {
  const {
    addToCart,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    isInCart,
  } = useShop();

  const [product, setProduct] = useState<Product | null>(null);
  const [suggested, setSuggested] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const staticMatch = useMemo(() => findStaticProductById(id), [id]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    if (staticMatch.product && !cancelled) {
      setProduct(staticMatch.product);
      setSuggested(staticMatch.suggested);
      setLoading(false);
      return;
    }

    fetchProductById(id)
      .then((data) => {
        if (cancelled) return;
        setProduct(data.product);
        setSuggested(data.suggested);
      })
      .catch(() => {
        if (cancelled) return;
        setError("Could not load this product. Please try again.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [id, staticMatch]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [id]);

  const accentDark = "var(--blush-pink-dark)";

  const handleToggleFavorite = () => {
    if (!product) return;
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  if (!product && !loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4 text-center">
        <Sparkles size={40} className="text-[var(--gold)]" />
        <h1 className="font-['Playfair_Display'] text-2xl md:text-4xl">
          Product Not Found
        </h1>
        <p className="opacity-60 text-sm md:text-base max-w-md">
          We couldn&apos;t find this piece in our collection. It may have been
          moved or is no longer available.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mt-2">
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--blush-pink)] text-white hover:bg-[var(--blush-pink-dark)] transition-colors"
          >
            <ArrowLeft size={16} /> Go Back
          </button>
          <Link href="/shop">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[var(--blush-pink)] text-[var(--blush-pink-dark)] hover:bg-[var(--blush-pink-light)] transition-colors">
              Browse Ready-to-Ship
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 mb-6 md:mb-10">
          <div className="flex items-center gap-2 text-xs md:text-sm opacity-60">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/shop"
              className="hover:opacity-80 transition-opacity"
            >
              Shop
            </Link>
            <span>/</span>
            <span className="opacity-100">{product?.name ?? "Product"}</span>
          </div>
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-xs md:text-sm rounded-full px-3 py-1.5 bg-white/70 hover:bg-white shadow-sm border border-gray-100 transition-colors"
          >
            <ArrowLeft size={14} />
            Back
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <ProductMediaCarousel product={product} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-4 md:gap-5"
          >
            <span className="inline-flex items-center gap-2 text-[10px] md:text-xs font-medium px-3 py-1 rounded-full bg-[var(--blush-pink-light)] text-[var(--blush-pink-dark)] w-fit">
              <Sparkles size={14} />
              Handcrafted Jewellery
            </span>

            <h1 className="font-['Playfair_Display'] text-2xl md:text-3xl lg:text-4xl leading-tight">
              {product?.name}
            </h1>

            <p className="text-xs md:text-sm uppercase tracking-wide opacity-60">
              {product?.category}
            </p>

            <div className="flex items-center gap-4">
              <p
                className="text-2xl md:text-3xl font-semibold"
                style={{ color: accentDark }}
              >
                ₹{product?.price.toLocaleString()}
              </p>
              {product?.inStock && (
                <span className="inline-flex items-center text-[10px] md:text-xs px-2.5 py-1 rounded-full bg-green-100 text-green-700">
                  In Stock
                </span>
              )}
            </div>

            {product?.description && (
              <p className="text-sm md:text-base opacity-80 leading-relaxed">
                {product.description}
              </p>
            )}

            <div className="flex flex-col gap-3 mt-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => product && addToCart(product)}
                disabled={product ? isInCart(product.id) : true}
                className={`w-full inline-flex items-center justify-center gap-2 py-3 md:py-3.5 rounded-full font-medium text-sm md:text-base min-h-[48px] shadow-md hover:shadow-lg transition-all ${
                  product && isInCart(product.id)
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-[var(--blush-pink)] to-[var(--blush-pink-dark)] text-white"
                }`}
              >
                <ShoppingBag size={18} />
                {product && isInCart(product.id)
                  ? "Added to Bag"
                  : "Add to Bag"}
              </motion.button>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleToggleFavorite}
                  disabled={!product}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-full border text-sm md:text-sm border-[var(--blush-pink)] text-[var(--blush-pink-dark)] bg-white hover:bg-[var(--blush-pink-light)] transition-colors"
                >
                  <Heart
                    size={16}
                    className={
                      product && isFavorite(product.id)
                        ? "fill-[var(--blush-pink)] text-[var(--blush-pink)]"
                        : "text-[var(--blush-pink)]"
                    }
                  />
                  {product && isFavorite(product.id)
                    ? "Saved to Favourites"
                    : "Add to Favourites"}
                </motion.button>

                {product && (
                  <WhatsAppButton
                    message={`Hi! I'm interested in "${product.name}" (₹${product.price}). Can you help me with details and customization?`}
                    className="flex-1 min-h-[44px]"
                  >
                    Chat on WhatsApp
                  </WhatsAppButton>
                )}
              </div>
            </div>

            {error && (
              <p className="text-xs text-red-500 mt-1">{error}</p>
            )}
          </motion.div>
        </div>

        <section className="mb-12 md:mb-16">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="font-['Playfair_Display'] text-xl md:text-2xl">
              Reviews from Apsara Angan brides
            </h2>
            <div className="flex items-center gap-1 text-xs md:text-sm opacity-70">
              <Star className="text-yellow-400 fill-yellow-400" size={16} />
              <span>4.8</span>
              <span>·</span>
              <span>Based on handcrafted orders</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {staticReviews.map((review) => (
              <div
                key={review.id}
                className="rounded-2xl border border-rose-100/60 bg-white/80 p-4 md:p-5 shadow-sm"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium">{review.name}</p>
                    <p className="text-[11px] md:text-xs opacity-60">
                      {review.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <Star
                        key={idx}
                        size={14}
                        className={
                          idx < review.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-200"
                        }
                      />
                    ))}
                  </div>
                </div>
                <p className="text-xs md:text-sm opacity-80 leading-relaxed">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </section>

        {suggested.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="font-['Playfair_Display'] text-xl md:text-2xl">
                You may also like
              </h2>
              <Link
                href="/shop"
                className="text-xs md:text-sm text-[var(--blush-pink-dark)] hover:underline"
              >
                View all
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {suggested.map((item, index) => (
                <Link
                  key={String(item.id)}
                  href={`/product/${encodeURIComponent(String(item.id))}`}
                  className="group"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="relative aspect-square overflow-hidden bg-[var(--secondary)]">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-3 md:p-4">
                      <p className="text-[10px] md:text-xs uppercase tracking-wide opacity-50 mb-1">
                        {item.category}
                      </p>
                      <h3 className="text-xs md:text-sm font-medium mb-1 line-clamp-2 group-hover:text-[var(--blush-pink-dark)] transition-colors">
                        {item.name}
                      </h3>
                      {item.description && (
                        <p className="text-[10px] md:text-xs opacity-60 mb-1 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                      <p className="text-sm md:text-base font-semibold text-[var(--blush-pink-dark)]">
                        ₹{item.price.toLocaleString()}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

