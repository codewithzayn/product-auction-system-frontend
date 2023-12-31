import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import "../style.css";
import { useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar";

const Dash = () => {
//   useEffect(() => {
//     const tokenString = localStorage.getItem("jwtToken");
//     console.log("tokenString", tokenString);
//     axios
//       .get("https://product-auction-system.onrender.com/user/dashboard", {
//         headers: { Authorization: `Bearer ${tokenString}` },
//       })
//       .then((response) => {
//         console.log("response", response);
//       })
//       .catch((error) => {
//         console.error("There was an error!", error);
//       });
//   }, []);

  return (
    <div className="back-img">
      {/* <Navbar /> */}

      <div className="content container d-flex justify-content-center ">
        <div className="rdc">
          <div className="inner-container">
            <h3>Bus Ticketing System</h3>
            <hr></hr>

            <form>
              <div className="row">
                <div className="col-md-3 mb-4">
                  <h5 style={{ "margin-left": "5%" }}>To</h5>
                  <select
                    name="ad_account_selected"
                    data-style="btn-new"
                    class="selectpicker"
                  >
                    <option> Departure Location</option>
                    <option>Lahore</option>
                    <option>Islamabad</option>
                    <option>Multan</option>
                    <option>Karachi</option>
                  </select>
                </div>

                <div className="col-md-3 mb-4">
                  <h5 style={{ "margin-left": "5%" }}>From</h5>
                  <select
                    name="ad_account_selected"
                    data-style="btn-new"
                    className="selectpicker"
                  >
                    <option> Arrival Location</option>
                    <option>Layya</option>
                    <option>Islamabad</option>
                    <option>Peshawar</option>
                    <option>Rawalpindi</option>
                  </select>
                </div>

                <div className="col-md-3 mb-4">
                  <div>
                    <h5 style={{ "margin-left": "5%" }}>Date</h5>

                    {/* <input className='selectpicker'  name="txtDate" id="txtDate" type="date"></input> */}
                    {/* onDisable */}
                    <input
                      type="date"
                      name="date"
                      style={{ height: "60px", width: "100%" }}
                    />
                  </div>
                </div>

                <div className="col-md-3" style={{ "margin-top": "37px" }}>
                  <div className="d-flex justfy-content-center">
                    <button className=" btn btn-primary btn-new">Submit</button>
                  </div>
                </div>
              </div>
            </form>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dash;
