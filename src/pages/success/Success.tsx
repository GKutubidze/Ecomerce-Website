import { useEffect, useState } from "react";
import styles from "./Success.module.css";
import { useSearchParams } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const Success = () => {
  const { buy } = useCart();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successful, setSuccessful] = useState(false);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    console.log("Session ID:", sessionId);

    const verifyPayment = async (sessionId: string) => {
      try {
        // Fetch session to confirm payment
        const response = await fetch(`http://localhost:5000/verify-session`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ sessionId }),
        });

        if (!response.ok) {
          throw new Error(
            `Failed to verify session: ${response.status} ${response.statusText}`
          );
        }

        const data = await response.json();
        if (data.success) {
          console.log("Payment verified successfully:", data);
          buy(); // Call buy() only after successful verification
          setSuccessful(true);
        } else {
          setError("Payment verification failed.");
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
        setError("There was a problem verifying your payment.");
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) {
      verifyPayment(sessionId);
    } else {
      setError("Session ID not found.");
      setLoading(false);
    }
  }, [buy, searchParams]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className={styles.errorContainer}>{error}</div>;
  }

  if (successful) {
    return (
      <div className={styles.successContainer}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>&#x2714;</div>
          <h1>Payment Successful</h1>
          <p>
            Thank you for your payment. Your transaction was completed
            successfully.
          </p>
          <a href="/" className={styles.successButton}>
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return null;
};

export default Success;
