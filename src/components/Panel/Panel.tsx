import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import styles from "./Panel.module.css";
const Panel = () => {
  const { user, logout } = useAuth();
  const { clearCart } = useCart();
  return (
    <div className={styles.main}>
      <div className={styles.user}>
        <p>{`Hello ${user?.email.split("@")[0]}`}</p>
      </div>
      <div className={styles.dashboard}>
        {dashboardItems.map((item, key) => {
          return (
            <p key={key} className={styles.item}>
              {item.name}
            </p>
          );
        })}
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
