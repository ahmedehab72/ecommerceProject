// import React, { useEffect, useState } from 'react'
// // import Style from './Home.module.css'
// import { useContext } from 'react';
// import { CounterContext } from '../../Context/CounterContext';
import RecentProducts from '../RecentProducts/RecentProducts';
import SliderProduct from '../SliderProduct/SliderProduct';
import MainSlider from '../MainSlider/MainSlider';
export default function Home() {


 

  return (
    <>
    <MainSlider/>
    <SliderProduct/>
    <RecentProducts/>
    </>
  )
}
