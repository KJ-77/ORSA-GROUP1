import React from "react";
import { Link, useLocation } from "react-router-dom";

const PaymentSuccess: React.FC = () => {
  const location = useLocation();
  const state = location.state as {
    orderSaveFailed?: boolean;
    paymentIntentId?: string;
    error?: string;
  } | null;

  // Check if order save failed
  const orderSaveFailed = state?.orderSaveFailed || false;
  const paymentIntentId = state?.paymentIntentId;

  if (orderSaveFailed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
        <div className="max-w-2xl mx-auto text-center p-12 bg-white rounded-3xl shadow-2xl border-4 border-amber-400">
          {/* Warning Icon */}
          <div className="w-24 h-24 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <svg
              className="w-12 h-12 text-amber-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Payment Received - Action Required
          </h1>

          <p className="text-xl text-amber-700 mb-6 font-semibold">
            Your payment was successful, but we encountered a technical issue
            saving your order.
          </p>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-bold text-lg mb-4 text-gray-800">
              What This Means:
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-emerald-500 mr-2">✓</span>
                <span>
                  Your payment of has been successfully processed by Stripe
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-amber-500 mr-2">!</span>
                <span>
                  Your order details are safely stored in our payment system
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">→</span>
                <span>
                  Our team will manually process your order within 24 hours
                </span>
              </li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <p className="text-sm text-gray-700 mb-2">
              <strong>Transaction ID:</strong>
            </p>
            <p className="font-mono text-sm text-gray-800 bg-white px-4 py-2 rounded border">
              {paymentIntentId || "N/A"}
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Please save this ID for your records
            </p>
          </div>

          <div className="mb-8">
            <p className="text-gray-700 font-semibold mb-2">Next Steps:</p>
            <p className="text-gray-600">
              Please contact us at{" "}
              <a
                href="mailto:Orsa.t@hotmail.com"
                className="text-emerald-600 hover:underline font-semibold"
              >
                Orsa.t@hotmail.com
              </a>{" "}
              and include your transaction ID. We will confirm your order
              details and shipping information.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:Orsa.t@hotmail.com"
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl font-bold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105"
            >
              Contact Support
            </a>
            <Link
              to="/"
              className="border-2 border-emerald-500 text-emerald-600 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-all duration-300"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12">
      <div className="max-w-2xl mx-auto text-center p-12 bg-white rounded-3xl shadow-2xl">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg
            className="w-12 h-12 text-emerald-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Payment Successful!
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          Thank you for your purchase! Your order has been confirmed and will be
          processed shortly.
        </p>

        <div className="space-y-4 mb-8">
          <p className="text-gray-600">
            A confirmation email has been sent to your email address with order
            details.
          </p>
          <p className="text-gray-600">
            Your premium Lebanese olive oil will be carefully packaged and
            shipped to you.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-xl font-bold hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105"
          >
            Continue Shopping
          </Link>
          <Link
            to="/oil"
            className="border-2 border-emerald-500 text-emerald-600 px-8 py-4 rounded-xl font-bold hover:bg-emerald-50 transition-all duration-300"
          >
            View Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
