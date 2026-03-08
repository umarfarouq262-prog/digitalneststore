import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  price: string;
  tag?: string;
  category?: string;
  rating?: number;
}

const ProductCard = ({ image, title, description, price, tag, category, rating = 5 }: ProductCardProps) => (
  <div className="group bg-card rounded-lg border border-border overflow-hidden transition-all hover:shadow-lg hover:border-accent/30 animate-fade-in">
    <div className="aspect-[3/4] overflow-hidden bg-muted relative">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      {tag && (
        <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs font-body font-semibold px-2.5 py-1 rounded-full">
          {tag}
        </span>
      )}
    </div>
    <div className="p-5 space-y-2.5">
      {category && (
        <span className="text-xs font-body font-medium uppercase tracking-wider text-muted-foreground">
          {category}
        </span>
      )}
      <h3 className="font-display text-lg font-semibold text-card-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      <div className="flex gap-0.5 pt-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={12} className={i < rating ? "fill-accent text-accent" : "text-border"} />
        ))}
      </div>
      <div className="flex items-center justify-between pt-2">
        <span className="font-display text-xl font-bold text-foreground">{price}</span>
        <Button variant="default" size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
          Buy Now
        </Button>
      </div>
    </div>
  </div>
);

export default ProductCard;
