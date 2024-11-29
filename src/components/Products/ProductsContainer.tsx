import styles from "./ProductsContainer.module.css";
import { useProduct } from "../../context/ProductContext";
import ProductCard from "./ProductCard";
import Loader from "../Loader/Loader";
 

const ProductsContainer = () => {
  const { fetchProduct, filteredProducts, loading } = useProduct();

  return (
    <div className={styles.cardContainer}>
      {/* Show loader when data is being fetched */}
      {loading ? (
        <Loader />
      ) : (
        filteredProducts.map((product) => (
          <div
            key={product._id}
            onClick={() => {
              fetchProduct(product._id);
            }}
            className={styles.productCard}
          >
            <ProductCard product={product} id={product._id} />
          </div>
        ))
      )}
    </div>
  );
};

export default ProductsContainer;
