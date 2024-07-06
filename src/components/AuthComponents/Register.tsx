import { useState } from "react";
import { AuthType } from "../../pages/account/Account";
import styles from "./Register.module.css";
import { useAuth } from "../../context/AuthContext";
const Register = ({
  setAuth,
}: {
  setAuth: React.Dispatch<React.SetStateAction<AuthType>>;
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { register } = useAuth();
  const handleRegister = async () => {
    try {
      await register(firstName, lastName, email, username, password);
      // Optionally, redirect or show a success message
      // Optionally clear the form
      setFirstName("");
      setLastName("");
      setUsername("");
      setEmail("");
      setPassword("");
      // Optionally redirect or show a success message
      setAuth("login"); // Redirect to login page or other appropriate action
    } catch (error) {
      console.error("Registration error:", error);
      console.log("sdsssd");
    }
  };
  return (
    <div className={styles.account}>
      <p className={styles.signIn}>Register</p>
      <section className={styles.section}>
        <div className={styles.inputContainer}>
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className={styles.input}
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className={styles.input}
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className={styles.input}
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="mail">Email Address</label>
          <input
            type="email"
            id="mail"
            name="mail"
            className={styles.input}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className={styles.input}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button className={styles.button} onClick={handleRegister}>
          Register
        </button>{" "}
        <div className={styles.divider}>
          <span>or</span>
        </div>
        <button
          className={styles.buttonRegister}
          onClick={() => {
            setAuth("login");
          }}
        >
          Sign in
        </button>
      </section>
    </div>
  );
};

export default Register;
