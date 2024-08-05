// import React, { useEffect, useState } from 'react'
// import Style from './MainSlider.module.css'
import Slider from "react-slick";
import mainImage1 from '../../assets/images/slider-image-3.jpeg'
import mainImage2 from '../../assets/images/grocery-banner-2.jpeg'
import mainImage3 from '../../assets/images/blog-img-2.jpeg'
import staticImge1 from '../../assets/images/slider-image-2.jpeg'
import staticImge2 from '../../assets/images/slider-image-1.jpeg'



export default function MainSlider() {

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    arrows:false  
  };

  return (
    <>
    <div className='row'>
      <div className="md:w-3/4 w-full">
      <Slider {...settings}>
       <img src={mainImage1} className='h-[400px] w-full' />
       <img src={mainImage2} className='h-[400px] w-full' />
       <img src={mainImage3} className='h-[400px] w-full' />
    </Slider>
        
      </div>
      <div className="md:w-1/4 w-1/2 flex md:block ">
        <img src={staticImge1} className='h-[200px] w-full' />
        <img src={staticImge2} className='h-[200px] w-full' />
      </div>

    </div>
     </>
  )
}
