import React from "react";
import ReactDOM from "react-dom/client";
import "./global.css";
import router from "./routes/router";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Loading from "./components/Loading/Loading";
import { CountryProvider } from "./context/CountryContext";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <CountryProvider>
        <Loading />
        <RouterProvider router={router} />
      </CountryProvider>
    </AuthProvider>
  </React.StrictMode>
);
