"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Heart, Send, Star, Award, Clock, ChevronDown, ArrowRight } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { mainCollections, subcategories } from "@/lib/data";
import { FaWhatsapp } from "react-icons/fa";
const customerPhotos = [
  "https://res.cloudinary.com/dcs53etlz/image/upload/v1773150928/c1_ml4fht.jpg",
  "https://res.cloudinary.com/dcs53etlz/image/upload/v1773151630/c3_udban0.jpg",
  "https://res.cloudinary.com/dcs53etlz/image/upload/v1773151694/c4_ttz7mq.jpg",
  "https://res.cloudinary.com/dcs53etlz/image/upload/v1773151761/c5_k5hjk7.jpg",
];

const features = [
  { icon: Star, title: "Premium Quality", desc: "Handcrafted with care" },
  { icon: Award, title: "Custom Made", desc: "Unique to you" },
  { icon: Clock, title: "Fast Delivery", desc: "4-5 days turnaround" },
];

export default function Home() {
  const [activeCollection, setActiveCollection] = useState<"resin" | "traditional" | null>(null);

  const scrollToCollections = () => {
    const el = document.getElementById("our-collections");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    if (window.location.hash === "#our-collections") {
      // Ensure layout is ready before scrolling
      setTimeout(scrollToCollections, 100);
    }
  }, []);

  const handleCollectionClick = (id: "resin" | "traditional") => {
    setActiveCollection((prev) => (prev === id ? null : id));
  };

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative h-[500px] md:h-[700px] overflow-hidden">
        <div className="absolute inset-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="https://res.cloudinary.com/dofqzajjb/video/upload/v1773471720/IMG_3543_ybbdh4.mov" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-white" />
        </div>

        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="text-center md:text-left max-w-2xl mx-auto md:mx-0">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="inline-block mb-4"
              >
                <Sparkles className="text-[var(--gold)] mx-auto md:mx-0" size={40} />
              </motion.div>
              <h1 className="font-['Playfair_Display'] text-3xl md:text-5xl lg:text-7xl mb-4 text-white drop-shadow-2xl">
                Apsara Angan
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white/95 drop-shadow-lg">
                Handcrafted Custom Jewellery
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center md:justify-start"
            >
              <Link href="/customize">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[var(--blush-pink)] to-[var(--blush-pink-dark)] hover:from-[var(--blush-pink-dark)] hover:to-[var(--blush-pink)] text-white rounded-full transition-all shadow-xl hover:shadow-2xl font-medium min-h-[48px]"
                >
                  <Sparkles size={20} />
                  <span className="whitespace-nowrap">Customize Your Jewellery</span>
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToCollections}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white/95 hover:bg-white rounded-full transition-all shadow-xl hover:shadow-2xl font-medium backdrop-blur-sm min-h-[48px]"
              >
                Shop Ready to Ship
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Features Bar ── */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-[var(--blush-pink-light)]/50 via-white to-[var(--gold-light)]/50 py-6 md:py-8 -mt-8 md:-mt-12 relative z-10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-4 md:gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center"
              >
                <feature.icon className="mx-auto mb-2 text-[var(--blush-pink)]" size={24} />
                <p className="text-xs md:text-base font-medium mb-1">{feature.title}</p>
                <p className="text-[10px] md:text-sm opacity-60">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── Our Collections ── */}
      <section
        id="our-collections"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-[var(--gold)] mb-2 font-medium">
            Shop by Style
          </p>
          <h2 className="font-['Playfair_Display'] text-2xl md:text-4xl lg:text-5xl">
            Our Collections
          </h2>
        </motion.div>

        {/* Two cards — each owns its expandable subcategory grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 items-start">
          {mainCollections.map((collection, index) => {
            const isActive = activeCollection === collection.id;
            const isGold = collection.id === "traditional";
            return (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
              >
                {/* Card */}
                <motion.button
                  onClick={() => handleCollectionClick(collection.id)}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative w-full overflow-hidden rounded-2xl md:rounded-3xl aspect-[4/3] md:aspect-[3/2] shadow-lg hover:shadow-2xl transition-all duration-500 text-left group focus:outline-none ${
                    isActive
                      ? "ring-4 ring-[var(--gold)] ring-offset-2 shadow-2xl"
                      : "ring-1 ring-black/5"
                  }`}
                >
                  <Image
                    src={collection.image}
                    alt={collection.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 50vw"
                    className={`object-cover transition-transform duration-700 ${
                      isActive ? "scale-105" : "group-hover:scale-105"
                    }`}
                  />
                  <div
                    className={`absolute inset-0 transition-all duration-500 ${
                      isActive
                        ? "bg-gradient-to-t from-black/80 via-black/40 to-black/10"
                        : "bg-gradient-to-t from-black/70 via-black/25 to-transparent"
                    }`}
                  />
                  {isActive && (
                    <div className="absolute inset-0 rounded-2xl md:rounded-3xl ring-inset ring-2 ring-[var(--gold)]/40 pointer-events-none" />
                  )}
                  <div className="absolute top-3 left-3 md:top-4 md:left-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] md:text-xs font-medium tracking-wide transition-colors duration-300 ${
                        isActive
                          ? "bg-[var(--gold)] text-white"
                          : "bg-white/20 text-white backdrop-blur-sm"
                      }`}
                    >
                      {collection.tag}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-end p-4 md:p-6">
                    <p className="text-white/70 text-[10px] md:text-xs tracking-[0.15em] uppercase mb-1">
                      {collection.subtitle}
                    </p>
                    <h3 className="font-['Playfair_Display'] text-xl md:text-3xl text-white mb-2">
                      {collection.title}
                    </h3>
                    <p className="text-white/75 text-xs md:text-sm leading-relaxed mb-3 md:mb-4 max-w-xs">
                      {collection.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-xs md:text-sm font-medium transition-colors duration-300 ${
                          isActive ? "text-[var(--gold)]" : "text-white/80"
                        }`}
                      >
                        {isActive ? "Hide Categories" : "Browse Categories"}
                      </span>
                      <motion.div
                        animate={{ rotate: isActive ? 180 : 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className={`w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center transition-colors duration-300 ${
                          isActive
                            ? "bg-[var(--gold)] text-white"
                            : "bg-white/20 text-white backdrop-blur-sm"
                        }`}
                      >
                        <ChevronDown size={18} />
                      </motion.div>
                    </div>
                  </div>
                </motion.button>

                {/* Subcategories — expands below THIS card only */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      key={collection.id + "-subs"}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      {/* Divider */}
                      <div className="flex items-center gap-3 mt-5 mb-4">
                        <div
                          className={`h-px flex-1 ${
                            isGold
                              ? "bg-gradient-to-r from-transparent via-[var(--gold)]/50 to-transparent"
                              : "bg-gradient-to-r from-transparent via-[var(--blush-pink)]/50 to-transparent"
                          }`}
                        />
                        <span
                          className={`text-[10px] md:text-xs font-medium tracking-widest uppercase whitespace-nowrap ${
                            isGold ? "text-[var(--gold)]" : "text-[var(--blush-pink)]"
                          }`}
                        >
                          {collection.title}
                        </span>
                        <div
                          className={`h-px flex-1 ${
                            isGold
                              ? "bg-gradient-to-r from-transparent via-[var(--gold)]/50 to-transparent"
                              : "bg-gradient-to-r from-transparent via-[var(--blush-pink)]/50 to-transparent"
                          }`}
                        />
                      </div>

                      {/* 3-col grid */}
                      <div className="grid grid-cols-3 gap-2 md:gap-3">
                        {subcategories[collection.id].map((sub, idx) => (
                          <motion.div
                            key={sub.title}
                            initial={{ opacity: 0, y: 16, scale: 0.92 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: idx * 0.06, duration: 0.32, ease: "easeOut" }}
                          >
                            <Link href={sub.path} className="group block">
                              <div className="relative aspect-square overflow-hidden rounded-xl bg-white shadow-md group-hover:shadow-xl transition-all duration-300 mb-1.5">
                                <Image
                                  src={sub.image}
                                  alt={sub.title}
                                  fill
                                  sizes="(max-width: 640px) 33vw, 17vw"
                                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div
                                  className={`absolute top-1.5 right-1.5 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ${
                                    isGold ? "bg-[var(--gold)]" : "bg-[var(--blush-pink)]"
                                  }`}
                                >
                                  <ArrowRight size={10} className="text-white" />
                                </div>
                              </div>
                              <p className="text-[10px] md:text-xs text-center font-medium leading-tight opacity-75 group-hover:opacity-100 transition-opacity">
                                {sub.title}
                              </p>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── How Customization Works ── */}
      <section className="bg-gradient-to-br from-[var(--secondary)] via-[var(--blush-pink-light)]/30 to-[var(--secondary)] py-12 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="font-['Playfair_Display'] text-2xl md:text-4xl lg:text-5xl mb-3 md:mb-4">
              How Customization Works
            </h2>
            <p className="text-sm md:text-lg opacity-70 px-4">
              Three simple steps to your perfect jewellery
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
            {[
              { num: "1", title: "Choose Design Structure", desc: "Select flower size, leaves, and charm preferences" },
              { num: "2", title: "Share Outfit Reference", desc: "Upload your outfit photo to match colors perfectly" },
              { num: "3", title: "Receive Your Custom Jewellery", desc: "Get your unique handcrafted piece in 4-5 days" },
            ].map((step, index) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                className="text-center bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 + 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[var(--blush-pink)] to-[var(--blush-pink-dark)] flex items-center justify-center mx-auto mb-4 md:mb-6 shadow-lg"
                >
                  <span className="text-2xl md:text-3xl font-['Playfair_Display'] text-white">{step.num}</span>
                </motion.div>
                <h3 className="text-base md:text-xl mb-2 md:mb-3 font-medium">{step.title}</h3>
                <p className="text-sm md:text-base opacity-70 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Customer Gallery Preview ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="font-['Playfair_Display'] text-2xl md:text-4xl lg:text-5xl mb-3 md:mb-4">
            Jewellery Worn By You
          </h2>
          <p className="text-sm md:text-lg opacity-70 px-4">
            See how our customers style their Apsara Angan pieces
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
          {customerPhotos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="aspect-square rounded-xl md:rounded-2xl overflow-hidden bg-[var(--secondary)] shadow-md hover:shadow-xl transition-all duration-500 group relative"
            >
              <Image
                src={photo}
                alt={`Customer photo ${index + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <Link href="/gallery">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-white border-2 border-[var(--blush-pink)] hover:bg-[var(--blush-pink-light)] rounded-full transition-all shadow-lg hover:shadow-xl font-medium min-h-[48px]"
            >
              <Heart size={20} />
              View Customer Gallery
            </motion.button>
          </Link>
        </motion.div>
      </section>

      {/* ── WhatsApp CTA ── */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-[var(--blush-pink-light)] via-[var(--gold-light)]/50 to-[var(--blush-pink-light)] py-12 md:py-24"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
            className="inline-block mb-4"
          >
            <Sparkles className="text-[var(--gold)] mx-auto" size={40} />
          </motion.div>
          <h2 className="font-['Playfair_Display'] text-2xl md:text-4xl lg:text-5xl mb-4 md:mb-6">
            Ready to Create Your Dream Jewellery?
          </h2>
          <p className="text-sm md:text-lg opacity-80 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
            Connect with us on WhatsApp to start customizing or place your order instantly
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
  <WhatsAppButton className="flex items-center gap-2 shadow-xl hover:shadow-2xl min-h-[52px] text-sm md:text-base">
  
    <span> Customize or Order on WhatsApp</span>
  </WhatsAppButton>
</motion.div>
        </div>
      </motion.section>
    </div>
  );
}
