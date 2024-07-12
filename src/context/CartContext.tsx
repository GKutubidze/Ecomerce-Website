import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "./AuthContext"; // Adjust the path if needed
import { CartItem } from "../Types/Types";

interface CartContextType {
  getCart: () => void;
  addToCart: (productId: string, quantity: number) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  totalValue: number;
  buy: () => Promise<void>;
  handleShippingChange: (type: string) => void;
  shippingType: {
    type: string;
    value: number;
  };
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const API_URL = "https://ecomerce-express.vercel.app";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, user, verifyToken, cart, setCart } = useAuth();
  const [totalValue, setTotalValue] = useState<number>(0);
  const [shippingType, setShippingType] = useState({
    type: "Standard",
    value: 10,
  });

  useEffect(() => {
    if (isAuthenticated && user) {
      getCart();
    }
  }, [isAuthenticated, user]);
  const handleShippingChange = (type: string) => {
    switch (type) {
      case "Standard":
        setShippingType({ type: "Standard", value: 10 });
        break;
      case "Express":
        setShippingType({ type: "Express", value: 19 });
        break;
      default:
        setShippingType({ type: "Standard", value: 10 });
    }
  };

  useEffect(() => {
    if (cart) {
      const productsTotal = cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      const total = productsTotal + shippingType.value;
      setTotalValue(total);
    }
  }, [cart, shippingType]);
  useEffect(() => {
    if (cart) {
      const productsTotal = cart.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
      setTotalValue(productsTotal);
    }
  }, [cart]);

  useEffect(() => {
    if (isAuthenticated && user) {
      getCart();
    }
  }, [isAuthenticated, user]);

  const getCart = async () => {
    if (!isAuthenticated) {
      console.error("No user logged in to fetch the cart");
      return;
    }

    const token = Cookies.get("token");
    if (!token) {
      console.error("No token found for authenticated request");
      return;
    }

    try {
      const response = await axios.get<CartItem[]>(
        `${API_URL}/api/users/cart/${user?._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setCart(response.data.filter((item) => item.product));
      } else {
        console.error("Failed to fetch cart:", response.status);
      }
    } catch (error) {
      catchError(error, "Error fetching cart");
    }
  };
  const addToCart = async (productId: string, quantity: number) => {
    const token = Cookies.get("token");
    if (!token) {
      console.error("No user logged in to add to the cart");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/users/cart/add`,
        { productId, quantity },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Product added to cart successfully");
        getCart();
      } else {
        console.error("Failed to add product to cart:", response.status);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const increaseQuantity = async (productId: string) => {
    const token = Cookies.get("token");
    if (!token) {
      console.error("No user logged in to modify the cart");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/users/cart/increase`,
        { productId },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Product quantity increased successfully");
        getCart();
      } else {
        console.error("Failed to increase product quantity:", response.status);
      }
    } catch (error) {
      console.error("Error increasing quantity:", error);
    }
  };

  const decreaseQuantity = async (productId: string) => {
    const token = Cookies.get("token");
    if (!token) {
      console.error("No user logged in to modify the cart");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/users/cart/decrease`,
        { productId },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Product quantity decreased successfully");
        getCart();
      } else {
        console.error("Failed to decrease product quantity:", response.status);
      }
    } catch (error) {
      console.error("Error decreasing quantity:", error);
    }
  };

  const removeFromCart = async (productId: string) => {
    const token = Cookies.get("token");
    if (!token) {
      console.error("No user logged in to remove from the cart");
      return;
    }

    try {
      const response = await axios.delete(
        `${API_URL}/api/users/cart/remove/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Product removed from cart successfully");
        getCart();
      } else {
        console.error("Failed to remove product from cart:", response.status);
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const buy = async () => {
    if (!isAuthenticated) {
      console.error("No user logged in to buy the cart items");
      return;
    }
    const token = Cookies.get("token");
    if (!token) {
      console.error("No token found for authenticated request");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/api/users/cart/buy`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setCart(response.data);
      } else {
        console.error("Failed to complete purchase:", response.status);
      }
    } catch (error) {
      catchError(error, "Error completing purchase");
    }
  };

  const catchError = (error: unknown, customMessage?: string): void => {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        const token = Cookies.get("token"); // Fetch the token here
        if (token) {
          verifyToken(token);
        } else {
          console.error("Unauthorized request, logging out.");
        }
      } else {
        console.error(`${customMessage || "Error"}:`, error.response.status);
      }
    } else if (error instanceof Error) {
      console.error(customMessage || "Unexpected error:", error.message);
    } else {
      console.error(customMessage || "Unexpected error");
    }
  };

  const clearCart = () => {
    setCart(null);
  };

  const cartContextValue: CartContextType = {
    getCart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalValue,
    buy,
    handleShippingChange,
    shippingType,
    clearCart,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
