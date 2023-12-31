import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./sellerProfile.css";
import Footer from "../footer/footer";
import { useState, useEffect } from "react";
import axios from "axios"
import { useParams } from "react-router-dom";
const SellerProfile = () => {
    const [sellerData, setSellerData] = useState([]);
    const [sellerFields, setSellerFields] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        console.log("Profile token", token);
        if (token) {
            axios
                .get(`http://localhost:1337/product/seller-fields`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    console.log("response seller-fields", response);
                    const data = response.data;
                    console.log("data seller-fields", data);
                    setSellerFields(data);
                })
                .catch((error) => {
                    console.error("There was an error!", error);
                });
        }
    }, [])


    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        console.log("Profile token", token);
        if (token) {
            axios
                .get(`http://localhost:1337/product/seller-profile`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    console.log("response seller-profile", response);
                    const data = response.data;
                    console.log("data seller-profile", data);
                    setSellerData(data);
                })
                .catch((error) => {
                    console.error("There was an error!", error);
                });
        }
    }, []);
    return (
        <>
            <section class="h-100 gradient-custom-2">
                <div class="container py-5 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col col-lg-16 col-xl-12">
                            <div class="card">
                                <div class="rounded-top text-white d-flex flex-row" style={{ "background-color": "#000", "height": "200px" }}>
                                    <div class="ms-4 mt-5 d-flex flex-column" style={{ "width": "150px;" }}>
                                        <img src="https://media.istockphoto.com/id/522855255/vector/male-profile-flat-blue-simple-icon-with-long-shadow.jpg?s=612x612&w=0&k=20&c=EQa9pV1fZEGfGCW_aEK5X_Gyob8YuRcOYCYZeuBzztM="
                                            alt="Generic placeholder image" class="img-fluid img-thumbnail mt-4 mb-2"
                                            style={{ "width": "150px", "z-index": "1" }} />

                                    </div>
                                    <div class="ms-3" style={{ "margin-top": "100px" }}>
                                        <h5>{sellerFields[0]?.name}</h5>
                                        {/* <p>m.hamas.fast@gmail.com</p> */}
                                        <p>{sellerFields[0]?.city}Lahore, Pakistan</p>
                                    </div>
                                </div>
                                <div class="p-4 text-black" style={{ "background-color": "#f8f9fa" }}>
                                    <Link className="logOutLink" to="/edit-seller-profile">
                                        <div class="d-flex justify-content-center text-center py-1">
                                            <button
                                                type="button"
                                                class="btn btn-dark"
                                                data-mdb-ripple-color="dark"
                                                style={{ backgroundColor: 'black', borderRadius: '25px', border: 'none' }}

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
                                            <h5>Email:</h5>
                                            <p class="font-italic mb-1">{sellerFields[0]?.email}</p>
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
                                            Recent Uploaded Products
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
                                                    <div class="col mb-2 d-flex justify-content-center">
                                                        <img
                                                            src={`http://localhost:1337/images/${e.photo[0]}`}
                                                            alt="image 1"
                                                            class="rounded-3"
                                                            style={{ width: "75%", height: "300px", objectFit: 'cover' }}
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
    )
}
export default SellerProfile;