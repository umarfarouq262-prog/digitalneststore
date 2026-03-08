import { Button } from "@/components/ui/button";

interface ProductCardProps {
  image: string;
  title: string;
  description: string;
  price: string;
  tag?: string;
}

const ProductCard = ({ image, title, description, price, tag }: ProductCardProps) => (
  <div className="group bg-card rounded-lg border border-border overflow-hidden transition-shadow hover:shadow-lg animate-fade-in">
    <div className="aspect-[3/4] overflow-hidden bg-muted">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
    </div>
    <div className="p-5 space-y-3">
      {tag && (
        <span className="inline-block text-xs font-body font-semibold uppercase tracking-wider text-accent">
          {tag}
        </span>
      )}
      <h3 className="font-display text-lg font-semibold text-card-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
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
