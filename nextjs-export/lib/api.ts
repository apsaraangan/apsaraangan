import type { Product } from "./data";

const API_BASE_URL =
  (typeof process !== "undefined" &&
    // Vite / browser env may not expose NEXT_PUBLIC_*, so fall back to localhost
    (process as any)?.env &&
    (process as any).env.NEXT_PUBLIC_API_BASE_URL) ||
  "http://localhost:4000";

const mapAnyToProduct = (p: any): Product => {
  const images = Array.isArray(p.imageUrls) && p.imageUrls.length
    ? p.imageUrls
    : p.imageUrl || p.image
      ? [p.imageUrl || p.image]
      : undefined;
  const primaryImage = images?.[0] || p.imageUrl || p.image;
  return {
    id: p._id || p.id,
    name: p.name,
    price: p.price,
    image: primaryImage,
    category: p.categoryName || p.category,
    description: p.description,
    inStock: p.inStock,
    images,
    videoUrl: p.videoUrl,
  };
};

export async function fetchCategoryProducts(slug: string): Promise<Product[]> {
  const res = await fetch(
    `${API_BASE_URL}/api/products?categorySlug=${encodeURIComponent(slug)}`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const json = await res.json();

  return json.map(mapAnyToProduct);
}

export async function fetchProductById(
  id: string
): Promise<{ product: Product; suggested: Product[] }> {
  try {
    const res = await fetch(
      `${API_BASE_URL}/api/products/${encodeURIComponent(id)}`
    );

    if (res.ok) {
      const json = await res.json();

      if (json.product) {
        return {
          product: mapAnyToProduct(json.product),
          suggested: Array.isArray(json.suggested)
            ? json.suggested.map(mapAnyToProduct)
            : [],
        };
      }

      return {
        product: mapAnyToProduct(json),
        suggested: [],
      };
    }
  } catch {
    // Intentionally ignored; we try a broader fallback below.
  }

  // Fallback: fetch all products and locate by id locally.
  const allRes = await fetch(`${API_BASE_URL}/api/products`);
  if (!allRes.ok) {
    throw new Error("Failed to fetch product");
  }
  const allJson = await allRes.json();

  const match = (allJson as any[]).find(
    (p) => String(p._id || p.id) === String(id)
  );

  if (!match) {
    throw new Error("Product not found");
  }

  const product = mapAnyToProduct(match);

  const suggested = (allJson as any[])
    .filter((p) => String(p._id || p.id) !== String(id))
    .filter(
      (p) =>
        (p.categorySlug && p.categorySlug === match.categorySlug) ||
        (p.categoryName && p.categoryName === match.categoryName)
    )
    .slice(0, 4)
    .map(mapAnyToProduct);

  return { product, suggested };
}

export async function fetchReadyToShipProducts(): Promise<Product[]> {
  const res = await fetch(
    `${API_BASE_URL}/api/products?readyToShip=true`
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const json = await res.json();

  return json.map(mapAnyToProduct);
}

export { API_BASE_URL };

export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  let id = localStorage.getItem("apsara_session_id");
  if (!id) {
    id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : "s_" + Math.random().toString(36).slice(2) + Date.now().toString(36);
    localStorage.setItem("apsara_session_id", id);
  }
  return id;
}

export async function fetchCart(sessionId: string): Promise<{ id: string | number; name: string; price: number; image: string; category: string; description?: string; inStock?: boolean; quantity: number }[]> {
  const res = await fetch(`${API_BASE_URL}/api/cart?sessionId=${encodeURIComponent(sessionId)}`);
  if (!res.ok) throw new Error("Failed to fetch cart");
  const items = await res.json();
  return items.map((i: any) => ({
    id: i.productId,
    name: i.name,
    price: i.price,
    image: i.image,
    category: i.category,
    description: i.description,
    inStock: i.inStock,
    quantity: i.quantity,
  }));
}

export async function addToCartApi(sessionId: string, product: { id?: string | number; name: string; price: number; image: string; category: string; description?: string; inStock?: boolean }): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/cart`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, product }),
  });
  if (!res.ok) throw new Error("Failed to add to cart");
}

export async function removeFromCartApi(sessionId: string, productId: string | number): Promise<void> {
  const res = await fetch(
    `${API_BASE_URL}/api/cart/${encodeURIComponent(String(productId))}?sessionId=${encodeURIComponent(sessionId)}`,
    { method: "DELETE" }
  );
  if (!res.ok) throw new Error("Failed to remove from cart");
}

export async function updateCartQuantityApi(
  sessionId: string,
  productId: string | number,
  quantity: number
): Promise<void> {
  const res = await fetch(
    `${API_BASE_URL}/api/cart/${encodeURIComponent(String(productId))}/quantity`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId, quantity }),
    }
  );
  if (!res.ok) throw new Error("Failed to update quantity");
}

export async function fetchFavorites(sessionId: string): Promise<{ id: string | number; name: string; price: number; image: string; category: string; description?: string; inStock?: boolean }[]> {
  const res = await fetch(`${API_BASE_URL}/api/favorites?sessionId=${encodeURIComponent(sessionId)}`);
  if (!res.ok) throw new Error("Failed to fetch favorites");
  const items = await res.json();
  return items.map((i: any) => ({
    id: i.productId,
    name: i.name,
    price: i.price,
    image: i.image,
    category: i.category,
    description: i.description,
    inStock: i.inStock,
  }));
}

export async function addToFavoritesApi(sessionId: string, product: { id?: string | number; name: string; price: number; image: string; category: string; description?: string; inStock?: boolean }): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/favorites`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ sessionId, product }),
  });
  if (!res.ok) throw new Error("Failed to add to favorites");
}

