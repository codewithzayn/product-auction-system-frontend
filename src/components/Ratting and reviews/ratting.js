import React from "react";
import { useState,useEffect } from "react";
import "./rating.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams,useNavigate } from "react-router-dom";

const Rating = () => {
  let {id} = useParams()
  const navigate = useNavigate()
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [review, setReviews] = useState("");
  const Reviews=(e)=>{
    setReviews(e.target.value)
  }
  const submit=()=>{
    console.log('id',id)
const token = localStorage.getItem('jwtToken')
console.log('token',token)

    console.log('reviews',review)
    console.log('rating',rating)
const obj={
  review,
  rating,
  id
}
    axios.put('http://localhost:1337/reviews/give-rating', obj,{
      headers: { Authorization: `Bearer ${token}` },
    })
			.then(response => {
				console.log("response", response)
				console.log("data", response.data);
        setReviews("")
        navigate(`/sell-profile/${response.data?.productId}`)
			})
			.catch(error => {
				console.error('There was an error!', error);
			});
  }
  return (
    <div className="d-flex justify-content-center"  >

      <section class="my-md-5 bg-dark">
        <div class="rgba-black-strong rounded p-5">
          <h3 class="text-center font-weight-bold text-white mt-3">
            Rate Your Experience
          </h3>

   <div className="d-flex justify-content-center">
      {[...Array(5)].map((star, index) => {
        // Increment the index to start from 1
        index += 1;
        return (
          <button
            key={index}
            type="button"
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star" style={{ fontSize: "40px" }}>
              &#9733;
            </span>
          </button>
        );
      })}
    </div>
          <h3 class="text-center font-weight-bold text-white mt-3">
            Share Your Reviews
          </h3>
          <form class="mx-md-5" action="" >
            <div class="row">
              <div class="col-md-12 mb-4">
                <div class="card">
                  <div class="card-body px-4">
                    <div class="md-form md-outline">
                      <label for="message">Your Message</label>
                      <textarea
                        id="message"
                        class="md-textarea form-control"
                        rows="3"
                        onChange={(e) => Reviews(e)}
                        ></textarea>
                    </div>
                    <br />
                    <br />
                    <Link className="logOutLink">

                      <button
                        type="submit"
                        class="btn btn-primary btn-md btn-block ml-0 mb-0"
                        onClick={submit}
                      >
                        Submit review
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <hr className="bg-white" />
        </div>
      </section>

      {/* </section> */}
    </div>
  );
};

export default Rating;
