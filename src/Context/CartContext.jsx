import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function CartContextProvider(props) {


  const [CartID, setCartID] = useState(null);
  const [cartCount, setCartCount] = useState(0);


  let headers = {
    token: localStorage.getItem("userToken"),
  };

  function getCartItem() {
    return axios
      .get("https://ecommerce.routemisr.com/api/v1/cart", {
        headers,
      })
      .then((response) => response)
      .catch((error) => error);
  }

  function addToCart(productId) {
    return axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/cart",
        { productId },
        { headers }
      )

      .then((response) =>{
        setCartCount((prevCount) => prevCount + 1);
        return response
      } )
      .catch((error) => error);
  }

  function removeCartItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((response) =>{
        setCartCount((prevCount) => prevCount - 1);
        return response
      }
         )
      .catch((error) => error);
  }
  function updateCartItem(productId, count) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count,
        },
        {
          headers,
        }
      )
      .then((response) => response)
      .catch((error) => error);
  }
  function DeleteCartItem() {
    return axios
      .delete("https://ecommerce.routemisr.com/api/v1/cart", { headers })
      .then((response) => response)
      .catch((error) => error);
  }

  function onlinePayment(values) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${CartID}?url=http://localhost:5173`,
        {
          shippingAddress: values,
        },
        {
          headers,
        }
      )
      .then((res) => res)
      .catch((err) => err);
  }


  async function getCartId() {
    const { data } = await getCartItem();
    setCartID(data?.data?._id);
    // console.log(data?.data);
  }

  useEffect(() => {
    getCartId();
  }, []);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        getCartItem,
        removeCartItem,
        updateCartItem,
        DeleteCartItem,
        onlinePayment,
        setCartCount,
        cartCount
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
