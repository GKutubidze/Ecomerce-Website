import styles from "./InputComponent.module.css";
type Props = {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};
const InputComponent = (props: Props) => {
  const { quantity, setQuantity } = props;
  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };

  return (
    <div className={styles.quantity}>
      <div
        className={`${styles.arrow} ${styles.left}`}
        onClick={handleDecrement}
      >
        <img src="/Icons/left-arrow.svg" alt="" />
      </div>
      <input
        type="number"
        className={styles.input}
        name="quantity"
        value={quantity}
        aria-label="Product quantity"
        min="1"
        step="1"
        onChange={handleChange}
      />
      <div
        className={`${styles.arrow} ${styles.right}`}
        onClick={handleIncrement}
      >
        <img src="/Icons/right-arrow.svg" alt="" />
      </div>
    </div>
  );
};

export default InputComponent;
