import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import Index from "./pages/Index";
import ProductsPage from "./pages/ProductsPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Cart from "./pages/Cart";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import ProductDetail from "./pages/ProductDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/courses" element={<ProductsPage defaultCategory="Course" title="Courses" subtitle="Video courses and learning bundles to master new skills." />} />
            <Route path="/templates" element={<ProductsPage defaultCategory="Template" title="Templates" subtitle="Ready-to-use templates for docs, social media, and more." />} />
            <Route path="/pdfs" element={<ProductsPage defaultCategory="PDF" title="PDFs & Guides" subtitle="Expertly crafted PDFs, checklists, and workbooks." />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:slug" element={<ProductDetail />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
