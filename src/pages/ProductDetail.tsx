import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, CheckCircle2, ArrowLeft } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "sonner";
import { getProductBySlug } from "@/lib/products";

// Static image imports
import productPdf from "@/assets/product-pdf.jpg";
import productCourse from "@/assets/product-course.jpg";
import productTemplate from "@/assets/product-template.jpg";

const imageMap: Record<string, string> = {
  "product-pdf": productPdf,
  "product-course": productCourse,
  "product-template": productTemplate,
};

const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addItem } = useCart();

  const product = slug ? getProductBySlug(slug) : undefined;

  if (!product) {
    return (
      <Layout>
        <div className="container py-20 text-center space-y-4">
          <h1 className="font-display text-3xl font-bold text-foreground">Product Not Found</h1>
          <p className="text-muted-foreground font-body">The product you're looking for doesn't exist.</p>
          <Button asChild variant="outline">
            <Link to="/products">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const imageSrc = imageMap[product.image] || productPdf;

  const handleAddToCart = () => {
    addItem({
      image: imageSrc,
      title: product.title,
      description: product.description,
      price: product.price,
      priceNum: product.priceNum,
      category: product.category,
    });
    toast.success(`${product.title} added to cart`);
  };

  return (
    <Layout>
      <section className="py-12 md:py-20">
        <div className="container">
          {/* Back link */}
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8 font-body"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Products
          </Link>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Image */}
            <div className="relative rounded-xl overflow-hidden border border-border bg-muted">
              <img
                src={imageSrc}
                alt={product.title}
                className="w-full aspect-[3/4] object-cover"
              />
              {product.tag && (
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground text-sm px-3 py-1">
                  {product.tag}
                </Badge>
              )}
            </div>

            {/* Details */}
            <div className="space-y-6">
              <div className="space-y-3">
                <span className="text-xs font-body font-semibold uppercase tracking-widest text-accent">
                  {product.category}
                </span>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  {product.title}
                </h1>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < product.rating ? "fill-accent text-accent" : "text-border"}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground font-body">
                    ({product.rating}.0)
                  </span>
                </div>
              </div>

              <p className="font-display text-4xl font-bold text-foreground">
                {product.price}
              </p>

              <div className="space-y-3">
                {product.longDescription.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="text-muted-foreground leading-relaxed font-body">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Benefits */}
              <div className="space-y-3 pt-2">
                <h3 className="font-display text-lg font-semibold text-foreground">
                  What You'll Get
                </h3>
                <ul className="space-y-2.5">
                  {product.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <span className="text-muted-foreground font-body">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2 glow-orange-sm px-8"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={18} />
                  Add to Cart — {product.price}
                </Button>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-4 pt-2 text-xs text-muted-foreground font-body">
                <span>✓ Instant download</span>
                <span>✓ Lifetime access</span>
                <span>✓ Free updates</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;
