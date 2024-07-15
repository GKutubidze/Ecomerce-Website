import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import styles from "./ConditionalMenu.module.css";
import DropdownCategories from "../Categories/DropdownCategories";
interface Props {
  isCategoriesCklicked: boolean;
  setIsCategoriesCklicked: React.Dispatch<React.SetStateAction<boolean>>;
}
const ConditionalMenu = (props: Props) => {
  const { isCategoriesCklicked, setIsCategoriesCklicked } = props;
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  return (
    <div className={styles.main}>
      <div className={styles.menuContainer}>
        <ul className={styles.menu}>
          {isCategoriesCklicked && (
            <DropdownCategories
              setIsCategoriesClicked={setIsCategoriesCklicked}
            />
          )}
          {menuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                if (item.toLocaleLowerCase() === "categories") {
                  console.log(item);
                  setIsCategoriesCklicked(true);
                }
              }}
            >
              {item}
            </li>
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

const menuItems = ["shop", "categories", "Pages", "Elements"];
