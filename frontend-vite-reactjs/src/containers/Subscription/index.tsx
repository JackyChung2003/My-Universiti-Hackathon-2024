import React from "react";
import { Link } from "react-router-dom";
import logoImage from "../../assets/images/logo-name.png"; // Import the logo

import "./index.css";

const SubscriptionPage: React.FC = () => {
  return (
    <div className="subscription-page-container">
      <div className="subscription-content-container">
        <h1 className="subscription-title">EV Charging Subscription Plans</h1>

        <div className="pricing-info">
          <p className="annual-discount-text">Pay annually and save up to 20%</p>
        </div>

        <div className="subscription-plans-grid">
          {/* Basic Plan */}
          <div className="plan-card">
            <h3 className="plan-name">Basic</h3>
            <p className="plan-price">
              $19.99 <span className="plan-duration">monthly</span>
            </p>
            <p className="plan-description">For individual EV drivers</p>
            <ul className="plan-features">
              <li className="feature-item">✔ 100 charging sessions per month</li>
              <li className="feature-item">✔ Access to public charging stations</li>
              <li className="feature-item">✔ Real-time charging status updates</li>
              <li className="feature-item">✔ 24/7 support</li>
            </ul>
            <button className="subscribe-button">Subscribe</button>
          </div>

          {/* Plus Plan */}
          <div className="plan-card">
            <h3 className="plan-name">Plus</h3>
            <p className="plan-price">
              $49.99 <span className="plan-duration">monthly</span>
            </p>
            <p className="plan-description">For frequent EV drivers and small teams</p>
            <ul className="plan-features">
              <li className="feature-item">✔ 500 charging sessions per month</li>
              <li className="feature-item">✔ Access to all public and private stations</li>
              <li className="feature-item">✔ Charging station reservation feature</li>
              <li className="feature-item">✔ Priority support</li>
            </ul>
            <button className="subscribe-button">Subscribe</button>
          </div>

          {/* Pro Plan */}
          <div className="plan-card">
            <h3 className="plan-name">Pro</h3>
            <p className="plan-price">
              $99.99 <span className="plan-duration">monthly</span>
            </p>
            <p className="plan-description">For large teams and EV fleet management</p>
            <ul className="plan-features">
              <li className="feature-item">✔ Unlimited charging sessions</li>
              <li className="feature-item">✔ Access to all public and private stations</li>
              <li className="feature-item">✔ Fleet management and reporting tools</li>
              <li className="feature-item">✔ Dedicated account manager</li>
            </ul>
            <button className="subscribe-button">Subscribe</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
