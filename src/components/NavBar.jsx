"use client";
import React from "react";

const NavBar = () => {
  return (
    <nav className="h-[8vh] bg-[#123845] flex items-center ">
      {/* logo */}
      <div
        className={`flex gap-3 items-center justify-center transition-all  p-2 w-fit`}
      >
        <div className="h-5 w-5 relative">
          <p className={`h-2/4 w-2/4 absolute right-0 bg-white `}></p>
          <p className={`h-2/4 w-2/4 absolute  bottom-0 bg-white `}></p>
        </div>
        <h1 className="text-[23px] text-white font-bold">EG</h1>
        <h1 className="text-[20px] text-white">BrandSync</h1>
      </div>
    </nav>
  );
};

export default NavBar;
