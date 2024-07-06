// src/utils/handleCheckout.ts
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_API_KEY);

export const handleCheckoutClick = async (
  event: FormEvent,
  totalValue: number
) => {
  event.preventDefault();

  try {
    const stripe = await stripePromise;
    console.log("Stripe instance loaded successfully:", stripe);

    if (!stripe) {
      throw new Error("Stripe has not loaded properly.");
    }

    const response = await fetch(
      "http://localhost:5000/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: totalValue * 100, currency: "usd" }),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch checkout session: ${response.status} ${response.statusText}`
      );
    }

    const session = await response.json();
    console.log("Checkout session data received:", session);

    const result = await stripe.redirectToCheckout({ sessionId: session.id });

    if (result.error) {
      console.error("Error redirecting to checkout:", result.error.message);
    } else {
      console.log("Redirecting to checkout session:", session.id);
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error handling checkout:", error.message);
    } else {
      console.error("Unknown error handling checkout:", error);
    }
  }
};
