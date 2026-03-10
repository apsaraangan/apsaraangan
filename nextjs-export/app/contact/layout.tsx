import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Apsara Angan for custom jewellery orders, queries, and collaborations. Reach us on WhatsApp, Instagram, or email.",
  openGraph: {
    title: "Contact Us | Apsara Angan",
    description:
      "Contact Apsara Angan for custom jewellery orders and inquiries — WhatsApp, email, and Instagram.",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
