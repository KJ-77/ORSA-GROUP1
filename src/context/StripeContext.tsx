import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface StripeProviderProps {
  children: React.ReactNode;
  clientSecret?: string;
}

export const StripeProvider: React.FC<StripeProviderProps> = ({
  children,
  clientSecret,
}) => {
  const options = clientSecret
    ? {
        clientSecret,
      }
    : {};

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
};
