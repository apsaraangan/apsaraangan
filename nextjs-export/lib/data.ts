// ─── Shared data used across pages ────────────────────────────

import { VenusIcon } from "lucide-react";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
  description?: string;
  /** Multiple images for product detail carousel (from API) */
  images?: string[];
  /** Optional video URL (from API) */
  videoUrl?: string;
}

export const mainCollections = [
  {
    id: "resin" as const,
    title: "Resin Jewellery",
    subtitle: "Customization",
    tag: "Handcrafted Art",
    description: "Botanical inclusions, vibrant colors & one-of-a-kind resin art pieces",
    image:
      "https://res.cloudinary.com/dcs53etlz/image/upload/v1773148282/WhatsApp_Image_2026-03-10_at_6.39.58_PM_d9cygu.jpg",
  },
  {
    id: "traditional" as const,
    title: "Traditional Jewellery",
    subtitle: "Customization",
    tag: "Heritage Craft",
    description: "Classic Indian designs with a contemporary bridal & festive touch",
    image:
      "https://res.cloudinary.com/dcs53etlz/image/upload/v1773149539/WhatsApp_Image_2026-03-10_at_7.01.59_PM_rcikan.jpg",
  },
];

export const subcategories: Record<
  "resin" | "traditional",
  { title: string; image: string; path: string }[]
> = {
  resin: [
    {
      title: "Resin full sets",
      image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773162980/WhatsApp_Image_2026-03-10_at_6.30.26_PM_hur9kd.jpg",
      path: "/category/resin-full-sets",
    },
    {
      title: "Resin neckalce",
      image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773163045/WhatsApp_Image_2026-03-10_at_6.30.18_PM_ytlahl.jpg",
      path: "/category/resin-neckalce",
    },
    {
      title: "Resin earrings",
      image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773163122/WhatsApp_Image_2026-03-10_at_6.31.00_PM_kk7h0d.jpg",
      path: "/category/resin-earrings",
    },
    {
      title: "Resin hathphool & rings",
      image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773163178/WhatsApp_Image_2026-03-10_at_6.30.30_PM_x1bvtk.jpg",
      path: "/category/resin-hathphool-rings",
    },
    {
      title: "Hair bindi",
      image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773163374/WhatsApp_Image_2026-03-10_at_6.30.57_PM_ko28pb.jpg",
      path: "/category/hair-bindi",
    },
    {
      title: "Resin kaleeras",
      image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773163663/WhatsApp_Image_2026-03-10_at_6.31.37_PM_aaxjcc.jpg",
      path: "/category/resin-kaleeras",
    },
    {
      title: "Resin earchains",
      image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773167384/WhatsApp_Image_2026-03-10_at_11.24.17_PM_g86tos.jpg",
      path: "/category/resin-earchains",
    },
    {
      title: "Resin hair accessories",
      image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773163827/Screenshot_2026-03-10_225953_j4b9s9.png",
      path: "/category/resin-hair-accessories",
    },
  ],
  traditional: [
    {
      title: "Hair vein",
      image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773164264/WhatsApp_Image_2026-03-10_at_6.31.36_PM_nahrx8.jpg",
      path: "/category/hair-vein",
    },
    {
      title: "Mom-to-be sets",
      image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773164542/WhatsApp_Image_2026-03-10_at_6.32.21_PM_axfgpg.jpg",
      path: "/category/mom-to-be-sets",
    },
    {
      title: "Kaleeras",
      image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773164411/WhatsApp_Image_2026-03-10_at_6.31.37_PM_1_juytbl.jpg",
      path: "/category/Kaleeras",
    },
    {
      title: "Ear chains",
      image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773164610/WhatsApp_Image_2026-03-10_at_6.31.53_PM_fqfpno.jpg",
      path: "/category/ear-chains",
    },
    {
      title: "Hair pins & studs",
      image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773164861/Screenshot_2026-03-10_231703_bh215n.png",
      path: "/category/hair-pins-studs",
    },
    {
      title: "Nose pins",
      image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773167617/Screenshot_2026-03-11_000302_g7lpm3.png",
      path: "/category/nose-pins",
    }, {
      title: "Mundavlya",
      image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773167708/Screenshot_2026-03-11_000434_mdvwkz.png",
      path: "/category/mundavlya",
    }, {
      title: "Ear cuffs",
      image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773167899/earcuffs_aqtzqv.jpg",
      path: "/category/earcuffs",
    }, {
      title: "Hathphool",
      image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773168003/hathphool_jrkdav.webp",
      path: "/category/hathphool",
    }, {
      title: "Sheesphool & Mathapatti",
      image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773168231/matthapatti_o3i5c6.webp",
      path: "/category/sheesphool-mathapatti",
    }, {
      title: "Necklace sets",
      image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773176749/necklace_mlowxz.webp",
      path: "/category/necklace-sets",
    },
  ],
};

