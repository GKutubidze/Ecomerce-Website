import React, { useState } from "react";
import styles from "./AddProduct.module.css"; // Import the CSS module
import { useProduct } from "../../context/ProductContext";
import { ImageType, ProductType } from "../../Types/Types";

const AddProduct: React.FC = () => {
  const { createProduct, categories } = useProduct();
  const [productname, setProductname] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<string>("");
  const [coverImage, setCoverImage] = useState<string>("");
  const [additionalImages, setAdditionalImages] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const images: ImageType = {
      coverImage,
      additionalImages: additionalImages.split(",").map((img) => img.trim()),
    };
    const newProduct: Omit<ProductType, "_id"> = {
      productname,
      description,
      price,
      stock,
      category: { _id: categoryId, name: "", image: "" }, // Simplified for this example
      images,
    };

    try {
      await createProduct(newProduct);
      setSuccessMessage("Product added successfully!");
      setProductname("");
      setDescription("");
      setPrice(0);
      setStock(0);
      setCategoryId("");
      setCoverImage("");
      setAdditionalImages("");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div>
      {successMessage && (
        <div className={styles.successMessage}>{successMessage}</div>
      )}
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Product Name:</label>
          <input
            className={styles.formInput}
            type="text"
            value={productname}
            onChange={(e) => setProductname(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Description:</label>
          <textarea
            className={styles.formTextarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Price:</label>
          <input
            className={styles.formInput}
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Stock:</label>
          <input
            className={styles.formInput}
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Category:</label>
          <select
            className={styles.formInput}
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Cover Image URL:</label>
          <input
            className={styles.formInput}
            type="text"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Additional Images (comma-separated URLs):
          </label>
          <input
            className={styles.formInput}
            type="text"
            value={additionalImages}
            onChange={(e) => setAdditionalImages(e.target.value)}
          />
        </div>
        <button className={styles.formButton} type="submit">
          Create Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
