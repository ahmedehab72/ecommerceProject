import { useContext, useEffect, useState } from "react";
// import React, { useContext, useEffect, useState } from 'react';
// import Style from './Navbar.module.css';
import logo from "../../assets/images/logo.svg";
import { NavLink, Link, useNavigate } from "react-router-dom";
// import { CounterContext } from '../../Context/CounterContext';
import { UserContext } from "../../Context/UserContext";
import { CounterContext } from "../../Context/CounterContext";
import { CartContext } from "../../Context/CartContext";
import axios from "axios";

export default function Navbar() {
  let { userLogin, setUserLogin } = useContext(UserContext);
  let { counter } = useContext(CounterContext);
  let navigate = useNavigate();
  let { cartCount } = useContext(CartContext);
const [cartDetails, setCartDetails] = useState(null);

let headers = {
  token: localStorage.getItem("userToken"),
};

function getCartItem() {
  return axios
    .get("https://ecommerce.routemisr.com/api/v1/cart", {
      headers,
    })
    .then((response) =>{
      setCartDetails(response.data)      
    }
    )
    .catch((error) => error);
}
useEffect(()=>{

getCartItem()
},[])
console.log(cartDetails);

  function logOut() {
    navigate("/login");
    localStorage.removeItem("userToken");
    setUserLogin(null);
  }
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className=" navbar py-4 ">
      <img className="lg:hidden block" src={logo} width={120} alt="fresh cart logo " />

        <div className="burger px-4" onClick={toggleMenu}>
          <div className={isOpen ? "line open" : "line"}></div>
          <div className={isOpen ? "line open" : "line"}></div>
          <div className={isOpen ? "line open" : "line"}></div>
        </div>
        <div
          className={
            isOpen
              ? "menu open container items-center flex lg:flex-row flex-col justify-between mx-auto py-4"
              : "menu container items-center flex lg:flex-row flex-col justify-between mx-auto py-4"
          }
        >
          <div className="flex flex-col lg:flex-row text-center items-center ">
            <img src={logo} width={120} alt="fresh cart logo " />
            <ul className="flex flex-col lg:flex-row justify-around pl-10">
              {userLogin !== null ? (
                <>
                  {" "}
                  <li className="text-md mx-4 text-slate-900 font-normal py-3  ">
                    <NavLink to={"/"}> Home </NavLink>
                  </li>
                  <li className="text-md mx-4 text-slate-900 font-normal py-3 ">
                    <NavLink to={"/carts"}> Cart </NavLink>
                  </li>
                  <li className="text-md mx-4 text-slate-900 font-normal py-3 ">
                    <NavLink to={"/about"}> About </NavLink>
                  </li>
                  <li className="text-md mx-4 text-slate-900 font-normal py-3 ">
                    <NavLink to={"/categories"}> Categories </NavLink>
                  </li>
                  <li className="text-md mx-4 text-slate-900 font-normal py-3 ">
                    <NavLink to={"/brands"}> Brands </NavLink>
                  </li>
                  <li className="text-md mx-4 text-slate-900 font-normal py-3 ">
                    <NavLink to={"/products"}> Products </NavLink>
                  </li>
                 
                 
                </>
              ) : null}
            </ul>
          </div>

          <ul className="flex flex-col lg:flex-row justify-around items-center m-0 ">
            
            {userLogin === null ? (
              <>
                <li className="text-md mx-4 text-slate-900 font-normal py-3 ">
                  <NavLink to={"/login"}> Login </NavLink>
                </li>
                <li className="text-md mx-4 text-slate-900 font-normal py-3 ">
                  <NavLink to={"/register"}> Register </NavLink>
                </li>
              </>
            ) : (<>
             <li className="text-md mx-4 text-slate-900 font-normal py-3 ">
                    <NavLink to={"/wishlist"}>                
                     <i className="fa-solid fa-heart hover:scale-125  hover:rotate-12 text-3xl text-red-500 transition-transform transform group-hover:scale-125 group-hover:rotate-12 group-hover:text-red-700" ></i>
                    </NavLink>
                  </li>
            
              <li className="text-md mx-4 text-slate-900 font-normal py-3 ">
              <Link to={"/carts"}>
                <i className="fa-solid fa-cart-shopping text-green-600 text-2xl relative hover:rotate-12 hover:scale-110">
                  {/* <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1 py-0.5 shadow-md">
                  {counter}
                  </span> */}
                 
                  {counter > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1 py-0.5 shadow-md">
                     {counter}
                    </span>
                  )}
                   {cartDetails?.numOfCartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1 py-0.5 shadow-md">
                     {cartDetails?.numOfCartItems}
                    </span>
                  )}
                </i>
              </Link>
            </li>
            <li
                className="text-md mx-4 text-slate-900 font-normal py-3 "
                onClick={logOut}
              >
                <Link> Logout </Link>
              </li>
            
              
              
              </>
            )}

            <li className="text-md mx-4 text-slate-900 font-normal  items-center flex justify-between py-4 ">
              <i className="fab fa-facebook mx-2 fa-sm hover:scale-150"></i>
              <i className="fab fa-twitter mx-2 fa-sm hover:scale-150"></i>
              <i className="fab fa-instagram mx-2 fa-sm hover:scale-150"></i>
              <i className="fab fa-tiktok mx-2 fa-sm hover:scale-150"></i>
              <i className="fab fa-youtube mx-2 fa-sm hover:scale-150"></i>
            </li>
           
          </ul>
        </div>
      </nav>
    </>
  );
}
