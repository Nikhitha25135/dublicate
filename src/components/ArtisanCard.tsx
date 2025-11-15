import { Link } from "react-router-dom";

const ArtisanCard = ({ artisan }: any) => {
  return (
    <Link to={`/artisan/${artisan._id}`}>
      <div className="border rounded-lg shadow-lg p-4 hover:shadow-2xl transition-all cursor-pointer">
        <img
          src={artisan.profilePic || "https://via.placeholder.com/300"}
          className="w-full h-52 object-cover rounded-md mb-4"
          alt={artisan.name}
        />
        <h2 className="text-xl font-bold">{artisan.name}</h2>
        <p className="text-sm text-muted-foreground">{artisan.craft}</p>
        <p className="font-medium mt-1">{artisan.brand}</p>
      </div>
    </Link>
  );
};

export default ArtisanCard;
