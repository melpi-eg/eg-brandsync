"use client";
import { EachColorPallet, NavBar } from "@/components";
import ProductPreview from "@/components/ProductPreview";
import { updateInput } from "@/store/colorPalletReducer";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CopyBlock, github } from "react-code-blocks";

const code = `import React from "react";

const DownloadButton = () => {
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

export default DownloadButton;
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
  const dispatch = useDispatch();

  const [downloadOptionsVisible, setDownloadOptionsVisible] = useState(false);
  const [previewVisible, setPreviewVisible] = useState(true);

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
                  <EachColorPallet key={key} color={each} />
                ))}
              </div>
            </div>
            {/* center side */}
            <div className="w-[2px] h-[400px] bg-gray-500"></div>
            {/* right side */}
            <div className="h-full w-[600px] flex flex-col items-center justify-center ">
              <div className="w-[90%] h-[50%]">
                <h3 className="font-semibold">Logo Preview</h3>
                <div className="border-dashed border w-full h-full mt-2 border-black"></div>
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
                      <div className="grid place-items-center bg-slate-500 border border-collapse h-[33%]">
                        SVG
                      </div>
                      <div className="grid place-items-center bg-slate-500 border border-collapse h-[33%]">
                        PNG
                      </div>
                      <div className="grid place-items-center bg-slate-500 border border-collapse h-[33%]">
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
              <div className="w-[600px] border h-full p-1">
                <h3>Windows</h3>
              </div>
              <div className="w-[600px] border h-full p-1">
                <h3>Mac:</h3>
              </div>
            </div>
          </div>

          <div className="min-h-[30vh] p-3">
            <h3 className="font-semibold">Header Preview:</h3>
            <div className="mt-3 w-full h-[1px] bg-gray-500"></div>
            <div className="w-full flex justify-end mt-5 gap-2">
              <button
                className="bg-[#123845] text-white p-2 rounded-sm px-3"
                onClick={() => setPreviewVisible(true)}
              >
                <i className="fa-regular fa-eye"></i> Preview
              </button>
              <button
                className="bg-[#123845] text-white p-2 rounded-sm px-3"
                onClick={() => setPreviewVisible(false)}
              >
                <i className="fa-solid fa-code"></i> Code
              </button>
            </div>
            <div className="rounded-md bg-[#F3F4F6] p-3 mt-5 min-h-[50vh]">
              {previewVisible &&
                productPreviewColors.map((each, key) => (
                  <ProductPreview color={each} key={key} />
                ))}
              {!previewVisible && (
                <div className="w-[95vw] overflow-auto">
                  <CopyBlock
                    text={code}
                    theme={github}
                    language="jsx"
                    customStyle={{
                      fontSize: "10px",
                      width: "90vw",
                      text: "wrap",
                      overflow: "auto",
                      padding: "10px",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
