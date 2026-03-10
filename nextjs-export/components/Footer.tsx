"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Instagram, MessageCircle, Heart, Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-[var(--secondary)] to-[var(--blush-pink-light)]/30 border-t border-[var(--blush-pink)]/20 mt-12 md:mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="flex items-center gap-2 mb-3 group">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[var(--blush-pink-light)] to-[var(--gold-light)] flex items-center justify-center shadow-md">
                <Sparkles size={18} className="text-[var(--gold)]" />
              </div>
              <h3 className="font-['Playfair_Display'] text-xl md:text-2xl group-hover:text-[var(--blush-pink-dark)] transition-colors">
                Apsara Angan
              </h3>
            </Link>
            <p className="text-sm md:text-base opacity-70 leading-relaxed mb-4">
              Handcrafted custom jewellery for your special moments
            </p>
            <div className="flex items-center gap-2 text-sm opacity-60">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart size={14} className="text-[var(--blush-pink)] fill-current" />
              </motion.div>
              <span>in India</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-base md:text-lg font-medium mb-3 md:mb-4 font-['Playfair_Display']">
              Quick Links
            </h4>
            <div className="flex flex-col gap-2 md:gap-3 text-sm md:text-base">
              {[
                { to: "/customize", label: "Customize Jewellery" },
                { to: "/shop", label: "Ready to Ship" },
                { to: "/gallery", label: "Customer Gallery" },
                { to: "/contact", label: "Contact Us" },
              ].map((link, index) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <Link
                    href={link.to}
                    className="opacity-70 hover:opacity-100 hover:text-[var(--blush-pink)] transition-all inline-block hover:translate-x-1 touch-manipulation"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-base md:text-lg font-medium mb-3 md:mb-4 font-['Playfair_Display']">
              Connect With Us
            </h4>
            <div className="flex gap-4">
              <motion.a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 md:p-4 rounded-full bg-white hover:bg-[var(--blush-pink)] hover:text-white transition-all shadow-md hover:shadow-lg touch-manipulation min-w-[48px] min-h-[48px] flex items-center justify-center"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </motion.a>
              <motion.a
                href="https://instagram.com/apsaraangan"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 md:p-4 rounded-full bg-white hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 hover:text-white transition-all shadow-md hover:shadow-lg touch-manipulation min-w-[48px] min-h-[48px] flex items-center justify-center"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </motion.a>
            </div>
            <p className="text-xs md:text-sm opacity-70 mt-4">
              Follow us for latest designs and offers
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-[var(--blush-pink)]/20 text-center text-xs md:text-sm opacity-60"
        >
          <p>&copy; {new Date().getFullYear()} Apsara Angan. All rights reserved.</p>
          <p className="mt-2">Crafted with luxury and elegance</p>
        </motion.div>
      </div>
    </footer>
  );
}
