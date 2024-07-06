import styles from "./CardComponent.module.css";
import Card from "./Card";
import axios from "axios";
import { useEffect, useState } from "react";
const CardComponent = () => {
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/products");
        if (response.status === 200) {
          setProducts(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className={styles.cardContainer}>
      {products.map((product) => (
        <div key={product._id}>
          <Card
            title={product.productname}
            price={product.price.toString()}
            image={product.images.coverImage}
            id={product._id}
            products={products}
          />
        </div>
      ))}
    </div>
  );
};

export default CardComponent;

export interface ImageType {
  coverImage: string;
  additionalImages: string[];
}

export interface ProductType {
  _id: string;
  productname: string;
  description: string;
  price: number;
  stock: number;
  images: ImageType;
  category: string;
}
