import { createContext, useState } from "react";
import axios from "axios";

export let WishProductContext = createContext(0);

export default function WishProductContextProvider(props) {
    const [wishList, setWishList] = useState([]);
    let headers = { token: localStorage.getItem('userToken') };

    function addToWish(productId) {
        return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', { productId }, { headers })
          .then((response) => {
            if (response.data.status === 'success') {
              setWishList([...wishList, productId]); // Update local wishlist state
            }
            return response;
          })
          .catch((error) => error);
    }

    async function displayWishLogged() {
        try {
            const response = await axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', {
              headers
            });
            if (response.data.status === 'success') {
              setWishList(response.data.data); // Update local wishlist state
            }
            return response;
          } catch (error) {
            console.error('Error fetching wishlist:', error);
            throw error;
          }
    }

    function isProductInWish(productId) {
        return wishList.includes(productId);
    }

    function removeFromWishList(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers })
          .then((response) => {
            if (response.data.status === 'success') {
              setWishList(wishList.filter(item => item.id !== productId)); // Remove item from local wishlist state
            }
            return response;
          })
          .catch((error) => error);
    }

  return (
    <WishProductContext.Provider
      value={{ addToWish, isProductInWish, removeFromWishList, wishList, setWishList, displayWishLogged }}
    >
      {props.children}
    </WishProductContext.Provider>
  );
}
