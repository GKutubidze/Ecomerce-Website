import { useState } from "react";
import styles from "./Payment.module.css";
import { useCountry } from "../../context/CountryContext";
import { handleCheckoutClick } from "../../utils/paymentHandlers";
import { useCart } from "../../context/CartContext";

export const Payment = () => {
  const [useSameAddress, setUseSameAddress] = useState<boolean>(true);

  const {
    cities,
    countries,
    handleCountryChange,
    selectedCountry,
    selectedCity,
    handleCityChange,
    zipcode,
  } = useCountry();
  const [tempZipcode, setTempZipCode] = useState<string>(zipcode);

  const { shippingType, handleShippingChange, totalValue } = useCart();

  return (
    <form
      className={styles.checkoutForm}
      onSubmit={(e) => {
        handleCheckoutClick(e, totalValue);
      }}
    >
      {/* Contact Information Section */}
      <section className={styles.formSection}>
        <div className={styles.headerContainer}>
          <h2>1. Contact Information</h2>
          <p>
            We'll use this email to send you details and updates about your
            order.
          </p>
        </div>
        <label className={styles.label}>Email address</label>
        <input
          type="email"
          name="email"
          required
          placeholder="kutubidzegiorgi4@gmail.com"
          className={styles.input}
        />
      </section>

      {/* Shipping Address Section */}
      <section className={styles.formSection}>
        <div className={styles.headerContainer}>
          <h2>2. Shipping Address</h2>
          <p>Enter the address where you want your order delivered.</p>
        </div>
        <label className={styles.label}>First name</label>
        <input type="text" name="firstName" required className={styles.input} />
        <label className={styles.label}>Last name</label>
        <input type="text" name="lastName" required className={styles.input} />
        <label className={styles.label}>Address</label>
        <input type="text" name="address" required className={styles.input} />
        <label className={styles.label}>
          Apartment, suite, etc. (optional)
        </label>
        <input type="text" name="apartment" className={styles.input} />
        <label className={styles.label}>Country/Region</label>
        <select
          name="country"
          value={selectedCountry}
          onChange={handleCountryChange}
          required
          className={styles.select}
        >
          <option value="">Select a country</option>
          {countries.map((country, key) => (
            <option key={key} value={country.country}>
              {country.country}
            </option>
          ))}
        </select>

        <label className={styles.label}>City</label>
        <select
          name="city"
          required
          className={styles.select}
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

        <label className={styles.label}>ZIP Code</label>
        <input
          type="text"
          name="zip"
          required
          className={styles.input}
          value={tempZipcode}
          onChange={(e) => {
            setTempZipCode(e.target.value);
          }}
        />
        <label className={styles.label}>Phone (optional)</label>
        <input type="text" name="phone" className={styles.input} />
        <label className={styles.label}>
          <input
            type="checkbox"
            checked={useSameAddress}
            onChange={(e) => setUseSameAddress(e.target.checked)}
            className={styles.checkbox}
          />
          Use same address for billing
        </label>
      </section>

      {/* Shipping Options Section */}
      <section className={styles.ShipFormSection}>
        <h2>Shipping Options</h2>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="shipping"
            value="Standard"
            checked={shippingType.type === "Standard"}
            onChange={() => handleShippingChange("Standard")}
            className={styles.radio}
          />
          <div>
            <p>Standard</p>
            <p>$10.00</p>
          </div>
        </label>
        <label className={styles.radioLabel}>
          <input
            type="radio"
            name="shipping"
            value="Express"
            checked={shippingType.type === "Express"}
            onChange={() => handleShippingChange("Express")}
            className={styles.radio}
          />
          <div>
            <p>Express</p>
            <p>$19.00</p>
          </div>
        </label>
      </section>

      {/* Payment Options Section */}
      <button type="submit" className={styles.button}>
        Place Order
      </button>
    </form>
  );
};
