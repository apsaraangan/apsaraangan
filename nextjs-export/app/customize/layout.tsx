import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customize Your Jewellery",
  description:
    "Create your bespoke resin or traditional jewellery with Apsara Angan. Full sets from ₹3,500, half sets from ₹2,000. 4-5 days making time with delivery across India.",
  openGraph: {
    title: "Customize Your Jewellery | Apsara Angan",
    description:
      "Order custom resin or traditional jewellery — bridal sets, festive pieces, and everyday elegance crafted to your specifications.",
  },
};

export default function CustomizeLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
