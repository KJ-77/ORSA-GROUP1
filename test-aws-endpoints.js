// Test script to verify AWS Lambda endpoints
const API_BASE_URL = "https://rlg7ahwue7.execute-api.eu-west-3.amazonaws.com";

async function testCreatePaymentIntent() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: 2500, // $25.00 in cents
        currency: "usd",
        items: [
          {
            id: "1",
            name: "Premium Olive Oil",
            price: 25.0,
            quantity: 1,
          },
        ],
      }),
    });

    const data = await response.json();
    console.log("Payment Intent Response:", data);

    if (data.clientSecret) {
      console.log("✅ Payment Intent created successfully!");
      console.log("Client Secret:", data.clientSecret.substring(0, 20) + "...");
    } else {
      console.log("❌ Failed to create payment intent");
    }
  } catch (error) {
    console.error("❌ Error testing payment intent:", error);
  }
}

// Run the test
console.log("🧪 Testing AWS Lambda endpoints...");
testCreatePaymentIntent();
