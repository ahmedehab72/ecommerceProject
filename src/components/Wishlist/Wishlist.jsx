import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaStar, FaTrashAlt } from 'react-icons/fa';
import { BeatLoader } from 'react-spinners';
import toast from 'react-hot-toast';
import { WishProductContext } from '../../Context/WishContext';

export default function Wishlist() {
  const { wishList, removeFromWishList, setWishList, displayWishLogged } = useContext(WishProductContext);
  const [isLoading, setIsLoading] = useState(true);

  const isLoggedIn = localStorage.getItem('userToken') !== null;

  useEffect(() => {
    if (isLoggedIn) {
      displayWishLogged()
        .then(() => setIsLoading(false))
        .catch((error) => {
          console.error('Error fetching wishlist:', error);
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn, displayWishLogged]);

  if (isLoading) {
    return (
      <div className='py-8 flex justify-center w-full'>
        <BeatLoader color="rgb(34 197 94)" />
      </div>
    );
  }

  if (wishList.length === 0) {
    return (
      <div className='py-8 flex justify-center w-full'>
        No items in wishlist.
      </div>
    );
  }

  async function handleRemoveFromWishList(productId) {
    let response = await removeFromWishList(productId);
    if (response?.data?.status === 'success') {
      toast.success('Product removed from wishlist!', {
        duration: 1500,
        position: 'bottom-right',
        style: {
          background: 'rgb(220, 38, 38)', // Red background for remove success
          color: 'white',
        },
      });
    } else {
      toast.error('Error removing product from wishlist', {
        duration: 1500,
        position: 'bottom-right',
        style: {
          background: 'rgb(220, 38, 38)', // Red background for error
          color: 'white',
        },
      });
    }
  }

  return (
    <div className="flex flex-wrap flex-row px-5 py-8 bg-gray-50">
      {wishList.map((product) => (
        <div key={product?.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6 px-3 py-4">
          <div className="product text-start bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 relative">
            <Link to={`/productDetils/${product?.id}/${product?.category?.name}`} className="block">
              <img className="w-full h-48 object-cover rounded-t-lg" src={product?.imageCover} alt={product?.title} />
              <div className="p-4">
                <span className="block font-light text-slate-400 mt-4">{product?.category?.name}</span>
                <h3 className="font-bold text-slate-600">{product?.title.split(' ').slice(0, 3).join(' ')}</h3>
                <div className="flex justify-between items-center py-4">
                  <span className="font-bold text-slate-600">{product?.price} EGP</span>
                  <span className="font-bold text-yellow-400 flex items-center">
                    <FaStar />
                    <span className="ml-1">4.5</span> {/* Example rating */}
                  </span>
                </div>
              </div>
            </Link>
            <button
              onClick={() => handleRemoveFromWishList(product?.id)}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-300"
              title="Remove from Wishlist"
            >
              <FaTrashAlt />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
