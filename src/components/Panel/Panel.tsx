import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import styles from "./Panel.module.css";

const Panel: React.FC = () => {
  const { user, logout } = useAuth();
  const { clearCart } = useCart();
  const navigate = useNavigate();
  const handleItemClick = (item: string) => {
    if (item === "Account details") {
      // Navigate to the specific path '/account-details'
      navigate("/account-details");
    } else {
      // Handle other menu item clicks as needed
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.user}>
        <p>{`Hello ${user?.email.split("@")[0]}`}</p>
      </div>
      <div className={styles.dashboard}>
        {dashboardItems.map((item) => (
          <p
            key={item.id}
            className={`${styles.item} 
             `}
            onClick={() => handleItemClick(item.name)}
          >
            {item.name}
          </p>
        ))}
        {user?.isAdmin && (
          <p
            className={styles.item}
            onClick={() => {
              navigate("/add-product");
            }}
          >
            Add Product
          </p>
        )}
        {user?.isAdmin && (
          <p
            className={styles.item}
            onClick={() => {
              navigate("/edit-products");
            }}
          >
            Edit Product
          </p>
        )}
        <p
          className={styles.item}
          onClick={() => {
            logout();
            clearCart();
          }}
        >
          Log Out
        </p>
      </div>
    </div>
  );
};

export default Panel;

const dashboardItems = [
  { id: 1, name: "Dashboard" },
  { id: 2, name: "Orders" },
  { id: 3, name: "Downloads" },
  { id: 4, name: "Addresses" },
  { id: 5, name: "Account details" },
];
