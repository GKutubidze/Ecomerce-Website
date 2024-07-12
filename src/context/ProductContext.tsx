import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ProductType, Category } from "../Types/Types";

interface ProductContextType {
  product: ProductType | null;
  products: ProductType[];
  categories: Category[];
  filteredProducts: ProductType[];
  fetchProduct: (productId: string) => void;
  setCategoryFilter: (categoryId: string | null) => void;
  createProduct: (product: Omit<ProductType, "_id">) => Promise<void>;
  quantity: number;
  setQuantity: (quantity: number) => void;
  deleteProduct: (productId: string) => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const API_URL = "https://ecomerce-express.vercel.app";

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductType[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const fetchProduct = async (productId: string) => {
    try {
      const response = await axios.get(`${API_URL}/api/products/${productId}`);
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/products`);
      if (response.status === 200) {
        setProducts(response.data);
        setFilteredProducts(response.data); // Initialize with all products
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/category`);
      if (response.status === 200) {
        setCategories(response.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const createProduct = async (product: Omit<ProductType, "_id">) => {
    try {
      const token = Cookies.get("token"); // Retrieve token from cookies
      if (!token) {
        throw new Error("No token found, authorization denied");
      }

      await axios.post(`${API_URL}/api/products`, product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      fetchProducts();
      console.log("product added");
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const applyFilter = () => {
    if (categoryFilter) {
      const filtered = products.filter(
        (product) => product.category._id === categoryFilter
      );
      console.log(`Filtered products by category ${categoryFilter}:`, filtered);
      setFilteredProducts(filtered);
    } else {
      console.log("No category filter applied, showing all products");
      setFilteredProducts(products);
    }
  };
  const deleteProduct = async (productId: string) => {
    try {
      const token = Cookies.get("token"); // Retrieve token from cookies
      await axios.delete(`${API_URL}/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchProducts(); // Optionally refetch products after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories(); // Fetch categories on initial load
  }, []);

  useEffect(() => {
    applyFilter();
  }, [categoryFilter]);

  const productContextValue: ProductContextType = {
    product,
    fetchProduct,
    setCategoryFilter,
    createProduct,
    quantity,
    setQuantity,
    products,
    filteredProducts,
    categories,
    deleteProduct,
  };

  return (
    <ProductContext.Provider value={productContextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
