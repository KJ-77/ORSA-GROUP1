import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";

// API Product interface (same as in Oil.tsx)






const Cart = () => {
  const [cartProducts, setCartProducts] = useState<ApiProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  interface ApiProduct {
  id: number;
  name: string;
  price: string;
  quantity: number;
  description: string;
  primaryImage?: string;
}
const defaultProductImages = [
  "/oil1.jpg",
  "/oil2.jpg",
  "/oil3.jpg",
  "/oil4.jpg",
  "/oil5.jpg",
  "/oil6.jpg",
  "/oil21.jpg",
  "/oil22.jpg",
  "/oil23.jpg",
];
  // Function to fetch a single product by ID
  const fetchProductById = useCallback(async (productId: number): Promise<ApiProduct | null> => {
    try {
      const response = await fetch(
        `https://rlg7ahwue7.execute-api.eu-west-3.amazonaws.com/products/${productId}`
      );

      if (!response.ok) {
        console.warn(`Failed to fetch product ${productId}`);
        return null;
      }

      const product: ApiProduct = await response.json();
      return product;
    } catch (error) {
      console.warn(`Error fetching product ${productId}:`, error);
      return null;
    }
  }, []);

  // Function to get default product image
  const getProductImage = (index: number) => {
    return defaultProductImages[index % defaultProductImages.length];
  };

  // Function to remove item from cart
  const removeFromCart = (productId: number) => {
    const existingCart = localStorage.getItem('cart');
    if (existingCart) {
      const cartItems: number[] = JSON.parse(existingCart);
      const updatedCartItems = cartItems.filter(id => id !== productId);
      localStorage.setItem('cart', JSON.stringify(updatedCartItems));
      
      // Update the displayed products
      setCartProducts(prev => prev.filter(product => product.id !== productId));
    }
  };

  // Function to clear entire cart
  const clearCart = () => {
    localStorage.removeItem('cart');
    setCartProducts([]);
  };
  // Function to load cart products
  const loadCartProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Get cart items from localStorage
      const existingCart = localStorage.getItem('cart');
      const cartItems: number[] = existingCart ? JSON.parse(existingCart) : [];

      if (cartItems.length === 0) {
        setCartProducts([]);
        setLoading(false);
        return;
      }

      // Fetch all products in cart
      const productPromises = cartItems.map(id => fetchProductById(id));
      const products = await Promise.all(productPromises);
      
      // Filter out any null results (failed fetches)
      const validProducts = products.filter(product => product !== null) as ApiProduct[];
      
      setCartProducts(validProducts);
    } catch (err) {
      console.error("Error loading cart products:", err);
      setError("Failed to load cart products. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [fetchProductById]);

  // Calculate total price
  const calculateTotal = () => {
    return cartProducts.reduce((total, product) => {
      return total + parseFloat(product.price);
    }, 0).toFixed(2);
  };

  useEffect(() => {
    loadCartProducts();
  }, [loadCartProducts]);
  return (
    <div className="w-full min-h-screen">
      {/* Page Header */}
      <div className="bg-[#4a8e3b] text-white py-24 pb-16 text-center relative z-10">
        <div className="max-w-7xl mx-auto px-8">
          <div className="page-header-content">
            <h1 className="text-5xl mb-4 uppercase md:text-4xl">
              Shopping Cart
            </h1>
            <p className="text-xl max-w-[600px] mx-auto md:text-lg">
              Review your selected products
            </p>
          </div>
        </div>
      </div>

      {/* Cart Content */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-8">
          {/* Loading State */}
          {loading && (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4a8e3b]"></div>
              <p className="mt-4 text-gray-600">Loading cart...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-16">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                  onClick={loadCartProducts}
                  className="bg-[#4a8e3b] text-white py-2 px-4 rounded font-semibold transition-all duration-300 hover:bg-[#3b7e2c]"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* Empty Cart */}
          {!loading && !error && cartProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto">
                <h2 className="text-2xl text-gray-600 mb-4">Your cart is empty</h2>
                <p className="text-gray-500 mb-6">
                  Add some products to your cart to see them here.
                </p>
                <Link
                  to="/oil"
                  className="inline-block bg-[#4a8e3b] text-white py-3 px-6 rounded font-semibold transition-all duration-300 hover:bg-[#3b7e2c]"
                >
                  Shop Our Products
                </Link>
              </div>
            </div>
          )}

          {/* Cart Items */}
          {!loading && !error && cartProducts.length > 0 && (
            <div>
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Cart Items ({cartProducts.length})
                </h2>
                <button
                  onClick={clearCart}
                  className="bg-red-600 text-white py-2 px-4 rounded font-semibold transition-all duration-300 hover:bg-red-700"
                >
                  Clear Cart
                </button>
              </div>

              <div className="grid grid-cols-1 gap-6 mb-8">
                {cartProducts.map((product, index) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-6"
                  >
                    <img
                      src={product.primaryImage || getProductImage(index)}
                      alt={product.name}
                      className="w-full md:w-32 h-32 object-cover rounded"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = getProductImage(index);
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                      <p className="text-gray-600 mb-4">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-xl font-bold text-[#4a8e3b]">
                          ${product.price}
                        </p>
                        <div className="flex gap-2">
                          <Link
                            to={`/oil/${product.id}`}
                            className="bg-gray-100 text-gray-700 py-2 px-4 rounded font-semibold transition-all duration-300 hover:bg-gray-200"
                          >
                            View Details
                          </Link>
                          <button
                            onClick={() => removeFromCart(product.id)}
                            className="bg-red-600 text-white py-2 px-4 rounded font-semibold transition-all duration-300 hover:bg-red-700"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="max-w-md ml-auto">
                  <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-600">Items ({cartProducts.length}):</span>
                    <span className="font-semibold">${calculateTotal()}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-semibold">Total:</span>
                      <span className="text-xl font-bold text-[#4a8e3b]">
                        ${calculateTotal()}
                      </span>
                    </div>
                    <button className="w-full bg-[#4a8e3b] text-white py-3 px-6 rounded font-semibold transition-all duration-300 hover:bg-[#3b7e2c]">
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link
                  to="/oil"
                  className="inline-block text-[#4a8e3b] font-semibold hover:underline"
                >
                  ← Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Cart;
