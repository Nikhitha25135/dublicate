import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BuyerNav from "@/components/BuyerNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const BuyerProfile = () => {
  const navigate = useNavigate();
  const buyerId = localStorage.getItem("buyerId");

  const [buyer, setBuyer] = useState<any>(null);
  const [editMode, setEditMode] = useState(false);

  const fetchBuyerData = async () => {
    if (!buyerId) {
      alert("Please login!");
      navigate("/buyer/login");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5001/buyer/${buyerId}`);
      const data = await res.json();
      setBuyer(data);
    } catch (err) {
      console.log("Fetch buyer error:", err);
    }
  };

  useEffect(() => {
    fetchBuyerData();
  }, []);

  const handleUpdate = async () => {
    try {
      const res = await fetch("http://localhost:5001/buyer/update", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buyer),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Profile updated successfully!");
        setEditMode(false);
      } else {
        alert(data.message);
      }
    } catch (err) {
      alert("Update failed");
    }
  };

  if (!buyer) return <p className="text-center mt-10 text-lg">Loading...</p>;

  return (
    <div className="min-h-screen bg-background">
      <BuyerNav />

      <div className="container mx-auto px-4 py-10 max-w-xl">
        <Card className="shadow-lg">
          <CardContent className="p-6 space-y-5">

            <h2 className="text-3xl font-bold text-center mb-4">My Profile</h2>

            <div className="space-y-3">
              <label className="font-medium">Full Name</label>
              <Input
                value={buyer.name}
                disabled={!editMode}
                onChange={(e) => setBuyer({ ...buyer, name: e.target.value })}
              />
            </div>

            <div className="space-y-3">
              <label className="font-medium">Email</label>
              <Input value={buyer.email} disabled />
            </div>

            <div className="space-y-3">
              <label className="font-medium">Phone</label>
              <Input
                value={buyer.phone || ""}
                disabled={!editMode}
                onChange={(e) => setBuyer({ ...buyer, phone: e.target.value })}
              />
            </div>

            <div className="space-y-3">
              <label className="font-medium">Address</label>
              <Input
                value={buyer.address || ""}
                disabled={!editMode}
                onChange={(e) => setBuyer({ ...buyer, address: e.target.value })}
              />
            </div>

            <div className="flex gap-4 mt-5">
              {editMode ? (
                <>
                  <Button className="w-full" onClick={handleUpdate}>Save</Button>
                  <Button className="w-full" variant="outline" onClick={() => setEditMode(false)}>
                    Cancel
                  </Button>
                </>
              ) : (
                <Button className="w-full" onClick={() => setEditMode(true)}>
                  Edit Profile
                </Button>
              )}
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BuyerProfile;
