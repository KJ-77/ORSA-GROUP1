/**
 * Order Recovery Utility
 *
 * This utility helps recover orders when payment succeeded but database save failed.
 * Order details are stored in Stripe payment intent metadata as a backup.
 *
 * Usage:
 * 1. Get the payment intent ID from the customer or error logs
 * 2. Use this utility to fetch order details from Stripe
 * 3. Manually create the order in the database
 */

export interface StripeOrderMetadata {
  cart_items: string; // JSON stringified cart items
  user_id: string;
  user_name: string;
  timestamp: string;
}

export interface RecoveredOrder {
  paymentIntentId: string;
  amount: number;
  currency: string;
  status: string;
  created: Date;
  customerEmail?: string;
  customerName?: string;
  shippingAddress?: {
    line1?: string;
    city?: string;
    country?: string;
  };
  cartItems: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }>;
  userId: string;
  userName: string;
  orderTimestamp: string;
}

/**
 * Fetch order details from Stripe using payment intent ID
 *
 * NOTE: This function requires backend implementation as Stripe secret key
 * should never be exposed to the frontend.
 *
 * Backend endpoint should:
 * 1. Receive payment intent ID
 * 2. Use Stripe secret key to fetch payment intent
 * 3. Extract metadata and return order details
 */
export async function recoverOrderFromStripe(
  paymentIntentId: string
): Promise<RecoveredOrder> {
  const apiUrl = import.meta.env.VITE_API_URL;

  const response = await fetch(`${apiUrl}/api/recover-order/${paymentIntentId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to recover order: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Parse Stripe metadata to extract order information
 * This is a helper function for backend use
 */
export function parseStripeMetadata(metadata: StripeOrderMetadata): {
  cartItems: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }>;
  userId: string;
  userName: string;
  timestamp: string;
} {
  let cartItems;
  try {
    cartItems = JSON.parse(metadata.cart_items);
  } catch (error) {
    console.error('Failed to parse cart items from metadata:', error);
    cartItems = [];
  }

  return {
    cartItems,
    userId: metadata.user_id,
    userName: metadata.user_name,
    timestamp: metadata.timestamp,
  };
}

/**
 * Create order in database from recovered Stripe data
 */
export async function createRecoveredOrder(
  recoveredOrder: RecoveredOrder
): Promise<{ success: boolean; orderId?: string; error?: string }> {
  const apiUrl = import.meta.env.VITE_API_URL;

  try {
    // Create order
    const orderData = {
      user_name: recoveredOrder.customerName || recoveredOrder.userName,
      user_location: recoveredOrder.shippingAddress
        ? `${recoveredOrder.shippingAddress.line1}, ${recoveredOrder.shippingAddress.city}, ${recoveredOrder.shippingAddress.country}`
        : 'Address from Stripe',
      order_status: 'In Progress',
      total_price: recoveredOrder.amount / 100, // Convert cents to euros
      user_id: recoveredOrder.userId,
      stripe_id: recoveredOrder.paymentIntentId,
    };

    const orderResponse = await fetch(`${apiUrl}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!orderResponse.ok) {
      throw new Error(`Failed to create order: ${orderResponse.statusText}`);
    }

    const { orderId } = await orderResponse.json();

    // Create order items
    if (orderId && recoveredOrder.cartItems.length > 0) {
      const orderItems = recoveredOrder.cartItems.map((item) => ({
        product_name: item.name,
        quantity: item.quantity,
        unit_price: item.price,
        total_price: item.price * item.quantity,
        product_id: item.id,
      }));

      const createPromises = orderItems.map((orderItem) =>
        fetch(`${apiUrl}/orders/${orderId}/items`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(orderItem),
        })
      );

      await Promise.all(createPromises);
    }

    return {
      success: true,
      orderId,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Console helper for manual recovery
 * Can be run in browser console to recover a specific order
 */
(window as any).recoverOrder = async (paymentIntentId: string) => {
  console.log('🔄 Attempting to recover order:', paymentIntentId);

  try {
    const recoveredOrder = await recoverOrderFromStripe(paymentIntentId);
    console.log('✅ Order details recovered from Stripe:', recoveredOrder);

    const result = await createRecoveredOrder(recoveredOrder);

    if (result.success) {
      console.log('✅ Order successfully created in database!');
      console.log('📦 Order ID:', result.orderId);
    } else {
      console.error('❌ Failed to create order:', result.error);
      console.log('📋 Order details:', recoveredOrder);
      console.log('💡 Create order manually using the above details');
    }
  } catch (error) {
    console.error('❌ Recovery failed:', error);
  }
};

console.log('💡 Order recovery utility loaded. Use recoverOrder("pi_xxx") to recover a failed order.');
