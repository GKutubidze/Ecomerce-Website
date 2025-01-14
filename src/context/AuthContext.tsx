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
  loading: boolean;
  verifyToken: (token: string) => Promise<void>;
  changePassword: (
    currentPassword: string,
    newPassword: string
  ) => Promise<void>;
  cart: CartItem[] | null;
  setCart: React.Dispatch<React.SetStateAction<CartItem[] | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = "https://ecomerce-express.vercel.app";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[] | null>(null);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      verifyToken(token);
    } else {
      setLoading(false);
    }
  }, []);

  const changePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("User is not authenticated.");
      }

      const response = await axios.put(
        `${API_URL}/api/users/update-password`,
        { currentPassword, newPassword },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Password changed successfully");
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(
          error.response.data.message || "Password change failed."
        );
      }
      throw new Error("An unknown error occurred during password change.");
    }
  };

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
    setCart(null);
    setLoading(false);
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/users/login`,
        { email, password },
        { withCredentials: true }
      );

      const { token } = response.data;
      Cookies.set("token", token, { secure: false, sameSite: "lax" });
      verifyToken(token);
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Login failed. Please check your email and password.");
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
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || "Registration failed.");
      }
      throw new Error("An unknown error occurred during registration.");
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

  const authContextValue: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
    register,
    loading,
    verifyToken,
    changePassword,
    cart,
    setCart,
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
