import styles from "./App.module.css";
import CardComponent from "./components/CardComponent/CardComponent";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

function App() {
  // const { isAuthenticated, user } = useAuth();
  // const cookie = Cookies.get("token");
  // console.log("isAuthenticated:", isAuthenticated);
  // console.log("user:", user);
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
