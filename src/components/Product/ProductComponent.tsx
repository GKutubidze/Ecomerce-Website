import { useLocation } from "react-router-dom";
import Header from "../Header/Header";
import styles from "./ProductComponent.module.css";

import ImageCarousel from "../ImageCarousel/ImageCarousel";
import InputComponent from "../Input/InputComponent";
import Footer from "../Footer/Footer";
import ProductDetails from "./ProductDetails";
import { useCart } from "../../context/CartContext";
import { useProduct } from "../../context/ProductContext";
import { useState } from "react";

const ProductComponent = () => {
  const [quantity, setQuantity] = useState<number>(1);

  const { state } = useLocation();
  const { addToCart } = useCart();
  const { products } = useProduct();

  const product = products.find((item) => item._id === state.productId);

  if (product)
    return (
      <div className={styles.main}>
        <Header />
        <div className={styles.section}>
          <div className={styles.imagesContainer}>
            <ImageCarousel images={product?.images.additionalImages} />
          </div>
          <div className={styles.product}>
            <div className={styles.info}>
              <h1 className={styles.title}>{product?.productname}</h1>
              <p className={styles.price}>{`$${product?.price}`}</p>
            </div>

            <div className={styles.cart}>
              <p className={styles.description}>{product?.description}</p>

              <InputComponent quantity={quantity} setQuantity={setQuantity} />

              <button
                className={styles.button}
                onClick={() => {
                  addToCart(state.productId, quantity);
                }}
              >
                Add to cart
              </button>
              {/* {user?.isAdmin && (
                <button
                  className={`${styles.button} ${styles.deleteButton}`}
                  onClick={handleDeleteProduct}
                >
                  Delete Product
                </button>
              )} */}
            </div>
          </div>
        </div>
        <ProductDetails description={product?.description} />
        <Footer />
      </div>
    );
};

export default ProductComponent;
