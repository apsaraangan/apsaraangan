"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ShoppingBag, Heart, ArrowLeft } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { getCartCount, favorites } = useShop();

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/customize", label: "Customize" },
    { path: "/shop", label: "Ready to Ship" },
    { path: "/gallery", label: "Gallery" },
    { path: "/contact", label: "Contact" },
  ];

  const isActive = (path: string) => pathname === path;
  const isHome = pathname === "/";
  const cartCount = getCartCount();
  const favoritesCount = favorites.length;

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-[var(--blush-pink)]/20 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">

          {/* Left: back arrow + logo */}
          <div className="flex items-center gap-2 md:gap-3">
            <AnimatePresence>
              {!isHome && (
                <motion.div
                  initial={{ opacity: 0, x: -12, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: "auto" }}
                  exit={{ opacity: 0, x: -12, width: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <button
                    onClick={() => { setIsMenuOpen(false); router.back(); }}
                    className="group flex items-center gap-1.5 mr-1 md:mr-2"
                    aria-label="Go back"
                  >
                    <motion.div
                      whileHover={{ x: -3 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center justify-center w-8 h-8 md:w-9 md:h-9 rounded-full bg-[var(--blush-pink-light)] hover:bg-[var(--blush-pink)]/20 border border-[var(--blush-pink)]/30 transition-colors"
                    >
                      <ArrowLeft size={16} className="text-[var(--blush-pink-dark)]" />
                    </motion.div>
                    <span className="hidden sm:block text-xs text-[var(--blush-pink-dark)] opacity-70 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      Back
                    </span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <Link
              href="/"
              className="flex items-center gap-2 md:gap-3 group"
              onClick={() => setIsMenuOpen(false)}
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-white flex items-center justify-center shadow-md border border-[var(--blush-pink-light)]"
              >
                <Image
                  src="https://res.cloudinary.com/dofqzajjb/image/upload/v1773471877/WhatsApp_Image_2026-03-12_at_1.10.18_AM__1_-removebg-preview_ly47fc.png"
                  alt="Apsara Angan logo"
                  width={48}
                  height={48}
                  className="object-contain"
                />
              </motion.div>
              <div className="flex flex-col">
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-lg md:text-2xl font-['Playfair_Display'] tracking-wide group-hover:text-[var(--blush-pink-dark)] transition-colors"
                >
                  Apsara Angan
                </motion.span>
                <span className="text-[9px] md:text-xs tracking-widest opacity-60 hidden sm:block">
                  Handcrafted Custom Jewellery
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  href={link.path}
                  className={`relative transition-colors hover:text-[var(--blush-pink-dark)] text-sm ${
                    isActive(link.path) ? "text-[var(--blush-pink-dark)]" : "text-[var(--foreground)]"
                  }`}
                >
                  {link.label}
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[var(--blush-pink)]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}

            <Link href="/favorites" className="relative hover:scale-110 transition-transform">
              <Heart size={22} className="text-[var(--blush-pink)]" />
              {favoritesCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-[var(--blush-pink-dark)] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {favoritesCount}
                </motion.span>
              )}
            </Link>

            <Link href="/cart" className="relative hover:scale-110 transition-transform">
              <ShoppingBag size={22} className="text-[var(--blush-pink)]" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-[var(--blush-pink-dark)] text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>
          </div>

          {/* Mobile icons + menu toggle */}
          <div className="md:hidden flex items-center gap-4">
            <Link href="/favorites" className="relative">
              <Heart size={20} className="text-[var(--blush-pink)]" />
              {favoritesCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-[var(--blush-pink-dark)] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
                >
                  {favoritesCount}
                </motion.span>
              )}
            </Link>

            <Link href="/cart" className="relative">
              <ShoppingBag size={20} className="text-[var(--blush-pink)]" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 bg-[var(--blush-pink-dark)] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 -mr-2 text-[var(--blush-pink)] rounded-lg transition-colors touch-manipulation"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden border-t border-[var(--blush-pink)]/20"
            >
              <div className="py-4 space-y-1">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block py-3 px-4 rounded-lg transition-all touch-manipulation text-sm ${
                        isActive(link.path)
                          ? "bg-gradient-to-r from-[var(--blush-pink-light)] to-transparent text-[var(--blush-pink-dark)] font-medium"
                          : "text-[var(--foreground)]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
