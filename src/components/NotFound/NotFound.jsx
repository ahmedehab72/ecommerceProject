import React, { useEffect, useState } from "react";
import errorImage from "../../assets/images/error.svg";
export default function NotFound() {
  return (
    <>
      <div className="py-8 flex justify-center items-center w-full">
        <img src={errorImage} alt="error message" />
      </div>
    </>
  );
}
