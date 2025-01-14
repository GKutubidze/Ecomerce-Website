import React, { useRef, useEffect } from "react";
import styles from "./DropdownCategories.module.css";
import { useProduct } from "../../context/ProductContext";

interface DropdownCategoriesProps {
  setIsCategoriesClicked: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownCategories: React.FC<DropdownCategoriesProps> = ({
  setIsCategoriesClicked,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { setCategoryFilter } = useProduct();
  const { categories } = useProduct();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const hoverRadius = 30; // Adjust as needed

        // Calculate hover area including the dropdown and 30px radius
        const isWithinHoverArea =
          event.clientX >= rect.left - hoverRadius &&
          event.clientX <= rect.right + hoverRadius &&
          event.clientY >= rect.top - hoverRadius &&
          event.clientY <= rect.bottom + hoverRadius;

        setIsCategoriesClicked(isWithinHoverArea);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [setIsCategoriesClicked]);

  return (
    <div
      className={styles.main}
      ref={ref}
      onMouseEnter={() => setIsCategoriesClicked(true)}
      onMouseLeave={() => setIsCategoriesClicked(false)}
    >
      {/* {loading && <div>Loading...</div>} */}
      {
        <>
          {categories.map((category) => (
            <div
              key={category._id}
              className={styles.item}
              onClick={() => {
                setCategoryFilter(category._id);
                setIsCategoriesClicked(false);
              }}
            >
              <img
                src={category.image}
                alt={category.name}
                className={styles.image}
              />
              <p>{category.name}</p>
            </div>
          ))}
          <div className={styles.cross} onClick={() => setCategoryFilter(null)}>
            <img src="./Icons/cross.svg" className={styles.image} />
            <p>Shop All</p>
          </div>
        </>
      }
    </div>
  );
};

export default DropdownCategories;
