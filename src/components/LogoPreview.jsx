"use client";
import { useSelector } from "react-redux";
import React from "react";

const LogoPreview = ({ logoRef }) => {
  const data = useSelector((state) => state.color_pallet.value);
  const productName = useSelector((state) => state.color_pallet.inputValue);
  const selectedIndex = useSelector(
    (state) => state.color_pallet.selectedIndex
  );
  const svgText = useSelector((state) => state.color_pallet.inputSvg);

  // alert(svgText);
  console.log("-----", svgText);

  return (
    <>
      <svg
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 180 20"
        width="530px"
        height="50px"
        ref={logoRef}
      >
        {/* Rectangles */}
        <rect
          x="0"
          y="10"
          width="6.767"
          height="6.773"
          style={{ fill: data[selectedIndex] }}
        />
        <rect
          x="8"
          y="2"
          width="6.767"
          height="6.773"
          style={{ fill: data[selectedIndex] }}
        />

        {/* Paths */}
        <path
          d="M30,17c-.628.098-1.392.274-3.726.274-2.549,0-4.529-.686-4.529-4.019v-6.843c0-3.334,1.98-4.02,4.529-4.02,2.334,0,3.098.177,3.726.275.294.039.392.137.392.411v1.255c0,.216-.176.392-.392.392h-4c-1.137,0-1.549.392-1.549,1.687v2.117h5.314c.215,0,.392.177.392.393v1.411c0,.216-.177.393-.392.393h-5.314v2.529c0,1.294.412,1.686,1.549,1.686h4c.216,0,.392.177.392.392v1.255c0,.275-.098.373-.392.412"
          style={{ fill: "#343838" }}
        />
        <path
          d="M35,8.5v2.831c0,2.783,1.355,3.679,2.517,3.679.726,0,1.331-.012,1.936-.061v-3.182h-.714c-.206,0-.387-.181-.387-.399v-1.404c0-.218.181-.399.387-.399h3.037c.206,0,.387.169.387.387v6.594c0,.255-.121.412-.375.46-.98.206-2.25.339-4.271.339-2.118,0-5.252-1.391-5.252-6.014v-2.831c0-4.646,2.977-6.038,5.312-6.038,1.876,0,3.57.23,4.211.351.254.06.375.157.375.411v1.319c0,.279-.084.412-.387.412h-.06c-.908-.085-2.263-.158-4.139-.158-1.319,0-2.577.92-2.577,3.703"
          style={{ fill: "#343838" }}
        />

        {/* Product Name (Dynamic Text) */}
        <text
          x="45"
          y="17"
          style={{
            fill: "#000",
            fontSize: "20px",
            fontFamily: "",
          }}
        >
          {productName}
        </text>
      </svg>
    </>
  );
};

export default LogoPreview;
