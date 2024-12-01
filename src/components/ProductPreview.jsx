"use client";
import React from "react";
import { useSelector } from "react-redux";

const ProductPreview = ({ color }) => {
  const inputValue = useSelector((state) => state.color_pallet.inputValue);
  return (
    <div
      className="h-[45px] w-full flex items-center mb-2"
      style={{ background: color, color: color == "#FFF" ? "#000" : "#FFF" }}
    >
      <div
        className={`flex gap-3 items-center justify-center transition-all  p-2 w-fit`}
      >
        <div className="h-5 w-5 relative">
          <p
            className={`h-2/4 w-2/4 absolute right-0 ${
              color == "#FFF" ? "bg-black" : "bg-white"
            } `}
          ></p>
          <p
            className={`h-2/4 w-2/4 absolute  bottom-0 ${
              color == "#FFF" ? "bg-black" : "bg-white"
            } `}
          ></p>
        </div>
        <h1
          className={`text-[23px] ${
            color == "#FFF" ? "text-black" : "text-white"
          } font-semibold`}
        >
          EG
        </h1>
        <h1
          className={`text-[23px] ${
            color == "#FFF" ? "text-black" : "text-white"
          } `}
        >
          {" "}
          {inputValue}
        </h1>
      </div>
    </div>
  );
};

export default ProductPreview;
