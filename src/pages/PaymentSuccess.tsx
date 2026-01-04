import React from "react";
import { Link, useLocation } from "react-router-dom";

const PaymentSuccess: React.FC = () => {
  const location = useLocation();
  const state = location.state as {
    paymentMethod?: string;
    orderId?: string;
    success?: boolean;
  } | null;

  const paymentMethod = state?.paymentMethod || 'unknown';
  const orderId = state?.orderId;
  const isCOD = paymentMethod === 'cod';

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
          Order Placed Successfully!
        </h1>

        {isCOD ? (
          // Cash on Delivery Success Message
          <>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for your order! Your premium Lebanese olive oil will be delivered to your address.
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
              <div className="flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-blue-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
                <h3 className="font-bold text-lg text-gray-800">
                  Payment Method: Cash on Delivery
                </h3>
              </div>
              <p className="text-gray-700 font-semibold mb-2">
                Please have the exact amount ready when your order arrives.
              </p>
              {orderId && (
                <div className="mt-4">
                  <p className="text-sm text-gray-600 mb-1">Order ID:</p>
                  <p className="font-mono text-sm text-gray-800 bg-white px-4 py-2 rounded border">
                    {orderId}
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">What happens next?</h3>
                <div className="space-y-2 text-left text-gray-600">
                  <div className="flex items-start">
                    <span className="text-emerald-500 mr-2 mt-1">1.</span>
                    <span>Your order is being prepared for delivery</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-emerald-500 mr-2 mt-1">2.</span>
                    <span>You will be contacted to confirm delivery details</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-emerald-500 mr-2 mt-1">3.</span>
                    <span>Pay with cash when your order is delivered</span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-8">
              If you have any questions, please contact us at{" "}
              <a
                href="mailto:Orsa.t@hotmail.com"
                className="text-emerald-600 hover:underline font-semibold"
              >
                Orsa.t@hotmail.com
              </a>
            </p>
          </>
        ) : (
          // Generic Success Message (for future payment methods)
          <>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for your purchase! Your order has been confirmed and will be
              processed shortly.
            </p>

            <div className="space-y-4 mb-8">
              <p className="text-gray-600">
                Your premium Lebanese olive oil will be carefully packaged and
                shipped to you.
              </p>
            </div>
          </>
        )}

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
