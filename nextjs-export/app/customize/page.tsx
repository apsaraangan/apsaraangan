"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Info, CheckCircle2, Clock, Truck, Sparkles, ChevronRight } from "lucide-react";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import type { Metadata } from "next";

// Note: Since this is a client component, use a separate server component or
// add metadata in a parent layout if you need SSR SEO. For demonstration:
// export const metadata: Metadata = { ... }; — export metadata from a server component instead.

export default function Customize() {
  const [agreed, setAgreed] = useState(false);
  const [showCustomization, setShowCustomization] = useState(false);

  const handleContinue = () => {
    if (agreed) {
      setShowCustomization(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!showCustomization) {
    return (
      <div className="min-h-screen py-8 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <Info className="text-[var(--blush-pink)] mx-auto" size={40} />
            </motion.div>
            <h1 className="font-['Playfair_Display'] text-2xl md:text-4xl lg:text-5xl mb-3 md:mb-4">
              Important Instructions
            </h1>
            <p className="text-sm md:text-lg opacity-70 px-4">
              Please read carefully before placing your custom order
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-xl border border-[var(--blush-pink)]/20 space-y-6 md:space-y-8"
          >
            {/* Jewellery Set Options */}
            <div>
              <h2 className="font-['Playfair_Display'] text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6">
                Jewellery Set Options
              </h2>
              <div className="space-y-4 md:space-y-6">
                <div className="bg-gradient-to-br from-[var(--secondary)] to-[var(--blush-pink-light)]/30 p-4 md:p-6 rounded-xl md:rounded-2xl shadow-md">
                  <h3 className="text-lg md:text-xl mb-3 font-medium">Full Set</h3>
                  <div className="space-y-2 mb-4">
                    {["Necklace", "Earrings", "Hathphool / Bracelet + Ring", "Matha Patti"].map((item) => (
                      <p key={item} className="flex items-center gap-2 text-sm md:text-base">
                        <CheckCircle2 size={18} className="text-[var(--blush-pink-dark)] shrink-0" />
                        {item}
                      </p>
                    ))}
                  </div>
                  <p className="text-base md:text-lg">
                    Price range:{" "}
                    <span className="font-semibold text-[var(--blush-pink-dark)]">₹3,500 – ₹10,000</span>
                  </p>
                  <p className="text-xs md:text-sm opacity-60 mt-2">
                    (Hair accessories, kaleera and earchain not included)
                  </p>
                </div>

                <div className="bg-gradient-to-br from-[var(--secondary)] to-[var(--gold-light)]/30 p-4 md:p-6 rounded-xl md:rounded-2xl shadow-md">
                  <h3 className="text-lg md:text-xl mb-3 font-medium">Half Set</h3>
                  <div className="space-y-2 mb-4">
                    <p className="flex items-center gap-2 text-sm md:text-base">
                      <CheckCircle2 size={18} className="text-[var(--blush-pink-dark)] shrink-0" />
                      Earrings + Necklace
                    </p>
                    <p className="text-xs opacity-60 pl-6">OR</p>
                    <p className="flex items-center gap-2 text-sm md:text-base">
                      <CheckCircle2 size={18} className="text-[var(--blush-pink-dark)] shrink-0" />
                      Earrings + Hathphool
                    </p>
                  </div>
                  <p className="text-base md:text-lg">
                    Price range:{" "}
                    <span className="font-semibold text-[var(--blush-pink-dark)]">₹2,000 – ₹7,000</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Single Article Prices */}
            <div>
              <h2 className="font-['Playfair_Display'] text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6">
                Single Article Prices
              </h2>
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                {[
                  { name: "Hair Accessories", price: "₹500 – ₹4,000" },
                  { name: "Hathphool", price: "₹2,000 – ₹5,000" },
                  { name: "Earrings", price: "₹500 – ₹3,000" },
                  { name: "Ring / Hathphool", price: "₹500 – ₹3,000" },
                  { name: "Earchain", price: "₹400 – ₹3,000" },
                ].map((item) => (
                  <div
                    key={item.name}
                    className="p-3 md:p-4 bg-gradient-to-br from-[var(--secondary)] to-[var(--blush-pink-light)]/20 rounded-xl shadow-sm"
                  >
                    <p className="opacity-70 text-xs md:text-sm mb-1">{item.name}</p>
                    <p className="text-sm md:text-lg font-medium text-[var(--blush-pink-dark)]">{item.price}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs md:text-sm opacity-70 italic">
                * Price depends on the amount of resin used. More resin means higher price.
              </p>
            </div>

            {/* Customization Process */}
            <div>
              <h2 className="font-['Playfair_Display'] text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6">
                Customization Process
              </h2>
              <div className="space-y-4">
                {[
                  { num: "1", title: "Select Design Structure", desc: "Choose flower size (big/medium/small/mix), leaves (with or without), and charms selection" },
                  { num: "2", title: "Share Outfit Reference", desc: "Upload an HD outfit photo. Colors will be matched to complement your look (single color, multiple colors, mix tones, or ombré effect)" },
                ].map((step) => (
                  <div key={step.num} className="flex gap-3 md:gap-4">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-[var(--blush-pink)] to-[var(--blush-pink-dark)] flex items-center justify-center text-white font-medium shadow-md">
                      {step.num}
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg mb-1 md:mb-2 font-medium">{step.title}</h3>
                      <p className="opacity-70 text-sm md:text-base leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Booking Process */}
            <div className="bg-gradient-to-br from-[var(--blush-pink-light)] to-[var(--gold-light)] p-5 md:p-6 rounded-xl md:rounded-2xl shadow-lg">
              <h2 className="font-['Playfair_Display'] text-lg md:text-2xl mb-4 flex items-center gap-2">
                <Info size={20} className="shrink-0" />
                Booking Process
              </h2>
              <div className="space-y-2 md:space-y-3">
                {[
                  "₹500 booking fee to secure your date",
                  "Design discussion and finalization via call",
                  "Photos and videos shared after completion",
                  "Revisions accommodated if required",
                  "Remaining balance payable before dispatch ✨",
                ].map((item, i) => (
                  <p key={i} className="flex items-start gap-2 text-sm md:text-base">
                    <CheckCircle2 size={18} className="shrink-0 mt-0.5" />
                    {item}
                  </p>
                ))}
              </div>
            </div>

            {/* Making & Delivery */}
            <div>
              <h2 className="font-['Playfair_Display'] text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6">
                Making & Delivery
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="flex gap-3 md:gap-4 items-start bg-[var(--secondary)] p-4 rounded-xl">
                  <Clock size={24} className="text-[var(--blush-pink-dark)] flex-shrink-0" />
                  <div>
                    <h3 className="text-base md:text-lg mb-1 md:mb-2 font-medium">Making Time</h3>
                    <p className="opacity-70 text-sm md:text-base">4-5 days</p>
                  </div>
                </div>
                <div className="flex gap-3 md:gap-4 items-start bg-[var(--secondary)] p-4 rounded-xl">
                  <Truck size={24} className="text-[var(--blush-pink-dark)] flex-shrink-0" />
                  <div>
                    <h3 className="text-base md:text-lg mb-1 md:mb-2 font-medium">Delivery (India)</h3>
                    <p className="opacity-70 text-sm md:text-base">Normal: 6-7 days (₹180)</p>
                    <p className="opacity-70 text-sm md:text-base">Express: 2-3 days</p>
                    <p className="text-xs md:text-sm opacity-60 mt-2">International shipping available</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Important Note */}
            <div className="bg-[var(--blush-pink)]/20 border-2 border-[var(--blush-pink)] p-4 md:p-6 rounded-xl md:rounded-2xl">
              <p className="flex items-start gap-3">
                <Sparkles size={24} className="flex-shrink-0 mt-1 text-[var(--gold)]" />
                <span className="text-sm md:text-lg leading-relaxed">
                  Each jewellery piece is custom handmade, so please book your slot in advance to start the making process.
                </span>
              </p>
            </div>

            {/* Agreement */}
            <div className="pt-6 border-t border-[var(--blush-pink)]/20">
              <div className="flex items-start gap-3 mb-6 p-4 bg-[var(--blush-pink-light)]/30 rounded-xl">
                <input
                  id="agree"
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-[var(--blush-pink-dark)] cursor-pointer"
                />
                <label htmlFor="agree" className="cursor-pointer text-sm md:text-base">
                  I have read and understood all the instructions
                </label>
              </div>

              <motion.button
                onClick={handleContinue}
                disabled={!agreed}
                whileHover={agreed ? { scale: 1.02 } : {}}
                whileTap={agreed ? { scale: 0.98 } : {}}
                className={`w-full py-3 md:py-4 rounded-full transition-all font-medium flex items-center justify-center gap-2 min-h-[48px] ${
                  agreed
                    ? "bg-gradient-to-r from-[var(--blush-pink)] to-[var(--blush-pink-dark)] text-white shadow-lg hover:shadow-xl"
                    : "bg-gray-200 cursor-not-allowed opacity-50 text-gray-600"
                }`}
              >
                Continue to Customization
                <ChevronRight size={20} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key="customization"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-8 md:mb-12"
            >
              <h1 className="font-['Playfair_Display'] text-2xl md:text-4xl lg:text-5xl mb-3 md:mb-4">
                Customize Your Jewellery
              </h1>
              <p className="text-sm md:text-lg opacity-70 px-4">
                Let's create something beautiful together
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-gradient-to-br from-white via-[var(--blush-pink-light)]/20 to-white rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-2xl border border-[var(--blush-pink)]/20"
            >
              <div className="text-center space-y-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-[var(--blush-pink)] to-[var(--gold)] flex items-center justify-center mx-auto shadow-xl"
                >
                  <Sparkles size={32} className="text-white" />
                </motion.div>

                <h2 className="font-['Playfair_Display'] text-xl md:text-2xl lg:text-3xl">
                  Ready to Start Your Custom Order?
                </h2>
                <p className="text-sm md:text-lg opacity-70 max-w-2xl mx-auto px-4 leading-relaxed">
                  Contact us on WhatsApp to discuss your design preferences, share your outfit reference, and book your slot.
                </p>

                <div className="pt-4 md:pt-6">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <WhatsAppButton
                      message="Hi! I'd like to customize jewellery. I've read all the instructions and I'm ready to discuss my design."
                      className="text-sm md:text-lg px-6 md:px-8 py-3 md:py-4 shadow-xl hover:shadow-2xl min-h-[52px]"
                    >
                      Start Customization on WhatsApp
                    </WhatsAppButton>
                  </motion.div>
                </div>

                <button
                  onClick={() => setShowCustomization(false)}
                  className="text-xs md:text-sm opacity-60 hover:opacity-100 transition-opacity underline min-h-[44px] touch-manipulation"
                >
                  Back to Instructions
                </button>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
