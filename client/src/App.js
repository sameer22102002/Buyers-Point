import React from "react";
import Home from "./pages/Home.jsx"
import ProductList from "./pages/ProductList.jsx";
import Product from "./pages/Product.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Cart from "./pages/Cart.jsx";
import {createBrowserRouter, RouterProvider, Routes, Route, Navigate } from "react-router-dom"; 
import { useSelector } from "react-redux";
import WishList from "./pages/WishList.jsx"
import Orders from "./pages/Orders.jsx";
import Profile from "./pages/Profile.jsx";
import ForgotPassword from "./pages/ForgotPassword"
import ResetPassword from "./pages/ResetPassword.jsx"
import CustomerCare from "./pages/CustomerCare.jsx";

function App() {
  const user = useSelector((state) => state.user.currentUser);
  // const user = false;

  return (
    <div className="App">
      <createBrowserRouter>
        <Routes>

          <Route exact path="/" element=<Home/> ></Route>

          <Route path="/products/:category" element=<ProductList/> ></Route>

          <Route path="/products" element=<ProductList/> ></Route>

          <Route path="/product/:id" element=<Product/> ></Route>

          <Route path="/register" element={user ? <Home/> : <Register/>}></Route>

          <Route path="/login" element={user ? <Home/> : <Login/>} ></Route>

          <Route path="/cart" element={user ? <Cart/> : <Login/>} ></Route>

          <Route path="/wishlist" element={user ? <WishList/> : <Login/>} ></Route>

          <Route path="/orders" element={user ? <Orders/> : <Login/>} ></Route>

          <Route path="/profile" element={user ? <Profile/> : <Login/>} ></Route>

          <Route path="/customer-care" element={user ? <CustomerCare/> : <Login/>} ></Route>

          <Route path="/forgot-password" element={user ? <Profile/> : <ForgotPassword/>} ></Route>

          <Route path="/reset-password/:id/:token" element={user ? <Profile/> : <ResetPassword/>} ></Route>

        </Routes>
      </createBrowserRouter>
    </div>
  ); 
}

export default App;
