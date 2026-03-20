import { useEffect } from "react";

const BASE_URL = "https://www.apsaraangan.in";
const DEFAULT_OG_IMAGE =
  "https://res.cloudinary.com/dofqzajjb/image/upload/v1773471877/WhatsApp_Image_2026-03-12_at_1.10.18_AM__1_-removebg-preview_ly47fc.png";
const DEFAULT_TITLE = "Apsara Angan — Handcrafted Custom Jewellery in India";
const DEFAULT_DESCRIPTION =
  "Apsara Angan creates bespoke resin and traditional jewellery — crafted by hand for brides, weddings, and festive occasions. Custom orders & ready-to-ship pieces.";

type SeoConfig = {
  title: string;
  description: string;
  canonicalPath: string;
  image?: string;
  noindex?: boolean;
};

function upsertMetaByName(name: string, content: string) {
  let tag = document.head.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertMetaByProperty(property: string, content: string) {
  let tag = document.head.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertCanonical(url: string) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
}

function routeSeo(pathname: string): SeoConfig {
  if (pathname === "/") {
    return {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESCRIPTION,
      canonicalPath: "/",
    };
  }

  if (pathname.startsWith("/shop")) {
    return {
      title: "Ready to Ship Jewellery | Apsara Angan",
      description:
        "Shop handcrafted resin and traditional jewellery pieces that are ready to dispatch. Earrings, necklaces, rings, bracelets and more.",
      canonicalPath: "/shop",
    };
  }

  if (pathname.startsWith("/customize")) {
    return {
      title: "Customize Your Jewellery | Apsara Angan",
      description:
        "Create your bespoke resin or traditional jewellery with Apsara Angan. Share your outfit reference and get handcrafted pieces in 4-5 days.",
      canonicalPath: "/customize",
    };
  }

  if (pathname.startsWith("/gallery")) {
    return {
      title: "Customer Gallery | Apsara Angan",
      description:
        "See how customers style their Apsara Angan jewellery for weddings, haldi, receptions, and festive occasions.",
      canonicalPath: "/gallery",
    };
  }

  if (pathname.startsWith("/contact")) {
    return {
      title: "Contact Us | Apsara Angan",
      description:
        "Contact Apsara Angan for custom jewellery orders and inquiries via WhatsApp, Instagram, or email.",
      canonicalPath: "/contact",
    };
  }

  if (pathname.startsWith("/category/")) {
    const slug = pathname.split("/category/")[1] || "";
    const readable = decodeURIComponent(slug)
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());

    return {
      title: `${readable} | Apsara Angan`,
      description: `Explore handcrafted ${readable} jewellery by Apsara Angan. Browse designs and customize pieces for weddings and festive occasions.`,
      canonicalPath: `/category/${slug}`,
    };
  }

  if (pathname.startsWith("/product/")) {
    const id = pathname.split("/product/")[1] || "";
    return {
      title: "Product Details | Apsara Angan",
      description:
        "View handcrafted jewellery product details, pricing, and customization options at Apsara Angan.",
      canonicalPath: `/product/${id}`,
    };
  }

  if (pathname === "/cart" || pathname === "/favorites" || pathname === "/adminaddproducts") {
    return {
      title: "Apsara Angan",
      description: DEFAULT_DESCRIPTION,
      canonicalPath: pathname,
      noindex: true,
    };
  }

  return {
    title: "Apsara Angan",
    description: DEFAULT_DESCRIPTION,
    canonicalPath: pathname || "/",
  };
}

export function Seo({ pathname }: { pathname: string }) {
  useEffect(() => {
    const config = routeSeo(pathname);
    const canonicalUrl = `${BASE_URL}${config.canonicalPath}`;
    const image = config.image || DEFAULT_OG_IMAGE;

    document.title = config.title;
    upsertMetaByName("description", config.description);
    upsertMetaByName("robots", config.noindex ? "noindex,nofollow" : "index,follow");

    upsertMetaByProperty("og:type", "website");
    upsertMetaByProperty("og:locale", "en_IN");
    upsertMetaByProperty("og:title", config.title);
    upsertMetaByProperty("og:description", config.description);
    upsertMetaByProperty("og:url", canonicalUrl);
    upsertMetaByProperty("og:image", image);

    upsertMetaByName("twitter:card", "summary_large_image");
    upsertMetaByName("twitter:title", config.title);
    upsertMetaByName("twitter:description", config.description);
    upsertMetaByName("twitter:image", image);

    upsertCanonical(canonicalUrl);
  }, [pathname]);

  return null;
}
