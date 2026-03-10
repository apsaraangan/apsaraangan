"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const WHATSAPP_NUMBER = "919876543210";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useShop();

  const handleCheckout = () => {
    const details = cart
      .map((item) => `${item.name} (x${item.quantity}) - ₹${(item.price * item.quantity).toLocaleString()}`)
      .join("\n");
    const total = getCartTotal();
    const msg = `Hi! I'd like to place an order:\n\n${details}\n\nTotal: ₹${total.toLocaleString()}\n\nPlease confirm availability and delivery details.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  if (cart.length === 0) {
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
              <ShoppingBag className="text-[var(--blush-pink)] mx-auto" size={64} />
            </motion.div>
            <h1 className="font-['Playfair_Display'] text-2xl md:text-4xl mb-4">Your Bag is Empty</h1>
            <p className="text-sm md:text-lg opacity-70 mb-8">Add some beautiful pieces to your bag</p>
            <Link href="/#our-collections">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-[var(--blush-pink)] to-[var(--blush-pink-dark)] text-white rounded-full shadow-lg hover:shadow-xl transition-all font-medium min-h-[48px]"
              >
                Continue Shopping <ArrowRight size={20} />
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
          <h1 className="font-['Playfair_Display'] text-2xl md:text-4xl lg:text-5xl mb-2">Shopping Bag</h1>
          <p className="text-sm md:text-base opacity-70">
            {cart.length} {cart.length === 1 ? "item" : "items"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

          {/* Cart items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, height: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex gap-4 bg-white rounded-xl md:rounded-2xl p-4 md:p-5 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-xl overflow-hidden bg-[var(--secondary)] shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <h3 className="text-sm md:text-base font-medium line-clamp-2">{item.name}</h3>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center shrink-0"
                        aria-label="Remove item"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </div>
                    <p className="text-[10px] md:text-xs opacity-50 mb-2 uppercase tracking-wide">
                      {item.category}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 md:gap-2 bg-[var(--secondary)] rounded-full p-1">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 md:w-8 md:h-8 rounded-full hover:bg-[var(--blush-pink-light)] transition-colors flex items-center justify-center"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={14} />
                        </motion.button>
                        <span className="w-6 md:w-8 text-center text-sm md:text-base font-medium">
                          {item.quantity}
                        </span>
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 md:w-8 md:h-8 rounded-full hover:bg-[var(--blush-pink-light)] transition-colors flex items-center justify-center"
                          aria-label="Increase quantity"
                        >
                          <Plus size={14} />
                        </motion.button>
                      </div>
                      <span className="text-sm md:text-lg font-medium text-[var(--blush-pink-dark)]">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-xl border border-[var(--blush-pink)]/20 sticky top-24">
              <h2 className="font-['Playfair_Display'] text-xl md:text-2xl mb-4 md:mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 border-b border-[var(--blush-pink)]/20 pb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm md:text-base">
                    <span className="opacity-70 truncate mr-2">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="shrink-0">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between mb-6">
                <span className="text-base md:text-lg font-medium">Total</span>
                <span className="text-lg md:text-2xl font-medium text-[var(--blush-pink-dark)]">
                  ₹{getCartTotal().toLocaleString()}
                </span>
              </div>

              <p className="text-xs md:text-sm opacity-60 mb-4 text-center">
                Delivery charges calculated at checkout
              </p>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="w-full flex items-center justify-center gap-2 py-3 md:py-4 bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full font-medium shadow-lg hover:shadow-xl transition-all min-h-[52px]"
              >
                <ShoppingBag size={20} />
                Order via WhatsApp
              </motion.button>

              <div className="mt-4 text-center">
                <Link
                  href="/#our-collections"
                  className="text-sm opacity-60 hover:opacity-100 hover:text-[var(--blush-pink)] transition-all underline"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
