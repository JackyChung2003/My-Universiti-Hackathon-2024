import React from "react";
import chargingImage from "../image/ev-car.png"; // EV image
import logoImage from "../image/logo-name.png"; // Company logo image

const HomePage = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#DAF1DE" }}> 
      {/* Header Section */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Company Logo as Image */}
          <div className="flex items-center">
            <img src={logoImage} alt="Power Stake Logo" className="h-10" />
          </div>

          {/* Navigation Links */}
          <nav className="space-x-6">
            <a href="#" className="text-gray-700 hover:text-[#051F20]">Home</a>
            <a href="#" className="text-gray-700 hover:text-[#051F20]">About</a>
            <a href="#" className="text-gray-700 hover:text-[#051F20]">Service</a>
            <a href="#" className="text-gray-700 hover:text-[#051F20]">Contact</a>
          </nav>

          {/* Buttons */}
          <div className="space-x-4">
            <button className="text-gray-700 hover:text-[#051F20]">Sign up</button>
            <button className="bg-[#051F20] text-white px-4 py-2 rounded-full hover:bg-[#DAF1DE] hover:text-[#051F20] border border-[#051F20]">
              Sign in
            </button>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <main className="container mx-auto flex flex-col md:flex-row items-center py-16 px-6">
        {/* Left Side - Text Section */}
        <div className="md:w-1/2 text-center md:text-left">
          <h1 className="text-5xl font-bold" style={{ color: "#051F20" }}>
            Charging Station <span style={{ color: "#DAF1DE" }}></span>
          </h1>
          <p className="mt-4 text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <button className="mt-6 px-6 py-3 bg-[#051F20] text-white rounded-full hover:bg-[#DAF1DE] hover:text-[#051F20] border border-[#051F20]">
            Learn More
          </button>
        </div>

        {/* Right Side - Image Section */}
        <div className="md:w-1/2 mt-10 md:mt-0">
          <img
            src={chargingImage}
            alt="EV Charging"
            className="w-full h-full object-contain"
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#051F20] text-white text-center py-4">
        <p>© 2024 Power Stake - All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default HomePage;
