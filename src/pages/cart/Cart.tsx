import styles from "./Cart.module.css";
import Header from "../../components/Header/Header";
import { Link } from "react-router-dom";
import { useCountry } from "../../context/CountryContext";
import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";

const Cart = () => {
  const {
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalValue,
    shippingType,
    handleShippingChange,
  } = useCart();
  const { cart } = useAuth();
  const [addressVisible, setAddressVisible] = useState<boolean>(false);
  const [tempZipcode, setTempZipCode] = useState<string>("");
  const {
    countries,
    cities,
    handleCountryChange,
    handleCityChange,
    selectedCountry,
    selectedCity,
    setZipcode,
  } = useCountry();

  return (
    <div>
      <Header />
      <div className={styles.main}>
        <div className={styles.cartContainer}>
          <p className={styles.shopping}>Shopping Cart</p>
          <div className={styles.productContainer}>
            {cart?.map((item, key) => {
              return (
                <div key={key} className={styles.product}>
                  <div
                    className={styles.remove}
                    onClick={() => {
                      removeFromCart(item.product._id);
                    }}
                  >
                    <img src="/Icons/close.svg" alt="close" />
                  </div>
                  <div>
                    <img
                      src={item.product.images.coverImage}
                      alt=""
                      className={styles.img}
                    />
                  </div>
                  <div>
                    <div className={styles.section}>
                      <p className={styles.productName}>
                        {item.product.productname}{" "}
                      </p>
                      <div className={styles.quantityContainer}>
                        <p className={styles.qty}>Qty</p>
                        <div className={styles.quantity}>
                          <div
                            className={`${styles.arrow} ${styles.left}`}
                            onClick={() => {
                              decreaseQuantity(item.product._id);
                            }}
                          >
                            <img src="/Icons/left-arrow.svg" alt="" />
                          </div>
                          <input
                            type="number"
                            className={styles.input}
                            value={item.quantity}
                            name="quantity"
                            aria-label="Product quantity"
                            min="1"
                            step="1"
                            readOnly
                          />
                          <div
                            className={`${styles.arrow} ${styles.right}`}
                            onClick={() => {
                              increaseQuantity(item.product._id);
                            }}
                          >
                            <img src="/Icons/right-arrow.svg" alt="" />
                          </div>
                        </div>
                        <div>
                          <p
                            className={styles.price}
                          >{`${item.product.price}$`}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Link to={"/"} style={{ all: "unset", cursor: "pointer" }}>
            <button className={styles.update}>Continue Shopping</button>
          </Link>
        </div>
        <div className={styles.container}>
          <p className={styles.cartTotals}>Cart total</p>
          <div className={styles.cardTotal}>
            <div className={styles.shipping}>
              <div className={styles.subtotal}>
                <p>Subtotal</p>
                <p>{`${totalValue - shippingType.value}.00$`}</p>
              </div>
            </div>
            <div className={styles.shippingContainer}>
              <p>Shipping</p>
              <ul className={styles.list}>
                <li>
                  <label htmlFor="standard">
                    <input
                      type="radio"
                      id="standard"
                      name="shipping"
                      value="standard"
                      checked={shippingType.type === "Standard"}
                      onChange={() => handleShippingChange("Standard")}
                    />
                    Standard:
                  </label>
                  <span>$10.00</span>
                </li>
                <li>
                  <label htmlFor="express">
                    <input
                      type="radio"
                      id="express"
                      name="shipping"
                      value="express"
                      checked={shippingType.type === "Express"}
                      onChange={() => handleShippingChange("Express")}
                    />
                    Express:
                  </label>
                  <span>$19.00</span>
                </li>
              </ul>
              <div
                className={styles.changeAddress}
                onClick={() => setAddressVisible(!addressVisible)}
              >
                <img
                  src="/Icons/location.svg"
                  alt="location"
                  className={styles.location}
                />

                <span>Change Address</span>
                <img
                  src="/Icons/down-arrow.svg"
                  alt="location"
                  className={styles.downArrow}
                />
              </div>
              {addressVisible && (
                <div className={styles.addressForm}>
                  <select
                    name="country"
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    className={styles.input}
                  >
                    <option value="">Select Country</option>
                    {countries.map((item, key) => (
                      <option key={key} value={item.country}>
                        {item.country}
                      </option>
                    ))}
                  </select>

                  <select
                    name="city"
                    required
                    className={styles.input}
                    value={selectedCity}
                    onChange={handleCityChange}
                  >
                    <option value="">Select a city</option>
                    {cities.map((city, key) => (
                      <option key={key} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="Zip Code"
                    className={styles.input}
                    value={tempZipcode}
                    onChange={(e) => {
                      setTempZipCode(e.target.value);
                    }}
                  />
                  <button
                    className={styles.updateButton}
                    onClick={() => {
                      setZipcode(tempZipcode);
                      setAddressVisible(false);
                    }}
                  >
                    Update
                  </button>
                </div>
              )}
            </div>
            <div className={styles.totalContainer}>
              <p>Total</p>
              <p>{`$${totalValue}.00`}</p>
            </div>
          </div>
          <div className={styles.checkout}>
            <Link to={"/checkout"} style={{ all: "unset" }}>
              <button>Proceed to checkout</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
