// import React from 'react';
// import { Link } from 'react-router-dom';
// import productsData from '../data/productsData';
import "./HeroSlider.css"
// // import React from "react";
// import Slider from "react-slick";
import myImg from "../../images/home-hero.png"
import myImg1 from "../../images/image2.jpeg"
import myImg2 from "../../images/image3.jpg"


import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Banner from "../Banner/banner";




const HeroSlider = () => {

  // const heroProducts = productsData.filter(item => item.tag === 'hero-product');
  // var settings = {
  //   dots: true,
  //   infinite: true,
  //   speed: 300,
  //   slidesToShow: 1,
  //   slidesToScroll: 1
  // };


  return (

    <div className="carousel-wrapper backgroundColor" >
      <Carousel autoPlay showThumbs={false} >
        <div>
          <img alt="" src={myImg} />
          {/* <div className="carousel-text">
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <h1 style={{
                fontSize: '4rem',
                fontWeight: 'bold',
                color: '#fff',
                textShadow: '2px 2px #000'
              }}>Your Title</h1>
              <p style={{
                fontSize: '1.5rem',
                color: '#fff',
                textShadow: '1px 1px #000'
              }}>Your Subtitle</p>
            </div>
          </div> */}
        </div>
        {/* <div>
          <img alt="" src={myImg1}/>
        </div>
        <div>
          <img alt="" src={myImg2}/>
        </div> */}

      </Carousel>
    </div>
  );
};

export default HeroSlider;


