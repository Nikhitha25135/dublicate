import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

interface ArtisanCardProps {
  name: string;
  image: string;
  craft: string;
  brand: string;
  description: string;
}

const ArtisanCard = ({ name, image, craft, brand, description }: ArtisanCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-elevated border-border">
      <div className="aspect-square overflow-hidden bg-muted">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-bold text-xl">{name}</h3>
          <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
            {craft}
          </Badge>
        </div>
        <p className="text-sm font-medium text-muted-foreground mb-3">{brand}</p>
        <p className="text-sm text-muted-foreground line-clamp-3">{description}</p>
      </CardContent>
    </Card>
  );
};

export default ArtisanCard;
