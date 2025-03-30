import { useState } from "react";
import "./home.css"
import { Link } from "react-router-dom";
import img from "../../images/1.jpg";
import axios from "axios";
import { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import HeroSlider from "../HeroSlider/HeroSlider";
import Services from "../Advantages/ourAdvantages";
import Banner from "../Banner/banner";

import { useRef } from "react";
// import { FilteredDataContext } from '../Dashboard/dashboard';

const Home = ({ searchText }) => {
  const navigate = useNavigate()
  const location = useLocation();

  //  console.log('brand....',brand)
  console.log('searchText....', searchText)
  const token = localStorage.getItem('jwtToken')
  const [page, setPage] = useState(1)
  const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [hasMore, setHasMore] = useState(true);

  const [prevPage, setPrevPage] = useState(0); // storing prev page number
  const [wasLastList, setWasLastList] = useState(false); // setting a flag to know the last list
  // const [searchText, setSearchText] = useState("");
  const [filterBy, setFilterBy] = useState("");

  const fetchData = async () => {
    const response = await axios.get(
      `http://localhost:1337/product/get-products?page=${page}&title=${searchText}`,
      {}
    );
    console.log("response get-products", response);
    console.log(
      "response.data.products.length",
      response.data.products.length
    );
    if (!response.data.products.length) {
      // setWasLastList(true);
    }
    // setPrevPage(page);
    if (page === 1) {
      setProducts(response.data.products);
    } else {
      setProducts([...products, ...response.data.products]);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log('page loads', page)
    fetchData();
  }, [page, searchText]);

  useEffect(() => {
    setPage(1);
    // setWasLastList(false);
  }, [searchText]);

  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.offsetHeight;
    const scrollTop = window.scrollY;
    console.log("windowHeight", windowHeight);
    console.log("documentHeight", documentHeight);
    console.log("scrollTop", scrollTop);
    if (scrollTop + windowHeight + 1 >= documentHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  // useEffect(() => {
  //   alert('hi')
  //   if (location.pathname !== '/') {
  //   setPage(1);
  //   }
  //   // setWasLastList(false);
  // }, [location]);
  // useEffect(() => {
  //   // if(!token){
  //   //   navigate('/login')
  //   // }
  //   fetchData(page).then((newData) => {
  //     setProducts((prevData) => [...prevData, ...newData]);
  //     setLoading(false);
  //     console.log('products.length', newData.length)
  //     setHasMore(newData.length > 0)
  //   });
  // }, [page]);

  // useEffect(() => {
  //   setPage(1);

  //   setProducts([])
  //   // setLoading(true)
  // }, [title])
  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);

  // const fetchData = async (page) => {
  //   console.log('page', page)
  //   const response = await axios.get(`http://localhost:1337/product/get-products?page=${page}&title=${title}`);
  //   console.log('response', response)
  //   return response.data.products;
  // };

  // const handleScroll = () => {
  //   // alert("hi")
  //   const scrollTop = document.documentElement.scrollTop
  //   const scrollHeight = document.documentElement.scrollHeight
  //   const clientHeight = document.documentElement.clientHeight
  //   console.log('loading', loading)
  //   console.log('HasMore', hasMore)
  //   if (!loading && scrollTop + clientHeight + 300 >= scrollHeight &&hasMore) {
  //     // setLoading(true);
  //     setPage((prevPage) => prevPage + 1);
  //   }
  // };

  const buttonStyles = {
    backgroundColor: '#0bc096',
    color: '#fff',
    borderColor: '#0bc096',
  };
  const imgStyles = {
    width: '200px',
    height: '150px'
  };

  return (
    <div  >
      {/* <div class="jumbotron bg-dark">
        <div class="container text-center text-light">
          <h1>Product Auction System</h1>
          <p>Mission, Vission & Values</p>
        </div>
      </div> */}
      <section id="hero" >
        <HeroSlider />
      </section>

      <div className="container">
        <hr />
      </div>

      <section id="hero" >
        <Services />
      </section>

      {/* <section id="hero" >
        <Banner />
      </section> */}


      {/* ======================================================= */}

      <section style={{ backgroundColor: "#eee" }}>
        <div class="container py-5">
          <div class="row">

            <div className="d-flex justify-content-center pb-5">
              <div
                className="btn btn-secondary btn-sm px-4 py-2 price-btn text-dark font-weight-bold text-white"
                style={{ fontSize: '20px', backgroundColor: '#0bc096', borderRadius: '25px', border: 'none' }}
              >
                Recently Added Products
              </div>
              <br />
            </div>

            {products && products.map((e, index) => (

              <div class="col-md-12 col-lg-3 mb-4 mb-lg-0">
                <Link className="text-decoration-none text-black" to={`/product/${e._id}`}>

                  <div class="card mb-4 card-shadow">
                    <div class="d-flex justify-content-between p-3">
                      <h4 class="overly">{e?.title}</h4>
                    </div>

                    <div className="m-4 d-flex justify-content-center">
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


      <div>
        {/* <section style={{ backgroundColor: "#eee" }}>
          <div class="container py-5">
            <div class="row">

              <div className="d-flex justify-content-center pb-5">
                <div
                  className="btn btn-secondary btn-sm px-4 py-2 price-btn text-dark font-weight-bold text-white"
                  style={{ fontSize: '20px', backgroundColor: '#0bc096', borderRadius: '25px', border: 'none' }}
                >
                  Featured Products
                </div>
                <br />
              </div> */}


              {/* <div class="row mb-3">
                <div class="card col ml-3 card-shadow">
                  <div class="d-flex justify-content-between p-3">
                    <p class="lead mb-0">Today's Combo Offer</p>
                    <div
                      class="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                      style={{ width: "90px", height: "35px" }}>
                      <p class="text-white mb-0 small">featured</p>
                    </div>
                  </div>
                  <img src="https://www.mckibbenpowersportslakewales.com/images/seo/2020-Kawasaki-KLX-140L-Dirt-Bike.jpg"
                    class="card-img-top" alt="Laptop" />
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <p class="small"><a href="#!" class="text-muted">Laptops</a></p>
                      <p class="small text-danger"><s>$1199</s></p>
                    </div>

                    <div class="d-flex justify-content-between mb-3">
                      <h5 class="mb-0">HP Envy</h5>
                      <h5 class="text-dark mb-0">$1099</h5>
                    </div>
                  </div>
                </div>
                <div class="card col ml-3 card-shadow">
                  <div class="d-flex justify-content-between p-3">
                    <p class="lead mb-0">Today's Combo Offer</p>
                    <div
                      class="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                      style={{ width: "90px", height: "35px" }}>
                      <p class="text-white mb-0 small">featured</p>
                    </div>
                  </div>
                  <img src="https://st.depositphotos.com/1000647/2295/i/600/depositphotos_22953524-stock-photo-antique-pocket-watch.jpg"
                    class="card-img-top" alt="Laptop" />
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <p class="small"><a href="#!" class="text-muted">Laptops</a></p>
                      <p class="small text-danger"><s>$1199</s></p>
                    </div>

                    <div class="d-flex justify-content-between mb-3">
                      <h5 class="mb-0">HP Envy</h5>
                      <h5 class="text-dark mb-0">$1099</h5>
                    </div>
                  </div>
                </div>
                <div class="card col ml-3 card-shadow">
                  <div class="d-flex justify-content-between p-3">
                    <p class="lead mb-0">Today's Combo Offer</p>
                    <div
                      class="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                      style={{ width: "90px", height: "35px" }}>
                      <p class="text-white mb-0 small">featured</p>
                    </div>
                  </div>
                  <img src="https://cdni.autocarindia.com/Utils/ImageResizer.ashx?n=https://cdni.autocarindia.com/News/_DSC9606.jpg&c=0"
                    class="card-img-top" alt="Laptop" />
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <p class="small"><a href="#!" class="text-muted">Laptops</a></p>
                      <p class="small text-danger"><s>$1199</s></p>
                    </div>

                    <div class="d-flex justify-content-between mb-3">
                      <h5 class="mb-0">HP Envy</h5>
                      <h5 class="text-dark mb-0">$1099</h5>
                    </div>
                  </div>
                </div>
                <div class="card col ml-3 card-shadow">
                  <div class="d-flex justify-content-between p-3">
                    <p class="lead mb-0">Today's Combo Offer</p>
                    <div
                      class="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                      style={{ width: "90px", height: "35px" }}>
                      <p class="text-white mb-0 small">featured</p>
                    </div>
                  </div>
                  <img src="https://www.shutterstock.com/image-photo/vintage-grunge-still-life-items-260nw-217501978.jpg"
                    class="card-img-top" alt="Laptop" />
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <p class="small"><a href="#!" class="text-muted">Laptops</a></p>
                      <p class="small text-danger"><s>$1199</s></p>
                    </div>

                    <div class="d-flex justify-content-between mb-3">
                      <h5 class="mb-0">HP Envy</h5>
                      <h5 class="text-dark mb-0">$1099</h5>
                    </div>
                  </div>
                </div>
              </div>


              <div class="row mb-3">
                <div class="card col ml-3 card-shadow">
                  <div class="d-flex justify-content-between p-3">
                    <p class="lead mb-0">Today's Combo Offer</p>
                    <div
                      class="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                      style={{ width: "90px", height: "35px" }}>
                      <p class="text-white mb-0 small">featured</p>
                    </div>
                  </div>
                  <img src="https://doagahehoc242.cloudfront.net/uploads/posts/314/e67b6818_6148401-900.jpeg"
                    class="card-img-top" alt="Laptop" />
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <p class="small"><a href="#!" class="text-muted">Laptops</a></p>
                      <p class="small text-danger"><s>$1199</s></p>
                    </div>

                    <div class="d-flex justify-content-between mb-3">
                      <h5 class="mb-0">HP Envy</h5>
                      <h5 class="text-dark mb-0">$1099</h5>
                    </div>
                  </div>
                </div>
                <div class="card col ml-3 card-shadow">
                  <div class="d-flex justify-content-between p-3">
                    <p class="lead mb-0">Today's Combo Offer</p>
                    <div
                      class="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                      style={{ width: "90px", height: "35px" }}>
                      <p class="text-white mb-0 small">featured</p>
                    </div>
                  </div>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSX33XgHqUqMKx3aGTPThhaJzS6KmzfRGjW5A&usqp=CAU"
                    class="card-img-top" alt="Laptop" />
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <p class="small"><a href="#!" class="text-muted">Laptops</a></p>
                      <p class="small text-danger"><s>$1199</s></p>
                    </div>

                    <div class="d-flex justify-content-between mb-3">
                      <h5 class="mb-0">HP Envy</h5>
                      <h5 class="text-dark mb-0">$1099</h5>
                    </div>
                  </div>
                </div>
                <div class="card col ml-3 card-shadow">
                  <div class="d-flex justify-content-between p-3">
                    <p class="lead mb-0">Today's Combo Offer</p>
                    <div
                      class="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                      style={{ width: "90px", height: "35px" }}>
                      <p class="text-white mb-0 small">featured</p>
                    </div>
                  </div>
                  <img src="https://i.pinimg.com/736x/c0/a9/5e/c0a95e4d209b8c42e7780890a8218d2a--antique-bicycles-bicycle-art.jpg"
                    class="card-img-top" alt="Laptop" />
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <p class="small"><a href="#!" class="text-muted">Laptops</a></p>
                      <p class="small text-danger"><s>$1199</s></p>
                    </div>

                    <div class="d-flex justify-content-between mb-3">
                      <h5 class="mb-0">HP Envy</h5>
                      <h5 class="text-dark mb-0">$1099</h5>
                    </div>
                  </div>
                </div>
                <div class="card col ml-3 card-shadow">
                  <div class="d-flex justify-content-between p-3">
                    <p class="lead mb-0">Today's Combo Offer</p>
                    <div
                      class="bg-info rounded-circle d-flex align-items-center justify-content-center shadow-1-strong"
                      style={{ width: "90px", height: "35px" }}>
                      <p class="text-white mb-0 small">featured</p>
                    </div>
                  </div>
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3nSea7cE-v3UZ_GI6Uej9Ud2UoDSl7_tfWw&usqp=CAU"
                    class="card-img-top" alt="Laptop" />
                  <div class="card-body">
                    <div class="d-flex justify-content-between">
                      <p class="small"><a href="#!" class="text-muted">Laptops</a></p>
                      <p class="small text-danger"><s>$1199</s></p>
                    </div>

                    <div class="d-flex justify-content-between mb-3">
                      <h5 class="mb-0">HP Envy</h5>
                      <h5 class="text-dark mb-0">$1099</h5>
                    </div>
                  </div>
                </div>
              </div>
 */}



            {/* </div>
          </div>
        </section> */}
      </div>

      {/* ======================================================= */}

    </div>
  );
};
export default Home;