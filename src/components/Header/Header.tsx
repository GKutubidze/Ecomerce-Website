import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useState } from "react";
import ConditionalMenu from "./ConditionalMenu";
import { useAuth } from "../../context/AuthContext";
import { CartComponent } from "./CartComponent";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isCartClicked, setIsCartClicked] = useState<boolean>(false);
  const { isAuthenticated, getCart, cart } = useAuth();
  const navigate = useNavigate();
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      {isCartClicked && <CartComponent setIsCartClicked={setIsCartClicked} />}

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
            <li>category</li>
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
