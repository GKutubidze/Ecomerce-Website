import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import { ProductType } from "./CardComponent";
interface CardProps {
  title: string;
  image: string;
  price: string;
  id: string;
  products: ProductType[];
}
const Card = ({ title, image, price, id }: CardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Link
          key={id}
          to={`/product/${title}`}
          state={{ productId: id }}
          style={{ all: "unset" }}
        >
          <img src={image} alt={title} className={styles.cardImage} />
        </Link>
      </div>

      <div className={styles.info}>
        <div className={styles.titleContainer}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <img src="/Icons/heart.svg" alt="heart" className={styles.heart} />
        </div>
        <p className={styles.cardPrice}>{`$${price}`}</p>
      </div>
    </div>
  );
};

export default Card;
