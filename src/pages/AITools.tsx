import { useState } from "react";
import SellerNav from "@/components/SellerNav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Wand2, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

const AITools = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [removedBgUrl, setRemovedBgUrl] = useState<string | null>(null);

  const removeBackground = async () => {
    if (!selectedFile) return toast.error("Please upload an image!");

    try {
      setIsProcessing(true);
      const form = new FormData();
      form.append("image", selectedFile);

      const res = await fetch("http://localhost:5001/remove-bg", {
        method: "POST",
        body: form,
      });

      if (!res.ok) {
        toast.error("Background removal failed");
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      setRemovedBgUrl(url);

      toast.success("Background removed successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setIsProcessing(false);
    }
  };


  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      toast.success("Image uploaded successfully!");
    }
  };

  const handleVisualize = () => {
    toast.success("Generating cloth visualizations...");
  };

  const handleGenerateMarketing = () => {
    toast.success("Creating marketing materials with AI...");
  };

  return (
    <div className="min-h-screen bg-background">
      <SellerNav />
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">AI Tools</h1>
          <p className="text-muted-foreground text-lg">
            Transform your products with intelligent automation
          </p>
        </div>

        <Tabs defaultValue="visualizer" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="visualizer">Cloth Visualizer</TabsTrigger>
            <TabsTrigger value="marketing">Marketing Generator</TabsTrigger>
          </TabsList>

          <TabsContent value="visualizer" className="mt-6">
            <Card className="shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5 text-primary" />
                  Cloth Visualizer
                </CardTitle>
                <CardDescription>
                  Upload a cloth image and see it visualized as different products
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="cloth-upload">Upload Cloth Image</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="cloth-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="flex-1"
                    />
                    <Upload className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>

                {selectedFile && (
                  <div className="p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Selected file:</p>
                    <p className="font-medium">{selectedFile.name}</p>
                  </div>
                )}

                <Button 
                  onClick={handleVisualize} 
                  className="w-full bg-gradient-warm hover:opacity-90"
                  disabled={!selectedFile}
                >
                  Generate Visualizations
                </Button>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  {["Frock", "Curtain", "Cushion Cover", "Table Runner"].map((item) => (
                    <div key={item} className="aspect-square bg-muted rounded-lg flex items-center justify-center border border-border">
                      <p className="text-sm text-muted-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="marketing" className="mt-6">
            <Card className="shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  Marketing Image Generator
                </CardTitle>
                <CardDescription>
                  Upload a product image and get AI-generated marketing materials
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="product-upload">Upload Product Image</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="product-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="flex-1"
                    />
                    <Upload className="h-5 w-5 text-muted-foreground" />
                  </div>
                </div>

                <Button
                  onClick={removeBackground}
                  className="w-full bg-gradient-warm hover:opacity-90"
                  disabled={!selectedFile || isProcessing}
                >
                  {isProcessing ? "Processing..." : "Remove Background"}
                </Button>
                {removedBgUrl && (
                  <div className="p-4 bg-muted rounded-lg border border-border">
                    <Label className="text-sm font-semibold mb-2 block">
                      Background Removed Image
                    </Label>
                    <img 
                      src={removedBgUrl} 
                      alt="Removed background" 
                      className="max-w-xs rounded-md shadow-md"
                    />
                  </div>
                )}



                <div className="space-y-4 pt-4">
                  <div className="p-4 bg-muted rounded-lg border border-border">
                    <Label className="text-sm font-semibold mb-2 block">AI-Generated Description</Label>
                    <p className="text-sm text-muted-foreground">
                      Your product description will appear here...
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg border border-border">
                    <Label className="text-sm font-semibold mb-2 block">Suggested Hashtags</Label>
                    <p className="text-sm text-muted-foreground">
                      Hashtags will be generated here...
                    </p>
                  </div>

                  <div className="p-4 bg-muted rounded-lg border border-border">
                    <Label className="text-sm font-semibold mb-2 block">Predicted Price</Label>
                    <p className="text-2xl font-bold text-primary">₹0</p>
                  </div>

                  <Button variant="outline" className="w-full">
                    Publish Product
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AITools;
