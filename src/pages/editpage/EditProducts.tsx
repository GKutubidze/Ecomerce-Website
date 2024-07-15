import { useState, ChangeEvent, FC } from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../context/ProductContext";
import { ProductType } from "../../Types/Types";
import styles from "./EditProducts.module.css";

const EditProducts: FC = () => {
  const { products, deleteProduct, fetchProducts, updateProduct, categories } =
    useProduct();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentProduct, setCurrentProduct] = useState<ProductType | null>(
    null
  );

  const handleDelete = async (productId: string) => {
    await deleteProduct(productId);
    fetchProducts();
  };

  const handleBack = () => {
    navigate(-1); // This will navigate to the previous page
  };

  const handleEdit = (product: ProductType) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  const handleUpdate = async () => {
    if (currentProduct) {
      await updateProduct(currentProduct._id, currentProduct);
      fetchProducts();
      handleModalClose();
    }
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCurrentProduct((prevProduct) =>
      prevProduct ? { ...prevProduct, [name]: value } : null
    );
  };

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.productname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles.editProducts}>
      <div className={styles.buttonContainer}>
        <button className={styles.backButton} onClick={handleBack}>
          Back
        </button>
        <div>
          <h2>Edit Products</h2>
        </div>
      </div>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
      </div>

      <table className={styles.productTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <tr key={product._id}>
                <td data-label="Name">{product.productname}</td>
                <td data-label="Price">{product.price}</td>
                <td data-label="Category">{product.category.name}</td>
                <td data-label="Actions">
                  <div className={styles.buttonsContainer}>
                    <button
                      className={styles.editButton}
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className={styles.deleteButton}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No products found</td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && currentProduct && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Edit Product</h3>
            <label htmlFor="productname">Product Name:</label>
            <input
              type="text"
              id="productname"
              name="productname"
              value={currentProduct.productname}
              onChange={handleInputChange}
              placeholder="Product Name"
            />
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={currentProduct.price}
              onChange={handleInputChange}
              placeholder="Price"
            />
            <label htmlFor="category">Category:</label>
            <select
              id="category"
              name="category"
              value={currentProduct.category._id}
              onChange={handleInputChange}
            >
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            <label htmlFor="stock">Stock:</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={currentProduct.stock}
              onChange={handleInputChange}
              placeholder="Stock"
            />
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={currentProduct.description}
              onChange={handleInputChange}
              placeholder="Description"
              rows={4}
            />
            <div className={styles.modalButtons}>
              <button onClick={handleUpdate}>Update</button>
              <button onClick={handleModalClose}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProducts;
