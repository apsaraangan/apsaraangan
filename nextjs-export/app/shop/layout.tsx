import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ready to Ship Jewellery",
  description:
    "Shop handcrafted resin and traditional jewellery pieces that are ready to dispatch — no waiting, straight to your door. Earrings, necklaces, rings, bracelets and more.",
  openGraph: {
    title: "Ready to Ship Jewellery | Apsara Angan",
    description:
      "Browse our ready-to-ship handcrafted jewellery collection — resin and traditional pieces dispatched within 1-2 days.",
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
