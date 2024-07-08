import Header from "../../components/Header/Header";
import Summary from "../../components/Order/Summary";
import { Payment } from "../../components/Payment/Payment";
import { useCart } from "../../context/CartContext";
import styles from "./Checkout.module.css";
const Checkout = () => {
  const { cart } = useCart();

  return (
    <div className={styles.main}>
      <Header />
      <div className={styles.section}>
        <div className={styles.cartContainer}>
          <div>
            <p className={styles.shopping}>Order Summary</p>
            <div className={styles.productContainer}>
              {cart?.map((item, key) => {
                return (
                  <div key={key} className={styles.product}>
                    <div className={styles.imageContainer}>
                      <img
                        src={item.product.images.coverImage}
                        alt=""
                        className={styles.img}
                      />
                      <div className={styles.quantity}>
                        <span>{item.quantity}</span>
                      </div>
                    </div>
                    <div className={styles.nameContainer}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "5px",
                        }}
                      >
                        <p className={styles.productName}>
                          {item.product.productname}{" "}
                        </p>
                        <p
                          className={styles.price}
                        >{`Price:${item.product.price}.00$`}</p>
                      </div>

                      <p className={styles.price}>{`$${
                        item.product.price * item.quantity
                      }.00`}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <Summary />
        </div>
        <Payment />
      </div>
    </div>
  );
};

export default Checkout;
