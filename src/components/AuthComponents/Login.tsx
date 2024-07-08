import { useState } from "react";
import { AuthType } from "../../pages/account/Account";
import styles from "./Login.module.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Login = ({
  setAuth,
}: {
  setAuth: React.Dispatch<React.SetStateAction<AuthType>>;
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError("Login failed. Please check your email and password.");
    }
  };
  return (
    <div className={styles.account}>
      <p className={styles.signIn}>Sign In </p>
      <section className={styles.section}>
        <div className={styles.inputContainer}>
          <label htmlFor="mail">Email Address</label>
          <input
            type="mail"
            name="mail"
            className={styles.input}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            className={styles.input}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}{" "}
        {/* Render error message */}
        <button className={styles.button} onClick={handleLogin}>
          Sign In
        </button>
        <div className={styles.divider}>
          <span>or</span>
        </div>
        <button
          className={styles.buttonRegister}
          onClick={() => {
            setAuth("register");
          }}
        >
          Create an account
        </button>
      </section>
    </div>
  );
};

export default Login;
