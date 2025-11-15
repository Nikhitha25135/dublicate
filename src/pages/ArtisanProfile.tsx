import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BuyerNav from "@/components/BuyerNav";
import ProductCard from "@/components/ProductCard";

const ArtisanProfile = () => {
  const { id } = useParams();
  const [artisan, setArtisan] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);

  const fetchArtisan = async () => {
    const res = await fetch(`http://localhost:5001/seller/${id}`);
    const data = await res.json();
    setArtisan(data);
  };

  const fetchProducts = async () => {
    const res = await fetch(`http://localhost:5001/product/by-seller/${id}`);
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchArtisan();
    fetchProducts();
  }, [id]);

  if (!artisan) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-background">
      <BuyerNav />

      <div className="container mx-auto px-4 py-10">
        {/* Artisan details */}
        <div className="text-center mb-10">
          <img
            src={artisan.profilePic || "https://via.placeholder.com/150"}
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <h1 className="text-4xl font-bold">{artisan.name}</h1>
          <p className="text-lg text-muted-foreground">{artisan.craft}</p>
          <p>{artisan.brand}</p>
        </div>

        <h2 className="text-3xl font-bold text-center mb-6">Products by {artisan.name}</h2>

        {products.length === 0 ? (
          <p className="text-center text-muted-foreground">No products yet</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                image={product.image}
                title={product.title}
                price={product.price}
                description={product.description}
                category={product.category}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtisanProfile;
