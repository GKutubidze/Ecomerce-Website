import styles from "./Cancel.module.css"; // Import the CSS Module

const Cancel = () => {
  return (
    <div className={styles.cancelPage}>
      <div className={styles.cancelContainer}>
        <h1>Payment Canceled</h1>
        <p>Your payment was not successful.</p>
        <p>If you believe this is an error, please contact support.</p>
        <button onClick={() => (window.location.href = "/")}>
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default Cancel;
