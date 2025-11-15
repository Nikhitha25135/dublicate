import BuyerNav from "@/components/BuyerNav";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroBanner from "@/assets/hero-banner.jpg";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";

const BuyerHome = () => {
  const featuredProducts = [
    {
      id: "1",
      image: product1,
      name: "Handwoven Textile Runner",
      brand: "Lakshmi Handlooms",
      price: 2499,
      description: "Traditional Indian handloom textile with intricate patterns"
    },
    {
      id: "2",
      image: product2,
      name: "Terracotta Clay Vase",
      brand: "Kumar Pottery Works",
      price: 1299,
      description: "Handcrafted pottery vase with earthy terracotta glaze"
    },
    {
      id: "3",
      image: product3,
      name: "Carved Wooden Bowl",
      brand: "Sharma Wood Crafts",
      price: 1899,
      description: "Traditional wooden bowl with intricate hand-carved patterns"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <BuyerNav />
      
      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden pattern-overlay">
        <img 
          src={heroBanner} 
          alt="Indian Craftsmanship" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl text-primary-foreground">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Discover Authentic Indian Handicrafts
              </h1>
              <p className="text-xl mb-8 opacity-95">
                Connect directly with rural artisans and bring home the essence of traditional craftsmanship
              </p>
              <Button size="lg" variant="secondary" className="group">
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Each piece tells a story of heritage, skill, and dedication passed through generations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-subtle">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Are You an Artisan?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Join our platform and reach global buyers. Showcase your craftsmanship to the world with AI-powered tools.
          </p>
          <Button size="lg" className="bg-gradient-warm hover:opacity-90">
            Start Selling Today
          </Button>
        </div>
      </section>
    </div>
  );
};

export default BuyerHome;
