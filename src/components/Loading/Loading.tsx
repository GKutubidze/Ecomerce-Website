import React from "react";
import styles from "./Loading.module.css"; // Import the CSS module
import { useAuth } from "../../context/AuthContext";

const Loading: React.FC = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
      </div>
    );
  }
  return null;
};
export default Loading;
