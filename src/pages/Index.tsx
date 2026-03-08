import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import ProductCard from "@/components/ProductCard";
import TestimonialCard from "@/components/TestimonialCard";
import CategoryCard from "@/components/CategoryCard";
import WhyChooseUs from "@/components/WhyChooseUs";
import NewsletterSection from "@/components/NewsletterSection";
import heroImage from "@/assets/hero-digitalnest.jpg";
import heroLearning from "@/assets/hero-learning.jpg";
import heroTemplates from "@/assets/hero-templates.jpg";
import productPdf from "@/assets/product-pdf.jpg";
import productCourse from "@/assets/product-course.jpg";
import productTemplate from "@/assets/product-template.jpg";
import productStrategy from "@/assets/product-strategy.jpg";
import productSocial from "@/assets/product-social.jpg";
import productFinance from "@/assets/product-finance.jpg";
import iconPdf from "@/assets/icon-pdf.png";
import iconCourse from "@/assets/icon-course.png";
import iconTemplate from "@/assets/icon-template.png";
import iconTools from "@/assets/icon-tools.png";

const heroSlides = [
  {
    image: heroImage,
    tagline: "Your one-stop digital shop",
    title: "Unlock Premium Digital Resources",
    highlight: "Instantly",
    description: "PDFs, Courses, Templates, and Tools for Creators & Professionals. Download and start learning in seconds.",
  },
  {
    image: heroLearning,
    tagline: "Learn at your own pace",
    title: "Master New Skills with Expert",
    highlight: "Courses",
    description: "Video courses, worksheets, and bundles designed by industry professionals to accelerate your growth.",
  },
  {
    image: heroTemplates,
    tagline: "Work smarter, not harder",
    title: "Professional Templates Ready to",
    highlight: "Use",
    description: "Save hours with our premium templates for documents, social media, spreadsheets, and more.",
  },
];

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
  { image: productStrategy, title: "Business Strategy Playbook", description: "Step-by-step frameworks for building and scaling your business from scratch.", price: "$29", tag: "Trending", category: "PDF", rating: 5 },
  { image: productSocial, title: "Social Media Template Pack", description: "50+ ready-to-post Instagram, TikTok, and LinkedIn templates.", price: "$24", tag: "Hot", category: "Template", rating: 5 },
  { image: productFinance, title: "Finance Tracker Toolkit", description: "Budget planners, expense trackers, and financial dashboards in one bundle.", price: "$17", tag: "Essential", category: "Tool", rating: 4 },
];

const testimonials = [
  { quote: "These guides completely transformed how I approach my business. The templates alone saved me 20+ hours.", name: "Sarah Chen", role: "Founder, Bloom Studio", rating: 5 },
  { quote: "The course content is world-class. Better than programs costing 10x more. Your download is ready instantly!", name: "Marcus Johnson", role: "Marketing Director", rating: 5 },
  { quote: "I've bought dozens of digital products — DigitalNest's are in a league of their own. Highly curated.", name: "Aisha Patel", role: "Freelance Consultant", rating: 5 },
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[current];

  return (
    <section className="relative overflow-hidden">
      <div className="container grid md:grid-cols-2 gap-12 items-center py-20 md:py-28">
        <div className="space-y-6 animate-fade-in" key={current}>
          <span className="inline-block text-xs font-body font-semibold uppercase tracking-widest text-accent">
            {slide.tagline}
          </span>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground">
            {slide.title} <span className="text-accent glow-orange-text">{slide.highlight}</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-md leading-relaxed font-body">
            {slide.description}
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 px-6 glow-orange-sm">
              <Link to="/courses">Browse Products</Link>
            </Button>
            <Button asChild variant="outline" className="border-foreground/20">
              <Link to="/about">Start Learning</Link>
            </Button>
          </div>
        </div>
        <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <img
            key={slide.image}
            src={slide.image}
            alt="Premium digital products"
            className="rounded-xl shadow-xl w-full object-cover aspect-square"
          />
          {/* Carousel controls */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <button
              onClick={() => setCurrent((c) => (c - 1 + heroSlides.length) % heroSlides.length)}
              className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setCurrent((c) => (c + 1) % heroSlides.length)}
              className="p-2 rounded-full bg-background/80 backdrop-blur-sm border border-border text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight size={18} />
            </button>
          </div>
          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${i === current ? "bg-accent w-6" : "bg-foreground/30"}`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Index = () => (
  <Layout>
    <HeroCarousel />

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
