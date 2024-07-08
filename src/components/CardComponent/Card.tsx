import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import { ProductType } from "../../Types/Types";
interface CardProps {
  product: ProductType;
  id: string;
}
const Card = ({ product, id }: CardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Link
          key={product._id}
          to={`/product/${product.productname}`}
          state={{ productId: product._id }}
          style={{ all: "unset" }}
        >
          <img
            src={product.images.coverImage}
            alt={product.productname}
            className={styles.cardImage}
          />
        </Link>
      </div>

      <div className={styles.info}>
        <div className={styles.titleContainer}>
          <h3 className={styles.cardTitle}>{product.productname}</h3>
          <img src="/Icons/heart.svg" alt="heart" className={styles.heart} />
        </div>
        <p className={styles.cardPrice}>{`$${product.price}`}</p>
      </div>
    </div>
  );
};

export default Card;
