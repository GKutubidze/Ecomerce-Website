import styles from "./ProductDetails.module.css";
type Props = {
  description: string;
};
const ProductDetails = ({ description }: Props) => {
  return (
    <div className={styles.main}>
      <div className={styles.titleContainer}>
        <span className={styles.title}>Description</span>
      </div>
      <div className={styles.descriptionContainer}>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
