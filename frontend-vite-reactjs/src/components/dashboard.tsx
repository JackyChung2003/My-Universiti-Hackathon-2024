import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoImage from "../image/logo-name.png"; // Ensure the correct path for the logo

// Import the images directly if they are in the src folder
import adv1 from "../image/adv1.png";
import background from "../image/adv2.png";
import evCar from "../image/adv3.png";

// Sample images for slideshow (advertisement)
const sampleImages = [adv1, background, evCar]; // Correct image imports

const Dashboard: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the previous slide
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sampleImages.length - 1 : prevIndex - 1
    );
  };

  // Function to go to the next slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === sampleImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FFFFFF" }}>
      {/* Navbar */}
      <header className="bg-white shadow-md w-full fixed top-0 z-10"> {/* White navbar */}
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Company Logo */}
          <div className="flex items-center">
            <img src={logoImage} alt="Power Stake Logo" className="h-8" />
          </div>

          {/* Navigation Links */}
          <nav className="space-x-6">
            <Link
              to="/dashboard"
              className="font-bold px-4 py-2 text-gray-700 hover:text-white hover:bg-[#051F20] rounded-lg transition duration-300"
              style={{ backgroundColor: "#051F20", color: "white" }} // Dark green for active link
            >
              My Home
            </Link>
            <Link
              to="/campaign"
              className="font-bold px-4 py-2 text-gray-700 hover:text-white hover:bg-[#051F20] rounded-lg transition duration-300"
            >
              Campaign
            </Link>
            <Link
              to="/map"
              className="font-bold px-4 py-2 text-gray-700 hover:text-white hover:bg-[#051F20] rounded-lg transition duration-300"
            >
              Map
            </Link>
            <Link
              to="/subscription"
              className="font-bold px-4 py-2 text-gray-700 hover:text-white hover:bg-[#051F20] rounded-lg transition duration-300"
            >
              Subscriptions
            </Link>
          </nav>

          {/* Sign-up Button */}
          <div className="space-x-4">
            <button className="font-bold text-gray-700 hover:text-[#051F20]">Sign up</button>
          </div>
        </div>
      </header>

      {/* Main Content Section */}
      <div className="container mx-auto px-6" style={{ backgroundColor: "#FFFFFF" }}>
        <div className="flex flex-col md:flex-row items-start justify-start pt-24">
          {/* Welcome Back Heading */}
          <h1 className="text-3xl font-bold mb-6 md:mb-0" style={{ color: "#051F20", width: "100%" }}>
            Welcome back,
          </h1>
        </div>

        {/* Full-Width White Card for Top Campaigns */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full lg:max-w-6xl mx-auto mt-6" style={{ maxWidth: "95%" }}>
          <h2 className="text-xl font-bold text-[#051F20] mb-4">Top Campaigns</h2>
          {/* Empty card content for now */}
        </div>

        {/* Spacing between the Top Campaigns and Advertisement */}
        <div className="my-10"></div>

        {/* Advertisement and Benefits Section */}
        <div className="bg-[#051F20] p-6 rounded-lg shadow-lg w-full lg:max-w-6xl mx-auto flex" style={{ maxWidth: "95%" }}> {/* Dark green card */}
          {/* Slideshow Section */}
          <div className="w-full md:w-7/10 relative flex-shrink-0" style={{ width: "70%" }}> {/* 70% width */}
            <img
              src={sampleImages[currentIndex]}
              alt="Campaign"
              className="w-full h-[580px] object-cover rounded-l-lg shadow-lg"
            />

            {/* Left Button */}
            <button
              className="absolute left-0 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-white text-[#051F20] rounded-full hover:bg-[#4fada8] transition duration-200"
              onClick={prevSlide}
            >
              &#8592;
            </button>

            {/* Right Button */}
            <button
              className="absolute right-0 top-1/2 transform -translate-y-1/2 px-3 py-2 bg-white text-[#051F20] rounded-full hover:bg-[#4fada8] transition duration-200"
              onClick={nextSlide}
            >
              &#8594;
            </button>
          </div>

          {/* White Card for Details */}
          <div className="flex-shrink-0 bg-white p-6 h-[580px] rounded-lg shadow-lg ml-4 w-[30%] flex flex-col justify-between"> {/* Matching the height with the poster */}
            <div>
              <h2 className="text-xl font-bold text-[#051F20] mb-4">Why Join?</h2>
              <ul className="text-[#051F20] mb-4 space-y-3">
                <li>• Access to 12,000+ charging stations</li>
                <li>• Priority support</li>
                <li>• Special discounts on subscriptions</li>
                <li>• Exclusive member perks</li>
                <li>• Environmentally friendly energy sources</li>
                <li>• Early access to new charging stations</li>
              </ul>
            </div>
            <div className="mt-auto flex justify-end"> {/* Button aligned to bottom-right */}
              
                <button className="bg-[#051F20] text-white px-4 py-2 rounded-lg hover:bg-[#4fada8] transition duration-200">
                  Learn More
                </button>
             
            </div>
          </div>
        </div>
      </div>

      <div className="my-10"></div>
      {/* Footer */}
      <footer className="bg-[#051F20] text-white text-center py-2 w-full mt-auto">
        <p>© 2024 Power Stake - All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default Dashboard;
