"use client";

import { useParams } from "next/navigation";
import { ProductDetailContent } from "@/components/ProductDetailContent";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();

  return <ProductDetailContent id={id} />;
}

