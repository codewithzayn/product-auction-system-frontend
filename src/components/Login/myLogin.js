import { Link } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import { useState,useContext } from "react";
import setAuthToken from "../../utils/setAuthToken";
import "./myLogin.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from "react";
import axios from "axios";
import img from "../../images/auction.jpg";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../App';

const MyLogin = () => {
  // const [status, setStatus] = useState(0)
  const [email, setEmail] = useState("");
  // const { setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate()
  const [password, setPassword] = useState("");
  const submit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
    const obj = {
      email: email,
      password: password,
    };
    console.log(obj);
    axios
      .post("https://product-auction-system.onrender.com/user/login", obj)
      .then((response) => {
        console.log("response", response);
        console.log("data", response.data);
        if (response.data.token) {
          var token = response.data.token;
          console.log("token", token);
          setAuthToken(token);
          localStorage.setItem("jwtToken", token);
          navigate('/')
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast.error('Email or password is incorrect');
        }
      });
  };
  return (
    <div className="container">
      <div className="row">
        <div className="order-2 order-md-1 col-12 col-md-6">
          <div className="card my-5 border-0">
            <div className="mx-4 my-5">
              <div style={{ float: "left" }}>
                <h1 style={{ marginBottom: "20px" }}>Sign In</h1>
              </div>
              <ToastContainer />
              <div className="login-form">
                <form className="login-form__group">
                
                  <div className="input-icons">
                    <i className="fa fa-envelope icon"></i>
                    <input
                      name="email"
                      type="email"
                      className="input-field"
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                    />
                  </div>
                  {/* password */}
                  <div className="input-icons">
                    <i className="fa fa-lock icon"></i>
                    <input
                      name="password"
                      type="password"
                      className="input-field"
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                    />
                  </div>

                  {/* submit button */}
                  

                </form>
                <div className="col-12 mb-5 text-center">
                  
                    <button className="btn btn-primary mb-2 mt-3" onClick={submit} style={{ "backgroundColor": " #000", width: "245px", height: "48px", borderRadius:"25px", border:"none" }}
                      type="submit"
                    >
                    
                    Continue as Client
                    </button>
                  

                  <br></br>
                  {/* <Link to="/seller-dashboard">
                    <button className="btn  btn-primary"
                      style={{ "backgroundColor": " #3b5998", width: "245px", height: "48px" }}
                      type="submit"
                    >  
                    Continue as Seller
                    </button>
                  </Link> */}

                </div>
              </div>
              <div className="d-flex justify-content-end mr-2">
                <h6>Don't have an account?</h6>
                <a
                  className="ms-2 h6"
                  style={{ textDecoration: "none", color: "black" }}
                  to="./signup.js"
                >
                  <Link className="loginLink" to="/signup">
                    <i style={{color:"#0bc096"}}>
                      <u>Register</u>
                    </i>
                  </Link>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 order-md-2 col-12 col-md-6 text-center my-auto">
          <img
            src={img}
            style={{ margin: "auto", borderRadius:"15px" }}
            className="imgg-fluid"
            alt="signupp"
          />
        </div>
      </div>
    </div>
  );
};

export default MyLogin;
