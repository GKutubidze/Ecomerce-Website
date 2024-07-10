import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Account from "../pages/account/Account";
import ProductComponent from "../components/Product/ProductComponent";
import Cart from "../pages/cart/Cart";
import AminRoute from "../utils/ProtectedRoute";
import Checkout from "../pages/checkout/Checkout";
import { Payment } from "../components/Payment/Payment";
import Success from "../pages/success/Success";
import Cancel from "../pages/Cancel/Cancel";
import AddProduct from "../pages/addproduct/AddProduct";
import AdminRoute from "../utils/AdminRoute";
import AccountDetails from "../pages/details/AccountDetails";
import ProtectedRoute from "../utils/ProtectedRoute";

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
      <AminRoute>
        <Cart />
      </AminRoute>
    ),
  },
  {
    path: "/checkout",
    element: (
      <AminRoute>
        <Checkout />
      </AminRoute>
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
  {
    path: "/cancel",
    element: <Cancel />,
  },
  {
    path: "/add-product",
    element: (
      <AdminRoute>
        <AddProduct />
      </AdminRoute>
    ),
  },

  {
    path: "/account-details",
    element: (
      <ProtectedRoute>
        <AccountDetails />
      </ProtectedRoute>
    ),
  },
]);

export default routes;
