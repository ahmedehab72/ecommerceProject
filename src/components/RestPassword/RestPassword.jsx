import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from "yup";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RestPassword() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    resetCode: Yup.string()
      .matches(/^\d{6}$/, "Reset code must be exactly 6 digits")
      .required("Reset code is required"),
  });

  async function handleVerifyResetCode(formValues) {
    setIsLoading(true);
    try {
      const apiResponse = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, formValues);
      if (apiResponse.data.statusMsg === "success") {
        navigate("/login");
      }
    } catch (error) {
      console.error('Error verifying reset code:', error);
    } finally {
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: handleVerifyResetCode,
  });
//gbt need to explain  
  const handleInputChange = (index, event) => {
    const { value } = event.target;
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newResetCode = formik.values.resetCode.split('');
      newResetCode[index] = value;
      formik.setFieldValue('resetCode', newResetCode.join(''));
    }
  };
//gbt need to explain  
  const handlePaste = (event) => {
    event.preventDefault();
    const pasteData = event.clipboardData.getData('Text').slice(0, 6);
    const newResetCode = formik.values.resetCode.split('');
    for (let i = 0; i < pasteData.length; i++) {
      newResetCode[i] = pasteData[i];
    }
    formik.setFieldValue('resetCode', newResetCode.join(''));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={formik.handleSubmit} className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-green-600 text-start mb-5">
          Enter Reset Code
        </h2>
        <div className="flex mb-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <input
              key={index}
              id={`resetCode-${index}`}
              name={`resetCode-${index}`}
              type="text"
              maxLength="1"
              className="w-12 h-12 text-4xl text-center text-gray-900 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-green-600 mx-1"
              value={formik.values.resetCode[index] || ''}
              onChange={(e) => handleInputChange(index, e)}
              onPaste={(e) => handlePaste(e)}
            />
          ))}
        </div>
        {formik.errors.resetCode && formik.touched.resetCode ? (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            <span className="font-medium">{formik.errors.resetCode}</span>
          </div>
        ) : null}
        <div className="flex items-center">
          <button
            type="submit"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            disabled={isLoading}
          >
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
