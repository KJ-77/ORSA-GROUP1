import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckoutForm } from "../components/CheckoutForm";
import { StripeProvider } from "../context/StripeContext";
import { useAuth } from "../context/AuthContext";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cart, setCart] = useState<CartItem[]>([]);
  const [clientSecret, setClientSecret] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>("");

  // API function to create order
  const createOrder = async (orderData: {
    user_name: string;
    user_location: string;
    order_status: string;
    total_price: number;
    user_id?: string;
  }) => {
    const apiUrl =
      import.meta.env.VITE_API_URL ||
      "https://rlg7ahwue7.execute-api.eu-west-3.amazonaws.com";

    const response = await fetch(`${apiUrl}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create order: ${response.statusText}`);
    }

    return response.json();
  };

  // API function to create order items
  const createOrderItems = async (orderId: string, items: CartItem[]) => {
    const apiUrl =
      import.meta.env.VITE_API_URL ||
      "https://rlg7ahwue7.execute-api.eu-west-3.amazonaws.com";

    const orderItems = items.map((item) => ({
      product_name: item.name,
      quantity: item.quantity,
      unit_price: item.price,
      total_price: item.price * item.quantity,
      product_id: item.id,
    }));

    // Create all order items in parallel
    const createPromises = orderItems.map((orderItem) =>
      fetch(`${apiUrl}/orders/${orderId}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderItem),
      })
    );

    const responses = await Promise.all(createPromises);

    // Check if all requests were successful
    for (const response of responses) {
      if (!response.ok) {
        throw new Error(`Failed to create order item: ${response.statusText}`);
      }
    }

    return responses;
  };

  useEffect(() => {
    // Get cart from localStorage or context
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCart(parsedCart);

      if (parsedCart.length === 0) {
        navigate("/cart");
        return;
      }

      // Create payment intent
      const createPaymentIntent = async () => {
        try {
          const apiUrl =
            import.meta.env.VITE_API_URL ||
            "https://rlg7ahwue7.execute-api.eu-west-3.amazonaws.com";
          const response = await fetch(`${apiUrl}/api/create-payment-intent`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              amount: Math.round(
                parsedCart.reduce(
                  (total: number, item: CartItem) =>
                    total + item.price * item.quantity,
                  0
                ) * 100
              ), // Convert to cents
              currency: "eur",
              items: parsedCart,
            }),
          });

          const data = await response.json();

          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            setError("Failed to initialize payment");
          }
        } catch {
          setError("Failed to connect to payment service");
        } finally {
          setIsLoading(false);
        }
      };

      createPaymentIntent();
    } else {
      navigate("/cart");
    }
  }, [navigate]);

  const handlePaymentSuccess = async (customerInfo: {
    name: string;
    email: string;
    address: string;
    city: string;
    country: string;
  }) => {
    try {
      // Calculate total price
      const totalPrice = cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );

      // Prepare order data
      const orderData = {
        user_name: customerInfo.name || user?.name || "Guest",
        user_location: `${customerInfo.address}, ${customerInfo.city}, ${customerInfo.country}`,
        order_status: "In Progress",
        total_price: totalPrice,
        user_id: user?.username || undefined,
      };

      // Create order in database
      console.log("Creating order with data:", orderData);
      const orderResponse = await createOrder(orderData);
      console.log("Order created:", orderResponse);

      // Create order items
      if (orderResponse.id) {
        console.log("Creating order items for order:", orderResponse.id);
        await createOrderItems(orderResponse.id, cart);
        console.log("Order items created successfully");
      } else {
        console.warn("Order created but no ID returned, skipping order items");
      }

      // Clear cart after successful database operations
      localStorage.removeItem("cart");
      navigate("/payment-success");
    } catch (error) {
      console.error("Error saving order to database:", error);
      // Still navigate to success page since payment succeeded
      // but show a warning or handle this case appropriately
      localStorage.removeItem("cart");
      navigate("/payment-success");
    }
  };

  const handlePaymentError = (errorMessage: string) => {
    setError(errorMessage);
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

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center p-8 bg-white rounded-2xl shadow-xl">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Payment Error
          </h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate("/cart")}
            className="bg-emerald-500 text-white px-6 py-3 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            Return to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {clientSecret ? (
          <StripeProvider clientSecret={clientSecret}>
            <CheckoutForm
              clientSecret={clientSecret}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
              cart={cart}
            />
          </StripeProvider>
        ) : (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto"></div>
              <p className="mt-4 text-gray-600">Initializing payment...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;
