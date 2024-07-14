import { useProduct } from "../../context/ProductContext";
import styles from "./EditProducts.module.css";

const EditProducts = () => {
  const { products, deleteProduct, fetchProducts } = useProduct();

  const handleDelete = async (productId: string) => {
    await deleteProduct(productId);
    fetchProducts();
  };

  return (
    <div className={styles.editProducts}>
      <h2>Edit Products</h2>
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
          {products.map((product) => (
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
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditProducts;
