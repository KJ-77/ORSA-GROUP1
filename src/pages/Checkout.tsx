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
          // Validate cart data
          const validationErrors: string[] = [];
          parsedCart.forEach((item: CartItem, index: number) => {
            if (!item.id)
              validationErrors.push(`Item ${index + 1}: Missing ID`);
            if (!item.name)
              validationErrors.push(`Item ${index + 1}: Missing name`);
            if (typeof item.price !== "number" || item.price <= 0)
              validationErrors.push(
                `Item ${index + 1}: Invalid price - ${item.price}`
              );
            if (typeof item.quantity !== "number" || item.quantity <= 0)
              validationErrors.push(
                `Item ${index + 1}: Invalid quantity - ${item.quantity}`
              );
          });

          if (validationErrors.length > 0) {
            console.error("Cart validation errors:", validationErrors);
            setError(`Cart validation failed: ${validationErrors.join(", ")}`);
            return;
          }

          const totalAmount = Math.round(
            parsedCart.reduce(
              (total: number, item: CartItem) =>
                total + item.price * item.quantity,
              0
            ) * 100
          );

          // For Stripe payment intent, we only need amount and currency
          // The items will be stored in our database when payment succeeds
          const requestPayload = {
            amount: totalAmount,
            currency: "eur",
            itemCount: parsedCart.length,
            description: `Order with ${parsedCart.length} item${
              parsedCart.length > 1 ? "s" : ""
            }`,
          };

          const apiUrl =
            import.meta.env.VITE_API_URL ||
            "https://rlg7ahwue7.execute-api.eu-west-3.amazonaws.com";

          const response = await fetch(`${apiUrl}/api/create-payment-intent`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestPayload),
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error("API Error Response:", errorText);
            setError(
              `Payment service error: ${response.status} ${response.statusText}`
            );
            return;
          }

          const data = await response.json();

          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            console.error("No client secret in response:", data);
            setError(
              "Failed to initialize payment - no client secret received"
            );
          }
        } catch (error) {
          console.error("Payment intent creation error:", error);
          const errorMessage =
            error instanceof Error ? error.message : "Unknown error";
          setError(`Failed to connect to payment service: ${errorMessage}`);
        } finally {
          setIsLoading(false);
        }
      };

      createPaymentIntent();
    } else {
      navigate("/cart");
    }
  }, [navigate]);

  const handlePaymentSuccess = async (
    customerInfo: {
      name: string;
      email: string;
      address: string;
      city: string;
      country: string;
    },
    paymentIntent: {
      id: string;
      amount: number;
      currency: string;
      status: string;
      created?: number;
      payment_method?: string;
    }
  ) => {
    try {
      // Log Stripe payment information
      console.log("=== STRIPE PAYMENT SUCCESS ===");
      console.log("Transaction ID:", paymentIntent.id);
      console.log("Amount (in cents):", paymentIntent.amount);
      console.log("Amount (in euros):", paymentIntent.amount / 100);
      console.log("Currency:", paymentIntent.currency);
      console.log("Status:", paymentIntent.status);
      console.log(
        "Created:",
        paymentIntent.created ? new Date(paymentIntent.created * 1000) : "N/A"
      );
      console.log("Payment Method ID:", paymentIntent.payment_method || "N/A");
      console.log("Full Payment Intent:", paymentIntent);
      console.log("==============================");

      // Prepare order data
      const orderData = {
        user_name: customerInfo.name || user?.name || "Guest",
        user_location: `${customerInfo.address}, ${customerInfo.city}, ${customerInfo.country}`,
        order_status: "In Progress",
        total_price: paymentIntent.amount / 100, // Convert cents to euros
        user_id: user?.username || undefined,
        stripe_id: paymentIntent.id || undefined,
      };

      // Create order in database
      console.log("Creating order with data:", orderData);
      const orderResponse = await createOrder(orderData);
      console.log("Order created:", orderResponse);

      // Add timeout before creating order items
      // await new Promise((resolve) => setTimeout(resolve, 1000)); 1 second delay

      // Create order items
      if (orderResponse.orderId) {
        console.log("Creating order items for order:", orderResponse.orderId);
        await createOrderItems(orderResponse.orderId, cart);
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
