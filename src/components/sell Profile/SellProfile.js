import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// import "./profile.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../footer/footer";
const SellProfile = () => {
  const [sellerData, setSellerData] = useState([]);
  const [reviews, setReview] = useState([]);
  let { id } = useParams();
  console.log("id products", id);
  const [sellerFields, setSellerFields] = useState("");
  const [averge, setAverage] = useState("");
  useEffect(() => {

    console.log('reviews...', reviews)
  }, [reviews])
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    console.log("id get-review-rating", id);
    console.log("Profile token", token);
    axios
      .get(`http://localhost:1337/reviews/get-review-rating/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("response get-review-rating", response);
        let data = response?.data;
        console.log("data get-review-rating ", data);
        if (data !== null) {
          console.log('hey')
          setAverage(data?.findAverage)
          setReview(data?.getReviewSellerId);
          let check = data?.getReviewSellerId[0]?.sellerId
          console.log('check', check)
          // check = check ? check :id
          callSellFields(check)
        }
        else {
          console.log('else')
          callSellFields(id)
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, []);


  const callSellFields = (id) => {
    console.log("sell-fields id", id);
    const token = localStorage.getItem("jwtToken");
    console.log("Profile token", token);
    axios
      .get(`http://localhost:1337/product/sell-fields/${id}`, {})
      .then((response) => {
        console.log("response seller-fields", response);
        const data = response.data;
        console.log("data seller-fields", data);
        setSellerFields(data);
        callSellProfile(id)
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  const callSellProfile = (id) => {
    console.log("sell-profile id", id);
    const token = localStorage.getItem("jwtToken");
    console.log("Profile token", token);

    axios
      .get(`http://localhost:1337/product/sell-profile/${id}`, {})
      .then((response) => {
        console.log("response sell-profile", response);
        const data = response?.data;
        console.log("data sell-profile", data);
        setSellerData(data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  const imgStyles = {
    width: '200px',
    height: '120px'
  };
  const buttonStyles = {
    backgroundColor: '#0bc096',
    color: '#fff',
    borderColor: '#0bc096',
    borderRadius: "25px"
  };

  return (

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
                style={{ "background-color": "#008A6B", height: "200px" }}
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
                <div class="ms-3 " style={{ "margin-top": "100px" }}>
                  {/* <h5></h5> */}
                  <h5>{sellerFields[0]?.name}</h5>
                  <p>Lahore, Pakistan</p>
                </div>
              </div>
              <div
                class="p-4 text-black"
                style={{ "background-color": "#f8f9fa" }}
              ></div>
              <div class="card-body p-4 text-black">

                <div className="d-flex justify-content-center">
                  {[...Array(5)].map((star, index) => {
                    // Increment the index to start from 1
                    index += 1;
                    return (
                      <button
                        key={index}
                        type="button"
                        className={index <= averge ? "on" : "off"}
                      >
                        <span className="star" style={{ fontSize: "40px" }}>
                          &#9733;
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div class="mb-5">
                  <p class="lead fw-normal mb-1">About User</p>
                  <div class="p-4" style={{ "background-color": "#f8f9fa" }}>
                    <p class="font-italic mb-1">Muhamma Hamas</p>
                    <p class="font-italic mb-1">Lahore</p>
                    <p class="font-italic mb-0">Pakistan</p>
                  </div>
                </div>

                <hr />
                <div className="d-flex justify-content-center pb-5">
                  <div
                    className="btn btn-secondary btn-sm px-4 py-2 price-btn text-dark font-weight-bold text-white"
                    style={{ fontSize: '20px', backgroundColor: '#0bc096', borderRadius: '25px', border: 'none' }}
                  >
                    Recently Added Products
                  </div>
                  <br />
                </div>
                <div class="row g-2 p-5" style={{ "background-color": "#f8f9fa" }}>
                  {sellerData &&
                    sellerData.map((e) => (
                      <div className="col-lg-6 col-sm-12">
                        <Link
                          className="text-decoration-none text-white"
                          to={`/product/${e._id}`}
                        >
                          <div class="mb-2 d-flex justify-content-center">
                            <img
                              src={`http://localhost:1337/images/${e.photo[0]}`}
                              alt="image 1"
                              class="rounded-3"
                              style={{ width: "75%", height: "300px", objectFit: "cover" }}
                            />
                          </div>
                        </Link>
                      </div>
                    ))}
                </div>

                <hr />
                <div className="d-flex justify-content-center pb-3 pt-3">
                  <div
                    className="btn btn-secondary btn-sm px-4 py-2 price-btn text-dark font-weight-bold text-white"
                    style={{ fontSize: '20px', backgroundColor: '#0bc096', borderRadius: '25px', border: 'none' }}
                  >
                    Reviews
                  </div>
                  <br />
                </div>

                <div class="rating">
                  <div class="row">

                    {/* ================================================= */}

                    <div className="row d-flex justify-content-center">
                      {reviews && reviews.map((e, index) => (
                        <div className="col-10 pt-2 pl-4" >
                          <div class="row p-2 bg-white border rounded">
                            <div class="col-md-1 mt-1">
                             
                              <img
                                src="https://media.istockphoto.com/id/522855255/vector/male-profile-flat-blue-simple-icon-with-long-shadow.jpg?s=612x612&w=0&k=20&c=EQa9pV1fZEGfGCW_aEK5X_Gyob8YuRcOYCYZeuBzztM="
                                alt="Generic placeholder image"
                                class="img-fluid img-thumbnail"
                                style={{ width: "50px", "z-index": "1", borderRadius:'25px' }}
                              />
                            </div>
                            <div class="col-md-6 mt-1">
                              <h5>{e?.name}</h5>
                              <div class="mt-1 mb-1 spec-1">
                                {e?.review}
                              </div>
                            </div>
                          </div>

                        </div>
                      ))}
                    </div>



                    {/* ================================================== */}

                  </div>
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default SellProfile;
