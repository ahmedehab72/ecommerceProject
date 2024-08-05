import  { useEffect, useState } from 'react'
// import Style from './SliderProduct.module.css'
import axios from 'axios';
import Slider from "react-slick";

export default function SliderProduct() {

    const [categories, setCategories] = useState([]);

    function getCategories(){
      axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({data})=>{
        setCategories(data.data);
      })
      .catch((error)=>{
        console.log(error);

      })
    }


    useEffect(() => {
      getCategories()
    }, [])

    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 8,
      slidesToScroll: 3,
      autoplay:true
    };

  return (
    <>
    <div>
      <h2 className='text-gray-800 text-xl py-4'>Shop Popular Categories</h2>
        <Slider {...settings} >
        {categories.map((category)=><div key={category._id}> <img className='w-full h-[210px]' src={category.image} alt={category.name}/>
        <h2 className='py-2'>{category.name}</h2>
        </div>)}
    </Slider>
       
    </div>
       
     </>
  )
}
