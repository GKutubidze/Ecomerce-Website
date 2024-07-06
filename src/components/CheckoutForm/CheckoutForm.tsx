import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

export const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [processing, setProcessing] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError("Card Element not found");
      setProcessing(false);
      return;
    }

    try {
      const { data: clientSecret } = await axios.post(
        "http://localhost:5000/create-payment-intent",
        {
          amount: 10000, // amount in cents
        }
      );

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
          },
        }
      );

      if (error) {
        setError(`Payment failed: ${error.message}`);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        setSuccess(true);
        setError(null);
        setProcessing(false);
        // Redirect or show a success message
        window.location.href = "/my-account";
      } else {
        setError("Payment failed");
        setProcessing(false);
      }
    } catch (error) {
      setError(`Unexpected error: ${error}`);
      setProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe || processing}>
        {processing ? "Processing..." : "Pay"}
      </button>
      {error && <div>{error}</div>}
      {success && <div>Payment succeeded!</div>}
    </form>
  );
};