export async function removeFromFavoritesApi(sessionId: string, productId: string | number): Promise<void> {
  const res = await fetch(
    `${API_BASE_URL}/api/favorites/${encodeURIComponent(String(productId))}?sessionId=${encodeURIComponent(sessionId)}`,
    { method: "DELETE" }
  );
  if (!res.ok) throw new Error("Failed to remove from favorites");
}

// Gallery (Jewelry Worn By You)
export interface GalleryImageItem {
  _id: string;
  imageUrl: string;
  alt: string;
  customerName: string;
  order?: number;
}

export async function fetchGalleryImages(): Promise<GalleryImageItem[]> {
  const res = await fetch(`${API_BASE_URL}/api/gallery`);
  if (!res.ok) throw new Error("Failed to fetch gallery images");
  return res.json();
}

export async function addGalleryImageApi(
  adminKey: string,
  data: { image?: File; imageUrl?: string; alt?: string; customerName: string }
): Promise<GalleryImageItem> {
  const formData = new FormData();
  formData.append("customerName", data.customerName);
  if (data.alt) formData.append("alt", data.alt);
  if (data.image) formData.append("image", data.image);
  else if (data.imageUrl) formData.append("imageUrl", data.imageUrl);

  const res = await fetch(`${API_BASE_URL}/api/gallery/admin`, {
    method: "POST",
    headers: { "x-admin-key": adminKey },
    body: formData,
  });
  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.message || "Failed to add gallery image");
  }
  return res.json();
}

export async function updateGalleryImageApi(
  adminKey: string,
  id: string,
  data: { image?: File; imageUrl?: string; alt?: string; customerName?: string }
): Promise<GalleryImageItem> {
  const formData = new FormData();
  if (data.customerName !== undefined) formData.append("customerName", data.customerName);
  if (data.alt !== undefined) formData.append("alt", data.alt);
  if (data.image) formData.append("image", data.image);
  else if (data.imageUrl) formData.append("imageUrl", data.imageUrl);

  const res = await fetch(`${API_BASE_URL}/api/gallery/admin/${id}`, {
    method: "PUT",
    headers: { "x-admin-key": adminKey },
    body: formData,
  });
  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.message || "Failed to update gallery image");
  }
  return res.json();
}

export async function deleteGalleryImageApi(adminKey: string, id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/api/gallery/admin/${id}`, {
    method: "DELETE",
    headers: { "x-admin-key": adminKey },
  });
  if (!res.ok) throw new Error("Failed to delete gallery image");
}

export async function seedGalleryApi(adminKey: string): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE_URL}/api/gallery/admin/seed`, {
    method: "POST",
    headers: { "x-admin-key": adminKey },
  });
  if (!res.ok) throw new Error("Failed to seed gallery");
  return res.json();
}

