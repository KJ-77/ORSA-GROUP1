import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CODCheckoutForm from "../components/CODCheckoutForm";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get cart from localStorage
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);

      if (parsedCart.length === 0) {
        navigate("/cart");
        return;
      }

      // Calculate total amount
      const total = parsedCart.reduce(
        (sum: number, item: CartItem) => sum + item.price * item.quantity,
        0
      );
      setTotalAmount(total);
      setIsLoading(false);
    } else {
      // No cart found, redirect to cart page
      navigate("/cart");
    }
  }, [navigate]);

  const handleOrderComplete = () => {
    // Clear cart from localStorage
    localStorage.removeItem("cart");
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Preparing checkout...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <CODCheckoutForm
          cart={cart}
          totalAmount={totalAmount}
          onOrderComplete={handleOrderComplete}
        />
      </div>
    </div>
  );
};

export default Checkout;
