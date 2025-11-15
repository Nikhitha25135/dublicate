import { useEffect, useState } from "react";
import BuyerNav from "@/components/BuyerNav";
import { Button } from "@/components/ui/button";

const CartPage = () => {
  const buyerId = localStorage.getItem("buyerId");
  const [cart, setCart] = useState<any>(null);

  const fetchCart = async () => {
    const res = await fetch(`http://localhost:5001/cart/${buyerId}`);
    const data = await res.json();
    setCart(data);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQty = async (productId: string, quantity: number) => {
    await fetch("http://localhost:5001/cart/update", {
      method: "PUT",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ buyerId, productId, quantity }),
    });
    fetchCart();
  };

  const removeItem = async (productId: string) => {
    await fetch("http://localhost:5001/cart/remove", {
      method: "DELETE",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({ buyerId, productId }),
    });
    fetchCart();
  };

  const total = cart?.items?.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);

  if (!cart) return <p>Loading...</p>;

  return (
    <div>
      <BuyerNav />

      <div className="container mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-6">My Cart</h1>

        {cart.items.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <div className="space-y-6">
            {cart.items.map((item: any) => (
              <div key={item.productId} className="flex items-center gap-4 border-b pb-4">
                <img src={item.image} className="w-20 h-20 rounded" />
                <div className="flex-1">
                  <h2 className="font-bold">{item.title}</h2>
                  <p className="text-primary font-semibold">₹{item.price}</p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => updateQty(item.productId, item.quantity - 1)} disabled={item.quantity === 1}>
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQty(item.productId, item.quantity + 1)}>+</button>
                  </div>
                </div>

                <Button variant="destructive" onClick={() => removeItem(item.productId)}>Remove</Button>
              </div>
            ))}

            {/* TOTAL */}
            <h2 className="text-2xl font-bold text-right mt-6">
              Total: ₹{total}
            </h2>

            <Button className="w-full bg-gradient-warm">Proceed to Checkout</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
