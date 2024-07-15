import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../context/ProductContext";
import styles from "./EditProducts.module.css";

const EditProducts = () => {
  const { products, deleteProduct, fetchProducts } = useProduct();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = async (productId: string) => {
    await deleteProduct(productId);
    fetchProducts();
  };

  const handleBack = () => {
    navigate(-1); // This will navigate to the previous page
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
                  {/* <button onClick={() => handleEdit(product._id)}>Edit</button> */}
                  <button onClick={() => handleDelete(product._id)}>
                    Delete
                  </button>
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
    </div>
  );
};

export default EditProducts;
