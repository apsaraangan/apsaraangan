"use client";

import { useState, FormEvent, useEffect } from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  Package,
  ImageIcon,
  Pencil,
  Trash2,
  Plus,
  X,
} from "lucide-react";
import { categoryData, allCategorySlugs } from "@/lib/data";
import {
  API_BASE_URL,
  fetchGalleryImages,
  addGalleryImageApi,
  updateGalleryImageApi,
  deleteGalleryImageApi,
  seedGalleryApi,
  type GalleryImageItem,
} from "@/lib/api";

type ProductFromApi = {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  imageUrls?: string[];
  videoUrl?: string;
  categorySlug: string;
  categoryName: string;
  collection: "resin" | "traditional";
  description?: string;
  inStock: boolean;
  readyToShip: boolean;
};

type Tab = "products" | "gallery";

export default function AdminAddProductsPage() {
  const [adminKey, setAdminKey] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("products");

  // Products state
  const [products, setProducts] = useState<ProductFromApi[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categorySlug, setCategorySlug] = useState<string>(allCategorySlugs[0] || "");
  const [description, setDescription] = useState("");
  const [collection, setCollection] = useState<"resin" | "traditional">("resin");
  const [inStock, setInStock] = useState(true);
  const [readyToShip, setReadyToShip] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imageUrlsText, setImageUrlsText] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [editingProduct, setEditingProduct] = useState<ProductFromApi | null>(null);
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editCategorySlug, setEditCategorySlug] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editCollection, setEditCollection] = useState<"resin" | "traditional">("resin");
  const [editInStock, setEditInStock] = useState(true);
  const [editReadyToShip, setEditReadyToShip] = useState(false);
  const [editImageFiles, setEditImageFiles] = useState<File[]>([]);
  const [editImageUrlsText, setEditImageUrlsText] = useState("");
  const [editVideoUrl, setEditVideoUrl] = useState("");
  const [editVideoFile, setEditVideoFile] = useState<File | null>(null);
  const [editSubmitting, setEditSubmitting] = useState(false);

  // Gallery state
  const [galleryImages, setGalleryImages] = useState<GalleryImageItem[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [galleryError, setGalleryError] = useState<string | null>(null);

  const [galleryCustomerName, setGalleryCustomerName] = useState("");
  const [galleryAlt, setGalleryAlt] = useState("");
  const [galleryImageFile, setGalleryImageFile] = useState<File | null>(null);
  const [galleryImageUrl, setGalleryImageUrl] = useState("");
  const [gallerySubmitting, setGallerySubmitting] = useState(false);
  const [gallerySuccess, setGallerySuccess] = useState<string | null>(null);
  const [galleryErrorMsg, setGalleryErrorMsg] = useState<string | null>(null);

  const [editingGallery, setEditingGallery] = useState<GalleryImageItem | null>(null);
  const [editGalleryCustomerName, setEditGalleryCustomerName] = useState("");
  const [editGalleryAlt, setEditGalleryAlt] = useState("");
  const [editGalleryImageFile, setEditGalleryImageFile] = useState<File | null>(null);
  const [editGalleryImageUrl, setEditGalleryImageUrl] = useState("");
  const [editGallerySubmitting, setEditGallerySubmitting] = useState(false);
  const [seedingGallery, setSeedingGallery] = useState(false);

  const selectedCategory = categorySlug ? categoryData[categorySlug] : null;
  const categoryName = selectedCategory?.title ?? "";

  async function loadProducts() {
    setProductsLoading(true);
    setProductsError(null);
    try {
      const res = await fetch(`${API_BASE_URL}/api/products`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data);
    } catch (e: any) {
      setProductsError(e.message || "Failed to load products");
      setProducts([]);
    } finally {
      setProductsLoading(false);
    }
  }

  async function loadGallery() {
    setGalleryLoading(true);
    setGalleryError(null);
    try {
      const data = await fetchGalleryImages();
      setGalleryImages(data);
    } catch (e: any) {
      setGalleryError(e.message || "Failed to load gallery");
      setGalleryImages([]);
    } finally {
      setGalleryLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (activeTab === "gallery") loadGallery();
  }, [activeTab]);

  async function handleAddProduct(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);
    try {
      if (!adminKey) throw new Error("Please enter the admin key.");
      if (!name || !price || !categorySlug || !categoryName || !collection) {
        throw new Error("Please fill all required fields.");
      }
      const urlsFromText = imageUrlsText
        .split(/[\n,]+/)
        .map((u) => u.trim())
        .filter(Boolean);
      if (imageFiles.length === 0 && urlsFromText.length === 0) {
        throw new Error("Add at least one image: upload files or paste Cloudinary URLs.");
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("categorySlug", categorySlug);
      formData.append("categoryName", categoryName);
      formData.append("collection", collection);
      formData.append("description", description);
      formData.append("inStock", String(inStock));
      formData.append("readyToShip", String(readyToShip));
      if (urlsFromText.length) formData.append("imageUrls", JSON.stringify(urlsFromText));
      imageFiles.forEach((f) => formData.append("images", f));
      if (videoFile) {
        formData.append("video", videoFile);
      } else if (videoUrl.trim()) {
        formData.append("videoUrl", videoUrl.trim());
      }

      const res = await fetch(`${API_BASE_URL}/api/products/admin`, {
        method: "POST",
        headers: { "x-admin-key": adminKey },
        body: formData,
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.message || "Failed to create product.");
      }

      setSuccessMessage("Product created successfully.");
      setName("");
      setPrice("");
      setDescription("");
      setImageFiles([]);
      setImageUrlsText("");
      setVideoUrl("");
      setVideoFile(null);
      loadProducts();
    } catch (err: any) {
      setErrorMessage(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleUpdateProduct(e: FormEvent) {
    e.preventDefault();
    if (!editingProduct || !adminKey) return;
    setEditSubmitting(true);
    try {
      const formData = new FormData();
      formData.append("name", editName);
      formData.append("price", editPrice);
      formData.append("categorySlug", editCategorySlug);
      formData.append("categoryName", categoryData[editCategorySlug]?.title || editCategorySlug);
      formData.append("collection", editCollection);
      formData.append("description", editDescription);
      formData.append("inStock", String(editInStock));
      formData.append("readyToShip", String(editReadyToShip));
      const urlsFromText = editImageUrlsText
        .split(/[\n,]+/)
        .map((u) => u.trim())
        .filter(Boolean);
      if (urlsFromText.length) formData.append("imageUrls", JSON.stringify(urlsFromText));
      editImageFiles.forEach((f) => formData.append("images", f));
      if (editVideoFile) {
        formData.append("video", editVideoFile);
      } else if (editVideoUrl.trim()) {
        formData.append("videoUrl", editVideoUrl.trim());
      }

      const res = await fetch(`${API_BASE_URL}/api/products/admin/${editingProduct._id}`, {
        method: "PUT",
        headers: { "x-admin-key": adminKey },
        body: formData,
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.message || "Failed to update product.");
      }
      setEditingProduct(null);
      setSuccessMessage("Product updated successfully.");
      loadProducts();
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to update.");
    } finally {
      setEditSubmitting(false);
    }
  }

  async function handleDeleteProduct(product: ProductFromApi) {
    if (!adminKey) return;
    if (!confirm(`Delete "${product.name}"?`)) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/products/admin/${product._id}`, {
        method: "DELETE",
        headers: { "x-admin-key": adminKey },
      });
      if (!res.ok) throw new Error("Failed to delete");
      setSuccessMessage("Product deleted.");
      setEditingProduct(null);
      loadProducts();
    } catch {
      setErrorMessage("Failed to delete product.");
    }
  }

  function openEditProduct(p: ProductFromApi) {
    setEditingProduct(p);
    setEditName(p.name);
    setEditPrice(String(p.price));
    setEditCategorySlug(p.categorySlug);
    setEditDescription(p.description || "");
    setEditCollection(p.collection);
    setEditInStock(p.inStock);
    setEditReadyToShip(p.readyToShip);
    setEditImageFiles([]);
    setEditImageUrlsText((p.imageUrls || [p.imageUrl]).join("\n"));
    setEditVideoUrl(p.videoUrl || "");
    setEditVideoFile(null);
  }

  async function handleAddGallery(e: FormEvent) {
    e.preventDefault();
    if (!adminKey) {
      setGalleryErrorMsg("Please enter the admin key above.");
      return;
    }
    if (!galleryCustomerName) {
      setGalleryErrorMsg("Customer name is required.");
      return;
    }
    if (!galleryImageFile && !galleryImageUrl) {
      setGalleryErrorMsg("Please select an image or provide a URL.");
      return;
    }
    setGallerySubmitting(true);
    setGallerySuccess(null);
    setGalleryErrorMsg(null);
    try {
      await addGalleryImageApi(adminKey, {
        customerName: galleryCustomerName,
        alt: galleryAlt || undefined,
        image: galleryImageFile || undefined,
        imageUrl: galleryImageUrl || undefined,
      });
      setGallerySuccess("Gallery image added.");
      setGalleryCustomerName("");
      setGalleryAlt("");
      setGalleryImageFile(null);
      setGalleryImageUrl("");
      loadGallery();
    } catch (err: any) {
      setGalleryErrorMsg(err.message || "Failed to add.");
    } finally {
      setGallerySubmitting(false);
    }
  }

  async function handleUpdateGallery(e: FormEvent) {
    e.preventDefault();
    if (!editingGallery || !adminKey) return;
    setEditGallerySubmitting(true);
    try {
      await updateGalleryImageApi(adminKey, editingGallery._id, {
        customerName: editGalleryCustomerName,
        alt: editGalleryAlt || undefined,
        image: editGalleryImageFile || undefined,
        imageUrl: editGalleryImageUrl || undefined,
      });
      setEditingGallery(null);
      setGallerySuccess("Gallery image updated.");
      loadGallery();
    } catch (err: any) {
      setGalleryErrorMsg(err.message || "Failed to update.");
    } finally {
      setEditGallerySubmitting(false);
    }
  }

  async function handleDeleteGallery(img: GalleryImageItem) {
    if (!adminKey) return;
    if (!confirm(`Remove "${img.customerName}" from gallery?`)) return;
    try {
      await deleteGalleryImageApi(adminKey, img._id);
      setEditingGallery(null);
      setGallerySuccess("Gallery image removed.");
      loadGallery();
    } catch {
      setGalleryErrorMsg("Failed to delete.");
    }
  }

  function openEditGallery(img: GalleryImageItem) {
    setEditingGallery(img);
    setEditGalleryCustomerName(img.customerName);
    setEditGalleryAlt(img.alt || "");
    setEditGalleryImageFile(null);
    setEditGalleryImageUrl("");
  }

  async function handleSeedGallery() {
    if (!adminKey) { setGalleryErrorMsg("Enter admin key"); return; }
    setSeedingGallery(true);
    setGalleryErrorMsg(null);
    try {
      const { message } = await seedGalleryApi(adminKey);
      setGallerySuccess(message);
      loadGallery();
    } catch {
      setGalleryErrorMsg("Failed to seed");
    } finally {
      setSeedingGallery(false);
    }
  }

  const productsByCategory = products.reduce((acc, p) => {
    const slug = p.categorySlug;
    if (!acc[slug]) acc[slug] = [];
    acc[slug].push(p);
    return acc;
  }, {} as Record<string, ProductFromApi[]>);

  return (
    <div className="min-h-screen py-10 md:py-16 bg-gradient-to-br from-rose-50 via-white to-amber-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-10"
        >
          <Sparkles className="text-[var(--gold)] mx-auto mb-3" size={40} />
          <h1 className="font-['Playfair_Display'] text-2xl md:text-4xl mb-2">
            Product Management
          </h1>
          <p className="text-sm opacity-70">
            Manage products and Jewelry Worn By You gallery. Images upload to Cloudinary.
          </p>
        </motion.div>

        {/* Admin key - shared */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <label className="block text-sm font-medium mb-2">Admin Key</label>
          <input
            type="password"
            className="w-full max-w-md border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--blush-pink)]"
            placeholder="Enter ADMIN_API_KEY"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => { setActiveTab("products"); setErrorMessage(null); setSuccessMessage(null); setGalleryErrorMsg(null); setGallerySuccess(null); }}
            className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === "products" ? "bg-[var(--blush-pink)] text-white" : "bg-white shadow"}`}
          >
            <Package className="inline w-4 h-4 mr-2" />
            Products
          </button>
          <button
            onClick={() => { setActiveTab("gallery"); setErrorMessage(null); setSuccessMessage(null); }}
            className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === "gallery" ? "bg-[var(--blush-pink)] text-white" : "bg-white shadow"}`}
          >
            <ImageIcon className="inline w-4 h-4 mr-2" />
            Jewelry Worn By You
          </button>
        </div>

        {activeTab === "products" && (
          <>
            {/* Add product form */}
            <motion.form
              onSubmit={handleAddProduct}
              className="bg-white rounded-2xl shadow-xl p-6 mb-8"
            >
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Plus className="w-5 h-5" /> Add Product
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 space-y-0">
                <div>
                  <label className="block text-sm font-medium mb-1">Name *</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price (₹) *</label>
                  <input
                    type="number"
                    min={0}
                    className="w-full border rounded-lg px-3 py-2"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Category *</label>
                  <select
                    className="w-full border rounded-lg px-3 py-2"
                    value={categorySlug}
                    onChange={(e) => setCategorySlug(e.target.value)}
                  >
                    {allCategorySlugs.map((s) => (
                      <option key={s} value={s}>{categoryData[s]?.title || s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Collection *</label>
                  <select
                    className="w-full border rounded-lg px-3 py-2"
                    value={collection}
                    onChange={(e) => setCollection(e.target.value as "resin" | "traditional")}
                  >
                    <option value="resin">Resin</option>
                    <option value="traditional">Traditional</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Description</label>
                  <textarea
                    className="w-full border rounded-lg px-3 py-2 min-h-[80px]"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="md:col-span-2 space-y-3">
                  <p className="text-sm font-medium">Images * (2–3+ recommended, shown in carousel)</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-3 bg-gray-50">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Upload multiple images</label>
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => setImageFiles(Array.from(e.target.files || []))}
                        className="w-full text-sm"
                      />
                      {imageFiles.length > 0 && (
                        <p className="text-xs text-green-600 mt-1">{imageFiles.length} file(s) selected</p>
                      )}
                    </div>
                    <div className="border rounded-lg p-3 bg-gray-50">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Or paste Cloudinary URLs (one per line)</label>
                      <textarea
                        placeholder="https://res.cloudinary.com/...&#10;https://res.cloudinary.com/..."
                        className="w-full border rounded px-3 py-2 text-sm min-h-[80px]"
                        value={imageUrlsText}
                        onChange={(e) => setImageUrlsText(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="border rounded-lg p-3 bg-gray-50 space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Product video (optional)</label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0] || null;
                        setVideoFile(f);
                      }}
                      className="w-full text-sm"
                    />
                    {videoFile && (
                      <p className="text-xs text-green-600">Selected: {videoFile.name}</p>
                    )}
                    <label className="block text-xs text-gray-600 mt-2 mb-1">Or paste Cloudinary video URL</label>
                    <input
                      type="url"
                      placeholder="https://res.cloudinary.com/.../video/upload/..."
                      className="w-full border rounded px-3 py-2 text-sm"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-end gap-4">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={inStock} onChange={(e) => setInStock(e.target.checked)} />
                    <span className="text-sm">In Stock</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={readyToShip} onChange={(e) => setReadyToShip(e.target.checked)} />
                    <span className="text-sm">Ready to Ship</span>
                  </label>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 rounded-lg bg-[var(--blush-pink)] text-white font-medium disabled:opacity-60"
                  >
                    {submitting ? "Saving..." : "Add Product"}
                  </button>
                </div>
              </div>
            </motion.form>

            {/* Products by category */}
            <div className="space-y-6">
              {productsLoading ? (
                <p className="text-center text-gray-500">Loading products...</p>
              ) : productsError ? (
                <p className="text-center text-red-600">{productsError}</p>
              ) : (
                Object.entries(productsByCategory).length === 0 ? (
                  <p className="text-center text-gray-500">No products yet. Add one above.</p>
                ) : (
                  Object.entries(productsByCategory).map(([slug, prods]) => (
                    <motion.div
                      key={slug}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden"
                    >
                      <div className="bg-[var(--blush-pink-light)] px-6 py-3">
                        <h3 className="font-semibold text-lg">
                          {categoryData[slug]?.title || slug}
                        </h3>
                        <p className="text-sm opacity-70">{prods.length} product(s)</p>
                      </div>
                      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {prods.map((p) => (
                          <div
                            key={p._id}
                            className="border rounded-xl overflow-hidden flex flex-col"
                          >
                            <div className="aspect-square relative bg-gray-100">
                              <img
                                src={p.imageUrl}
                                alt={p.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-3 flex-1">
                              <p className="font-medium truncate">{p.name}</p>
                              <p className="text-sm text-gray-600">₹{p.price}</p>
                              <div className="flex gap-2 mt-2">
                                <button
                                  onClick={() => openEditProduct(p)}
                                  className="flex-1 flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-amber-100 text-amber-800 text-sm"
                                >
                                  <Pencil className="w-3.5 h-3.5" /> Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(p)}
                                  className="flex items-center justify-center gap-1 px-2 py-1.5 rounded-lg bg-red-100 text-red-700 text-sm"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))
                )
              )}
            </div>

            {errorMessage && <p className="mt-4 text-red-600">{errorMessage}</p>}
            {successMessage && <p className="mt-4 text-green-600">{successMessage}</p>}
          </>
        )}

        {activeTab === "gallery" && (
          <>
            {/* Add gallery image */}
            <motion.form
              onSubmit={handleAddGallery}
              className="bg-white rounded-2xl shadow-xl p-6 mb-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <h2 className="text-lg font-semibold flex items-center gap-2">
                  <Plus className="w-5 h-5" /> Add to Jewelry Worn By You
                </h2>
                <button
                  type="button"
                  onClick={handleSeedGallery}
                  disabled={seedingGallery}
                  className="text-sm px-3 py-1.5 rounded-lg border border-amber-300 text-amber-800 hover:bg-amber-50 disabled:opacity-60"
                >
                  {seedingGallery ? "Seeding..." : "Seed from existing images"}
                </button>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                These images appear on the /gallery page. Use &quot;Seed&quot; to load sample images into MongoDB.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Customer Name *</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="e.g. Priya's Wedding"
                    value={galleryCustomerName}
                    onChange={(e) => setGalleryCustomerName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Alt text</label>
                  <input
                    type="text"
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="e.g. Bridal jewellery set"
                    value={galleryAlt}
                    onChange={(e) => setGalleryAlt(e.target.value)}
                  />
                </div>
                <div className="md:col-span-2 space-y-3">
                  <p className="text-sm font-medium">Image * (choose one)</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-3 bg-gray-50">
                      <label className="block text-sm font-medium text-gray-700 mb-1">1. Upload image file</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const f = e.target.files?.[0] || null;
                          setGalleryImageFile(f);
                          if (f) setGalleryImageUrl("");
                        }}
                        className="w-full text-sm"
                      />
                      {galleryImageFile && (
                        <p className="text-xs text-green-600 mt-1">Selected: {galleryImageFile.name}</p>
                      )}
                    </div>
                    <div className="border rounded-lg p-3 bg-gray-50">
                      <label className="block text-sm font-medium text-gray-700 mb-1">2. Or paste Cloudinary URL</label>
                      <input
                        type="url"
                        placeholder="https://res.cloudinary.com/..."
                        className="w-full border rounded px-3 py-2 text-sm"
                        value={galleryImageUrl}
                        onChange={(e) => { setGalleryImageUrl(e.target.value); if (e.target.value) setGalleryImageFile(null); }}
                      />
                    </div>
                  </div>
                </div>
                <div className="md:col-span-2 flex items-end">
                  <button
                    type="submit"
                    disabled={gallerySubmitting}
                    className="px-4 py-2 rounded-lg bg-[var(--blush-pink)] text-white font-medium disabled:opacity-60"
                  >
                    {gallerySubmitting ? "Saving..." : "Add Image"}
                  </button>
                </div>
              </div>
            </motion.form>

            {/* Gallery images grid */}
            {galleryLoading ? (
              <p className="text-center text-gray-500">Loading gallery...</p>
            ) : galleryError ? (
              <p className="text-center text-red-600">{galleryError}</p>
            ) : galleryImages.length === 0 ? (
              <p className="text-center text-gray-500">No gallery images yet. Add one above.</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryImages.map((img) => (
                  <div key={img._id} className="bg-white rounded-xl shadow overflow-hidden">
                    <div className="aspect-square relative bg-gray-100">
                      <img src={img.imageUrl} alt={img.alt} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-2">
                      <p className="text-sm font-medium truncate">{img.customerName}</p>
                      <div className="flex gap-1 mt-1">
                        <button
                          onClick={() => openEditGallery(img)}
                          className="flex-1 flex items-center justify-center gap-1 px-2 py-1 rounded bg-amber-100 text-amber-800 text-xs"
                        >
                          <Pencil className="w-3 h-3" /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteGallery(img)}
                          className="px-2 py-1 rounded bg-red-100 text-red-700"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {galleryErrorMsg && <p className="mt-4 text-red-600">{galleryErrorMsg}</p>}
            {gallerySuccess && <p className="mt-4 text-green-600">{gallerySuccess}</p>}
          </>
        )}

        {/* Edit Product Modal */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Edit Product</h2>
                  <button
                    onClick={() => setEditingProduct(null)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleUpdateProduct} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name *</label>
                    <input
                      type="text"
                      className="w-full border rounded-lg px-3 py-2"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Price (₹) *</label>
                    <input
                      type="number"
                      min={0}
                      className="w-full border rounded-lg px-3 py-2"
                      value={editPrice}
                      onChange={(e) => setEditPrice(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Category *</label>
                    <select
                      className="w-full border rounded-lg px-3 py-2"
                      value={editCategorySlug}
                      onChange={(e) => setEditCategorySlug(e.target.value)}
                    >
                      {allCategorySlugs.map((s) => (
                        <option key={s} value={s}>{categoryData[s]?.title || s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Collection *</label>
                    <select
                      className="w-full border rounded-lg px-3 py-2"
                      value={editCollection}
                      onChange={(e) => setEditCollection(e.target.value as "resin" | "traditional")}
                    >
                      <option value="resin">Resin</option>
                      <option value="traditional">Traditional</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                      className="w-full border rounded-lg px-3 py-2 min-h-[80px]"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Images (edit URLs or add new)</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Upload new images</label>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => setEditImageFiles(Array.from(e.target.files || []))}
                          className="w-full text-sm"
                        />
                        {editImageFiles.length > 0 && (
                          <p className="text-xs text-green-600 mt-1">{editImageFiles.length} new file(s)</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">Image URLs (one per line)</label>
                        <textarea
                          className="w-full border rounded px-3 py-2 text-sm min-h-[70px]"
                          value={editImageUrlsText}
                          onChange={(e) => setEditImageUrlsText(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="block text-xs text-gray-600 mb-1">Video (optional)</label>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => {
                          const f = e.target.files?.[0] || null;
                          setEditVideoFile(f);
                        }}
                        className="w-full text-sm"
                      />
                      {editVideoFile && (
                        <p className="text-xs text-green-600">New video: {editVideoFile.name}</p>
                      )}
                      <input
                        type="url"
                        className="w-full border rounded px-3 py-2 text-sm mt-1"
                        placeholder="Cloudinary video URL"
                        value={editVideoUrl}
                        onChange={(e) => setEditVideoUrl(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={editInStock} onChange={(e) => setEditInStock(e.target.checked)} />
                      <span className="text-sm">In Stock</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="checkbox" checked={editReadyToShip} onChange={(e) => setEditReadyToShip(e.target.checked)} />
                      <span className="text-sm">Ready to Ship</span>
                    </label>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      disabled={editSubmitting}
                      className="px-4 py-2 rounded-lg bg-[var(--blush-pink)] text-white font-medium disabled:opacity-60"
                    >
                      {editSubmitting ? "Saving..." : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingProduct(null)}
                      className="px-4 py-2 rounded-lg border"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}

        {/* Edit Gallery Modal */}
        {editingGallery && (
          <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl max-w-md w-full"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Edit Gallery Image</h2>
                  <button
                    onClick={() => setEditingGallery(null)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form onSubmit={handleUpdateGallery} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Customer Name *</label>
                    <input
                      type="text"
                      className="w-full border rounded-lg px-3 py-2"
                      value={editGalleryCustomerName}
                      onChange={(e) => setEditGalleryCustomerName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Alt text</label>
                    <input
                      type="text"
                      className="w-full border rounded-lg px-3 py-2"
                      value={editGalleryAlt}
                      onChange={(e) => setEditGalleryAlt(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">New image (optional)</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const f = e.target.files?.[0] || null;
                        setEditGalleryImageFile(f);
                        if (f) setEditGalleryImageUrl("");
                      }}
                      className="w-full text-sm"
                    />
                    <input
                      type="url"
                      placeholder="Or paste new Cloudinary URL"
                      className="w-full border rounded-lg px-3 py-2 mt-1"
                      value={editGalleryImageUrl}
                      onChange={(e) => { setEditGalleryImageUrl(e.target.value); if (e.target.value) setEditGalleryImageFile(null); }}
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      disabled={editGallerySubmitting}
                      className="px-4 py-2 rounded-lg bg-[var(--blush-pink)] text-white font-medium disabled:opacity-60"
                    >
                      {editGallerySubmitting ? "Saving..." : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingGallery(null)}
                      className="px-4 py-2 rounded-lg border"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
