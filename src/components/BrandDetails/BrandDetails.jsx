import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

export default function BrandDetails() {

    const [brandDetails, setBrandDetails] = useState(null)
    let {id} =useParams()
      async function getBrandDetails(id) {
  return  await axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      .then((response) =>setBrandDetails(response))
      .catch((error) => error);
    // console.log(response);
  }

  useEffect(() => {
    getBrandDetails(id)
  
   
  }, [])
  console.log(brandDetails);
  
  return (
    <div className='py-12 my-8 mx-auto'  >
        {/* {brandDetails?.map((brand)=> <div key={brand?._id} className=' w-full' >
        <img className='w-full' src={brand?.image} alt="" />
        <h2>{brand?.name}</h2>
        </div>)} */}

<h2 className="text-green-700 text-center pt-6 text-4xl font-serif">
        NO ITEM IN THIS BRAND ...
      </h2>
       
 
   
    </div>
  )
}


