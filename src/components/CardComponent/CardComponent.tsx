import styles from "./CardComponent.module.css";
import Card from "./Card";
import { useProduct } from "../../context/ProductContext";
const CardComponent = () => {
  const { fetchProduct, products } = useProduct();
  return (
    <div className={styles.cardContainer}>
      {products.map((product) => (
        <div
          key={product._id}
          onClick={() => {
            fetchProduct(product._id);
          }}
        >
          <Card product={product} id={product._id} />
        </div>
      ))}
    </div>
  );
};

export default CardComponent;
