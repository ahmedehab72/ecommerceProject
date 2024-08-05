import React, { useContext, useEffect, useState } from "react";
import Style from "./Carts.module.css";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import useProducts from "../../Hooks/useProducts";
import Loader from "../Loader/Loader";
import { CounterContext } from "../../Context/CounterContext";


export default function Carts() {
  let {isLoading} = useProducts()
  let {returnCounter}=useContext(CounterContext)
  let { getCartItem, removeCartItem, updateCartItem, DeleteCartItem } =
    useContext(CartContext);
  const [cartDetails, setCartDetails] = useState(null);

  async function getCart() {
    let response = await getCartItem();
    setCartDetails(response?.data);
    // console.log(response.data);
  }
  async function removeCart(productId) {
    let response = await removeCartItem(productId);
    setCartDetails(response?.data);
    if (response?.data.status === "success") {
      toast.success("Item Removed");
    } else {
      toast.error("Something wrong happend");
    }
    returnCounter()
  }
  async function updateQuantity(productId, count) {
    if (count < 1) {
      removeCart(productId);
    }
    let response = await updateCartItem(productId, count);
    setCartDetails(response.data);
  }

  async function clearCart() {
    let response = await DeleteCartItem();
    setCartDetails(response.data);
  }

  useEffect(() => {
      getCart();
      // returnCounter()
  
   
  }, []);

  return (
    <>
      <h2 className="text-green-700 text-center py-6 text-4xl font-serif">
        YOUR CART
      </h2>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {/* <h2 className="py-4 text-center text-3xl text-green-700 font-bold ">Your Cart</h2> */}
        <table className="w-full md:w-[80%]  mx-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading?<Loader  />:cartDetails?.data?.products?.map((product) => (
              <tr
                key={product?._id}
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="p-4">
                  <img
                    src={product?.product?.imageCover}
                    className="w-16 md:w-32 max-w-full max-h-full"
                    alt="Apple Watch"
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product?.product?.title.split(' ').slice(0,2).join(' ')}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button
                      onClick={() =>
                        updateQuantity(product?.product?.id, product?.count-1)
                      }
                      className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <div>
                      <span>{product?.count}</span>
                    </div>
                    <button
                      onClick={() =>
                        updateQuantity(product?.product?.id, product?.count+1)
                      }
                      className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {product?.price} EGP
                </td>
                <td className="px-6 py-4">
                  <span
                    onClick={() => removeCart(product?.product?.id)}
                  
                    className="font-medium text-red-600 dark:text-red-500 hover:underline cursor-pointer"
                  >
                    Remove
                  </span>
                </td>
              </tr>
            ))}
            <tr className="">
              <td colSpan={2} className="py-7  mx-12 text-lg">
                Number Of Cart Items :{" "}
                <span className="text-emerald-700 font-bold">
                  {" "}
                  {cartDetails?.numOfCartItems}
                </span>{" "}
              </td>

              <td colSpan={2} className="py-7  mx-12 text-lg ">
                Total Price :{" "}
                <span className="text-emerald-700 font-bold">
                  {" "}
                  {cartDetails?.data?.totalCartPrice} EGP
                </span>{" "}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="w-full flex flex-wrap justify-around items-center ">
        <Link
          className="w-1/3 py-2 px-4 rounded-lg mt-5 bg-green-600 text-  text-center cursor-pointer hover:bg-green-500"
          to={"/address"}
        >
          <div>Online Payment</div>
        </Link>
        <div
          onClick={() => clearCart()}
          className="w-1/3 py-2 px-4 rounded-lg mt-5 bg-red-600 text-white text-center cursor-pointer hover:bg-red-500"
        >
          Clear Cart
        </div>
      </div>
    </>
  );
}
