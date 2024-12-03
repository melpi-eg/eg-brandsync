"use client";
import {
  EachColorPallet,
  NavBar,
  WindowsPreview,
  MacPreview,
  LogoPreview,
  BrowserPreview,
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
import Image from "next/image";

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
  const [browserPreviewVisible, setBrowserPreviewVisible] = useState(false);

  useGSAP(() => {
    if (!copyTextRef.current) return;
    gsap.from(copyTextRef.current, {
      duration: 2,
      height: 0,
    });
  }, [copyTextRef.current]);

  // useEffect(() => {
  //   (async () => {
  //     console.log(
  //       await axios.get(
  //         `http://localhost:3002/download?content=<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.797 21.3566" width="150px" height="50px" style="transition: 0.2s ease-in-out;"><rect x="1.7403" y="11.4266" width="6.767" height="6.773" style="fill: rgb(200, 169, 227);"></rect><rect x="9.9623" y="3.1566" width="6.767" height="6.773" style="fill: rgb(200, 169, 227);"></rect><path d="M33.5107,17.9259c-.628.098-1.392.274-3.726.274-2.549,0-4.529-.686-4.529-4.019v-6.843c0-3.334,1.98-4.02,4.529-4.02,2.334,0,3.098.177,3.726.275.294.039.392.137.392.411v1.255c0,.216-.176.392-.392.392h-4c-1.137,0-1.549.392-1.549,1.687v2.117h5.314c.215,0,.392.177.392.393v1.411c0,.216-.177.393-.392.393h-5.314v2.529c0,1.294.412,1.686,1.549,1.686h4c.216,0,.392.177.392.392v1.255c0,.275-.098.373-.392.412" style="fill: rgb(52, 56, 56);"></path><path d="M38.8937,9.355v2.831c0,2.783,1.355,3.679,2.517,3.679.726,0,1.331-.012,1.936-.061v-3.182h-.714c-.206,0-.387-.181-.387-.399v-1.404c0-.218.181-.399.387-.399h3.037c.206,0,.387.169.387.387v6.594c0,.255-.121.412-.375.46-.98.206-2.25.339-4.271.339-2.118,0-5.252-1.391-5.252-6.014v-2.831c0-4.646,2.977-6.038,5.312-6.038,1.876,0,3.57.23,4.211.351.254.06.375.157.375.411v1.319c0,.279-.084.412-.387.412h-.06c-.908-.085-2.263-.158-4.139-.158-1.319,0-2.577.92-2.577,3.703" style="fill: rgb(52, 56, 56);"></path></svg>`
  //       )
  //     );
  //   })();
  // }, []);

  const handleLogoDownload = (format) => {
    try {
      const svgElement = logoRef.current;
      const svgString = new XMLSerializer().serializeToString(svgElement);

      if (format === "svg") {
        // If the format is SVG, create a Blob and trigger a download
        const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
        const svgUrl = URL.createObjectURL(svgBlob);

        const link = document.createElement("a");
        link.href = svgUrl;
        link.download = "icon.svg";
        link.click(); // Trigger the download
      } else {
        // Handle PNG or JPEG format
        const img = new Image();
        const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
        const url = URL.createObjectURL(svgBlob);

        img.onload = () => {
          // Create a canvas to draw the image on
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");

          // Ensure the canvas size matches the SVG's natural size
          const svgWidth = svgElement.getBoundingClientRect().width;
          const svgHeight = svgElement.getBoundingClientRect().height;

          canvas.width = svgWidth;
          canvas.height = svgHeight;

          // Draw the image (SVG) onto the canvas
          context.drawImage(img, 0, 0, svgWidth, svgHeight);

          // Create a download link for the image
          const link = document.createElement("a");
          link.href = canvas.toDataURL(`image/${format}`); // Convert canvas to PNG/JPEG
          link.download = `icon.${format}`; // Set the download file name
          link.click(); // Trigger the download
        };

        img.onerror = (error) => {
          console.error("Image failed to load", error);
        };

        img.src = url; // Set the image source to the SVG Blob URL
      }
    } catch (error) {}
  };

  return (
    <>
      <div>
        <NavBar />
        <div className="min-h-screen w-full items-center flex justify-center py-5">
          <div className="border border-gray-500 rounded-2xl m-h-screen w-[95%] main-container min-[2100px]:w-[50%] min-[2100px]:h-[80%]">
            {/* product & color input and preview */}
            <div className="h-[55vh] bg-slate-50 rounded-2xl rounded-ee-none rounded-es-none flex items-center justify-center gap-2 min-[1500px]:h-[45vh] min-[1700px]:h-[42vh]  min-[1900px]:h-[37vh] min-[2100px]:h-[31vh] min-[2600px]:h-[25vh] min-[2800px]:h-[20vh]">
              {/* left side */}
              <div className="h-full w-[50vw]  p-4 pt-3">
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
                <div className="flex w-full h-[300px] flex-wrap gap-6 content-start justify-center items-center">
                  {data.map((each, key) => (
                    <EachColorPallet key={key} color={each} index={key} />
                  ))}
                </div>
              </div>
              {/* center side */}
              <div className="w-[2px] h-[80%] bg-gray-500"></div>
              {/* right side */}
              <div className="h-full w-[48vw] flex flex-col items-center justify-center ">
                <div className="w-[90%] h-[50%]">
                  <h3 className="font-semibold">Logo Preview</h3>
                  <div className="border-dashed border w-full h-full mt-2 border-black grid place-items-center">
                    <LogoPreview logoRef={logoRef} />
                  </div>
                </div>
                <div className="w-[90%]   mt-14 flex items-center justify-center  gap-8">
                  <div
                    className="bg-[#123845] text-white p-3 px-4 rounded-md text-sm shadow-xl"
                    onClick={() =>
                      setBrowserPreviewVisible(!browserPreviewVisible)
                    }
                  >
                    Preview logo in a browser
                  </div>
                  <div
                    className={`bg-[#123845] text-white p-3 px-4 rounded-md text-sm shadow-xl flex items-center gap-2 relative ${
                      downloadOptionsVisible && "rounded-ee-none"
                    }`}
                  >
                    Download options{" "}
                    <span className="bg-slate-500 inline-block h-[20px] w-[2px]"></span>{" "}
                    <span
                      className=""
                      onClick={() =>
                        setDownloadOptionsVisible(!downloadOptionsVisible)
                      }
                    >
                      <i className="fa-solid fa-chevron-down"></i>
                    </span>
                    {downloadOptionsVisible && (
                      <div className="absolute top-[100%] right-0 w-[100px] bg-black shadow-lg overflow-hidden">
                        <div
                          className="grid place-items-center text-white bg-gray-700 p-3 cursor-pointer transition-all duration-200 hover:bg-gray-600 "
                          onClick={() => handleLogoDownload("svg")}
                        >
                          SVG
                        </div>
                        <div
                          className="grid place-items-center text-white bg-gray-700 p-3 cursor-pointer transition-all duration-200 hover:bg-gray-600"
                          onClick={() => handleLogoDownload("png")}
                        >
                          PNG
                        </div>
                        <div
                          className="grid place-items-center text-white bg-gray-700 p-3 cursor-pointer transition-all duration-200 hover:bg-gray-600 rounded-b-lg"
                          onClick={() => handleLogoDownload("jpeg")}
                        >
                          JPEG
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* browser preview section */}
            <div className=" p-3">
              <h3 className="font-semibold">Favicon Preview:</h3>
              <div className="mt-3 w-full h-[1px] bg-gray-500"></div>
              <div className="w-full  flex  justify-center  mt-3 p-3 gap-2">
                <div className="w-[49%] border h-fit p-3">
                  <h3>Windows</h3>
                  <WindowsPreview />
                </div>
                <div className="w-[49%] border h-fit p-3">
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
                  <i className="fa-solid fa-eye"></i> {""}
                  Preview
                </button>
                <button
                  className={`${
                    !previewVisible ? "bg-[#123845] text-white" : "text-black"
                  }  p-2  px-3 rounded-sm duration-300 flex items-center gap-2`}
                  onClick={() => setPreviewVisible(false)}
                >
                  <i className="fa-solid fa-code"></i> Code
                </button>
              </div>
              <div className="rounded-md bg-[#F3F4F6] p-3 mt-5">
                {previewVisible &&
                  productPreviewColors.map((each, key) => (
                    <ProductPreview color={each} key={key} />
                  ))}
                {!previewVisible && (
                  <div className="w-[100%]  min-h-[20vh]">
                    <CopyBlock
                      text={logoRef.current.outerHTML}
                      theme={github}
                      language="svg"
                      customStyle={{
                        fontSize: "12px",
                        width: "100%",
                        text: "wrap",
                        overflow: "auto",
                        padding: "10px",
                        minHeight: "20vh",
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
                onClick={() => {
                  (async () => {
                    try {
                      const res = await axios.get(
                        `http://localhost:3003/download?content=<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.797 21.3566" width="150px" height="50px" style="transition: 0.2s ease-in-out;"><rect x="1.7403" y="11.4266" width="6.767" height="6.773" style="fill:${data[selectedIndex]};"></rect><rect x="9.9623" y="3.1566" width="6.767" height="6.773" style=fill:"${data[selectedIndex]}";"></rect><path d="M33.5107,17.9259c-.628.098-1.392.274-3.726.274-2.549,0-4.529-.686-4.529-4.019v-6.843c0-3.334,1.98-4.02,4.529-4.02,2.334,0,3.098.177,3.726.275.294.039.392.137.392.411v1.255c0,.216-.176.392-.392.392h-4c-1.137,0-1.549.392-1.549,1.687v2.117h5.314c.215,0,.392.177.392.393v1.411c0,.216-.177.393-.392.393h-5.314v2.529c0,1.294.412,1.686,1.549,1.686h4c.216,0,.392.177.392.392v1.255c0,.275-.098.373-.392.412" style="fill:${data[selectedIndex]}";"></path><path d="M38.8937,9.355v2.831c0,2.783,1.355,3.679,2.517,3.679.726,0,1.331-.012,1.936-.061v-3.182h-.714c-.206,0-.387-.181-.387-.399v-1.404c0-.218.181-.399.387-.399h3.037c.206,0,.387.169.387.387v6.594c0,.255-.121.412-.375.46-.98.206-2.25.339-4.271.339-2.118,0-5.252-1.391-5.252-6.014v-2.831c0-4.646,2.977-6.038,5.312-6.038,1.876,0,3.57.23,4.211.351.254.06.375.157.375.411v1.319c0,.279-.084.412-.387.412h-.06c-.908-.085-2.263-.158-4.139-.158-1.319,0-2.577.92-2.577,3.703" style="fill:${data[selectedIndex]};"></path></svg>`,
                        { responseType: "arraybuffer" }
                      );

                      alert(JSON.stringify(res));

                      handleCreateAndDownloadZip([
                        {
                          name: "logo.svg",
                          content: logoRef.current.outerHTML,
                        },
                        {
                          name: "colors.txt",
                          content: `background color of rectangle :${data[selectedIndex]}`,
                        },
                        {
                          name: "favicon.ico",
                          content: res.data,
                          binary: true,
                        },
                      ]);
                    } catch (error) {
                      handleCreateAndDownloadZip([
                        {
                          name: "logo.svg",
                          content: logoRef.current.outerHTML,
                        },
                        {
                          name: "colors.txt",
                          content: `background color of rectangle :${data[selectedIndex]}`,
                        },
                      ]);
                    }
                  })();
                }}
              >
                {"  "} Download ZIP <i className="fa-solid fa-file-zipper"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      {browserPreviewVisible && <BrowserPreview />}
    </>
  );
};

export default Home;
