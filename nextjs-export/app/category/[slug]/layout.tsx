import type { Metadata } from "next";
import { categoryData } from "@/lib/data";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = categoryData[slug];

  if (!category) {
    return {
      title: "Category Not Found",
      description: "The jewellery category you're looking for could not be found.",
    };
  }

  const isTraditional = category.collection === "traditional";
  const keywords = isTraditional
    ? ["traditional Indian jewellery", "bridal jewellery", "gold jewellery India", category.title]
    : ["resin jewellery", "handmade jewellery", "botanical jewellery", category.title];

  return {
    title: `${category.title} — ${isTraditional ? "Traditional" : "Resin"} Jewellery`,
    description: `${category.subtitle} — handcrafted by Apsara Angan. Browse our ${category.title.toLowerCase()} collection and customize your perfect piece.`,
    keywords: [...keywords, "Apsara Angan", "custom jewellery India"],
    openGraph: {
      title: `${category.title} | Apsara Angan`,
      description: `${category.subtitle}. Shop or customize ${category.title.toLowerCase()} at Apsara Angan.`,
      images: category.products[0]
        ? [{ url: category.products[0].image, alt: category.title }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.title} | Apsara Angan`,
      description: `${category.subtitle}. Handcrafted ${category.title.toLowerCase()} by Apsara Angan.`,
    },
  };
}

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
