import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ProductType } from "../CardComponent/CardComponent";
import Header from "../Header/Header";
import styles from "./ProductComponent.module.css";

import ImageCarousel from "../ImageCarousel/ImageCarousel";
import InputComponent from "../Input/InputComponent";
import Footer from "../Footer/Footer";
import ProductDetails from "./ProductDetails";
import { useAuth } from "../../context/AuthContext";

const ProductComponent = () => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [quantity, setQuantity] = useState<number>(1);

  const { state } = useLocation();
  const { addToCart } = useAuth();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/${state.productId}`
        );
        setProduct(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProduct();
  }, [state.productId]);
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
          </div>
        </div>
      </div>
      <ProductDetails product={product} />

      <Footer />
    </div>
  );
};

export default ProductComponent;
