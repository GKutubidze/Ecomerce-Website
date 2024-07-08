import { useCart } from "../../context/CartContext";
import { useCountry } from "../../context/CountryContext";
import styles from "./Summary.module.css";
const Summary = () => {
  const { totalValue, shippingType } = useCart();
  const { selectedCountry, selectedCity } = useCountry();
  return (
    <div className={styles.main}>
      <div className={styles.subtotalContainer}>
        <p>Subtotal</p>
        <p className={styles.subtotal}>{`$${
          totalValue - shippingType.value
        }.00`}</p>
      </div>
      <div>
        <div className={styles.shipping}>
          <div className={styles.shippingContainer}>
            <span className={styles.shippingTitle}>Shipping</span>
            <span
              style={{ fontSize: "14px" }}
            >{`$${shippingType.value}.00`}</span>
          </div>
          <span className={styles.shippingType}>{shippingType.type}</span>
          <div>
            <p
              className={styles.address}
            >{`Shipping to ${selectedCity}, ${selectedCountry}`}</p>
          </div>
        </div>
      </div>

      <div className={styles.totalContainer}>
        <p>Total</p>
        <p>{`$${totalValue}.00`}</p>
      </div>
    </div>
  );
};

export default Summary;
