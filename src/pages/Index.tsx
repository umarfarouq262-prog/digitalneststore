import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import TestimonialCard from "@/components/TestimonialCard";
import CategoryCard from "@/components/CategoryCard";
import WhyChooseUs from "@/components/WhyChooseUs";
import NewsletterSection from "@/components/NewsletterSection";
import heroImage from "@/assets/hero-digitalnest.jpg";
import productPdf from "@/assets/product-pdf.jpg";
import productCourse from "@/assets/product-course.jpg";
import productTemplate from "@/assets/product-template.jpg";
import iconPdf from "@/assets/icon-pdf.png";
import iconCourse from "@/assets/icon-course.png";
import iconTemplate from "@/assets/icon-template.png";
import iconTools from "@/assets/icon-tools.png";

const categories = [
  { image: iconPdf, title: "PDFs", description: "Guides, Checklists, Workbooks", to: "/pdfs", count: 12 },
  { image: iconCourse, title: "Courses", description: "Video + PDF Bundles", to: "/courses", count: 8 },
  { image: iconTemplate, title: "Templates", description: "Docs, Spreadsheets, Social Media", to: "/templates", count: 15 },
  { image: iconTools, title: "Tools & Plugins", description: "Digital utilities for pros", to: "/pdfs", count: 5 },
];

const featuredProducts = [
  { image: productPdf, title: "The Ultimate Business Guide", description: "A comprehensive deep-dive into modern business strategy and growth frameworks.", price: "$19", tag: "Bestseller", category: "PDF", rating: 5 },
  { image: productCourse, title: "Marketing Mastery Course", description: "12-module video course with worksheets to master digital marketing.", price: "$49", tag: "New", category: "Course", rating: 5 },
  { image: productTemplate, title: "Productivity Blueprint Kit", description: "Templates, checklists and systems to 10x your daily output.", price: "$14", tag: "Popular", category: "Template", rating: 4 },
];

const testimonials = [
  { quote: "These guides completely transformed how I approach my business. The templates alone saved me 20+ hours.", name: "Sarah Chen", role: "Founder, Bloom Studio", rating: 5 },
  { quote: "The course content is world-class. Better than programs costing 10x more. Your download is ready instantly!", name: "Marcus Johnson", role: "Marketing Director", rating: 5 },
  { quote: "I've bought dozens of digital products — DigitalNest's are in a league of their own. Highly curated.", name: "Aisha Patel", role: "Freelance Consultant", rating: 5 },
];

const Index = () => (
  <Layout>
    {/* Hero */}
    <section className="relative overflow-hidden">
      <div className="container grid md:grid-cols-2 gap-12 items-center py-20 md:py-28">
        <div className="space-y-6 animate-fade-in">
          <span className="inline-block text-xs font-body font-semibold uppercase tracking-widest text-accent">Your one-stop digital shop</span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
            Unlock Premium Digital Resources <span className="text-accent glow-orange-text">Instantly</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md leading-relaxed font-body">
            PDFs, Courses, Templates, and Tools for Creators & Professionals. Download and start learning in seconds.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 px-6">
              <Link to="/courses">Browse Products</Link>
            </Button>
            <Button asChild variant="outline" className="border-foreground/20">
              <Link to="/about">Start Learning</Link>
            </Button>
          </div>
        </div>
        <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <img
            src={heroImage}
            alt="Premium digital products - courses, PDFs, templates in a nest"
            className="rounded-xl shadow-xl w-full object-cover"
          />
        </div>
      </div>
    </section>

    {/* Categories */}
    <section className="bg-secondary py-20">
      <div className="container">
        <h2 className="font-display text-3xl font-bold text-foreground text-center">Browse by Category</h2>
        <p className="text-muted-foreground text-center mt-2 font-body">Find exactly what you need</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {categories.map((cat) => (
            <CategoryCard key={cat.title} {...cat} />
          ))}
        </div>
      </div>
    </section>

    {/* Featured Products */}
    <section className="py-20">
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
            <Link to="/courses">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>

    {/* Why Choose Us */}
    <WhyChooseUs />

    {/* Testimonials */}
    <section className="bg-secondary py-20">
      <div className="container">
        <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </div>
    </section>

    {/* Newsletter */}
    <NewsletterSection />

    {/* CTA */}
    <section className="bg-primary py-16">
      <div className="container text-center space-y-5">
        <h2 className="font-display text-3xl font-bold text-primary-foreground">Ready to level up?</h2>
        <p className="text-primary-foreground/60 font-body max-w-lg mx-auto">
          Join thousands of creators who've already transformed their skills with our digital products.
        </p>
        <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 px-8">
          <Link to="/courses">Get Started</Link>
        </Button>
      </div>
    </section>
  </Layout>
);

export default Index;
