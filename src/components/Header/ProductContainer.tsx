import styles from "./ProductContainer.module.css";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
const ProductContainer = () => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const { cart } = useAuth();
  return (
    <div className={styles.productContainer}>
      {cart?.map((item, key) => {
        return (
          <div key={key} className={styles.product}>
            <div
              className={styles.remove}
              onClick={() => {
                removeFromCart(item.product._id);
              }}
            >
              <img src="/Icons/close.svg" alt="close" />
            </div>
            <div>
              <img
                src={item.product.images.coverImage}
                alt=""
                className={styles.img}
              />
            </div>
            <div>
              <div className={styles.section}>
                <p className={styles.productName}>
                  {item.product.productname}{" "}
                </p>
                <div className={styles.quantityContainer}>
                  <p className={styles.qty}>Qty</p>
                  <div className={styles.quantity}>
                    <div
                      className={`${styles.arrow} ${styles.left}`}
                      onClick={() => {
                        decreaseQuantity(item.product._id);
                      }}
                    >
                      <img src="/Icons/left-arrow.svg" alt="" />
                    </div>
                    <input
                      type="number"
                      className={styles.input}
                      value={item.quantity}
                      name="quantity"
                      aria-label="Product quantity"
                      min="1"
                      step="1"
                      readOnly
                    />
                    <div
                      className={`${styles.arrow} ${styles.right}`}
                      onClick={() => {
                        increaseQuantity(item.product._id);
                      }}
                    >
                      <img src="/Icons/right-arrow.svg" alt="" />
                    </div>
                  </div>
                  <div>
                    <p className={styles.price}>{`${
                      item.product.price * item.quantity
                    }$`}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductContainer;
