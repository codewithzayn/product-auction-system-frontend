import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./profile.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../footer/footer";
// import Payment from "../Payment/payment"
const Profile = () => {
  const [profileData, setProfileData] = useState([]);
  const [buyerReviewData, setbuyerReviewData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [buyerProfileData, setBuyerProfileData] = useState();
  const highestBiddingPrice = localStorage.getItem("highestBiddingPrice")
  console.log('highestBiddingPrice', highestBiddingPrice)
  const getBuyerReviews = () => {
    const token = localStorage.getItem("jwtToken");
    const paymentId = localStorage.getItem("paymentId");
    console.log('paymentId', paymentId)
    console.log("get-buyer-reviews token", token);
    const obj = {
      paymentId
    }
    axios
      .post(`https://product-auction-system.onrender.com/reviews/get-buyer-reviews`, obj, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("response get-buyer-reviews", response);
        const data = response.data;
        console.log("data", data);
        setbuyerReviewData(data)
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }
  const getBuyerprofileData = () => {
    const token = localStorage.getItem("jwtToken");
    console.log("get-buyer-reviews token", token);
    axios
      .get(`https://product-auction-system.onrender.com/user/get-buyer-profile-data`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("response get-buyer-profile-data", response);
        const data = response.data;
        console.log("data get-buyer-profile-data", data);
        setBuyerProfileData(data[0])
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  const getPayments = async () => {
    const token = localStorage.getItem("jwtToken");
    console.log("get-payments token", token);
    axios
      .get(`https://product-auction-system.onrender.com/reviews/get-payments`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("response get-payments", response);
        const data = response.data;
        console.log("data get-payments", data);
        setPaymentData(data)
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    console.log("Profile token", token);
    axios
      .get(`https://product-auction-system.onrender.com/product/user-profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("response", response);
        const data = response.data;
        console.log("data", data);
        setProfileData(data);
        getBuyerReviews()
        getPayments()
        getBuyerprofileData()
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);
  return (
    <>
      <section class="h-100 gradient-custom-2">
        <div class="container pt-3">
          <Link className="logOutLink" to="/">
            <button
              type="button"
              class="btn btn-dark roundedButton ml-2"
              data-mdb-ripple-color="dark"
            >
              <i class="bi bi-arrow-right"></i>
              Back
            </button>
          </Link>
        </div>

        <div class="container py-3 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-lg-16 col-xl-12">
              <div class="card">
                <div
                  class="rounded-top text-white d-flex flex-row"
                  style={{ "background-color": "#000", height: "200px" }}
                >
                  <div
                    class="ms-4 mt-5 d-flex flex-column"
                    style={{ width: "150px;" }}
                  >
                    <img
                      src="https://media.istockphoto.com/id/522855255/vector/male-profile-flat-blue-simple-icon-with-long-shadow.jpg?s=612x612&w=0&k=20&c=EQa9pV1fZEGfGCW_aEK5X_Gyob8YuRcOYCYZeuBzztM="
                      alt="Generic placeholder image"
                      class="img-fluid img-thumbnail mt-4 mb-2"
                      style={{ width: "150px", "z-index": "1" }}
                    />
                  </div>
                  <div class="ms-3" style={{ "margin-top": "100px" }}>
                    <h5>{buyerProfileData?.name}</h5>
                    <p>Lahore, Pakistan</p>
                  </div>
                </div>
                <div
                  class="p-4 text-black"
                  style={{ "background-color": "#f8f9fa" }}
                >
                  <Link className="logOutLink" to="/edit-buyer-profile">
                    <div class="d-flex justify-content-center text-center py-1">
                      <button
                        type="button"
                        class="btn btn-dark roundedButton"
                        data-mdb-ripple-color="dark"
                      >
                        Edit profile
                      </button>
                    </div>
                  </Link>
                </div>
                <div class="card-body p-4 text-black">
                  <div class="mb-5">
                    <p class="lead fw-normal mb-1">About</p>
                    <div class="p-4" style={{ "background-color": "#f8f9fa" }}>
                      <h5> Email: </h5>
                      <p>{buyerProfileData?.email}</p>
                      <h5>Phone Number:</h5>
                      <h5>City:</h5>
                      <h5>Country:</h5>
                    </div>
                  </div>
                  
                  <div className="d-flex justify-content-center pb-5">
                    <div
                      className="btn btn-secondary btn-sm px-4 py-2 price-btn text-dark font-weight-bold text-white"
                      style={{ fontSize: '20px', backgroundColor: 'black', borderRadius: '25px', border: 'none' }}
                    >
                      Recently Bided Products
                    </div>
                    <br />
                  </div>

                  <div class="row g-2 p-5" style={{ "background-color": "#f8f9fa" }}>
                    {profileData &&
                      profileData.map((e) => (
                        <div className="col-lg-6 col-sm-12">
                          <Link
                            className="text-decoration-none text-white"
                            to={`/product/${e._id}`}
                          >
                            <div class=" mb-2 d-flex justify-content-center">
                              <img
                                src={`https://product-auction-system.onrender.com/images/${e.photo[0]}`}
                                alt="image 1"
                                class="rounded-3"
                                style={{ width: "75%", height: "300px", objectFit: 'cover' }}
                              />
                            </div>
                          </Link>
                        </div>
                      ))}

                  </div>

                  {/* <div class="d-flex justify-content-between align-items-center mb-4">
                    <h3 class="lead fw-normal mb-0">Rating & Reviews</h3>
                  </div> */}

                  <div className="d-flex justify-content-center pb-5 pt-5">
                    <div
                      className="btn btn-secondary btn-sm px-4 py-2 price-btn text-dark font-weight-bold text-white"
                      style={{ fontSize: '20px', backgroundColor: 'black', borderRadius: '25px', border: 'none' }}
                    >
                      Rating & Reviews
                    </div>
                    <br />
                  </div>


                  <div class="row g-2 p-5" style={{ "background-color": "#f8f9fa" }}>
                    {buyerReviewData &&
                      buyerReviewData.map((e) => (
                        <div className="col-lg-6 col-sm-12">
                          <Link
                            className="text-decoration-none text-white"
                            to={`/rating-reviews/${e._id}`}
                          >
                            <div class="col mb-2 d-flex justify-content-center">
                              <img
                                src={`https://product-auction-system.onrender.com/images/${e.photo[0]}`}
                                alt="image 1"
                                class="rounded-3"
                                style={{ width: "75%", height: "400px", objectFit: 'cover' }}
                              />
                            </div>
                          </Link>
                        </div>
                      ))}

                  </div>

                  {/* <div class="d-flex justify-content-between align-items-center mb-4">
                    
                    <h3 class="lead fw-normal mb-0">Pending Payments</h3>
                  </div> */}
                  <div className="d-flex justify-content-center pb-5 pt-5">
                    <div
                      className="btn btn-secondary btn-sm px-4 py-2 price-btn text-dark font-weight-bold text-white"
                      style={{ fontSize: '20px', backgroundColor: 'black', borderRadius: '25px', border: 'none' }}
                    >
                      Pending Payments
                    </div>
                    <br />
                  </div>

                  <div class="row g-2 p-5" style={{ "background-color": "#f8f9fa" }} >
                    {paymentData &&
                      paymentData.map((e) => (
                        <div className="col-lg-6 col-sm-12">
                          <Link
                            className="text-decoration-none text-white"
                            to={`/payment/${e._id}/${e.highestBiddingPrice}`}
                          // onClick={() => handleAddToReview(e)}
                          >
                            <div class="mb-2 d-flex justify-content-center">
                              <img
                                src={`https://product-auction-system.onrender.com/images/${e.photo[0]}`}
                                alt="image 1"
                                class="rounded-3"
                                style={{ width: "75%", height: "300px", objectFit: "cover" }}
                              />
                            </div>
                          </Link>
                        </div>
                      ))}

                  </div>
                </div>
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Profile;
