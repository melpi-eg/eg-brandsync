"use client";
import React from "react";

const EachColorPallet = ({ color }) => {
  return (
    <div
      className={`flex gap-3 items-center justify-center transition-all  p-2 `}
    >
      <div className="h-10 w-10 relative">
        <p
          className={`h-2/4 w-2/4 absolute right-0 bg-[${color}] `}
          style={{ background: color }}
        ></p>
        <p
          className={`h-2/4 w-2/4 absolute  bottom-0 bg-[${color}] `}
          style={{ background: color }}
        ></p>
      </div>
      <h1 className="text-[40px]">EG</h1>
    </div>
  );
};

export default EachColorPallet;
