import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import img from "../../images/auction.jpg";
import "./categories.css";
import HeroSlider from "../HeroSlider/HeroSlider";
import Services from "../Advantages/ourAdvantages";

function Categories() {
  const [categories, setCategories] = useState([]);
  const token = localStorage.getItem("jwtToken");
  console.log("token", token);
  useEffect(() => {
    axios
      .get("http://localhost:1337/category/get-all-categ-products", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log("response", response);
        console.log("response data", response.data);
        const data = response.data;
        console.log('data get-all-categ-products', data)
        setCategories(data)
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [])

  const buttonStyles = {
    backgroundColor: '#0bc096',
    color: '#fff',
    borderColor: '#0bc096',
    borderRadius: "25px"
  };
  const imgStyles = {
    width: '200px',
    height: '120px'
  };



  return (
    <>
      <div class="p-2">
        <Link to="/">
          <button
            type="button"
            style={buttonStyles}
            class="btn btn-dark"
            data-mdb-ripple-color="dark"
          >
            <i class="bi bi-arrow-right"></i>
            Back
          </button>
        </Link>
      </div>
      <div>
      <section id="hero" >
          <HeroSlider />
        </section>

        <section id="hero" >
          <Services />
        </section>

        <br />
        <br />
        <br />


        

        {categories && categories.map((category) => (
          <>
            
            <div className="d-flex justify-content-center pb-5">
              <div
                className="btn btn-secondary btn-sm px-4 py-2 price-btn text-dark font-weight-bold text-white col-10"
                style={{ fontSize: '20px', backgroundColor: '#0bc096', borderRadius: '25px', border: 'none' }}
              >
                {category.categoryTitle}
              </div>
              <br />
            </div>
            <div class="container pb-5">
              <div class="row">
                <div class="col-md-10 mx-auto">
                  <ul class="anyClass pb-3" style={{ "list-style": "none" }}>
                    {category && category.products.map((product) => (
                      <li class="nav-item">
                        <div class="d-flex justify-content-center">
                          <div class="col-md-12">
                            <div class="row m-2 border rounded">

                                  <div class="col-md-12">
                                    <div class="row p-2 bg-white border rounded card-shadow">
                                      <div class="col-md-3 mt-1">
                                        <img
                                          class="img-fluid img-responsive rounded product-image"
                                          
                                          src={`http://localhost:1337/images/${product.photo[0]}`}
                                          style={imgStyles}
                                        />
                                      </div>
                                      <div class="col-md-6 mt-1">
                                        <h5>{product.title}</h5>
                                        <div class="mt-1 mb-1 spec-1">
                                          {product.description}
                                        </div>
                                        
                                      </div>
                                      <div class="align-items-center align-content-center col-md-3 border-left mt-1">
                                        <div class="d-flex flex-row align-items-center">
                                          <h4 class="mr-1">Rs.{product.price}</h4>
                                        </div>
                                        <h6 class="text-success">{product.brand}</h6>
                                        <div class="d-flex flex-column mt-4">
                                          <button
                                            class="btn btn-primary btn-sm"
                                            type="button"
                                            style={buttonStyles}
                                          >
                                            <Link className="text-decoration-none text-white" to={`/product/${product._id}`}>
                                              Details
                                            </Link>
                                          </button>
                                          
                                        </div>
                                      </div>
                                    </div>
                                  </div>



                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default Categories;
