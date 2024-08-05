import React, { useEffect, useState } from "react";
import Style from "./Brands.module.css";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Brands() {
  const [brandsDetails, setBrandsDetails] = useState([]);

  async function getBrands() {
    let response = await axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then(({ data }) => setBrandsDetails(data?.data))
      .catch((error) => error);
    console.log(response?.data.data);
  }

  useEffect(() => {
    getBrands();
  }, []);
  return (
    <>
      <h2 className="text-green-700 text-center pt-6 text-4xl font-serif">
        CHOOSE BRAND
      </h2>

      <div className="w-full flex flex-wrap  py-10 ">
        {brandsDetails?.map((product) => (
          <div
            key={product._id}
            className="lg:w-1/6 md:w-1/4 w-1/2 p-2 cursor-pointer mb-2"
          >
            <Link to={`/branddetails/${product.id}`}>
              <img
                className="w-full rounded-lg shadow-xl hover:scale-105 hover:transition-all"
                src={product?.image}
                alt={product?.name}
              />
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
