import { useParams } from "react-router-dom";
import BuyerNav from "@/components/BuyerNav";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import product1 from "@/assets/product-1.jpg";

const ProductDetail = () => {
  const { id } = useParams();

  const product = {
    id: id,
    image: product1,
    name: "Handwoven Textile Runner",
    brand: "Lakshmi Handlooms",
    price: 2499,
    description: "This exquisite handwoven textile runner showcases the rich heritage of Indian handloom traditions. Crafted with precision and care by skilled artisans in rural India, each piece features intricate patterns passed down through generations. The vibrant terracotta and turquoise colors are achieved using traditional natural dyes, ensuring both beauty and sustainability. Perfect for adding a touch of cultural elegance to your home decor.",
    details: [
      "100% handwoven cotton",
      "Natural dyes used",
      "Dimensions: 180cm x 40cm",
      "Made in rural Maharashtra, India",
      "Supports local artisan communities"
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <BuyerNav />
      
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square rounded-lg overflow-hidden shadow-elevated">
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-3xl font-bold text-primary mb-6">₹{product.price.toLocaleString()}</p>
            
            <p className="text-muted-foreground mb-8 leading-relaxed">
              {product.description}
            </p>

            <div className="mb-8">
              <h3 className="font-semibold mb-4">Product Details</h3>
              <ul className="space-y-2">
                {product.details.map((detail, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span className="text-muted-foreground">{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <Button size="lg" className="flex-1 bg-gradient-warm hover:opacity-90">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
              <Button size="lg" variant="outline">
                <Heart className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
