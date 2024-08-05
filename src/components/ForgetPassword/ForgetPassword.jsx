import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from "yup";
import axios from 'axios';

export default function ForgetPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  async function handleLogin(formValues) {
    setIsLoading(true);
    try {
      const apiResponse = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, formValues);
   
      if (apiResponse.data.statusMsg) {
        navigate("/restCode");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className='md:w-1/2 w-[90%] mx-auto p-4 mt-8'>
        <h2 className="text-3xl font-bold text-green-600 text-start mt-5 mb-8">
          Forget Password Form
        </h2>
        <div className="relative z-0 w-full my-5 group">
          <input
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-slate-600 dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
            placeholder=" "
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 left-0 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your email
          </label>
        </div>
        {formik.errors.email && formik.touched.email ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{formik.errors.email}</span>
          </div>
        ) : null}
        <div className="flex items-center">
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
          </button>
        </div>
      </form>
    </>
  );
}
