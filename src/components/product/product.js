import img from "../../images/1.jpg";
import "./product.css";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import React from "react";
import { Link, useFetcher } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap-icons/font/bootstrap-icons.css";
// import { time } from "console";
const Product = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 200,
    slidesToShow: 1,
    slidesToScroll: 1,
    
  };

  let { id } = useParams();
  const naviagte = useNavigate()
  const [product, setProducts] = useState();

  const [auctionEndTime, setAuctionEndTime] = useState();
  const [deadline, setDeadline] = useState(0);
  const [photo, setPhoto] = useState([]);
  const [daysLeft, setdaysLeft] = useState(null);
  const [hoursLeft, setHoursLeft] = useState(null);
  const [minutesLeft, setMinutesLeft] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(null);

  const [recommendedProducts, setRecommendedProducts] = useState([])
  const [category, setCategory] = useState()
  const [price, setPrice] = useState(0);
  const [bidStatus, setBidStatus] = useState(0)
  const [renderUser, setRenderUser] = useState([])
  const [biddedData, setBiddedData] = useState()

  const token = localStorage.getItem("jwtToken");

  const increasePrice = () => {
    setPrice(price + 500);
  };

  const decreasePrice = () => {
    if (price > product.biddingPrice) {
      setPrice(price - 500);
    }
  };

  const renderAllUsers = () => {
    axios
      .get(`http://localhost:1337/product/render-all-users/${id}`, {
      })
      .then((response) => {
        const data = response.data;
        console.log('data render all users', data)
        setRenderUser(data)
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  // const recommendedProduct = async () => {
  // axios
  //   .get("http://localhost:1337/product/recommended-product", {
  //     headers: { Authorization: `Bearer ${token}` },
  //     "Content-Type": "application/json",
  //   })
  //   .then((response) => {
  //     let data = response.data;
  //   })
  //   .catch((error) => {
  //     console.error("There was an error!", error);
  //   });
  // }

  const isBiddingAllow = () => {
    const token = localStorage.getItem("jwtToken");
    axios
      .get(`http://localhost:1337/product/is-bid-allow/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const data = response.data;
        const len = data.length
        const length = Object.keys(data).length;
        if (data.length != 0) {
          setBidStatus(1)
        }
        else {
          setBidStatus(0)
        }
        renderAllUsers()
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  useEffect(() => {
    const obj = {
      category,
      id
    }
    console.log('obj recommended-product', obj)
    axios
      .post("http://localhost:1337/product/recommended-product", obj, {
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json",
      })
      .then((response) => {
        let data = response.data;
        console.log('data recommended product', data)
        setRecommendedProducts(data)
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [category, id])


  useEffect(() => {
    console.log("id", id);
    axios
      .get(`http://localhost:1337/product/get-product/${id}`, {
      })
      .then((response) => {
        setCategory(response.data[0]?.categoryId)
        const data = response.data;
        console.log('data get product', data)
        const product = data;
        setProducts(product[0]);
        setPhoto(product[0]?.photo);
        if (product[0].auctionEndTime !== null) {

          // if(deadline === 0){
          //   // Call Finish Bid
          // }
          console.log("***")
          setAuctionEndTime(product[0].auctionEndTime)
          setDeadline(new Date(product[0].auctionEndTime).getTime());
        }
        else {
          setAuctionEndTime(0);
          setDeadline(0);
        }
        setPrice(product[0]?.biddingPrice);
        isBiddingAllow()
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [id]);

  useEffect(() => {
    // alert(deadline)
    if (auctionEndTime) {
      // alert(deadline)
      const interval = setInterval(() => {
        // Update the time here
        const now = new Date().getTime();
        console.log('now', now)
        let distance;
        if (deadline - now > 0)
          distance = deadline - now;
        else
          distance = 0
        console.log('distance', distance)
        // console.log('product interval', product)

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setdaysLeft(days)
        setHoursLeft(hours)
        setMinutesLeft(minutes)
        setSecondsLeft(seconds)
        if (distance === 0) {
          clearInterval(interval);
          console.log('Hit an api')
          // alert("hit api")
          finishBid()
        }
      }, 1000);
      // Return a cleanup function that clears the interval when the component unmounts
      return () => clearInterval(interval);
    }
  }, [deadline])

  useEffect(() => {
    renderAllUsers()
  }, [biddedData])
  const placeBid = () => {
    if(price >product.biddingPrice){
      const token = localStorage.getItem("jwtToken");
    const updatedBiddingPrice = price;
    const obj = {
      productID: id,
      updatedBiddingPrice,
    };
    console.log('obj', obj)
    console.log("axios");
    axios
      .post("http://localhost:1337/product/add-bidding", obj, {
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json",
      })
      .then((response) => {
        let data = response.data;
        console.log("data add-bidding", data);
        data = data.bidded;
        setBiddedData(data)
        toast.success("Bid added successfully");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
    console.log('obj')
    }
  };
  const bidWinner = () => {
    const token = localStorage.getItem("jwtToken");
    let render = JSON.stringify(renderUser)
    const obj = {
      render,
      id
    }
    axios
      .post("http://localhost:1337/reviews/add-review", obj, {
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json"
      })
      .then((response) => {
        let data = response.data;
        naviagte('/')
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  const addPayment = async () => {
    console.log('addPayment')
    const obj = {
      id,
      sellerId: renderUser[0]._id,
      buyerId: renderUser[1]._id
    }
    console.log('obj add payment', obj)
    axios
      .post(`http://localhost:1337/reviews/add-payment`, obj, {
        headers: { Authorization: `Bearer ${token}` },
        "Content-Type": "application/json",
      })
      .then((response) => {
        let data = response.data;
        naviagte('/')
        console.log('data add payment', data)
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }
  const finishBid = () => {

    const sellerId = renderUser[0]?._id;
    console.log("sellerId", sellerId)

    const buyerId = renderUser[1]?._id
    console.log("buyerId", buyerId)

    if (buyerId !== undefined && sellerId !== undefined) {
      console.log("not undefined")
      if (sellerId === buyerId) {
        console.log("equals")
        return
      }
      console.log("outside")
      const token = localStorage.getItem("jwtToken");
      let render = JSON.stringify(renderUser)
      const obj = {
        render,
        id
      }
      axios
        .put(`http://localhost:1337/product/finish-bid`, obj, {
          headers: { Authorization: `Bearer ${token}` },
          "Content-Type": "application/json",
        })
        .then((response) => {
          let data = response.data;
          console.log('data finish bid', data)
          console.log('highestBiddingPrice', price)
          localStorage.setItem('highestBiddingPrice', price)
          localStorage.setItem('id-for-payment', id)

          addPayment()
          // bidWinner()
        })
        .catch((error) => {
          console.error("There was an error!", error);
        });
    }
  }

  const buttonStyles = {
    backgroundColor: '#0bc096',
    color: '#fff',
    borderColor: '#0bc096',
    borderRadius: '25px',
  };
  const inputStyles = {
    backgroundColor: '#0bc096',
    color: '#0bc096',
    borderColor: '#0bc096',
    borderRadius: '25px',
  };

  return (
    <>
      <div class="container p-2">
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
      <section style={{ "background-color": "#eee" }}>
        <ToastContainer />

        <div class="container py-5">
          <div class="row justify-content-center">
            <div class="row">
              <div class="col-6 card text-black">
                <i class="fab fa-apple fa-lg pt-3 pb-1 px-3"></i>
                <div className="carousel-wrapper">
                  <Slider {...settings} className="m-4">
                    {photo &&
                      photo.map((index) => (
                        <img src={`http://localhost:1337/images/${index}`}
                        class="card-img-top fixed-image-sizes" alt="Laptop"  
                        />
                      ))}
                  </Slider>
                </div>
                <div class="card-body">
                  <div class="text-center">
                    <h3 class="card-title text-success">{product?.title}</h3>
                    <p class="text-muted mb-4" style={{ textAlign: 'justify' }}>{product?.description}</p>
                  </div>
                  <div>
                    <div class="d-flex justify-content-between">
                      <span className="font-weight-bold">Brand</span>
                      <span>{product?.brand}</span>
                    </div>
                    <div class="d-flex justify-content-between">
                      <span className="font-weight-bold">Condition</span>
                      <span>{product?.condition}</span>
                    </div>
                    <div class="d-flex justify-content-between">
                      <span className="font-weight-bold">Location</span>
                      <span>{product?.location}</span>
                    </div>
                    <div class="d-flex justify-content-between">
                      <span className="font-weight-bold">Category</span>
                      <span>{product?.categoryTitle}</span>
                    </div>
                  </div>
                  <div class="d-flex justify-content-between total mt-4">
                    <span className="font-weight-bold">Base Price</span> <span>Rs. {product?.price}</span>
                  </div>
                </div>
              </div>

              <div class="col-6 card text-black">
                <div class="contaier col-md-12 mt-5 mb-5">
                  <ul class="anyClasss" style={{ "list-style": "none" }}>
                    <li class="nav-item">
                      <div class="d-flex justify-content-center">
                        <div class="col-md-12">
                          <div class="row p-2 bg-white border rounded">
                            {renderUser &&
                              renderUser.map((item, index) => (
                                <React.Fragment key={index}>
                                  <div class="col-md-12 mt-1 d-flex row">
                                    {index === 0 ? (
                                      <Link to={`/sell-profile/${item._id}`} style={{ color: 'white', textDecoration: 'none', fontSize: '16px', backgroundColor: 'lightgray', padding: '5px 10px', borderRadius: '5px', display: 'flex', alignItems: 'center', gap: '10px', transition: '0.3s', background: 'black' }}>
                                        <div className="col-6 justify-content-start d-flex">
                                          <h6>{item.name}</h6>
                                          <i class="bx bx-log-in pt-1" style={{ "color": "#0bc096" }}></i>
                                        </div>
                                        <div className="col-6 justify-content-end">
                                          <h6 class="mr-1">{item.biddingPrice}</h6>
                                        </div>
                                      </Link>
                                    ) : (
                                      <div style={{ color: 'white', textDecoration: 'none', fontSize: '16px', backgroundColor: 'lightgray', padding: '5px 10px', borderRadius: '5px', display: 'flex', alignItems: 'center', gap: '10px', transition: '0.3s', background: '#4b4b4b' }}>
                                        <div className="col-6 justify-content-start d-flex">
                                          <h6>{item.name}</h6>
                                        </div>
                                        <div className="col-6 justify-content-end">
                                          <h6 class="mr-1">{item.biddingPrice}</h6>
                                        </div>
                                      </div>
                                    )}
                                    <div class="d-flex flex-row"></div>
                                  </div>

                                </React.Fragment>
                              ))}
                          </div>
                        </div>
                      </div>
                    </li>

                  </ul>
                </div>



                <div class="container mb-5">
                  <div class="d-flex justify-content-center row">

                    <div class="col-md-10">
                      <div className="container mt-3">
                        <div className="input-group rounded">
                          <div className="input-group-prepend">
                            <button
                              className="btn btn-secondary btn-sm px-4 py-2 price-btn text-dark font-weight-bold"
                              type="button"
                              style={buttonStyles}
                              onClick={decreasePrice}
                            >
                              <i className="bi bi-dash-lg bi-3x"></i>
                            </button>
                          </div>
                          <span className="form-control text-center custom-price bg-white" style={inputStyles}>{`PKR ${price}`}</span>
                          <div className="input-group-append">
                            <button
                              className="btn btn-secondary btn-sm px-4 py-2 price-btn text-dark font-weight-bold"
                              type="button"
                              style={buttonStyles}
                              onClick={increasePrice}
                            >
                              <i className="bi bi-plus-lg bi-3x"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="container mb-5">
                  {token && (
                    <>
                      {!bidStatus ? (
                        <>
                          <div className="d-flex justify-content-center">
                            <button
                              className="btn btn-secondary btn-sm px-4 py-2 price-btn text-dark font-weight-bold"
                              type="button"
                              style={buttonStyles}
                              onClick={placeBid}
                            >
                              Place a Bid
                            </button>
                            <br />
                          </div>

                          <div className="d-flex justify-content-center mt-3">


                            {deadline !== 0 && (
                              <>

                                <div className="timer-container">
                                  <div className="timer-labels pl-2 ">
                                    <span className="timer-label">Days</span>
                                    <span className="timer-label">Hours</span>
                                    <span className="timer-label">Minutes</span>
                                    <span className="timer-label">Seconds</span>
                                  </div>
                                  <div className="timer-values">
                                    <span className="timer-value">{daysLeft}</span>
                                    <span className="timer-value">{hoursLeft}</span>
                                    <span className="timer-value">{minutesLeft}</span>
                                    <span className="timer-value">{secondsLeft}</span>
                                  </div>
                                </div>

                              </>
                            )}
                          </div>
                        </>
                      ) : (
                        <>
                          {deadline === 0 ? (
                            <div className="d-flex justify-content-center">
                              <button
                                className="btn btn-secondary btn-sm px-4 py-2 price-btn text-dark font-weight-bold"
                                type="button"
                                style={buttonStyles}
                                onClick={finishBid}
                              >
                                Finish Bid
                              </button>
                            </div>
                          ) : (
                            // Render something else if deadline is not null
                            // <p>Time Left: {daysLeft}:{hoursLeft}:{minutesLeft}:{secondsLeft}</p>
                            <>

                              <div className="timer-container">
                                <div className="timer-labels pl-2 ">
                                  <span className="timer-label">Days</span>
                                  <span className="timer-label">Hours</span>
                                  <span className="timer-label">Minutes</span>
                                  <span className="timer-label">Seconds</span>
                                </div>
                                <div className="timer-values">
                                  <span className="timer-value">{daysLeft}</span>
                                  <span className="timer-value">{hoursLeft}</span>
                                  <span className="timer-value">{minutesLeft}</span>
                                  <span className="timer-value">{secondsLeft}</span>
                                </div>
                              </div>

                            </>
                          )}
                        </>
                      )}
                    </>

                  )}
                </div>


              </div>

            </div>
          </div>


          <div>
            <section style={{ backgroundColor: "#eee" }}>


              <div class="container py-5">
                <div class="row">

                  <div className="d-flex justify-content-center pb-5">
                    <div
                      className="btn btn-secondary btn-sm px-4 py-2 price-btn text-dark font-weight-bold text-white"
                      style={{ fontSize: '20px', backgroundColor: '#0bc096', borderRadius: '25px', border: 'none' }}
                    >
                      Recomended Products
                    </div>
                    <br />
                  </div>

                  {recommendedProducts && recommendedProducts.map((e, index) => (

                    <div class="col-md-12 col-lg-3 mb-4 mb-lg-0 ">
                      <Link className="text-decoration-none text-black" to={`/product/${e._id}`}>

                        <div class="card mb-4 card-shadow">
                          <div class="d-flex justify-content-between p-3">
                            <h4 class="overly">{e?.title}</h4>
                           
                          </div>

                          <div className="m-4">
                            <img src={`http://localhost:1337/images/${e.photo[0]}`}
                              class="card-img-top fixed-image-size" alt="Laptop" />
                          </div>

                          <div class="card-body">
                            <div class="d-flex justify-content-between">
                              <p class="small overly">{e.brand}</p>
                              <p class="small text-danger"><s>{e.price + 100}</s></p>
                            </div>

                            <div class="d-flex justify-content-between mb-3">
                              <h5 class="mb-0 overly">Price</h5>
                              <h5 class="text-dark mb-0">Rs. {e.price}</h5>
                            </div>
                            <div className="d-flex justify-content-center">
                              <button class="btn btn-primary btn-sm butProperty" type="button">
                                <Link className="text-decoration-none text-white" to={`/product/${e._id}`}>
                                  Details
                                </Link>
                              </button>
                            </div>

                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}

                </div>
              </div>
            </section>
          </div>



        </div>
      </section>
    </>
  );
};

export default Product;
