"use client";

import { MessageCircle } from "lucide-react";
import { motion } from "motion/react";

interface WhatsAppButtonProps {
  message?: string;
  className?: string;
  variant?: "primary" | "secondary";
  children?: React.ReactNode;
}

// WhatsApp number (country code + number, no + or spaces)
const WHATSAPP_NUMBER = "918103146100";

export function WhatsAppButton({
  message = "Hi! I'd like to know more about your jewellery",
  className = "",
  variant = "primary",
  children,
}: WhatsAppButtonProps) {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, "_blank");
  };

  const base =
    "inline-flex items-center justify-center gap-2 px-4 md:px-6 py-3 rounded-full transition-all font-medium touch-manipulation";
  const variants = {
    primary:
      "bg-gradient-to-r from-[var(--blush-pink)] to-[var(--blush-pink-dark)] hover:from-[var(--blush-pink-dark)] hover:to-[var(--blush-pink)] text-white shadow-md hover:shadow-lg",
    secondary:
      "bg-white border-2 border-[var(--blush-pink)] hover:bg-[var(--blush-pink-light)] text-[var(--blush-pink)] shadow-sm hover:shadow-md",
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      <MessageCircle size={18} className="shrink-0" />
      <span className="whitespace-nowrap">{children || "Order on WhatsApp"}</span>
    </motion.button>
  );
}
