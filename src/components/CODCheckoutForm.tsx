import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CODCheckoutFormProps {
  cart: CartItem[];
  totalAmount: number;
  onOrderComplete: () => void;
}

const CODCheckoutForm: React.FC<CODCheckoutFormProps> = ({
  cart,
  totalAmount,
  onOrderComplete,
}) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    country: '',
  });

  // Pre-populate with authenticated user info if available
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || user.attributes?.given_name || '',
        email: user.email || user.attributes?.email || '',
      }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Get user_id from authenticated user (Cognito sub)
      const userId = user?.username || '';

      if (!userId) {
        throw new Error('User not authenticated. Please log in to place an order.');
      }

      // Create order in database
      const orderData = {
        user_id: userId,
        user_name: formData.name,
        user_location: `${formData.address}, ${formData.city}, ${formData.country}`,
        // order_status removed - backend defaults to "In Progress"
        total_price: totalAmount,
        stripe_id: null, // COD orders have no Stripe payment
      };

      console.log('Creating COD order:', orderData);

      const apiUrl = import.meta.env.VITE_API_URL;
      const createOrderResponse = await fetch(`${apiUrl}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (!createOrderResponse.ok) {
        throw new Error(`Failed to create order: ${createOrderResponse.statusText}`);
      }

      const orderResult = await createOrderResponse.json();
      const orderId = orderResult.orderId;

      console.log('Order created successfully:', orderId);

      // Create order items
      for (const item of cart) {
        const itemData = {
          product_id: item.id,
          product_name: item.name,
          quantity: item.quantity,
          unit_price: item.price,
          total_price: item.price * item.quantity,
        };

        const createItemResponse = await fetch(`${apiUrl}/orders/${orderId}/items`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(itemData),
        });

        if (!createItemResponse.ok) {
          console.error(`Failed to add item ${item.name} to order`);
        }
      }

      console.log('All order items created successfully');

      // Clear cart and navigate to success page
      onOrderComplete();
      navigate('/payment-success', {
        state: {
          paymentMethod: 'cod',
          orderId: orderId,
          success: true
        }
      });

    } catch (err) {
      console.error('Error creating COD order:', err);
      setError(err instanceof Error ? err.message : 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">Cash on Delivery Checkout</h2>

        {/* Order Summary */}
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between mb-2">
              <span>{item.name} × {item.quantity}</span>
              <span>€{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t mt-4 pt-4 flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>€{totalAmount.toFixed(2)}</span>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Payment will be collected upon delivery
          </div>
        </div>

        {/* Customer Information Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Delivery Address *
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="123 Main Street"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                City *
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Paris"
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                Country *
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="France"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-md font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            By placing this order, you agree to pay cash upon delivery
          </p>
        </form>
      </div>
    </div>
  );
};

export default CODCheckoutForm;
