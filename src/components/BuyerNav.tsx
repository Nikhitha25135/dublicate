import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { ShoppingBag } from "lucide-react";

const BuyerNav = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="sticky top-0 z-50 bg-card border-b border-border shadow-soft">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold bg-gradient-warm bg-clip-text text-transparent">
              AI Artisans
            </span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') ? 'text-primary' : 'text-foreground'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/products') ? 'text-primary' : 'text-foreground'
              }`}
            >
              Products
            </Link>
            <Link 
              to="/artisans" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/artisans') ? 'text-primary' : 'text-foreground'
              }`}
            >
              Artisans
            </Link>
            <Link 
              to="/about" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/about') ? 'text-primary' : 'text-foreground'
              }`}
            >
              About Us
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">Login</Button>
            <Link to="/seller/signup">
              <Button size="sm" className="bg-gradient-warm hover:opacity-90">
                Sell on Platform
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BuyerNav;
