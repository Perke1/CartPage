import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import CartContextProvider from "./contexts/CartContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductPage from "./ProductPage";
import CartPage from "./CartPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <CartContextProvider>
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </CartContextProvider>
  </BrowserRouter>
);
