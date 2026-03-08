import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import { useState } from "react";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

type Category = "All" | "PDF" | "Course" | "Template" | "Tool";
type SortBy = "popular" | "price-low" | "price-high" | "newest";

const allProducts = [
  { image: product1, title: "The Ultimate Business Guide", description: "A comprehensive deep-dive into modern business strategy.", price: "$19", priceNum: 19, tag: "Bestseller", category: "PDF" as const, rating: 5 },
  { image: product2, title: "Marketing Mastery Course", description: "12-module video course with worksheets for digital marketing.", price: "$49", priceNum: 49, tag: "New", category: "Course" as const, rating: 5 },
  { image: product3, title: "Productivity Blueprint Kit", description: "Templates, checklists, and systems to 10x your output.", price: "$14", priceNum: 14, tag: "Popular", category: "Template" as const, rating: 4 },
  { image: product1, title: "Leadership Essentials PDF", description: "Core principles every leader needs to inspire teams.", price: "$17", priceNum: 17, category: "PDF" as const, rating: 4 },
  { image: product2, title: "Social Media Playbook", description: "Step-by-step strategies to grow your audience organically.", price: "$21", priceNum: 21, category: "Course" as const, rating: 5 },
  { image: product3, title: "Freelancer's Toolkit", description: "Everything you need to launch your freelance career.", price: "$12", priceNum: 12, category: "Template" as const, rating: 4 },
  { image: product1, title: "SEO Checklist Pro", description: "A complete SEO audit checklist for any website.", price: "$9", priceNum: 9, tag: "Free Sample", category: "PDF" as const, rating: 5 },
  { image: product2, title: "Video Editing Masterclass", description: "From beginner to pro in 8 comprehensive modules.", price: "$59", priceNum: 59, category: "Course" as const, rating: 5 },
  { image: product3, title: "Social Media Templates Pack", description: "50+ ready-to-use templates for Instagram, LinkedIn & more.", price: "$24", priceNum: 24, category: "Template" as const, rating: 5 },
];

const categories: Category[] = ["All", "PDF", "Course", "Template", "Tool"];

interface ProductsPageProps {
  defaultCategory?: Category;
  title?: string;
  subtitle?: string;
}

const ProductsPage = ({ defaultCategory = "All", title = "All Products", subtitle = "Browse our full collection of expertly crafted digital products." }: ProductsPageProps) => {
  const [activeCategory, setActiveCategory] = useState<Category>(defaultCategory);
  const [sortBy, setSortBy] = useState<SortBy>("popular");

  const filtered = allProducts
    .filter((p) => activeCategory === "All" || p.category === activeCategory)
    .sort((a, b) => {
      if (sortBy === "price-low") return a.priceNum - b.priceNum;
      if (sortBy === "price-high") return b.priceNum - a.priceNum;
      return 0;
    });

  return (
    <Layout>
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-10">
            <h1 className="font-display text-4xl font-bold text-foreground">{title}</h1>
            <p className="text-muted-foreground mt-3 font-body max-w-lg mx-auto">{subtitle}</p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-body font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-accent text-accent-foreground"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="text-sm font-body bg-secondary text-foreground border border-border rounded-md px-3 py-1.5"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low → High</option>
              <option value="price-high">Price: High → Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No products found in this category yet.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((p) => (
                <ProductCard key={p.title} {...p} />
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ProductsPage;
