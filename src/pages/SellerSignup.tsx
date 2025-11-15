import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SellerSignup = () => {
  const navigate = useNavigate();
  const [brandTypes, setBrandTypes] = useState<string[]>([]);

  const craftTypes = ["Pottery", "Handloom", "Woodwork", "Metalwork", "Textile", "Jewelry"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Registration successful! Welcome to AI Artisans.");
    navigate('/seller/dashboard');
  };

  const toggleBrandType = (type: string) => {
    setBrandTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-elevated border-border">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-warm bg-clip-text text-transparent">
            Join AI Artisans
          </CardTitle>
          <CardDescription className="text-base">
            Start selling your handcrafted products to a global audience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter your name" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" placeholder="Create a password" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Brand Name</Label>
              <Input id="brand" placeholder="Your brand or business name" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Textarea id="address" placeholder="Your complete address" rows={3} required />
            </div>

            <div className="space-y-3">
              <Label>Brand Type (Select all that apply)</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {craftTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox 
                      id={type}
                      checked={brandTypes.includes(type)}
                      onCheckedChange={() => toggleBrandType(type)}
                    />
                    <label htmlFor={type} className="text-sm cursor-pointer">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Brand Description</Label>
              <Textarea 
                id="description" 
                placeholder="Tell us about your craft and story..." 
                rows={4}
                required 
              />
            </div>

            <Button type="submit" className="w-full bg-gradient-warm hover:opacity-90" size="lg">
              Create Seller Account
            </Button>
          </form>

          <div className="text-center mt-6">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <Button 
                variant="link" 
                className="p-0 text-accent"
                onClick={() => navigate('/seller/login')}
              >
                Sign in
              </Button>
            </p>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/role-selection')}
              className="mt-4 text-muted-foreground"
            >
              ← Back to role selection
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerSignup;
