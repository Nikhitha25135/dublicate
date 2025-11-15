import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Users, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBanner from "@/assets/hero-banner.jpg";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">AI Artisans</h1>
          <div className="flex gap-6 items-center">
            <a href="#home" className="text-muted-foreground hover:text-foreground transition-colors">Home</a>
            <a href="#artisans" className="text-muted-foreground hover:text-foreground transition-colors">Artisans</a>
            <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-[600px] overflow-hidden pattern-overlay">
        <img 
          src={heroBanner} 
          alt="Indian Artisans at Work" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero">
          <div className="container mx-auto px-4 h-full flex items-center justify-center">
            <div className="max-w-3xl text-center text-primary-foreground">
              <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                Connecting Rural Artisans to the World
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-95">
                Discover authentic handcrafted treasures while empowering traditional craftspeople across India
              </p>
              <div className="flex gap-4 justify-center flex-wrap">
                <Button 
                  size="lg" 
                  onClick={() => navigate('/role-selection')}
                  className="bg-background text-foreground hover:bg-background/90 group"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate('/buyer/home')}
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                >
                  Explore Products
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why AI Artisans?</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Bridging tradition and technology to create opportunities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-lg bg-card shadow-card border border-border">
              <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Empower Artisans</h3>
              <p className="text-muted-foreground">
                Direct connection to global markets, ensuring fair compensation and sustainable livelihoods
              </p>
            </div>

            <div className="text-center p-8 rounded-lg bg-card shadow-card border border-border">
              <div className="inline-flex p-4 bg-accent/10 rounded-full mb-4">
                <Sparkles className="h-8 w-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold mb-3">AI-Powered Tools</h3>
              <p className="text-muted-foreground">
                Advanced technology helps artisans showcase their work professionally and reach wider audiences
              </p>
            </div>

            <div className="text-center p-8 rounded-lg bg-card shadow-card border border-border">
              <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">Global Marketplace</h3>
              <p className="text-muted-foreground">
                Authentic Indian handicrafts delivered worldwide, preserving cultural heritage through commerce
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Begin Your Journey?</h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Whether you're an artisan looking to reach global markets or a buyer seeking authentic craftsmanship, we're here to connect you.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate('/role-selection')}
            className="bg-gradient-warm hover:opacity-90"
          >
            Join AI Artisans Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 bg-card">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 AI Artisans. Connecting tradition with technology.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
