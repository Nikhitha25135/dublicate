import BuyerNav from "@/components/BuyerNav";
import ArtisanCard from "@/components/ArtisanCard";
import artisan1 from "@/assets/artisan-1.jpg";
import artisan2 from "@/assets/artisan-2.jpg";

const Artisans = () => {
  const artisans = [
    {
      name: "Lakshmi Devi",
      image: artisan1,
      craft: "Handloom Weaving",
      brand: "Lakshmi Handlooms",
      description: "Master weaver with 40 years of experience in traditional handloom techniques. Specializes in creating intricate patterns using natural dyes and sustainable materials."
    },
    {
      name: "Rajesh Kumar",
      image: artisan2,
      craft: "Pottery",
      brand: "Kumar Pottery Works",
      description: "Third-generation potter preserving ancient terracotta techniques. Creates beautiful functional and decorative pieces using locally sourced clay."
    },
    {
      name: "Meera Sharma",
      image: artisan1,
      craft: "Wood Carving",
      brand: "Sharma Wood Crafts",
      description: "Expert wood carver specializing in traditional Indian patterns. Each piece is hand-carved with attention to detail and cultural authenticity."
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <BuyerNav />
      
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Meet Our Artisans</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Discover the talented craftspeople behind each unique piece. Every artisan brings decades of tradition, skill, and passion to their work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artisans.map((artisan, index) => (
            <ArtisanCard key={index} {...artisan} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artisans;
