import React from "react";

const BrowserWindow = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg-gray-600">
      {/* Window Frame */}
      <div className="bg-white w-[800px] h-[600px] rounded-lg shadow-lg overflow-hidden">
        {/* Top Bar (Window Header) */}
        <div className="bg-gray-800 p-3 flex items-center justify-between text-white">
          {/* Window Control Buttons */}
          <div className="flex space-x-2">
            <div className="w-3.5 h-3.5 rounded-full bg-red-500 cursor-pointer"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-yellow-500 cursor-pointer"></div>
            <div className="w-3.5 h-3.5 rounded-full bg-green-500 cursor-pointer"></div>
          </div>
          {/* Title */}
          <div className="text-sm font-semibold">My Browser Window</div>
          {/* Optional Right Side (Empty for now) */}
          <div></div>
        </div>

        {/* Navigation Bar */}
        <div className="bg-gray-900 text-white py-2 px-4">
          <ul className="flex space-x-6">
            <li className="cursor-pointer hover:text-gray-400">Home</li>
            <li className="cursor-pointer hover:text-gray-400">About</li>
            <li className="cursor-pointer hover:text-gray-400">Services</li>
            <li className="cursor-pointer hover:text-gray-400">Contact</li>
          </ul>
        </div>

        {/* Main Content Section */}
        <div className="bg-gray-50 h-[calc(100%-120px)] p-4">
          {/* Content goes here */}
          <div className="flex justify-center items-center w-full h-full">
            <div className="text-2xl text-gray-600">Welcome to My Browser Window</div>
          </div>
        </div>

        {/* Footer (optional) */}
        <div className="bg-gray-800 text-white text-xs py-1 text-center">
          &copy; 2024 My Browser Window. All rights reserved.
        </div>
      </div>
    </div>
  );
};

export default BrowserWindow;
