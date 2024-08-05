import React, { useEffect, useState } from 'react';
import Loader from "../Loader/Loader";
import { Link } from 'react-router-dom';
import useGeneralcategories from '../useGeneralcategories/useGeneralcategories';


export default function Categories() {


  let {data , isLoading , error , isError} = useGeneralcategories()


  
  if(isLoading)
    {
      return <>
      <div className='w-full flex justify-center mt-10'>
      <Loader
      color="#e01616"
      size={50}
      speedMultiplier={1}
    /></div></>
    }



 // incase of sucess
 return <>
  <h2 className='text-green-700 text-center pt-6 text-4xl font-serif'>YOUR CATEGORIES</h2>

 <div className="row">
  
{/* looping on categoriess */}
  {data?.data?.data.map((categories)=><div key={categories._id} className=" sm:w-1/2 md:w-1/3 lg:w-1/5 xl:w-1/6 mt-4 px-4 categories  ">
   
   
    {/* putting every categories in link to be able to acsess it */}
    <Link to={`/Categoriesdetails/${categories._id}/${categories.name}`}> 


  {/* categories image cover */}
  <div className="max-w-sm bg-white  rounded-lg shadow-xl my-2  hover:scale-105 hover:duration-500 h-[250px]  " >
      <img className="rounded-t-lg w-full h-[200px]  " src={categories.image} alt={categories.title} />


  {/* categories informations */}

  <div className="d-flex content-center items-center h-[50px]  rounded"> 
    <p className="mb-2   font-semibold tracking-tight text-emerald-700 w-full text-center">{categories.name}</p> 
   </div>
 
  
</div>
</Link>
  </div>)}

  


 </div>
</>
  

}
