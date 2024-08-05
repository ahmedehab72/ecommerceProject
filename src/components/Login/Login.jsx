import { useContext, useState } from "react";
// import Style from './Register.module.css'
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
  
  let navigate = useNavigate();
  let { setUserLogin } = useContext(UserContext);

  const [apiError, setapiError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  function handleLogin(formValues) {
    setIsLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formValues)
      .then((response) => {
        if (response?.data?.message === "success") {
          localStorage.setItem("userToken", response?.data?.token);
          setIsLoading(false);
          setUserLogin(response?.data?.token);
          navigate("/");
        }
      })
      .catch((apiResponse) => {
        setIsLoading(false);
        setapiError(apiResponse?.response?.data?.message);
      });
  }

  let validationSchema = Yup.object().shape({
    email: Yup.string().email("email  inValid").required("email is required"),
    password: Yup.string()
      .matches(/^[A-z0-9]+/, "password inValid")
      .required("password is required"),
  });

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <>
      <div className="py-6 container px-6 mx-auto">
        <h1 className="my-6 text-center text-4xl font-bold text-green-700">
          Login Now
        </h1>
        <form onSubmit={formik.handleSubmit} className="max-w-lg mx-auto">
          {apiError ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {apiError}
            </div>
          ) : null}

          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.email}
              type="email"
              name="email"
              id="email"
              className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="email"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Email
            </label>
          </div>
          {formik.errors.email && formik.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.email}
            </div>
          ) : null}
          <div className="relative z-0 w-full mb-5 group">
            <input
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.password}
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your Password
            </label>
          </div>
          {formik.errors.password && formik.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {formik.errors.password}
            </div>
          ) : null}

          <div className="flex items-center flex-wrap">
            <button
              type="submit"
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Submit"
              )}
            </button>
            <p className="pl-5 mt-2">
              create  account{" "}
              <span className="font-bold text-green-900">
                <Link to={"/register"}>sign up</Link>
              </span>
            </p>
              <Link to={"/forgetpassword"}>
            <p className="ms-24 pt-2 text-slate-800 hover:text-green-600">Forgot password?</p>
          </Link>
          </div>
        </form>
      </div>
    </>
  );
}











/**


import React, { useContext, useEffect, useState } from "react";
import Style from "./Login.module.css";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as Yup from "yup";
import { UserContext } from "../../Context/UserContext";

export default function Login() {
let {setUserLogin}=useContext(UserContext)

  

  let navigate = useNavigate();
  const [apiError, setapiEror] = useState("");
  const [isLoading, setisLoding] = useState(false);

  //    SCHEMAA  Validation
  let validationSchema = Yup.object().shape({
    email: Yup.string().email("email invaild").required("enail is required"),
    password: Yup.string()
      .matches(
        /^[A-Z][a-z0-9]{5-10}$/,
        "password must start with uppercase ..."
      )
      .required("passowrd is required"),
  });
  //      HANDELLOGIN
  async function handeLogin(formValues) {
    setisLoding(true);
    await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, formValues)
      .then((apiResponse) => {
        if (apiResponse?.data.message === "success") {

          localStorage.setItem("userToken", apiResponse.data.token)
          setUserLogin(apiResponse.data.token)
          navigate("/");
          setisLoding(false);
        }
      })
      .catch((apiResponse) => {
        setisLoding(false);

        setapiEror(apiResponse?.response?.data?.message);

        console.log(apiResponse?.response?.data?.message);
      });

    // if (data === "succes") {
    //   navigate("/");
    // } else {
    //   //  eroooor
    // }

    console.log(formValues);
  }

  //    Formick
  let formick = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handeLogin,
  });

  return (
    <>
      <div className="max-w-xl mx-auto py-5">
        {apiError ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
            role="alert"
          >
            <span className="font-medium">{apiError}</span>
          </div>
        ) : null}
        <form onSubmit={formick.handleSubmit}>
          <h2 className="text-3xl font-bold text-green-600 text-start mb-5">
            Login Now
          </h2>
          <div className="relative z-0 w-full mb-5 group ">
            <input
              onBlur={formick.handleBlur}
              onChange={formick.handleChange}
              value={formick.values.email}
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
          {formick.errors.email && formick.touched.email ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formick.errors.email}</span>
            </div>
          ) : null}

          <div className="relative z-0 w-full mb-5 group ">
            <input
              onBlur={formick.handleBlur}
              onChange={formick.handleChange}
              value={formick.values.password}
              type="password"
              name="password"
              id="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-slate-600 dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
              placeholder=" "
            />
            <label
              htmlFor="password"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 left-0 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Enter Your password
            </label>
          </div>
          {formick.errors.password && formick.touched.password ? (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">{formick.errors.password}</span>
            </div>
          ) : null}

          <div className="flex items-center">
            <button
              type="submit"
              className="text-white   bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Login"}
            </button>
            <p className="p-4">
              Didn't have account yet ?{" "}
              <span className="text-green-500">
                {" "}
                <Link className="text-lime-600" to={"/register"}>
                  Register Now
                </Link>{" "}
              </span>
            </p>
          </div>
        </form>
      </div>
    </>
  );
} */