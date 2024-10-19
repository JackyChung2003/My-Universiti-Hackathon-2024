import React from "react";
import { Link } from 'react-router-dom'; // Import Link for navigation
import backgroundImage from "../image/background.png"; // Your background image
import logoImage from "../image/logo-name.png"; // Company logo image

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#DAF1DE" }}>
      {/* Background Image with Opacity */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>

      {/* Header Section */}
      <header className="bg-white shadow-md relative z-10">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Company Logo as Image */}
          <div className="flex items-center">
            <img src={logoImage} alt="Power Stake Logo" className="h-8" /> {/* Reduced height to h-8 */}
          </div>

          {/* Navigation Links */}
          <nav className="space-x-6">
            <a href="#" className="font-bold text-gray-700 hover:text-[#051F20] hover:underline">Home</a>
            <a href="#" className="font-bold text-gray-700 hover:text-[#051F20] hover:underline">About</a>
            <a href="#" className="font-bold text-gray-700 hover:text-[#051F20] hover:underline">Service</a>
            <a href="#" className="font-bold text-gray-700 hover:text-[#051F20] hover:underline">Contact</a>
          </nav>

          {/* Buttons */}
          <div className="space-x-4">
            <button className="font-bold text-gray-700 hover:text-[#051F20]">Sign up</button>
            {/* Add Link around the Sign in button */}
            <Link to="/login"> 
              <button className="bg-[#051F20] text-white px-4 py-2 rounded-lg hover:bg-[#DAF1DE] hover:text-[#051F20] border border-[#051F20]">
                Sign in
              </button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <main className="relative z-10 container mx-auto py-16 px-10 flex-1 flex items-center">
        <div className="flex flex-col md:flex-row items-center w-full">
          {/* Left Side - Text Section */}
          <div className="md:w-1/3 text-center md:text-left bg-white bg-opacity-90 p-8 rounded-lg shadow-lg flex flex-col justify-between">
            <div>
              <h1 className="text-4xl font-bold leading-tight" style={{ color: "#051F20" }}>
                Drive the Future with <span className="text-[#051F20]">Sustainable Power</span>
              </h1>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Join us in creating a cleaner tomorrow by investing in reliable electric vehicle charging infrastructure. Be a part of the revolution and power the future with sustainable energy.
              </p>
            </div>
            <div className="flex justify-end mt-6">
              <Link to="/login">
                <button className="px-6 py-3 bg-[#051F20] text-white rounded-lg hover:bg-[#DAF1DE] hover:text-[#051F20] border border-[#051F20]">
                  Start Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#051F20] text-white text-center py-4 relative">
        <p>© 2024 Power Stake - All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default HomePage;
