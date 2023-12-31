import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import MyLogin from "./components/Login/myLogin";
import SignUp from "./components/Signup/signup";
import Dash from "./components/dash";
import { BookRide } from "./components/bookRide";
import Dashboards from "./components/Dashboard/dashboard";
import Home from "./components/home/home";
import About from "./components/About/about";
import Profile from "./components/Profile/profile";
import Contact from "./components/Contact/contact";
import Product from "./components/product/product";
import SellerDashboards from "./components/Seller Dashboard/sellerDashboard";
import UploadProduct from "./components/Upload Product/uploadProdut";
import EditSellerProfile from "./components/Edit Seller Profile/editSellerProfile";
import EditBUyerProfile from "./components/Edit Buyer Profile/editBuyerProfile";
import SellProfile from "./components/sell Profile/SellProfile";
import SellerProfile from "./components/Seller Profile/sellerProfile"
import Categories from "./components/Categories/categories";
import UploadCategories from "./components/upload category/uploadCategory";
import PrivateRoute from "./components/privateRoute"
import React, { Fragment } from 'react';
import Rating from "./components/Ratting and reviews/ratting";
import Trends from "./components/Trends/trend";
import Chat from "./components/Chat/chat";
import StripePaymentForm from "./components/Payment/payment";
function App() {

  return (
    <div>
      <BrowserRouter>
          <Routes>

              <Route path="signup" element={<SignUp />} />
              <Route path="login" element={<MyLogin />} />
              <Route path="/" element={<Dashboards />} />
              <Route path="/seller-dashboard/:userType" element={<SellerDashboards />} />
              <Route path="product/:id" element={<Product />} />
              <Route path="edit-seller-profile" element={<EditSellerProfile />} />
              <Route path="rating-reviews/:id" element={<Rating />} />
              <Route path="chat" element={<Chat />} />
              <Route path="payment/:id/:highestBiddingPrice" element={<StripePaymentForm />} />


              <Route path="upload-category" element={<UploadCategories />} />
              <Route path="edit-buyer-profile" element={<EditBUyerProfile />} />
              <Route path="about" element={<About />} />
              <Route path="sell-profile/:id" element={<SellProfile />} />
              <Route path="profile" element={<Profile />} />
              <Route path="trends" element={<Trends />} />
              <Route path="categories" element={<Categories />} />
              <Route path="upload-prod/:userType" element={<UploadProduct />} />
              <Route path="contact" element={<Contact />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
