import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import styles from "./CartComponent.module.css";
import ProductContainer from "./ProductContainer";
import { useNavigate } from "react-router-dom";

export const CartComponent = ({
  setIsCartClicked,
}: {
  setIsCartClicked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { cart } = useAuth();
  const isEmpty = !cart || cart.length <= 0;
  const [subtotal, setSubtotal] = useState<number>(0);
  const navigate = useNavigate();
  useEffect(() => {
    // Calculate the subtotal whenever the cart changes
    const calculateSubtotal = () => {
      if (!cart) return 0;
      return cart.reduce(
        (acc, item) => acc + item.product.price * item.quantity,
        0
      );
    };

    setSubtotal(calculateSubtotal());
  }, [cart]);
  return (
    <div className={styles.main}>
      <div className={styles.closeContainer}>
        <p className={styles.cart}>Cart</p>
        <p
          className={styles.close}
          onClick={() => {
            setIsCartClicked(false);
          }}
        >
          Close
        </p>
      </div>
      {isEmpty ? (
        <div className={styles.emptyCartMessage}>
          <div className={styles.closeImageContainer}>
            <img src="Icons/close.svg" alt="" />
          </div>
          <p>No products in the cart.</p>
          <button
            className={styles.continue}
            onClick={() => {
              setIsCartClicked(false);
            }}
          >
            Continue shopping
          </button>
        </div>
      ) : (
        <ProductContainer />
      )}

      {!isEmpty ? (
        <>
          <div className={styles.subtotal}>
            <p>Subtotal:</p>
            <p>{`${subtotal} $`}</p>
          </div>
          <div className={styles.checkoutContainer}>
            <button
              className={styles.view}
              onClick={() => {
                navigate("/cart");
              }}
            >
              View Cart
            </button>
            <button
              className={styles.checkout}
              onClick={() => {
                navigate("/checkout");
              }}
            >
              Checkout
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
};
