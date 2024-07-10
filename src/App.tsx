import styles from "./App.module.css";
import CardComponent from "./components/Products/ProductsContainer";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();
  // const cookie = Cookies.get("token");
  // console.log("isAuthenticated:", isAuthenticated);
  console.log("user:", user);
  // console.log("cookie:", cookie);
  return (
    <div className={styles.App}>
      <Header />
      <CardComponent />
      <Footer />
    </div>
  );
}

export default App;
