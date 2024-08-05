import{ useContext, useEffect, useState } from 'react'
// import Style from './ProductDetails.module.css'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";
import toast from 'react-hot-toast';
import { CartContext } from '../../Context/CartContext';
import { CounterContext } from '../../Context/CounterContext';


export default function ProductDetails() {

 let {changeCounter}= useContext(CounterContext)
    const [productDetails, setProductDetails] = useState(null);
    const [relatedProdut, setRelatedProdut] = useState([]);
    let {id ,category} =useParams();

      function getProductDetails(id){
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        .then(({data})=>{
          setProductDetails(data?.data)
        })
        
      }
      function RelatedProduts(category){
        axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
        .then(({data})=>{
          let allProducts= data.data
          let related = allProducts.filter((product)=>product?.category?.name== category )
          setRelatedProdut(related.slice(0,6))
        })
        
      }

      useEffect(() => {
        getProductDetails(id);
        RelatedProduts(category)
         }, [id ,category])

         
          var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows:false
          };


          let { addToCart } = useContext(CartContext);

  async function addToCartBridge(productId) {
    let response = await addToCart(productId);

    if (response?.data?.status === "success") {
      changeCounter()
      toast.success("Successful adding to product");
    } else {
      toast.error("error to add product");
    }

    // console.log(response);
  }
  return ( <>
   
    <div className="row ">
      <div className="md:w-1/4 w-full">
      <Slider {...settings}>
        {productDetails?.images.map((src)=> <img key={src} className='w-full' src={src} alt={src?.title}/>)}
    </Slider>
       
  
      </div>
      <div className="md:w-3/4 w-full p-4">
        <h2 className='font-bold text-xl '>{productDetails?.title}</h2>
        <p className='text-gray-600 my-5'>{productDetails?.description}</p>
        <span className='text-green-500 '>{productDetails?.category.name}</span>
          <div className='flex flex-wrap py-2 justify-between '>
            <span className='block '>{productDetails?.price} </span>
            <span className='block'>{productDetails?.ratingsAverage} <i className='text-yellow-400 fas fa-star'></i></span>
            
            <button onClick={()=>addToCartBridge(productDetails.id)}  className='btn w-full bg-green-600 text-white my-4 p-2 rounded-lg'>Add To Cart</button>
            </div>
      </div>

    </div>
    <div className="row">
    {relatedProdut.map((product)=><div className="lg:w-1/6  md:w-1/4 w-1/2 p-2 " key={product?.id}>
        <div className="product px-4">
          <Link to={`/productdetails/${product.id}/${product?.category?.name}`}> 
          <img className='w-full' src={product.imageCover} alt={product.title} />
          <span className='text-green-500 '>{product.category.name}</span>
          <h3 className='text-gray-800 mt-2'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
          <div className='row justify-between'>
            <span className='block '>{product.price} EGP</span>
            <span className='block'>{product.ratingsAverage} <i className='text-yellow-400 fas fa-star'></i></span>
            
          </div>
          </Link>
          <button onClick={()=>addToCartBridge(product.id)}  className='btn w-full bg-green-600 text-white mb-2 p-2 rounded-lg'>Add To Cart</button>

        </div>
    </div> )}
    </div>
  
    </>
 )
}