export const categoryData: Record<
  string,
  {
    title: string;
    subtitle: string;
    collection: "resin" | "traditional";
    products: Product[];
  }
> = {
  "resin-full-sets": {
    title: "Resin full sets",
    subtitle: "Handcrafted botanical rings preserved in premium resin",
    collection: "resin",
    products: [
      { id: 101, name: "Blush Bloom Ring", price: 799, image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773165211/WhatsApp_Image_2026-03-10_at_6.30.52_PM_jltdih.jpg", description: "Soft pink resin with pressed petals", category: "Rings", inStock: true },
      { id: 102, name: "Botanical Statement Ring", price: 999, image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773165250/WhatsApp_Image_2026-03-10_at_6.31.02_PM_kilbjx.jpg", description: "Bold botanical inclusion in clear resin", category: "Rings", inStock: true },
      { id: 103, name: "Ombré Floral Ring", price: 899, image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773165286/WhatsApp_Image_2026-03-10_at_6.31.03_PM_1_kt9yeb.jpg", description: "Gradient rose-to-ivory resin ring", category: "Rings", inStock: true },
      { id: 104, name: "Stackable Ring Set", price: 1499, image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773165336/WhatsApp_Image_2026-03-10_at_6.31.03_PM_sc3fcl.jpg", description: "Set of 3 stackable botanical rings", category: "Rings", inStock: true },
    ],
  },
  "resin-neckalce": {
    title: "Resin necklace",
    subtitle: "Lightweight floral earrings crafted from premium resin",
    collection: "resin",
    products: [
      { id: 201, name: "Floral Blush Studs", price: 699, image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773165601/WhatsApp_Image_2026-03-10_at_6.30.50_PM_d8uqnn.jpg", description: "Delicate stud earrings with pressed florals", category: "Earrings", inStock: true },
      { id: 202, name: "Pastel Petal Drops", price: 1099, image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773165637/WhatsApp_Image_2026-03-10_at_6.30.12_PM_lm4wpg.jpg", description: "Pastel drop earrings with botanical inclusions", category: "Earrings", inStock: true },
      { id: 203, name: "Statement Floral Dangles", price: 1499, image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773165665/WhatsApp_Image_2026-03-10_at_6.30.26_PM_1_vdtkrn.jpg", description: "Bold dangle earrings for special occasions", category: "Earrings", inStock: true },
      { id: 204, name: "Ombré Teardrop Earrings", price: 1299, image: "https://images.unsplash.com/photo-1763316189806-8f5e553cb261?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Gradient teardrop resin earrings", category: "Earrings", inStock: true },
    ],
  },
  "resin-earrings": {
    title: "Resin earrings",
    subtitle: "Wearable art — nature preserved in every pendant",
    collection: "resin",
    products: [
      { id: 301, name: "Dried Flower Pendant", price: 1299, image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773165855/WhatsApp_Image_2026-03-10_at_6.30.35_PM_hh5fms.jpg", description: "Pressed dried flowers in crystal-clear resin", category: "Pendants", inStock: true },
      { id: 302, name: "Rose Petal Teardrop", price: 1599, image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773166020/WhatsApp_Image_2026-03-10_at_6.31.00_PM_1_zgqjxf.jpg", description: "Real rose petals in teardrop resin pendant", category: "Pendants", inStock: true },
      { id: 303, name: "Blush Oval Pendant", price: 1199, image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773166056/WhatsApp_Image_2026-03-10_at_6.31.04_PM_myinzm.jpg", description: "Soft pink oval pendant on delicate chain", category: "Pendants", inStock: true },
      { id: 304, name: "Layered Botanical Necklace", price: 2199, image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773166104/WhatsApp_Image_2026-03-10_at_6.31.46_PM_nnlusk.jpg", description: "Multi-layered pendant necklace with botanicals", category: "Pendants", inStock: true },
    ],
  },
  "resin-hathphool-rings": {
    title: "Resin hathphool & rings",
    subtitle: "Colourful handcrafted bracelets for every occasion",
    collection: "resin",
    products: [
      { id: 401, name: "Floral Cuff Bracelet", price: 1499, image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773166191/WhatsApp_Image_2026-03-10_at_6.30.28_PM_1_rzyyxi.jpg", description: "Wide resin cuff with floral inclusions", category: "Bracelet", inStock: true },
      { id: 402, name: "Pink Pearl Charm Bracelet", price: 1799, image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773166259/WhatsApp_Image_2026-03-10_at_6.30.28_PM_q3ax0v.jpg", description: "Pink pearl accents on a resin base", category: "Bracelet", inStock: true },
      { id: 403, name: "Botanical Bangle", price: 1299, image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773166293/WhatsApp_Image_2026-03-10_at_6.30.26_PM_2_ptizfp.jpg", description: "Rounded bangle with botanical elements", category: "Bracelet", inStock: true },
      { id: 404, name: "Ombré Resin Bangle", price: 1099, image: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773166327/WhatsApp_Image_2026-03-10_at_6.30.25_PM_x2ihs4.jpg", description: "Gradient color resin bangle", category: "Bracelet", inStock: true },
    ],
  },
  "hair-bindi": {
    title: "Hair bindi",
    subtitle: "Floral resin hair pieces for brides & festive occasions",
    collection: "resin",
    products: [
      { id: 501, name: "Floral Hair Pin Set", price: 799, image: "https://images.unsplash.com/photo-1767961054380-561d5d36c819?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Set of 4 floral resin hair pins", category: "Hair Accessories", inStock: true },
      { id: 502, name: "Bridal Hair Comb", price: 1599, image: "https://images.unsplash.com/photo-1624492235740-c283aab78e45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Ornate resin and gold bridal hair comb", category: "Hair Accessories", inStock: true },
      { id: 503, name: "Floral Tiara", price: 2499, image: "https://images.unsplash.com/photo-1583878543723-dcd6ad8bcb3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Elegant floral resin tiara for brides", category: "Hair Accessories", inStock: true },
      { id: 504, name: "Pastel Hair Clips Set", price: 599, image: "https://images.unsplash.com/photo-1620916118276-77fd7ba727a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Pastel resin floral clip set (6 pieces)", category: "Hair Accessories", inStock: true },
    ],
  },
  "resin-kaleeras": {
    title: "Resin kaleeras",
    subtitle: "Elegant resin ear chains that drape beautifully",
    collection: "resin",
    products: [
      { id: 601, name: "Delicate Ear Chain", price: 899, image: "https://images.unsplash.com/photo-1677913841799-6239c2fe2d91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Dainty ear chain with resin charm drops", category: "Ear Chains", inStock: true },
      { id: 602, name: "Floral Drop Ear Chain", price: 1199, image: "https://images.unsplash.com/photo-1548597180-23cc88a9a6f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Resin floral charms on a gold-tone ear chain", category: "Ear Chains", inStock: true },
      { id: 603, name: "Pearl Bead Ear Chain", price: 999, image: "https://images.unsplash.com/photo-1756792340190-2039b9a1787d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Pearl bead ear chain with resin florals", category: "Ear Chains", inStock: true },
      { id: 604, name: "Statement Ear Chain Set", price: 1499, image: "https://images.unsplash.com/photo-1589204984444-21d051f4dc58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Bold resin ear chain set for festive wear", category: "Ear Chains", inStock: true },
    ],
  },
  "resin-earchains": {
    title: "Resin earchains",
    subtitle: "Elegant resin ear chains that drape beautifully",
    collection: "resin",
    products: [
      { id: 601, name: "Delicate Ear Chain", price: 899, image: "https://images.unsplash.com/photo-1677913841799-6239c2fe2d91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Dainty ear chain with resin charm drops", category: "Ear Chains", inStock: true },
      { id: 602, name: "Floral Drop Ear Chain", price: 1199, image: "https://images.unsplash.com/photo-1548597180-23cc88a9a6f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Resin floral charms on a gold-tone ear chain", category: "Ear Chains", inStock: true },
      { id: 603, name: "Pearl Bead Ear Chain", price: 999, image: "https://images.unsplash.com/photo-1756792340190-2039b9a1787d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Pearl bead ear chain with resin florals", category: "Ear Chains", inStock: true },
      { id: 604, name: "Statement Ear Chain Set", price: 1499, image: "https://images.unsplash.com/photo-1589204984444-21d051f4dc58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Bold resin ear chain set for festive wear", category: "Ear Chains", inStock: true },
    ],
  },
  "resin-hair-accessories": {
    title: "Resin hair accessories",
    subtitle: "Elegant resin ear chains that drape beautifully",
    collection: "resin",
    products: [
      { id: 601, name: "Delicate Ear Chain", price: 899, image: "https://images.unsplash.com/photo-1677913841799-6239c2fe2d91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Dainty ear chain with resin charm drops", category: "Ear Chains", inStock: true },
      { id: 602, name: "Floral Drop Ear Chain", price: 1199, image: "https://images.unsplash.com/photo-1548597180-23cc88a9a6f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Resin floral charms on a gold-tone ear chain", category: "Ear Chains", inStock: true },
      { id: 603, name: "Pearl Bead Ear Chain", price: 999, image: "https://images.unsplash.com/photo-1756792340190-2039b9a1787d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Pearl bead ear chain with resin florals", category: "Ear Chains", inStock: true },
      { id: 604, name: "Statement Ear Chain Set", price: 1499, image: "https://images.unsplash.com/photo-1589204984444-21d051f4dc58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Bold resin ear chain set for festive wear", category: "Ear Chains", inStock: true },
    ],
  },
  "hair-vein": {
    title: "Hair vein",
    subtitle: "Traditional bridal kaleeras crafted with heritage artistry",
    collection: "traditional",
    products: [
      { id: 701, name: "Classic Bridal Kaleera", price: 3999, image: "https://images.unsplash.com/photo-1758995115475-7b7d6eb060ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Traditional gold-toned bridal kaleera", category: "Kaleera", inStock: true },
      { id: 702, name: "Floral Kaleera Pair", price: 4999, image: "https://images.unsplash.com/photo-1762337383928-ed5e352977d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Floral detailed kaleera pair for brides", category: "Kaleera", inStock: true },
      { id: 703, name: "Antique Gold Kaleera", price: 5499, image: "https://images.unsplash.com/photo-1583878543723-dcd6ad8bcb3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Antique-finish gold kaleera with charms", category: "Kaleera", inStock: true },
      { id: 704, name: "Kundan Kaleera Set", price: 6999, image: "https://images.unsplash.com/photo-1763316189806-8f5e553cb261?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Kundan-embellished kaleera set of 2", category: "Kaleera", inStock: true },
    ],
  },
  "mom-to-be-sets": {
    title: "Mom-to-be sets",
    subtitle: "Ornate hand jewellery for weddings & festive celebrations",
    collection: "traditional",
    products: [
      { id: 801, name: "Bridal Hathphool", price: 3499, image: "https://images.unsplash.com/flagged/photo-1570055349452-29232699cc63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Traditional gold hathphool for brides", category: "Hathphool", inStock: true },
      { id: 802, name: "Kundan Hathphool", price: 4999, image: "https://images.unsplash.com/photo-1702300524193-887d929cefa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Kundan-set hathphool with finger ring", category: "Hathphool", inStock: true },
      { id: 803, name: "Meenakari Hathphool", price: 3999, image: "https://images.unsplash.com/photo-1760786933027-fe2ad82957f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Colourful meenakari hathphool", category: "Hathphool", inStock: true },
      { id: 804, name: "Antique Hathphool Pair", price: 5499, image: "https://images.unsplash.com/photo-1758995115857-2de1eb6283d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Antique finish hathphool pair", category: "Hathphool", inStock: true },
    ],
  },
  "Kaleeras": {
    title: "Kaleeras",
    subtitle: "Traditional bridal kaleeras crafted with heritage artistry",
    collection: "traditional",
    products: [
      { id: 901, name: "Classic Gold Jhumka", price: 1499, image: "https://images.unsplash.com/photo-1653227907864-560dce4c252d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Traditional gold jhumka earrings", category: "Earrings", inStock: true },
      { id: 902, name: "Kundan Jhumka", price: 2199, image: "https://images.unsplash.com/photo-1756792340190-2039b9a1787d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Kundan-embellished jhumka earrings", category: "Earrings", inStock: true },
      { id: 903, name: "Meenakari Jhumka", price: 1899, image: "https://images.unsplash.com/photo-1652500965593-58e2b71d3cdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Vibrant meenakari work jhumka", category: "Earrings", inStock: true },
      { id: 904, name: "Bridal Chandelier Jhumka", price: 3499, image: "https://images.unsplash.com/photo-1763316189806-8f5e553cb261?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Statement bridal chandelier jhumka", category: "Earrings", inStock: true },
    ],
  },
  "ear-chains": {
    title: "Ear chains",
    subtitle: "Traditional bridal ear chains crafted with heritage artistry",
    collection: "traditional",
    products: [
      { id: 1001, name: "Kundan Necklace Set", price: 5999, image: "https://images.unsplash.com/photo-1758995115857-2de1eb6283d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Full kundan bridal necklace set with earrings", category: "Necklace", inStock: true },
      { id: 1002, name: "Polki Necklace Set", price: 7499, image: "https://images.unsplash.com/photo-1762337383928-ed5e352977d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Polki stone necklace with matching earrings", category: "Necklace", inStock: true },
      { id: 1003, name: "Meenakari Rani Haar", price: 8999, image: "https://images.unsplash.com/photo-1758995115518-26f90aa61b97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Long meenakari rani haar necklace", category: "Necklace", inStock: true },
      { id: 1004, name: "Temple Jewellery Set", price: 6499, image: "https://images.unsplash.com/photo-1763316189806-8f5e553cb261?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "South Indian temple jewellery necklace set", category: "Necklace", inStock: true },
    ],
  },
  "hair-pins-studs": {
    title: "Gold Bangles",
    subtitle: "Traditional gold-finish bangles for every celebration",
    collection: "traditional",
    products: [
      { id: 1101, name: "Classic Gold Bangle Set", price: 2999, image: "https://images.unsplash.com/photo-1760786933027-fe2ad82957f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Set of 4 classic gold-finish bangles", category: "Bangles", inStock: true },
      { id: 1102, name: "Kundan Bangle Pair", price: 3499, image: "https://images.unsplash.com/photo-1762162089047-97e09435984d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Kundan-set gold bangle pair", category: "Bangles", inStock: true },
      { id: 1103, name: "Meenakari Bangle Set", price: 4499, image: "https://images.unsplash.com/photo-1740567389909-b36e9cadbef9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Colourful meenakari work bangle set", category: "Bangles", inStock: true },
      { id: 1104, name: "Bridal Choora Set", price: 5999, image: "https://images.unsplash.com/photo-1702300524193-887d929cefa4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Full bridal choora bangle set", category: "Bangles", inStock: true },
    ],
  },
  "nose-pins": {
    title: "Nose pins",
    subtitle: "Stunning maang tikkas that complete every bridal look",
    collection: "traditional",
    products: [
      { id: 1201, name: "Classic Maang Tikka", price: 1299, image: "https://images.unsplash.com/photo-1756376755233-d3abcd9a5edb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Traditional gold maang tikka with chain", category: "Maang Tikka", inStock: true },
      { id: 1202, name: "Kundan Maang Tikka", price: 1999, image: "https://images.unsplash.com/photo-1771992226261-c1efb190ed34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Kundan-embellished bridal maang tikka", category: "Maang Tikka", inStock: true },
      { id: 1203, name: "Passa Maang Tikka", price: 2499, image: "https://images.unsplash.com/photo-1583878543723-dcd6ad8bcb3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Side-draping passa style maang tikka", category: "Maang Tikka", inStock: true },
      { id: 1204, name: "Floral Maang Tikka", price: 1599, image: "https://images.unsplash.com/photo-1762337383928-ed5e352977d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Delicate floral motif maang tikka", category: "Maang Tikka", inStock: true },
    ],
  },
  "mundavlya": {
    title: "Mundavlya",
    subtitle: "Stunning maang tikkas that complete every bridal look",
    collection: "traditional",
    products: [
      { id: 1201, name: "Classic Maang Tikka", price: 1299, image: "https://images.unsplash.com/photo-1756376755233-d3abcd9a5edb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Traditional gold maang tikka with chain", category: "Maang Tikka", inStock: true },
      { id: 1202, name: "Kundan Maang Tikka", price: 1999, image: "https://images.unsplash.com/photo-1771992226261-c1efb190ed34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Kundan-embellished bridal maang tikka", category: "Maang Tikka", inStock: true },
      { id: 1203, name: "Passa Maang Tikka", price: 2499, image: "https://images.unsplash.com/photo-1583878543723-dcd6ad8bcb3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Side-draping passa style maang tikka", category: "Maang Tikka", inStock: true },
      { id: 1204, name: "Floral Maang Tikka", price: 1599, image: "https://images.unsplash.com/photo-1762337383928-ed5e352977d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Delicate floral motif maang tikka", category: "Maang Tikka", inStock: true },
    ],
  },
  "earcuffs": {
    title: "Ear cuffs",
    subtitle: "Stunning ear cuffs that complete every bridal look",
    collection: "traditional",
    products: [
      { id: 1201, name: "Classic Maang Tikka", price: 1299, image: "https://images.unsplash.com/photo-1756376755233-d3abcd9a5edb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Traditional gold maang tikka with chain", category: "Maang Tikka", inStock: true },
      { id: 1202, name: "Kundan Maang Tikka", price: 1999, image: "https://images.unsplash.com/photo-1771992226261-c1efb190ed34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Kundan-embellished bridal maang tikka", category: "Maang Tikka", inStock: true },
      { id: 1203, name: "Passa Maang Tikka", price: 2499, image: "https://images.unsplash.com/photo-1583878543723-dcd6ad8bcb3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Side-draping passa style maang tikka", category: "Maang Tikka", inStock: true },
      { id: 1204, name: "Floral Maang Tikka", price: 1599, image: "https://images.unsplash.com/photo-1762337383928-ed5e352977d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Delicate floral motif maang tikka", category: "Maang Tikka", inStock: true },
    ],
  },
  "hathphool": {
    title: "Hathphool",
    subtitle: "Stunning maang tikkas that complete every bridal look",
    collection: "traditional",
    products: [
      { id: 1201, name: "Classic Maang Tikka", price: 1299, image: "https://images.unsplash.com/photo-1756376755233-d3abcd9a5edb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Traditional gold maang tikka with chain", category: "Maang Tikka", inStock: true },
      { id: 1202, name: "Kundan Maang Tikka", price: 1999, image: "https://images.unsplash.com/photo-1771992226261-c1efb190ed34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Kundan-embellished bridal maang tikka", category: "Maang Tikka", inStock: true },
      { id: 1203, name: "Passa Maang Tikka", price: 2499, image: "https://images.unsplash.com/photo-1583878543723-dcd6ad8bcb3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Side-draping passa style maang tikka", category: "Maang Tikka", inStock: true },
      { id: 1204, name: "Floral Maang Tikka", price: 1599, image: "https://images.unsplash.com/photo-1762337383928-ed5e352977d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Delicate floral motif maang tikka", category: "Maang Tikka", inStock: true },
    ],
  },
  "sheesphool-mathapatti": {
    title: "Sheeshphool & Mathapatti",
    subtitle: "Stunning maang tikkas that complete every bridal look",
    collection: "traditional",
    products: [
      { id: 1201, name: "Classic Maang Tikka", price: 1299, image: "https://images.unsplash.com/photo-1756376755233-d3abcd9a5edb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Traditional gold maang tikka with chain", category: "Maang Tikka", inStock: true },
      { id: 1202, name: "Kundan Maang Tikka", price: 1999, image: "https://images.unsplash.com/photo-1771992226261-c1efb190ed34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Kundan-embellished bridal maang tikka", category: "Maang Tikka", inStock: true },
      { id: 1203, name: "Passa Maang Tikka", price: 2499, image: "https://images.unsplash.com/photo-1583878543723-dcd6ad8bcb3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Side-draping passa style maang tikka", category: "Maang Tikka", inStock: true },
      { id: 1204, name: "Floral Maang Tikka", price: 1599, image: "https://images.unsplash.com/photo-1762337383928-ed5e352977d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Delicate floral motif maang tikka", category: "Maang Tikka", inStock: true },
    ],
  },
  "necklace-sets": {
    title: "Necklace set",
    subtitle: "Stunning maang tikkas that complete every bridal look",
    collection: "traditional",
    products: [
      { id: 1201, name: "Classic Maang Tikka", price: 1299, image: "https://images.unsplash.com/photo-1756376755233-d3abcd9a5edb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Traditional gold maang tikka with chain", category: "Maang Tikka", inStock: true },
      { id: 1202, name: "Kundan Maang Tikka", price: 1999, image: "https://images.unsplash.com/photo-1771992226261-c1efb190ed34?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Kundan-embellished bridal maang tikka", category: "Maang Tikka", inStock: true },
      { id: 1203, name: "Passa Maang Tikka", price: 2499, image: "https://images.unsplash.com/photo-1583878543723-dcd6ad8bcb3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Side-draping passa style maang tikka", category: "Maang Tikka", inStock: true },
      { id: 1204, name: "Floral Maang Tikka", price: 1599, image: "https://images.unsplash.com/photo-1762337383928-ed5e352977d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Delicate floral motif maang tikka", category: "Maang Tikka", inStock: true },
    ],
  },
};

export const readyToShipProducts: Product[] = [
  { id: 1, name: "Floral Blush Earrings", price: 1299, image: "https://images.unsplash.com/photo-1756792340190-2039b9a1787d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Delicate pink resin earrings with floral details", category: "Earrings", inStock: true },
  { id: 2, name: "Rose Petal Necklace", price: 2499, image: "https://images.unsplash.com/photo-1762337383928-ed5e352977d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Elegant pendant necklace with rose details", category: "Necklace", inStock: true },
  { id: 3, name: "Blush Ring Set", price: 899, image: "https://images.unsplash.com/photo-1758995116142-c626a962a682?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Set of 3 delicate ", category: "Rings", inStock: true },
  { id: 4, name: "Pink Pearl Bracelet", price: 1799, image: "https://images.unsplash.com/photo-1740567389909-b36e9cadbef9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Charming bracelet with pink pearl accents", category: "Bracelet", inStock: true },
  { id: 5, name: "Floral Jewellery Set", price: 3999, image: "https://images.unsplash.com/photo-1763316189806-8f5e553cb261?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Complete jewellery set with earrings and necklace", category: "Jewellery Set", inStock: true },
  { id: 6, name: "Pink Essence Collection", price: 1599, image: "https://images.unsplash.com/photo-1663802515301-0e446f09b7eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Assorted pink resin jewellery pieces", category: "Collection", inStock: true },
  { id: 7, name: "Statement Drop Earrings", price: 1899, image: "https://images.unsplash.com/photo-1589204984444-21d051f4dc58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Bold earrings perfect for special occasions", category: "Earrings", inStock: true },
  { id: 8, name: "Delicate Chain Necklace", price: 2199, image: "https://images.unsplash.com/photo-1758995115518-26f90aa61b97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600", description: "Elegant layered necklace for everyday wear", category: "Necklace", inStock: true },
];

export const galleryImages = [
  { id: 1, src: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773151863/c6_weq1kd.jpg", alt: "Bridal jewellery set", customerName: "Priya's Wedding" },
  { id: 2, src: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773151930/c7_iamfyb.jpg", alt: "Statement earrings", customerName: "Ananya's Special Day" },
  { id: 3, src: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773152204/c8_ybgies.jpg", alt: "Haldi ceremony jewellery", customerName: "Simran's Haldi" },
  { id: 4, src: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773152270/c9_oedfof.jpg", alt: "Elegant jewellery portrait", customerName: "Riya's Photoshoot" },
  { id: 5, src: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773152338/c10_d7skum.jpg", alt: "Luxury bridal set", customerName: "Neha's Reception" },
  { id: 6, src: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773152396/c11_pbvgzz.jpg", alt: "Hair jewellery", customerName: "Kavya's Mehendi" },
  { id: 7, src: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773152447/c12_cwegvr.jpg", alt: "Kaleera set", customerName: "Aisha's Wedding" },
  { id: 8, src: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773152496/c13_ucsjlv.jpg", alt: "Hathphool design", customerName: "Diya's Celebration" },
  { id: 9, src: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773152577/c14_edd01e.jpg", alt: "Jhumka earrings", customerName: "Aisha's Wedding" },
  { id: 10, src: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773152626/c15_jbhfc8.jpg", alt: "Necklace set", customerName: "Diya's Celebration" },
  { id: 11, src: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773152668/c16_x79vsp.jpg", alt: "Gold bangles", customerName: "Aisha's Wedding" },
  { id: 12, src: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773152718/c17_nrwb5g.jpg", alt: "Maang tikka", customerName: "Diya's Celebration" },
  { id: 13, src: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773152934/c18_c36vpk.jpg", alt: "Jhumka earrings", customerName: "Aisha's Wedding" },
  { id: 14, src: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773153037/c19_prhkuj.jpg", alt: "Necklace set", customerName: "Diya's Celebration" },
  { id: 15, src: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773153099/c20_hvusom.jpg", alt: "Gold bangles", customerName: "Aisha's Wedding" },
  { id: 16, src: "https://res.cloudinary.com/dcs53etlz/image/upload/v1773153152/c21_vvwzlt.jpg", alt: "Maang tikka", customerName: "Diya's Celebration" },
  
  
];

// All slugs for static generation
export const allCategorySlugs = Object.keys(categoryData);