

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import ProgressBar from '../ProgressBar';
import profilePicture from "../../assets/images/default-profile-picture.jpg";
import QRCode from 'react-qr-code'; // Directly import QRCode from react-qr-code
import { useActiveAccount } from 'thirdweb/react';
import "./index.css";
import { BsQrCodeScan  } from "react-icons/bs";
import ProgressBar from '../../components/ProgressBar';
import LoginButton from '../../components/Button/LoginButton';

const ProfilePage = () => {
  const [showQRModal, setShowQRModal] = useState(false);
  const activeAccount = useActiveAccount();
  const [profileUrl, setProfileUrl] = useState("");

  useEffect(() => {
    // Set the URL based on active account
    if (activeAccount?.address) {
      setProfileUrl(`http://localhost:5173/My-Universiti-Hackathon-2024/user/${activeAccount.address}`);
    }
  }, [activeAccount]);

  const handleQRClick = () => {
    setShowQRModal(!showQRModal);
  };

  return (
    <div className="profile-page-container">
      {/* Header with Profile title and QR button */}
      <header className="profile-header">
        <h1 className="profile-title">Profile</h1>
        <button className="qr-button" onClick={handleQRClick}>
          {/* QR  */}
          <BsQrCodeScan />
        </button>
      </header>

      {/* QR Code Modal */}
      {showQRModal && (
        <div className="qr-modal-overlay" onClick={handleQRClick}>
          <div className="qr-modal" onClick={(e) => e.stopPropagation()}>
            {profileUrl && <QRCode value={profileUrl} size={200} />}
            <button className="close-modal-button" onClick={handleQRClick}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Profile Information */}
      <div className="user-info">
        <img src={profilePicture} alt="Profile" className="profile-picture" />
        <h2 className="profile-name">John Doe</h2>
        {/* <p className="wallet-info">Wallet info will go here</p> */}
        <div className="login-button-desktop-hidden">
          <LoginButton />
        </div>
      </div>

      {/* Monthly EV Charging Spend */}
      <section className="monthly-ev-spend">
        <h3>Monthly EV Charging Spend</h3>
        <div className="spending-info">
          <p className="total-spent">$85.75</p>
          <p className="monthly-budget">of $100.00 target</p>
        </div>
        <ProgressBar percentage={85.8} />
        <div className="spending-details">
          <p>Charging Sessions - $50.50</p>
          <p>Network Fees - $20.25</p>
          <p>Service Fees - $15.00</p>
        </div>
      </section>
          
      {/* Invite Friends to Join EV Community */}
      <section className="invite-friends">
        <div className="invite-card">
          <p>Invite friends to join the EV community and track their savings! Earn rewards for every new member.</p>
          <button className="invite-button">Invite Friends</button>
        </div>
      </section>


      {/* Navigation Links */}
      <nav className="profile-navigation">
        <Link to="/my-account" className="profile-nav-item">
          <span role="img" aria-label="account">👤</span> My Account
        </Link>
        <Link to="/transaction-history" className="profile-nav-item">
          <span role="img" aria-label="history">📜</span> Transaction History
        </Link>
        <Link to="/security-settings" className="profile-nav-item">
          <span role="img" aria-label="security">🔒</span> Security Settings
        </Link>
        <Link to="/general-settings" className="profile-nav-item">
          <span role="img" aria-label="settings">⚙️</span> General Settings
        </Link>
      </nav>
    </div>
  );
};

export default ProfilePage;
