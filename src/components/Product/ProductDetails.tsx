import { ProductType } from "../CardComponent/CardComponent";
import styles from "./ProductDetails.module.css";
type Props = {
  product: ProductType | null;
};
const ProductDetails = ({ product }: Props) => {
  return (
    <div className={styles.main}>
      <div className={styles.titleContainer}>
        <span className={styles.title}>Description</span>
      </div>
      <div className={styles.descriptionContainer}>
        <p className={styles.description}>{product?.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
