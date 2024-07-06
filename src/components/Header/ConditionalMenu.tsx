import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./ConditionalMenu.module.css";
const ConditionalMenu = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  return (
    <div className={styles.main}>
      <div className={styles.menuContainer}>
        <ul className={styles.menu}>
          {menuItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div className={styles.account}>
        {isAuthenticated ? (
          <p
            className={styles.auth}
            onClick={() => {
              navigate("/my-account");
            }}
          >
            My account
          </p>
        ) : (
          <p
            className={styles.auth}
            onClick={() => {
              navigate("/my-account");
            }}
          >
            Sign in
          </p>
        )}
        <p>Wishlist</p>
      </div>
    </div>
  );
};

export default ConditionalMenu;

const menuItems = ["shop", "category", "Pages", "Elements"];
