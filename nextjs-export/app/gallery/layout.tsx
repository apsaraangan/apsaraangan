import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Gallery — Jewellery Worn By You",
  description:
    "See how real customers style their Apsara Angan jewellery — bridal looks, festive occasions, and everyday elegance captured in our customer gallery.",
  openGraph: {
    title: "Customer Gallery | Apsara Angan",
    description:
      "Real customers wearing their Apsara Angan custom jewellery — weddings, haldi ceremonies, receptions, and festive celebrations.",
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
