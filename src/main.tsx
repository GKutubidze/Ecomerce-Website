import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import router from "./routes/router";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Loading from "./components/Loading/Loading";
import { CountryProvider } from "./context/CountryContext";
import { CartProvider } from "./context/CartContext";
import { ProductProvider } from "./context/ProductContext";
import SpeedInsightsProvider from "./context/SpeedInsightsWrapper";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <CountryProvider>
            <SpeedInsightsProvider>
              <Loading />
              <RouterProvider router={router} />
            </SpeedInsightsProvider>
          </CountryProvider>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
