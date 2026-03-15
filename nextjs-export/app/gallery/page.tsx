"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Heart, X, Sparkles } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { fetchGalleryImages, type GalleryImageItem } from "@/lib/api";
import { galleryImages as fallbackGallery } from "@/lib/data";

type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  customerName: string;
};

function mapToGalleryImage(img: GalleryImageItem): GalleryImage {
  return {
    id: img._id,
    src: img.imageUrl,
    alt: img.alt || "Jewelry worn by customer",
    customerName: img.customerName,
  };
}

export default function Gallery() {
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchGalleryImages()
      .then((data) => {
        if (!cancelled) {
          setGalleryImages(data.map(mapToGalleryImage));
        }
      })
      .catch(() => {
        if (!cancelled) {
          setGalleryImages(
            fallbackGallery.map((g) => ({
              id: String(g.id),
              src: g.src,
              alt: g.alt,
              customerName: g.customerName,
            }))
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => { cancelled = true; };
  }, []);

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
            <Heart className="text-[var(--blush-pink)] mx-auto" size={40} />
          </motion.div>
          <h1 className="font-['Playfair_Display'] text-2xl md:text-4xl lg:text-5xl mb-3 md:mb-4">
            Jewellery Worn By You
          </h1>
          <p className="text-sm md:text-lg opacity-70 max-w-2xl mx-auto px-4">
            See how our beautiful customers style their Apsara Angan pieces
          </p>
        </motion.div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="aspect-square rounded-xl bg-gray-200 animate-pulse" />
            ))}
          </div>
        ) : galleryImages.length === 0 ? (
          <p className="text-center text-gray-500 py-12">No gallery images yet.</p>
        ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-12">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.95 }}
              className="group relative aspect-square overflow-hidden rounded-xl md:rounded-2xl bg-[var(--secondary)] cursor-pointer shadow-md hover:shadow-2xl transition-all duration-500 touch-manipulation"
              onClick={() => setSelected(image)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 md:p-4">
                <div>
                  <p className="text-white text-xs md:text-sm font-medium">{image.customerName}</p>
                  <p className="text-white/80 text-[10px] md:text-xs mt-1">Tap to view</p>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, delay: index * 0.2 }}
                className="absolute top-2 right-2 md:top-3 md:right-3"
              >
                <Sparkles className="text-white drop-shadow-lg" size={16} />
              </motion.div>
            </motion.div>
          ))}
        </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-[var(--blush-pink-light)] via-[var(--gold-light)]/50 to-[var(--blush-pink-light)] rounded-2xl md:rounded-3xl p-6 md:p-12 text-center shadow-xl"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart size={32} className="text-[var(--blush-pink-dark)]" />
            <h2 className="font-['Playfair_Display'] text-xl md:text-3xl lg:text-4xl">
              Love What You See?
            </h2>
          </div>
          <p className="text-sm md:text-lg opacity-80 mb-6 max-w-2xl mx-auto px-4">
            Get the same stunning design or customize it to match your style
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <WhatsAppButton
              message="Hi! I loved a design from your customer gallery. Can we create something similar?"
              className="shadow-xl hover:shadow-2xl min-h-[52px]"
            >
              Order Similar Design
            </WhatsAppButton>
          </motion.div>
        </motion.div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 p-3 md:p-4 bg-white/10 hover:bg-white/20 rounded-full transition-colors backdrop-blur-md shadow-xl min-w-[48px] min-h-[48px] z-10"
              onClick={(e) => { e.stopPropagation(); setSelected(null); }}
            >
              <X size={24} className="text-white" />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ delay: 0.1, duration: 0.3 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl mb-4 md:mb-6 aspect-square max-h-[70vh]">
                <Image
                  src={selected.src}
                  alt={selected.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 896px"
                  className="object-contain"
                />
              </div>
              <div className="text-center bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl">
                <p className="text-white text-lg md:text-xl mb-4 font-['Playfair_Display']">
                  {selected.customerName}
                </p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <WhatsAppButton
                    message={`Hi! I love the design worn by ${selected.customerName}. Can we create something similar?`}
                    className="shadow-xl hover:shadow-2xl min-h-[52px]"
                  >
                    Order This Design
                  </WhatsAppButton>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
