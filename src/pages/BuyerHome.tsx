import { useEffect, useState } from "react";
import BuyerNav from "@/components/BuyerNav";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";

const BuyerHome = () => {
  const [allProducts, setAllProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Textile", "Pottery", "Wood", "Metal", "Jewelry", "Paintings"];

  // Fetch products from DB
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:5001/product/all");
      const data = await response.json();
      setAllProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.log("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add To Cart Function
  const handleAddToCart = async (productId: string) => {
    const buyerId = localStorage.getItem("buyerId");

    if (!buyerId) {
      alert("Please login first to add to cart.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ buyerId, productId }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Added to Cart Successfully!");
      } else {
        alert(data.message || "Failed to add to cart");
      }
    } catch (err) {
      console.error("Add to Cart Error:", err);
      alert("Something went wrong!");
    }
  };

  // Filter Products
  useEffect(() => {
    let result = [...allProducts];

    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (search.trim() !== "") {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProducts(result);
  }, [search, selectedCategory, allProducts]);


  return (
    <div className="min-h-screen bg-background">
      <BuyerNav />

      {/* Search Section */}
      <section className="container mx-auto px-4 py-8">
        <Input
          placeholder="Search products..."
          className="w-full md:w-1/2 mx-auto p-2 border rounded-lg"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4">
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full border text-sm transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-white"
                  : "border-gray-400 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 pb-16">
        <h2 className="text-3xl font-bold mb-6 text-center">All Products</h2>

        {filteredProducts.length === 0 ? (
          <p className="text-center text-muted-foreground text-lg">No products found</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                image={product.image}
                title={product.title}
                price={product.price}
                description={product.description}
                category={product.category}
                onAddToCart={() => handleAddToCart(product._id)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default BuyerHome;
