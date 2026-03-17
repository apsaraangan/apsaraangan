"use client";

import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { motion } from "motion/react";
import { Instagram, Mail, MapPin, Phone, MessageCircle, Clock } from "lucide-react";
import { WhatsAppButton } from "../../components/WhatsAppButton";

const WHATSAPP_NUMBER = "+919270163206"; // ⚠️ Replace with your number

const contactInfo = [
  { icon: Phone, title: "Phone", content: "+91 92720 16320", link: "tel:+919270163206" },
  { icon: Mail, title: "Email", content: "apsaraangan@gmail.com", link: "mailto:apsaraangan@gmail.com" },
  { icon: MapPin, title: "Address", content: "H.NO.1237, Rahul Apartment, Nandanvan Main Rd, opp. SHRAVAN HOSPITAL, near DELHI CHAP CORNER, New Nandanvan Layout, Ganesh Nagar, Azamshah Layout, Nagpur, Maharashtra 440024", link: "https://maps.app.goo.gl/RUrcn4Py3kXs6oo7A?g_st=iw" },
  { icon: Instagram, title: "Instagram", content: "@apsaraangan", link: "https://www.instagram.com/apsaraangan?igsh=MWJpNGt2cHpibzV2Zg==" },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const msg = `Hi! I'm ${form.name}.\n\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage: ${form.message}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
  };

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
            <MessageCircle className="text-[var(--blush-pink)] mx-auto" size={40} />
          </motion.div>
          <h1 className="font-['Playfair_Display'] text-2xl md:text-4xl lg:text-5xl mb-3 md:mb-4">
            Get In Touch
          </h1>
          <p className="text-sm md:text-lg opacity-70 max-w-2xl mx-auto px-4">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12">

          {/* Left: Contact info + hours */}
          <div className="space-y-4 md:space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-gradient-to-br from-[var(--blush-pink-light)] via-[var(--gold-light)]/50 to-[var(--blush-pink-light)] rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-xl"
            >
              <h2 className="font-['Playfair_Display'] text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6">
                Contact Information
              </h2>
              <div className="space-y-4 md:space-y-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-3 md:gap-4"
                  >
                    <div className="p-3 bg-white rounded-full shadow-md shrink-0">
                      <item.icon size={20} className="text-[var(--blush-pink)]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm md:text-base font-medium mb-1">{item.title}</p>
                      {item.link ? (
                        <a
                          href={item.link}
                          target={item.link.startsWith("http") ? "_blank" : undefined}
                          rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="opacity-70 hover:opacity-100 transition-opacity text-sm md:text-base break-words hover:underline"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <p className="opacity-70 text-sm md:text-base">{item.content}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 md:mt-8 pt-6 md:pt-8 border-t border-black/10">
                <p className="text-sm md:text-base mb-4 font-medium">Prefer WhatsApp?</p>
                <WhatsAppButton className="w-full justify-center min-h-[48px] shadow-lg hover:shadow-xl">
                  Chat on WhatsApp
                </WhatsAppButton>
              </div>
            </motion.div>

            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-lg border border-[var(--blush-pink)]/20"
            >
              <div className="flex items-center gap-2 mb-4 md:mb-6">
                <Clock className="text-[var(--blush-pink)]" size={24} />
                <h2 className="font-['Playfair_Display'] text-lg md:text-2xl">Business Hours</h2>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm md:text-base">
                  <span className="opacity-70">Monday - Saturday</span>
                  <span className="font-medium">10:00 AM - 7:00 PM</span>
                </div>
                <div className="flex justify-between items-center text-sm md:text-base">
                  <span className="opacity-70">Sunday</span>
                  <span className="font-medium">By Appointment</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-10 shadow-xl border border-[var(--blush-pink)]/20"
          >
            <h2 className="font-['Playfair_Display'] text-xl md:text-2xl lg:text-3xl mb-4 md:mb-6">
              Send Us a Message
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              {[
                { id: "name", label: "Name", type: "text", placeholder: "Your full name" },
                { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
                { id: "phone", label: "Phone Number", type: "tel", placeholder: "+91 XXXXX XXXXX" },
              ].map((field, index) => (
                <motion.div
                  key={field.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <label htmlFor={field.id} className="block mb-2 text-sm md:text-base font-medium">
                    {field.label} *
                  </label>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    required
                    value={form[field.id as keyof typeof form]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    className="w-full h-12 md:h-14 px-4 rounded-xl border border-[var(--border)] bg-[var(--input-background)] text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[var(--blush-pink)]/40 transition"
                  />
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
              >
                <label htmlFor="message" className="block mb-2 text-sm md:text-base font-medium">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your jewellery requirements..."
                  className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-[var(--input-background)] text-sm md:text-base focus:outline-none focus:ring-2 focus:ring-[var(--blush-pink)]/40 transition resize-none"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-[var(--blush-pink)] to-[var(--blush-pink-dark)] hover:from-[var(--blush-pink-dark)] hover:to-[var(--blush-pink)] text-white py-4 md:py-5 rounded-full transition-all shadow-lg hover:shadow-xl font-medium text-sm md:text-base min-h-[52px]"
                >
                  Send Message via WhatsApp
                </motion.button>
              </motion.div>

              <p className="text-xs md:text-sm text-center opacity-60">
                Your message will be sent through WhatsApp for faster response
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
