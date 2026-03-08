import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

const allProducts = [
  { image: product1, title: "The Ultimate Guide", description: "A comprehensive deep-dive into modern business strategy and growth.", price: "$19", tag: "Bestseller" },
  { image: product2, title: "Marketing Mastery", description: "Learn proven marketing frameworks used by top brands worldwide.", price: "$24", tag: "New" },
  { image: product3, title: "Productivity Blueprint", description: "Systems and habits to 10x your output without burning out.", price: "$14", tag: "Popular" },
  { image: product1, title: "Leadership Essentials", description: "Core principles every leader needs to inspire and drive results.", price: "$17", tag: "eBook" },
  { image: product2, title: "Social Media Playbook", description: "Step-by-step strategies to grow your audience organically.", price: "$21", tag: "Guide" },
  { image: product3, title: "Freelancer's Toolkit", description: "Everything you need to launch and scale your freelance career.", price: "$12", tag: "PDF" },
];

const Products = () => (
  <Layout>
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl font-bold text-foreground">Our Products</h1>
          <p className="text-muted-foreground mt-3 font-body max-w-lg mx-auto">
            Browse our full collection of expertly crafted digital products designed to accelerate your success.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProducts.map((p) => (
            <ProductCard key={p.title} {...p} />
          ))}
        </div>
      </div>
    </section>
  </Layout>
);

export default Products;
