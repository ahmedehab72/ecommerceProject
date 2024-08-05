import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Loader from "../Loader/Loader";



export default function CategoriesDetails() {
  
let[CategoryDetails , setCategoryDetails]=useState(null)
let[RelatedProduct , setRelatedProduct]=useState([])

  let {id , category }=useParams();


// getting one category data
 function getCategoryDetails(id){
  axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
  .then((data)=>{
    setCategoryDetails(data.data.data)})
  .catch((error)=>{console.log(error)})
}

// getting realted proucts
function getRealtedProducts(category){
  axios.get('https://ecommerce.routemisr.com/api/v1/products')
  .then((data)=>{
    let allProducts= data.data.data
   let related=allProducts.filter((product)=>product.category.name == category)
  setRelatedProduct(related) 
  console.log(related)
  })
  .catch((error)=>{console.log(error)})

}



useEffect(()=>{
  getCategoryDetails(id)
  getRealtedProducts(category)

},[])

  return <>
  <h2 className='text-green-700 text-center py-6 text-4xl font-serif'>CHOOSE YOUR CATEGORIES</h2>
  {CategoryDetails==null?<div className='w-full flex justify-center mt-10'>
    <Loader
    color="#e01616"
    size={50}
    speedMultiplier={1}
  /></div>:<div className="w-full h-full p-3 flex shadow-xl ">
  {/* img part */}
  <div className=" w-1/4">
    <img className='w-full' src={CategoryDetails?.image} alt={CategoryDetails?.name} />
  </div>
  {/* Data part and the realted product */}
  <div className="  w-3/4  ">
    {/* Title of Chosen category */}
    <h1 className='font-bold text-2xl text-slate-700 text-center'><span className='text-2xl text-emerald-800 text-center'>{CategoryDetails?.name}</span></h1>

    {/* showing the related products */}
    <div className="row">
{/* looping on products */}
  {RelatedProduct?.map((product)=><div key={product.id} className="w-full md:w-1/3  mt-4 px-4  p-3 ">
   
   
    {/* putting every product in link to be able to acsess it */}
    <Link to={`/productdetails/${product.id}/${product.category.name}`}> 


  {/* product image cover */}
  <div className="  rounded-lg  shadow-xl hover:scale-105 hover:duration-500">
      <img className="rounded-t-lg w-full  " src={product.imageCover} alt={product.title} />
  <div className="p-4"> 
  
  {/* Product informations */}
    <span className="mb-2 font-semibold text-emerald-700 dark:text-white">{product.title.split(' ').slice(0,2).join(' ')}</span>
    <p className="mb-3  text-gray-700 dark:text-gray-400">{product.category.name}</p>  
    <div className="flex justify-between items-center">
      <span className='text-emerald-700'>{product.price} <span className='text-gray-900 font-semibold'> EGP</span></span>
      <span>{product.ratingsAverage} <i className='fas fa-star text-yellow-500'></i></span>
    </div>
  </div>
  
</div>
</Link>
  </div>)}

  


 </div>
  </div>
</div>}
  
  

  </>
}
