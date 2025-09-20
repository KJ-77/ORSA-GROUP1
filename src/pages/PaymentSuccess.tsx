import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess: React.FC = () => {
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
