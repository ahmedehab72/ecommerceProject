import React, { useEffect, useState } from 'react'
import Style from './Layout.module.css'
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import {Outlet} from 'react-router-dom'
export default function Layout() {

    const [counter, setCounter] = useState(0);


    useEffect(() => {
    
     return () => { } }, [])

  return (
    <>
    <Navbar/>

    <div className="md:w-[95%] w-full py-16 mx-auto">
      <Outlet></Outlet>

    </div>

    <Footer/>
    </>
  )
}
