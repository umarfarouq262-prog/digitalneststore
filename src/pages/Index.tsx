import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import TestimonialCard from "@/components/TestimonialCard";
import heroImage from "@/assets/hero-products.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

const featuredProducts = [
  { image: product1, title: "The Ultimate Guide", description: "A comprehensive deep-dive into modern business strategy and growth.", price: "$19", tag: "Bestseller" },
  { image: product2, title: "Marketing Mastery", description: "Learn proven marketing frameworks used by top brands worldwide.", price: "$24", tag: "New" },
  { image: product3, title: "Productivity Blueprint", description: "Systems and habits to 10x your output without burning out.", price: "$14", tag: "Popular" },
];

const testimonials = [
  { quote: "These guides completely transformed how I approach my business. Worth every penny.", name: "Sarah Chen", role: "Founder, Bloom Studio" },
  { quote: "Beautifully written, actionable, and packed with insights. Highly recommend.", name: "Marcus Johnson", role: "Marketing Director" },
  { quote: "I've bought dozens of digital products — DigiShelf's are in a league of their own.", name: "Aisha Patel", role: "Freelance Consultant" },
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative overflow-hidden">
      <div className="container grid md:grid-cols-2 gap-12 items-center py-20 md:py-28">
        <div className="space-y-6 animate-fade-in">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
            Knowledge that <span className="text-accent">transforms</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md leading-relaxed font-body">
            Premium eBooks, guides, and PDFs crafted by experts to accelerate your growth.
          </p>
          <div className="flex gap-4 pt-2">
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 px-6">
              <Link to="/products">Browse Products</Link>
            </Button>
            <Button asChild variant="outline" className="border-foreground/20">
              <Link to="/about">Learn More</Link>
            </Button>
          </div>
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <img
            src={heroImage}
            alt="Collection of premium digital ebooks and guides"
            className="rounded-lg shadow-xl w-full object-cover"
          />
        </div>
      </div>
    </section>

    {/* Featured Products */}
    <section className="bg-secondary py-20">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl font-bold text-foreground">Featured Products</h2>
          <p className="text-muted-foreground mt-2 font-body">Our most loved digital resources</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProducts.map((p) => (
            <ProductCard key={p.title} {...p} />
          ))}
        </div>
        <div className="text-center mt-10">
          <Button asChild variant="outline">
            <Link to="/products">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-20">
      <div className="container">
        <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">What Readers Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </div>
    </section>

    {/* CTA */}
    <section className="bg-primary py-16">
      <div className="container text-center space-y-5">
        <h2 className="font-display text-3xl font-bold text-primary-foreground">Ready to level up?</h2>
        <p className="text-primary-foreground/70 font-body max-w-lg mx-auto">
          Join thousands of readers who've already transformed their skills with our digital products.
        </p>
        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 px-8">
          <Link to="/products">Get Started</Link>
        </Button>
      </div>
    </section>
  </Layout>
);

export default Index;
