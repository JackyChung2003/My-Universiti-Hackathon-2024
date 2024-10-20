import React from "react";
import { Link } from "react-router-dom";
import logoImage from "../image/logo-name.png"; // Import the logo

const SubscriptionPage: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FFFFFF" }}>
      {/* Navbar */}
      <header className="bg-white shadow-md w-full fixed top-0 z-10">
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
              to="/subscriptions"
              className="font-bold px-4 py-2 text-gray-700 hover:text-white hover:bg-[#051F20] rounded-lg transition duration-300"
              style={{ backgroundColor: "#051F20", color: "white" }} // Dark green for active link
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
      <div className="container mx-auto px-6" style={{ marginTop: "100px", backgroundColor: "#FFFFFF" }}>
        <h1 className="text-4xl font-bold text-[#051F20] mb-10 text-center">EV Charging Subscription Plans</h1>

        {/* Plans & Pricing Section */}
        <div className="flex justify-center items-center mb-8">
          <p className="text-gray-500">Pay annually and save up to 20%</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Basic Plan */}
          <div className="bg-[#F8F9FA] p-8 rounded-lg shadow-md flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold mb-4 text-black">Basic</h3>
            <p className="text-4xl font-bold mb-4 text-black">$19.99 <span className="text-sm">monthly</span></p>
            <p className="text-sm text-black mb-4">For individual EV drivers</p>
            <ul className="flex flex-col items-start justify-start mb-6 space-y-2">
              <li className="text-black flex items-center"><span className="mr-2">✔</span>100 charging sessions per month</li>
              <li className="text-black flex items-center"><span className="mr-2">✔</span>Access to public charging stations</li>
              <li className="text-black flex items-center"><span className="mr-2">✔</span>Real-time charging status updates</li>
              <li className="text-black flex items-center"><span className="mr-2">✔</span>24/7 support</li>
            </ul>
            <button className="bg-[#051F20] text-white px-6 py-2 rounded-lg">Subscribe</button>
          </div>

          {/* Plus Plan */}
          <div className="bg-[#F8F9FA] p-8 rounded-lg shadow-md flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold mb-4 text-black">Plus</h3>
            <p className="text-4xl font-bold mb-4 text-black">$49.99 <span className="text-sm">monthly</span></p>
            <p className="text-sm text-black mb-4">For frequent EV drivers and small teams</p>
            <ul className="flex flex-col items-start justify-start mb-6 space-y-2">
              <li className="text-black flex items-center"><span className="mr-2">✔</span>500 charging sessions per month</li>
              <li className="text-black flex items-center"><span className="mr-2">✔</span>Access to public and private charging stations</li>
              <li className="text-black flex items-center"><span className="mr-2">✔</span>Charging station reservation feature</li>
              <li className="text-black flex items-center"><span className="mr-2">✔</span>Priority support</li>
            </ul>
            <button className="bg-[#051F20] text-white px-6 py-2 rounded-lg">Subscribe</button>
          </div>

          {/* Pro Plan */}
          <div className="bg-[#F8F9FA] p-8 rounded-lg shadow-md flex flex-col items-center text-center">
            <h3 className="text-2xl font-bold mb-4 text-black">Pro</h3>
            <p className="text-4xl font-bold mb-4 text-black">$99.99 <span className="text-sm">monthly</span></p>
            <p className="text-sm text-black mb-4">For large teams and EV fleet management</p>
            <ul className="flex flex-col items-start justify-start mb-6 space-y-2">
              <li className="text-black flex items-center"><span className="mr-2">✔</span>Unlimited charging sessions</li>
              <li className="text-black flex items-center"><span className="mr-2">✔</span>Access to all public and private stations</li>
              <li className="text-black flex items-center"><span className="mr-2">✔</span>Fleet management and reporting tools</li>
              <li className="text-black flex items-center"><span className="mr-2">✔</span>Dedicated account manager</li>
            </ul>
            <button className="bg-[#051F20] text-white px-6 py-2 rounded-lg">Subscribe</button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#051F20] text-white text-center py-2 w-full mt-auto">
        <p>© 2024 Power Stake - All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default SubscriptionPage;
