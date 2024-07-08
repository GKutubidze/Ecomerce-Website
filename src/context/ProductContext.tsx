import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";
import { ProductType } from "../Types/Types";

interface ProductContextType {
  product: ProductType | null;
  products: ProductType[];
  fetchProduct: (productId: string) => void;
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

const API_URL = "http://localhost:5000";

export const ProductProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [product, setProduct] = useState<ProductType | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [products, setProducts] = useState<ProductType[]>([]);

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
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const productContextValue: ProductContextType = {
    product,
    fetchProduct,
    quantity,
    setQuantity,
    products,
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
