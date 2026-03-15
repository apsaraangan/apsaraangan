import type { Metadata } from "next";
import "./globals.css";
import { ShopProvider } from "@/context/ShopContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.apsaraangan.com"), // ⚠️ Replace with your actual domain
  title: {
    default: "Apsara Angan — Handcrafted Custom Jewellery in India",
    template: "%s | Apsara Angan",
  },
  description:
    "Apsara Angan creates bespoke resin and traditional jewellery — crafted by hand for brides, weddings, and festive occasions. Custom orders & ready-to-ship pieces.",
  keywords: [
    "custom jewellery India",
    "resin jewellery",
    "handmade jewellery",
    "bridal jewellery",
    "traditional jewellery",
    "custom resin earrings",
    "botanical jewellery",
    "kaleeras",
    "jhumka earrings",
    "maang tikka",
    "hathphool",
    "Apsara Angan",
  ],
  authors: [{ name: "Apsara Angan" }],
  creator: "Apsara Angan",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.apsaraangan.com",
    siteName: "Apsara Angan",
    title: "Apsara Angan — Handcrafted Custom Jewellery",
    description:
      "Bespoke resin and traditional jewellery handcrafted for brides, weddings, and festive celebrations across India.",
    images: [
      {
        url: "/og-image.jpg", // Add a 1200x630 OG image to your /public folder
        width: 1200,
        height: 630,
        alt: "Apsara Angan Handcrafted Jewellery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apsara Angan — Handcrafted Custom Jewellery",
    description:
      "Bespoke resin and traditional jewellery handcrafted for brides and festive occasions.",
    images: [
      "https://res.cloudinary.com/dofqzajjb/image/upload/v1773471877/WhatsApp_Image_2026-03-12_at_1.10.18_AM__1_-removebg-preview_ly47fc.png",
    ],
  },
  icons: {
    icon:
      "https://res.cloudinary.com/dofqzajjb/image/upload/v1773471877/WhatsApp_Image_2026-03-12_at_1.10.18_AM__1_-removebg-preview_ly47fc.png",
    shortcut:
      "https://res.cloudinary.com/dofqzajjb/image/upload/v1773471877/WhatsApp_Image_2026-03-12_at_1.10.18_AM__1_-removebg-preview_ly47fc.png",
    apple:
      "https://res.cloudinary.com/dofqzajjb/image/upload/v1773471877/WhatsApp_Image_2026-03-12_at_1.10.18_AM__1_-removebg-preview_ly47fc.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // google: "your-google-site-verification-code", // Uncomment & add your code
  },
};

// JSON-LD Structured Data — LocalBusiness schema
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "JewelryStore",
  name: "Apsara Angan",
  description:
    "Handcrafted custom resin and traditional jewellery for brides, weddings, and festive occasions.",
  url: "https://www.apsaraangan.com",
  telephone: "+919270163206",
    email: "apsaraangan@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  sameAs: [
    "https://instagram.com/apsaraangan",
    "https://wa.me/+919270163206",
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "10:00",
      closes: "19:00",
    },
  ],
  priceRange: "₹500 - ₹10000",
  currenciesAccepted: "INR",
  paymentAccepted: "Cash, Bank Transfer, UPI",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Jewellery Collections",
    itemListElement: [
      {
        "@type": "OfferCatalog",
        name: "Resin Jewellery",
        description: "Handcrafted resin full sets, necklaces, earrings, hathphool, bindi, rings, kaleeras, ear chains, and hair accessories",
      },
      {
        "@type": "OfferCatalog",
        name: "Traditional Jewellery",
        description: "Heritage Indian jewellery including kaleeras, hathphool, jhumkas, necklace sets, gold bangles, and maang tikka",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ShopProvider>
          <Navigation />
          <ScrollToTop>
            <main>{children}</main>
          </ScrollToTop>
          <Footer />
        </ShopProvider>
      </body>
    </html>
  );
}
