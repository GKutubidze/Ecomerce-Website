import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Account from "../pages/account/Account";
import ProductComponent from "../components/Product/ProductComponent";
import Cart from "../pages/cart/Cart";
import ProtectedRoute from "../utils/ProtectedRoute";
import Checkout from "../pages/checkout/Checkout";
import { Payment } from "../components/Payment/Payment";
import Success from "../pages/success/Success";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/my-account",
    element: <Account />,
  },
  {
    path: "/product/:productTitle",
    element: <ProductComponent />,
  },
  {
    path: "/cart",
    element: (
      <ProtectedRoute>
        <Cart />
      </ProtectedRoute>
    ),
  },
  {
    path: "/checkout",
    element: (
      <ProtectedRoute>
        <Checkout />
      </ProtectedRoute>
    ),
  },
  {
    path: "/payment",
    element: <Payment />,
  },
  {
    path: "/success",
    element: <Success />,
  },
]);

export default routes;
