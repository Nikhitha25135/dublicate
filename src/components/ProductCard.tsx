import { Link } from "react-router-dom";
import { Card, CardContent } from "./ui/card";

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  brand: string;
  price: number;
  description: string;
}

const ProductCard = ({ id, image, name, brand, price, description }: ProductCardProps) => {
  return (
    <Link to={`/product/${id}`}>
      <Card className="group overflow-hidden transition-all duration-300 hover:shadow-elevated border-border">
        <div className="aspect-square overflow-hidden bg-muted">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground mb-1">{brand}</p>
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{name}</h3>
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{description}</p>
          <p className="text-xl font-bold text-primary">₹{price.toLocaleString()}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
