import styles from "./ProductsContainer.module.css";
import { useProduct } from "../../context/ProductContext";
import ProductCard from "./ProductCard";

const ProductsContainer = () => {
  const { fetchProduct, filteredProducts } = useProduct();

  return (
    <div className={styles.cardContainer}>
      {filteredProducts.map((product) => (
        <div
          key={product._id}
          onClick={() => {
            fetchProduct(product._id);
          }}
        >
          <ProductCard product={product} id={product._id} />
        </div>
      ))}
    </div>
  );
};

export default ProductsContainer;
