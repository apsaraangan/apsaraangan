"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { ShoppingBag, ArrowLeft, CreditCard, Banknote, CheckCircle2 } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { fetchCheckoutInfo, type CheckoutInfo } from "@/lib/checkout";
import { appendOrderIdToMessage } from "@/lib/whatsapp";

type PaymentMethod = "cod" | "paynow" | null;

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, getCartTotal } = useShop();
  const [checkoutInfo, setCheckoutInfo] = useState<CheckoutInfo | null>(null);
  const [selectedPayment, setSelectedPayment] = useState<PaymentMethod>(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const info = await fetchCheckoutInfo();
      if (!mounted) return;
      setCheckoutInfo(info);
      if (!info && cart.length > 0) {
        router.replace("/cart");
      }
    })();
    return () => {
      mounted = false;
    };
  }, [cart.length, router]);

  const handlePlaceOrder = () => {
    if (!selectedPayment || !checkoutInfo || cart.length === 0) return;

    const phone = "+919270163206"; // WhatsApp number
    const itemsText = cart
      .map(
        (item, index) =>
          `${index + 1}. ${item.name} (Qty: ${item.quantity}) - ₹${(
            item.price * item.quantity
          ).toLocaleString()}`
      )
      .join("\n");

    const total = getCartTotal();
    const paymentText =
      selectedPayment === "cod" ? "Cash on Delivery (COD)" : "Pay Now";

    const message = appendOrderIdToMessage(
      `Hi! I want to place an order from the website.\n\n` +
      `Name: ${checkoutInfo.name}\n` +
      `Phone: ${checkoutInfo.number}\n` +
      `Address: ${checkoutInfo.defaultAddress}\n\n` +
      `Items in cart:\n${itemsText}\n\n` +
      `Total: ₹${total.toLocaleString()}\n` +
      `Payment option chosen: ${paymentText}`
    );

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    if (typeof window !== "undefined") {
      window.location.href = url;
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen py-8 md:py-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto px-4 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--blush-pink)] to-[var(--blush-pink-dark)] flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle2 size={40} className="text-white" />
          </motion.div>
          <h1 className="font-['Playfair_Display'] text-2xl md:text-3xl mb-3">
            Order Placed Successfully!
          </h1>
          <p className="text-sm md:text-base opacity-70 mb-6">
            {selectedPayment === "cod"
              ? "Pay when your order arrives. We'll contact you soon for delivery."
              : "Your payment will be processed shortly. We'll contact you for delivery."}
          </p>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--blush-pink)] to-[var(--blush-pink-dark)] text-white rounded-full font-medium shadow-lg hover:shadow-xl"
            >
              Continue Shopping
              <ArrowLeft size={18} className="rotate-180" />
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (!checkoutInfo || cart.length === 0) {
    return (
      <div className="min-h-screen py-8 md:py-16 flex items-center justify-center">
        <div className="text-center">
          <p className="opacity-70 mb-4">Loading checkout...</p>
          <Link
            href="/cart"
            className="text-[var(--blush-pink-dark)] hover:underline"
          >
            Back to Cart
          </Link>
        </div>
      </div>
    );
  }

  const total = getCartTotal();

  return (
    <div className="min-h-screen py-8 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-[var(--blush-pink-dark)] hover:text-[var(--blush-pink)] mb-8 transition-colors"
        >
          <ArrowLeft size={18} />
          Back to Cart
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {/* Delivery Info & Order Summary */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-[var(--blush-pink)]/20">
              <h2 className="font-['Playfair_Display'] text-xl md:text-2xl mb-4">
                Delivery Details
              </h2>
              <div className="space-y-2 text-sm md:text-base opacity-80">
                <p className="font-medium text-foreground">{checkoutInfo.name}</p>
                <p>{checkoutInfo.number}</p>
                <p className="pt-2">
                  <span className="font-medium text-[var(--blush-pink-dark)]">Default:</span>{" "}
                  {checkoutInfo.defaultAddress}
                </p>
                {checkoutInfo.otherAddresses?.length > 0 &&
                  checkoutInfo.otherAddresses.filter(Boolean).map((addr, i) => (
                    <p key={i}>
                      <span className="font-medium text-[var(--blush-pink-dark)]">
                        Address {i + 2}:
                      </span>{" "}
                      {addr}
                    </p>
                  ))}
              </div>
            </div>

            {/* Order items */}
            <div className="bg-white rounded-2xl p-6 shadow-xl border border-[var(--blush-pink)]/20">
              <h2 className="font-['Playfair_Display'] text-xl md:text-2xl mb-4">
                Order Summary
              </h2>
              <div className="space-y-3">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-3 items-center"
                  >
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-[var(--secondary)] shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium line-clamp-1">{item.name}</p>
                      <p className="text-xs opacity-60">
                        Qty: {item.quantity} × ₹{item.price.toLocaleString()}
                      </p>
                    </div>
                    <span className="text-sm font-medium text-[var(--blush-pink-dark)] shrink-0">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl border border-[var(--blush-pink)]/20 sticky top-24">
              <h2 className="font-['Playfair_Display'] text-xl md:text-2xl mb-6">
                Payment Method
              </h2>

              <div className="space-y-3 mb-6">
                <button
                  type="button"
                  onClick={() => setSelectedPayment("cod")}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                    selectedPayment === "cod"
                      ? "border-[var(--blush-pink)] bg-[var(--blush-pink-light)]/50"
                      : "border-[var(--border)] hover:border-[var(--blush-pink)]/50"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      selectedPayment === "cod"
                        ? "bg-[var(--blush-pink)] text-white"
                        : "bg-[var(--secondary)] text-[var(--blush-pink-dark)]"
                    }`}
                  >
                    <Banknote size={20} />
                  </div>
                  <div>
                    <p className="font-medium">Cash on Delivery (COD)</p>
                    <p className="text-xs opacity-70">Pay when you receive your order</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedPayment("paynow")}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                    selectedPayment === "paynow"
                      ? "border-[var(--blush-pink)] bg-[var(--blush-pink-light)]/50"
                      : "border-[var(--border)] hover:border-[var(--blush-pink)]/50"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      selectedPayment === "paynow"
                        ? "bg-[var(--blush-pink)] text-white"
                        : "bg-[var(--secondary)] text-[var(--blush-pink-dark)]"
                    }`}
                  >
                    <CreditCard size={20} />
                  </div>
                  <div>
                    <p className="font-medium">Pay Now</p>
                    <p className="text-xs opacity-70">UPI, Card, Net Banking</p>
                  </div>
                </button>
              </div>

              <div className="border-t border-[var(--blush-pink)]/20 pt-4 mb-6">
                <div className="flex justify-between text-lg font-medium">
                  <span>Total</span>
                  <span className="text-[var(--blush-pink-dark)]">
                    ₹{total.toLocaleString()}
                  </span>
                </div>
              </div>

              <motion.button
                whileHover={selectedPayment ? { scale: 1.02 } : {}}
                whileTap={selectedPayment ? { scale: 0.98 } : {}}
                onClick={handlePlaceOrder}
                disabled={!selectedPayment}
                className={`w-full flex items-center justify-center gap-2 py-3 md:py-4 rounded-full font-medium min-h-[52px] transition-all ${
                  selectedPayment
                    ? "bg-gradient-to-r from-[var(--blush-pink)] to-[var(--blush-pink-dark)] hover:from-[var(--blush-pink-dark)] hover:to-[var(--blush-pink)] text-white shadow-lg hover:shadow-xl"
                    : "bg-gray-200 cursor-not-allowed opacity-50 text-gray-600"
                }`}
              >
                <ShoppingBag size={20} />
                {selectedPayment === "cod"
                  ? "Place Order (COD)"
                  : selectedPayment === "paynow"
                    ? "Pay Now"
                    : "Select Payment Method"}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
