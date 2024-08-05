import React, { useEffect, useState } from 'react'
import Style from './Footer.module.css'
import img1 from '../../assets/images/amazon-pay.png'
import img2 from '../../assets/images/American-Express-Color.png'
import img3 from '../../assets/images/mastercard.webp'
import img4 from '../../assets/images/paypal.png'
import img5 from '../../assets/images/get-apple-store.png'
import img6 from '../../assets/images/get-google-play.png'

export default function Footer() {

  return (
   <>
  <footer className='bg-gray-100 p-6 relative bottom-0 right-0 left-0'>
    <h2 className='font-semibold text-xl'>Get The Fresh Cart App</h2>
    <p className=' mb-6 text-slate-600 text-sm'>we will send you a link , open it on your phone to download the app</p>
    <div className='flex flex-wrap justify-between'>
      <input type="email" className='md:w-5/6 w-full rounded-lg border border-gray-400 py-1 px-4  ' placeholder='Email...'/>
      <button  className='bg-green-600 text-white rounded-lg py-1 px-4 md:mt-0 mt-4 text-sm'>Share App Link</button>
    </div>

    <div className='flex flex-wrap justify-between border border-t-gray-300 border-b-gray-300 my-5'>
      <div className='flex flex-wrap justify-center items-center  py-6'>

    <h3 className='text-sm  '>Payment Partners</h3>
    <img className="mx-2"  width={40} src={img1} alt="amazon payment" />
    <img className="mx-2"  width={40} src={img2} alt="American-Express-Color" />
    <img className="mx-2"  width={40} src={img3} alt="mastercard" />
    <img className="mx-2"  width={40} src={img4} alt="paypa  l" />

      </div>
      <div className='flex flex-wrap  items-center  py-6'>

    <h3 className='text-sm  '>Get Delievers With Fresh Cart </h3>
    
    <img className="mx-2"  width={100} src={img5} alt="amazon payment" />
    <img className="mx-2"  width={100} src={img6} alt="American-Express-Color" />
  

      </div>
    </div>
  </footer>
   </>
  );
}
