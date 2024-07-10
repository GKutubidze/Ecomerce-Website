import { useState } from "react";
import Header from "../../components/Header/Header";
import Login from "../../components/AuthComponents/Login";
import Register from "../../components/AuthComponents/Register";
import Footer from "../../components/Footer/Footer";
import { useAuth } from "../../context/AuthContext";
import Panel from "../../components/Panel/Panel";
import styles from "./Account.module.css";
import AminRoute from "../../utils/ProtectedRoute";
import { Outlet } from "react-router-dom";
export type AuthType = "login" | "register";
const Account = () => {
  const [auth, setAuth] = useState<AuthType>("login");
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }
  return (
    <div className={styles.main}>
      <Header />
      {auth == "login" && !isAuthenticated ? <Login setAuth={setAuth} /> : null}
      {auth == "register" && !isAuthenticated ? (
        <Register setAuth={setAuth} />
      ) : null}
      <AminRoute>
        <Panel />
      </AminRoute>
      <Outlet />

      <Footer />
    </div>
  );
};

export default Account;
