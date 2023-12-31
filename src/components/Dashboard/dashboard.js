import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./dashboard.css";
import React, { useRef, useState, useEffect, createContext } from "react"; //

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../footer/footer";

// import Dash from "../dash";
import axios from "axios";
// import Footer from "../footer/footer";
// import About from "../About/about";
import { useNavigate } from "react-router-dom";
import Home from "../home/home";

// export const FilteredDataContext = createContext();
const Dashboards = () => {
  const [isLogin, setisLogin] = useState(true);

  const [isPayment, setPayment] = useState("");

  const [userType, setUserType] = useState(1);
  const token = localStorage.getItem("jwtToken");
  const navigate = useNavigate();
  const inputRef = useRef(null); //
  const [searchText, setSearchText] = useState("");
  const isPaymentDone=()=>{
    const getIdForPayment = localStorage.getItem("id-for-payment")
    console.log('getIdForPayment',getIdForPayment)
    console.log('token notify payment',token)
    const obj={
      getIdForPayment
    }
    axios
      .post(`https://product-auction-system.onrender.com/reviews/notify-payment`, obj, {
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json",
      })
      .then((response) => {
         console.log('response notify-payment', response)
         if (Object.keys(response.data).length) {
          console.log('navigate')
          console.log('Object.keys(response.data)',Object.keys(response.data))
          setPayment(response.data.isPaymentDone)
          toast.success(
            <div>
              Please give payment!{' '}
              <Link to="/profile">Payment</Link>
            </div>
          );
         }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }
  useEffect(() => {
    isPaymentDone()
    console.log('token notify', token)
    axios
      .get(`https://product-auction-system.onrender.com/reviews/notify-rating`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log('response notify-rating', response)
        if (response.data.length) {
          toast.success(
            <div>
              Please give rating to seller!{' '}
              <Link to="/profile">Rate seller</Link>
            </div>
          );
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [token])

  const search = () => {
    console.log("inputRef.current.value", inputRef.current.value);
    setSearchText(inputRef.current.value);
  };
  // const [filterProducts, setFilteredProducts] = useState([]);
  // const [title, setTitle] = useState("");
  // const [brand, setBrand] = useState("");

  // const handleButtonClick = () => {
  //   console.log(inputRef.current.value);
  //   setTitle(inputRef.current.value);
  //   // setBrand(inputRef.current.value);
  // };
  //   console.log("in handle chane ",inputRef.current.value);
  //   if (inputRef.current.value == "") {
  //     setTitle("");

  //   }
  //   // setBrand(inputRef.current.value);
  // };
  // const loadContent = () => {
  //   axios
  //     .get(`https://product-auction-system.onrender.com/product/get-products?title=${title}`, {})
  //     .then((response) => {
  //       console.log("response", response);
  //       const data = response.data;
  //       console.log("data", data);
  //       const filteredProducts = data.products;
  //       const getCurrentPage = data.pagination.page;
  //       console.log("getCurrentPage", getCurrentPage);
  //       console.log("filteredProducts", filteredProducts);
  //       setFilteredProducts(filteredProducts);
  //       // return <Home data={filterProducts} />
  //     })
  //     .catch((error) => {
  //       console.error("There was an error!", error);
  //     });
  // };
  // useEffect(() => {
  //   // loadContent();
  // }, [title]);
  const clickHandler = () => {
    var sidebar = document.querySelector("#sidebar");
    var container = document.querySelector(".my-container");
    container.classList.toggle("active-cont");
    sidebar.classList.toggle("active-nav");
  };


  const logout = async () => {
    console.log("token removed");
    await localStorage.clear()
    navigate("/login");
  };

  return (

    <div id="navbar_top">
      <ToastContainer />
      <div
        className="side-navbar  d-flex justify-content-between flex-wrap flex-column h6 hide-sidebar"
        id="sidebar"
        style={{ display: "float" }}
      >
        <ul className="nav flex-column text-white w-100 pt-4">
          <Link className="logOutLink" to="/">
            <li href="#" class="nav-link mt-3 sidebar-li">
              <i class="bx bxs-dashboard"></i>
              <a className="sidebarOption" href="">
                <span class="mx-2">Home</span>
              </a>
            </li>
          </Link>

          <Link className="logOutLink" to="/profile">
            <li href="#" class="nav-link mt-2 sidebar-li">
              <i class="bx bx-user-check"></i>
              <a className="sidebarOption" href="">
                <span class="mx-2">My Profile</span>
              </a>
            </li>
          </Link>

          <Link className="logOutLink" to="/categories">

            <li href="#" class="nav-link mt-2 sidebar-li">
              <i class="bx bx-book"></i>
              <a className="sidebarOption" href="">
                <span class="mx-2">Explore Category</span>
              </a>
            </li>
          </Link>

          <Link className="logOutLink" to="/edit-buyer-profile">
            <li href="#" class="nav-link mt-3 sidebar-li">
              <i class="bx bx-shopping-bag"></i>
              <a className="sidebarOption" href="">
                <span class="mx-2">Edit Profile</span>
              </a>
            </li>
          </Link>

          <Link className="logOutLink" to="/trends">
            <li href="#" class="nav-link mt-3 sidebar-li">
              <i class="bx bx-bookmark"></i>
              <a className="sidebarOption" href="">
                <span class="mx-2">Explore Trends</span>
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
          <Link className="logOutLink" to="/login">
            <li href="#" class="nav-link mt-3 sidebar-li">
              <i class="bx bx-log-out"></i>
              <a className="sidebarOption" href="" onClick={logout}>
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


      <div class=" my-container" id="navbar_top">
        <nav class="navbar top-navbar navbar-light px-5 d-flex row" >
          {console.log("token" + token)}
          

          <div
            className="col-2"
            style={{
              fontFamily: 'Open Sans, sans-serif',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              textTransform: 'uppercase',
              letterSpacing: '0.1rem',
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {token ? (
            <a class="btn border-0" id="menu-btn" onClick={clickHandler}>
              <i class="bx bx-menu"></i>
            </a>
          ) : (
            ""
          )}
            &nbsp;&nbsp;<i class="bi bi-star"></i>
            Auction <span>Hive </span> 
          </div>


          <div className="col-5 d-flex justify-content-end">
            <a href="#" style={{ textDecoration: "none" }}>
              <div class="d-flex flex-row stretch" >
                <input
                  type="search"
                  placeholder="Search Product"
                  ref={inputRef}
                  style={{ border: "none" }}
                />
                <span>
                  <button
                    type="button"
                    className="btn btn-light round stretch"
                    id="menu-btn"
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexDirection: 'column',
                      textAlign: 'center',
                      textDecoration: 'none'
                    }}
                    onClick={search}
                  // onChange={handleChange}
                  >
                    Search
                  </button>
                </span>
              </div>
            </a>
          </div>

          <div className="d-flex col-4 justify-content-end">
            <a href="#">
              {token ? (
                <>
                  <Link className="logOutLink" to="/profile">
                    <button className="btn roundedButton">
                      <i class="bx bx-log-in" style={{ "color": "#0bc096" }}></i>
                      <a className="sidebarOption" href="">
                        <span class="mx-2">Profile</span>
                      </a>
                    </button>
                  </Link>
                  <Link
                    className="logOutLink"
                    to={`/seller-dashboard/${userType}`}
                  >
                    <button
                      className="btn ml-1 font-weight-bold roundedButton"
                    >
                      Sell{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="#0bc096"
                        class="bi bi-person-plus-fill mb-1"
                        viewBox="0 0 16 16"
                      >
                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                        <path
                          fill-rule="evenodd"
                          d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"
                        />
                      </svg>
                    </button>
                  </Link>
                </>
              ) : (
                <>
                  <div className="d-flex justify-content-center row">

                    <div className="col-6">
                      <Link className="logOutLink" to="/login">
                        <button className="btn roundedButton">
                          <i class="bx bx-log-in"></i>
                          <a className="sidebarOption" href="" style={{ textDecoration: "none" }}>
                            <span class="mx-2">Login</span>
                          </a>
                        </button>
                      </Link>
                    </div>

                    <div className="col-6">
                      <Link to="/signup">
                        <button className="btn roundedButton">
                          <i class='bx bx-log-in-circle'></i>
                          <a className="sidebarOption" href="" style={{ textDecoration: "none" }}>
                            <span class="mx-2">Register</span>
                          </a>
                        </button>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </a>
          </div>
        </nav>

        <div id="comp">
          <Home searchText={searchText} />
          <Footer />
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

export default Dashboards;
