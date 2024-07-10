import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useEffect, useRef, useState } from "react";
import ConditionalMenu from "./ConditionalMenu";
import { useAuth } from "../../context/AuthContext";
import { CartComponent } from "./CartComponent";
import { useCart } from "../../context/CartContext";
import DropdownCategories from "../Categories/DropdownCategories";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isCartClicked, setIsCartClicked] = useState<boolean>(false);
  const [isCategoriesCklicked, setIsCategoriesCklicked] =
    useState<boolean>(false);
  const categoriesRef = useRef<HTMLLIElement>(null);

  const { isAuthenticated } = useAuth();
  const { getCart, cart } = useCart();

  const navigate = useNavigate();
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (categoriesRef.current) {
        const rect = categoriesRef.current.getBoundingClientRect();
        const isWithinHoverArea =
          event.clientX >= rect.left - 20 &&
          event.clientX <= rect.right + 20 &&
          event.clientY >= rect.top - 20 &&
          event.clientY <= rect.bottom + 30;
        setIsCategoriesCklicked(isWithinHoverArea);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <>
      {isCartClicked && <CartComponent setIsCartClicked={setIsCartClicked} />}
      {isCategoriesCklicked && (
        <DropdownCategories setIsCategoriesClicked={setIsCategoriesCklicked} />
      )}

      <div className={styles.header}>
        {isMenuOpen && <ConditionalMenu />}
        <div className={styles.mobileMenu} onClick={handleMenuToggle}>
          {isMenuOpen ? (
            <img
              src="/Icons/close.svg"
              alt="Close Menu"
              className={styles.icon}
            />
          ) : (
            <img
              src="/Icons/menu.svg"
              alt="Open Menu"
              className={styles.icon}
            />
          )}
        </div>

        <div className={styles.desktopMenu}>
          <ul className={styles.menu}>
            <li>shop</li>
            <li ref={categoriesRef}>category</li>
            <li>Pages</li>
            <li>Elements</li>
          </ul>
        </div>
        <div className={styles.logoContainer}>
          <Link to="/">
            <img src="/images/logo.png" alt="logo" className={styles.logo} />
          </Link>
        </div>
        <div className={styles.cartContainer}>
          <span className={styles.login}>
            {isAuthenticated ? (
              <p
                onClick={() => {
                  navigate("/my-account");
                }}
              >
                My Account
              </p>
            ) : (
              <p
                onClick={() => {
                  navigate("/my-account");
                }}
              >
                Sign In
              </p>
            )}
          </span>
          <span
            className={styles.cart}
            onClick={() => {
              setIsCartClicked(true);
              getCart();
            }}
          >
            Cart
          </span>
          <span className={styles.cartNumber}>{cart?.length}</span>
        </div>
      </div>
    </>
  );
};

export default Header;
