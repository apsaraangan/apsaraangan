import { BrowserRouter, Routes, Route } from "react-router";
import { ShopProvider } from "@/context/ShopContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import Home from "@/app/page";
import Shop from "@/app/shop/page";
import Customize from "@/app/customize/page";
import Gallery from "@/app/gallery/page";
import Contact from "@/app/contact/page";
import Cart from "@/app/cart/page";
import Favorites from "@/app/favorites/page";
import CategoryPage from "@/app/category/[slug]/page";
import "@/app/globals.css";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ShopProvider>
      <Navigation />
      <main>{children}</main>
      <Footer />
    </ShopProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/customize" element={<Customize />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
