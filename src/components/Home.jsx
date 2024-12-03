"use client";
import {
  EachColorPallet,
  NavBar,
  WindowsPreview,
  MacPreview,
  LogoPreview,
} from "@/components";
import ProductPreview from "@/components/ProductPreview";
import { updateInput } from "@/store/colorPalletReducer";
import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CopyBlock, github } from "react-code-blocks";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { handleCreateAndDownloadZip } from "@/helpers";
import axios from "axios";

const code = `import React from "react";

const SVGLogo = () => {
  return (
    <button className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2m-7-6v9m-4-4l4 4m0 0l4-4m-4 4V4"
        />
      </svg>
      Download
    </button>
  );
};

export default SVGLogo;
`;

const productPreviewColors = [
  "#FFF",
  "#000",
  "#3C3C3B",
  "#517770",
  "#9FBBBE",
  "#47606C",
];

const Home = () => {
  const data = useSelector((state) => state.color_pallet.value);
  const inputVal = useSelector((state) => state.color_pallet.inputValue);
  const selectedIndex = useSelector(
    (state) => state.color_pallet.selectedIndex
  );
  const logoRef = useRef(null);

  const dispatch = useDispatch();
  const copyTextRef = useRef(null);

  const [downloadOptionsVisible, setDownloadOptionsVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(true);
  const [textCopied, setTextCopied] = useState(false);

  useGSAP(() => {
    gsap.from(copyTextRef.current, {
      duration: 2,
      height: 0,
    });
  }, [copyTextRef.current]);

  useEffect(() => {
    axios
      .post("http://localhost:3000/api/text-to-svg", data)
      .then((res) => console.log(res))
      .catch((err) => console.log("ERROR"));
  }, []);

  const handleLogoDownload = (format) => {
    // Get the SVG element as a string
    const svgElement = logoRef.current;
    const svgString = new XMLSerializer().serializeToString(svgElement);

    if (format === "svg") {
      // If the format is SVG, create a Blob and trigger a download
      const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
      const svgUrl = URL.createObjectURL(svgBlob);

      // Create a download link for the SVG file
      const link = document.createElement("a");
      link.href = svgUrl;
      link.download = "icon.svg"; // Set the download file name for SVG
      link.click(); // Trigger the download
    } else {
      // If the format is PNG or JPEG, create an image from the SVG string using a Canvas
      const img = new Image();
      const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
      const url = URL.createObjectURL(svgBlob);

      img.onload = () => {
        // Create a canvas to draw the image on
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        // Set canvas size to match the SVG dimensions (you should define dim.x and dim.y)
        canvas.width = 512;
        canvas.height = 512;

        // Draw the image (SVG) onto the canvas
        context.drawImage(img, 0, 0, 512, 512);

        // Create a download link for the image
        const link = document.createElement("a");
        link.href = canvas.toDataURL(`image/${format}`); // Convert canvas to PNG/JPEG
        link.download = `icon.${format}`; // Set the download file name
        link.click(); // Trigger the download
      };

      img.src = url; // Set the image source to the SVG Blob URL
    }
  };

  return (
    <div>
      <NavBar />
      <div className="min-h-screen w-full  flex justify-center py-5">
        <div className="border border-gray-500 rounded-2xl min-h-screen w-[95%] ">
          {/* product & color input and preview */}
          <div className="h-[70vh] bg-slate-50 rounded-2xl rounded-ee-none rounded-es-none flex items-center justify-center gap-2">
            {/* left side */}
            <div className="h-full w-[600px]  p-3 pt-3">
              <h3 className="font-semibold">Product Name :</h3>
              <input
                type="text"
                className="w-[300px] h-10 rounded-sm border border-gray-500 p-2 outline-none mt-2"
                placeholder="EG Product Name"
                value={inputVal}
                onInput={(e) => {
                  dispatch(updateInput(e.target.value));
                }}
              />

              <h3 className="mt-6 font-semibold">Pick a Color :</h3>
              <div className="flex w-full h-[300px] flex-wrap gap-6 content-start justify-center">
                {data.map((each, key) => (
                  <EachColorPallet key={key} color={each} index={key} />
                ))}
              </div>
            </div>
            {/* center side */}
            <div className="w-[2px] h-[400px] bg-gray-500"></div>
            {/* right side */}
            <div className="h-full w-[600px] flex flex-col items-center justify-center ">
              <div className="w-[90%] h-[50%]">
                <h3 className="font-semibold">Logo Preview</h3>
                <div className="border-dashed border w-full h-full mt-2 border-black grid place-items-center">
                  <LogoPreview logoRef={logoRef} />
                </div>
              </div>
              <div className="w-[90%] h-20  mt-14 flex items-center justify-between px-4">
                <div className="bg-[#123845] text-white p-3 px-4 rounded-md text-sm shadow-xl">
                  Preview logo in a browser
                </div>
                <div
                  className={`bg-[#123845] text-white p-3 px-4 rounded-md text-sm shadow-xl flex items-center gap-2 relative ${
                    downloadOptionsVisible && "rounded-ee-none"
                  }`}
                >
                  Download options{" "}
                  <span className="bg-slate-500 inline-block h-[25px] w-[2px]"></span>{" "}
                  <span
                    className=""
                    onClick={() =>
                      setDownloadOptionsVisible(!downloadOptionsVisible)
                    }
                  >
                    V
                  </span>
                  {downloadOptionsVisible && (
                    <div className="absolute top-[100%] right-0 w-[80px] h-[80px] bg-black">
                      <div
                        className="grid place-items-center bg-slate-500 border border-collapse h-[33%]"
                        onClick={() => handleLogoDownload("svg")}
                      >
                        SVG
                      </div>
                      <div
                        className="grid place-items-center bg-slate-500 border border-collapse h-[33%]"
                        onClick={() => handleLogoDownload("png")}
                      >
                        PNG
                      </div>
                      <div
                        className="grid place-items-center bg-slate-500 border border-collapse h-[33%]"
                        onClick={() => handleLogoDownload("jpeg")}
                      >
                        JPG
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* browser preview section */}
          <div className="min-h-[30vh] p-3">
            <h3 className="font-semibold">Favicon Preview:</h3>
            <div className="mt-3 w-full h-[1px] bg-gray-500"></div>
            <div className="w-full h-[30vh] flex items-center justify-center  mt-3 p-3 gap-2">
              <div className="w-[600px] border h-full p-3">
                <h3>Windows</h3>
                <WindowsPreview />
              </div>
              <div className="w-[600px] border h-full p-3">
                <h3>Mac</h3>
                <MacPreview />
              </div>
            </div>
          </div>

          <div className="min-h-[30vh] p-3">
            <h3 className="font-semibold">Header Preview:</h3>
            <div className="mt-3 w-full h-[1px] bg-gray-500"></div>
            {textCopied && (
              <div
                className="flex items-center justify-center"
                ref={copyTextRef}
              >
                <div className="text-center mt-12 bg-[black] px-3 py-1 w-fit text-white absolute">
                  Copied
                </div>
              </div>
            )}
            <div className="w-full flex justify-end mt-5 ">
              <button
                className={`${
                  previewVisible ? "bg-[#123845] text-white" : "text-black"
                }  p-2  px-3 rounded-sm transition-colors duration-300 flex items-center gap-2`}
                onClick={() => setPreviewVisible(true)}
              >
                <img src="/eye.svg" alt="imf" className="h-[30px] w-[30px]" />{" "}
                Preview
              </button>
              <button
                className={`${
                  !previewVisible ? "bg-[#123845] text-white" : "text-black"
                }  p-2  px-3 rounded-sm duration-300 flex items-center gap-2`}
                onClick={() => setPreviewVisible(false)}
              >
                <img
                  src="/Dot Com.svg"
                  alt="imf"
                  className="h-[30px] w-[30px]"
                />{" "}
                Code
              </button>
            </div>
            <div className="rounded-md bg-[#F3F4F6] p-3 mt-5 min-h-[50vh]">
              {previewVisible &&
                productPreviewColors.map((each, key) => (
                  <ProductPreview color={each} key={key} />
                ))}
              {!previewVisible && (
                <div className="w-[95vw] overflow-auto h-[50vh]">
                  <CopyBlock
                    text={logoRef.current.outerHTML}
                    theme={github}
                    language="svg"
                    customStyle={{
                      fontSize: "12px",
                      width: "90vw",
                      text: "wrap",
                      overflow: "auto",
                      padding: "10px",
                      minHeight: "50vh",
                    }}
                    onCopy={(e) => {
                      setTextCopied(true);
                      setTimeout(() => {
                        setTextCopied(false);
                      }, 1500);
                    }}
                    wrapLongLines={true}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="text-center">
            <button
              className="bg-[#123845] text-white p-3 px-4 rounded-md mb-2"
              onClick={() =>
                handleCreateAndDownloadZip([
                  {
                    name: "logo.svg",
                    content: logoRef.current.outerHTML,
                  },
                  {
                    name: "colors.txt",
                    content: `background color of rectangle :${data[selectedIndex]}`,
                  },
                ])
              }
            >
              Download ZIP
            </button>
          </div>
        </div>
      </div>
      {/* <BrowserPreview /> */}
    </div>
  );
};

export default Home;
