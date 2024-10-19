import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { ConnectButton, lightTheme, useActiveAccount, useDisconnect } from "thirdweb/react"; // Import useDisconnect for logout functionality
import { client, chain } from "../utils/constants";
import CampaignInfoTemp from "./CampaignInfoTemp";
import backgroundImage from "../image/login-bg.png"; // Import your background image
import logoImage from "../image/logo-name.png"; // Import logo

const Login: React.FC = () => {
    const account = useActiveAccount(); // Check if the user is signed in
    const { disconnect } = useDisconnect(); // Destructure disconnect function
    const navigate = useNavigate(); // Hook for navigation

    // Effect to navigate to the dashboard once the user connects
    useEffect(() => {
        if (account) {
            navigate("/dashboard"); // Navigate to the dashboard after connection
        }
    }, [account, navigate]);

    return (
        <div
            style={{
                minHeight: "100vh",
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between", // Allows spacing for footer
                alignItems: "center",
            }}
        >
            {/* Header Section */}
            <header className="bg-white shadow-md w-full fixed top-0 z-10">
                <div className="container mx-auto flex justify-between items-center py-4 px-6">
                    {/* Company Logo */}
                    <div className="flex items-center">
                        <img src={logoImage} alt="Power Stake Logo" className="h-8" /> {/* Reduced height to h-8 */}
                    </div>

                    {/* Navigation Links */}
                    <nav className="space-x-6">
                        <Link to="/" className="font-bold text-gray-700 hover:text-[#051F20] hover:underline">Home</Link>
                        <a href="#" className="font-bold text-gray-700 hover:text-[#051F20] hover:underline">About</a>
                        <a href="#" className="font-bold text-gray-700 hover:text-[#051F20] hover:underline">Service</a>
                        <a href="#" className="font-bold text-gray-700 hover:text-[#051F20] hover:underline">Contact</a>
                    </nav>

                    {/* Buttons */}
                    <div className="space-x-4">
                        <button className="font-bold text-gray-700 hover:text-[#051F20]">Sign up</button>
                    </div>
                </div>
            </header>

            {/* Main Section */}
            <div 
                style={{
                    textAlign: "center",
                    backgroundColor: "white",
                    padding: "30px",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                    marginTop: "120px", // Ensures box appears below the header
                    width: "400px", // Adjust box width for consistent layout
                }}
            >
                {account ? (
                    <div>
                        <h2 style={{ color: "#051F20", fontSize: "24px", fontWeight: "bold" }}>
                            Welcome, you're connected!
                        </h2>
                        <p style={{ color: "#051F20", fontSize: "18px" }}>Account: {account.address}</p>
                        <button
                            style={{
                                marginTop: "20px",
                                padding: "10px 20px",
                                backgroundColor: "#ff4b5c",
                                color: "white",
                                border: "none",
                                borderRadius: "5px",
                                cursor: "pointer",
                                fontSize: "16px",
                            }}
                            onClick={() => disconnect}
                        >
                            Disconnect
                        </button>
                        {/* Show additional content or information when signed in */}
                        <CampaignInfoTemp />
                    </div>
                ) : (
                    <div>
                        <h2 style={{ color: "#051F20", fontSize: "24px", fontWeight: "bold" }}>
                            Sign In
                        </h2>
                        <p style={{ color: "#051F20", fontSize: "16px", marginBottom: "20px" }}>
                            Please connect your account to proceed.
                        </p>
                        {/* Styled Sign In Button */}
                        <ConnectButton 
                            client={client}
                            chain={chain}
                            theme={lightTheme({
                                colors: {
                                    modalBg: "#051F20",
                                },
                            })}
                        />
                    </div>
                )}
            </div>

            {/* Footer Section */}
            <footer 
                className="bg-[#051F20] text-white text-center py-4 w-full"
                style={{ marginTop: "auto" }} // Push footer to bottom
            >
                <p>© 2024 Power Stake - All Rights Reserved</p>
            </footer>
        </div>
    );
};

export default Login;
