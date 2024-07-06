import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { CartItem, User } from "../Types/Types";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (
    firstname: string,
    surname: string,
    email: string,
    username: string,
    password: string
  ) => Promise<void>;
  getCart: () => void;
  cart: CartItem[] | null;
  addToCart: (productId: string, quantity: number) => void;
  increaseQuantity: (productId: string) => void;
  decreaseQuantity: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  totalValue: number;
  shippingType: {
    type: string;
    value: number;
  };
  handleShippingChange: (type: string) => void;
  buy: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = "http://localhost:5000";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[] | null>(null);
  const [shippingType, setShippingType] = useState({
    type: "Standard",
    value: 10,
  });
  const [totalValue, setTotalValue] = useState<number>(0);
  const [loading, setLoading] = useState(true);

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
    const token = Cookies.get("token");
    if (token) {
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && user) {
      getCart();
    }
  }, [isAuthenticated, user]);

  const verifyToken = async (token: string) => {
    try {
      const response = await axios.get(`${API_URL}/api/users/verify`, {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });

      if (response.status === 200) {
        setUser(response.data);
        setIsAuthenticated(true);
      } else {
        handleTokenError();
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      handleTokenError();
    } finally {
      setLoading(false);
    }
  };

  const handleTokenError = () => {
    Cookies.remove("token");
    setIsAuthenticated(false);
    setUser(null);
    setLoading(false);
    setCart(null);
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/users/login`,
        { email, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const { token } = response.data;
        Cookies.set("token", token, { secure: false, sameSite: "lax" }); // Adjust settings for local dev
        verifyToken(token); // Verify token immediately to fetch and set user data
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const register = async (
    firstname: string,
    surname: string,
    email: string,
    username: string,
    password: string
  ) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/users/register`,
        { firstname, surname, email, username, password },
        { withCredentials: true }
      );

      if (response.status === 201) {
        console.log("Registered successfully");
      } else {
        console.error("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${API_URL}/api/users/logout`,
        {},
        { withCredentials: true }
      );
      Cookies.remove("token");
      setIsAuthenticated(false);
      setUser(null);
      setCart(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

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
      const response = await axios.get(
        `${API_URL}/api/users/cart/${user?._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        setCart(response.data);
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
      console.error("No user logged in to fetch the cart");
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
        console.error("Failed to fetch cart:", response.status);
      }
    } catch (error) {
      catchError(error, "Error fetching cart");
    }
  };

  const catchError = (error: unknown, customMessage?: string): void => {
    if (axios.isAxiosError(error) && error.response) {
      if (error.response.status === 401) {
        handleTokenError();
        console.error("Unauthorized request, logging out.");
      } else {
        console.error(`${customMessage || "Error"}:`, error.response.status);
      }
    } else if (error instanceof Error) {
      console.error(customMessage || "Unexpected error:", error.message);
    } else {
      console.error(customMessage || "Unexpected error");
    }
  };

  const authContextValue: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
    register,
    getCart,
    cart,
    addToCart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalValue,
    shippingType,
    handleShippingChange,
    buy,
    loading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
