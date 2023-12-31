import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./sellerDashboard.css";
import { useEffect } from "react";
import { useState } from "react";
import UploadProduct from "../Upload Product/uploadProdut";
import { useParams } from "react-router-dom";


import axios from "axios";
import Footer from "../footer/footer";
import SellerProfile from "../Seller Profile/sellerProfile";
const SellerDashboards = () => {
  let { userType } = useParams();
	const [isLogin,setisLogin] =useState(false);
  console.log('userType',userType)
  localStorage.setItem('userType',userType)
 
  const clickHandler = () => {
    var sidebar = document.querySelector("#sidebar");
    var container = document.querySelector(".my-container");
    container.classList.toggle("active-cont");
    sidebar.classList.toggle("active-nav");
  };

  const logout = async() => {
    // localStorage.removeItem("jwtToken");
   await localStorage.removeItem('jwtToken')
  };
  return (
    <div id="navbar_tops" >
      <div
        className="side-navbars  d-flex justify-content-between flex-wrap flex-column h6 hide-sidebar"
        id="sidebar"
        style={{ display: "float"}}
      >
        <ul className="nav flex-column text-white w-100 pt-4">
          

          <Link className="logOutLink" to="/seller-dashboard/:userType">
          <li href="#" class="nav-link mt-2 sidebar-li">
            <i class="bx bx-user-check"></i>
            <a className="sidebarOption" href="">
              <span class="mx-2">Profile</span>
            </a>
          </li>
          </Link>

          <Link className="logOutLink" to={`/upload-prod/${userType}`}>
          <li href="#" class="nav-link mt-3 sidebar-li">
            <i class="bx bx-shopping-bag"></i>
            <a className="sidebarOption" href="">
              <span class="mx-2">Upload Product</span>
            </a>
          </li>
          </Link>
          <Link className="logOutLink" to="/edit-seller-profile">
          <li href="#" class="nav-link mt-3 sidebar-li">
            <i class="bx bx-bookmark"></i>
            <a className="sidebarOption" href="">
              <span class="mx-2">Edit Profile</span>
            </a>
          </li>
          </Link>
          <Link className="logOutLink" to="/upload-category">

          <li href="#" class="nav-link mt-3 sidebar-li">
            <i class="bx bx-conversation"></i>
            <a className="sidebarOption" href="">
              <span class="mx-2">Upload Category</span>
            </a>
          </li>
          </Link>

          <Link className="logOutLink" to="/contact">
          <li href="#" class="nav-link mt-3 sidebar-li">
            <i class="bx bx-file"></i>
            <a className="sidebarOption" href="">
              <span class="mx-2">Contact us</span>
            </a>
          </li>
          </Link>

          <Link className="logOutLink" to="/about">
          <li href="#" class="nav-link mt-3 sidebar-li">
            <i class="bx bx-file"></i>
            <a className="sidebarOption" href="">
              <span class="mx-2">About us</span>
            </a>
          </li>
          </Link>
          <Link className="logOutLink" to="/login" onClick={logout}>
            <li href="#" class="nav-link mt-3 sidebar-li">
              <i class="bx bx-log-out"></i>
              <a className="sidebarOption" href="">
                <span class="mx-2">Logout</span>
              </a>
            </li>
          </Link>

          <li className="mt-5">
            <span href="#" class="nav-link h4 w-100 pt-5">
              <a href="">
                <i class="bx bxl-instagram-alt text-white"></i>
              </a>
              <a href="">
                <i class="bx bxl-twitter px-2 text-white"></i>
              </a>

              <a href="">
                <i class="bx bxl-pinterest text-white"></i>
              </a>
              <a href="">
                <i class="bx bxl-facebook text-white"></i>
              </a>
            </span>
          </li>
        </ul>
      </div>

      {/* <!-- Main Wrapper --> */}

      <div class=" my-container" id="navbar_tops" >
        <nav class="navbar top-navbar navbar-light px-5">
          {!isLogin?
                  <a class="btn border-0" id="menu-btn" onClick={clickHandler}>
                    <i class="bx bx-menu"></i>
                  </a>
          :""}

          
          <a href="#">


        

            <Link className="logOutLink" to="/login">
            <button className = "btn btn-light roundedButton" id="menu-btn" >
              
              <i class="bx bx-log-in"></i>
              <a className="sidebarOption" href="" onClick={logout}>
                <span class="mx-2">Logout</span>
              </a>
          
           </button> 
            </Link>
            <Link className="logOutLink " to="/">
            <button className = "btn btn-light ml-1 font-weight-bold roundedButton" id="menu-btn" >Place Bid <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#635e00" class="bi bi-person-plus-fill mb-1" viewBox="0 0 16 16">
                     <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                     <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                     </svg>
            </button>
            </Link>
          
          </a>
        </nav>
        
        <div id="comp">
        <SellerProfile/>
        </div>
        
      </div>

      <script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0"
        crossorigin="anonymous"
      ></script>
    </div>
  );
};

export default SellerDashboards;
