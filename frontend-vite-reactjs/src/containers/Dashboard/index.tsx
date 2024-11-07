import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import adv1 from "../../assets/images/adv1.png";
import background from "../../assets/images/adv2.png";
import evCar from "../../assets/images/adv3.png"; 
import { CONTRACT } from "../../utils/constants";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import ProgressBar from "../../components/ProgressBar";
import TempCampaignPicture from '../../assets/images/temp-campaign-picture.jpg';
import { getSocialProfiles } from "thirdweb/social";
import DefaultProfilePicture from '../../assets/images/default-profile-picture.jpg';

import "./index.css";
import SvgAnimation from "../../components/SvgAnimationDisplay";
import WelcomeUser from "../Authentication";

// Sample images for slideshow (advertisement)
const sampleImages = [adv1, background, evCar]; // Correct image imports

const Dashboard: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [profiles, setProfiles] = useState<{ [address: string]: any }>({});
  const [randomCampaigns, setRandomCampaigns] = useState<any[]>([]);
  
  const activeAccount = useActiveAccount();
  console.log("address", activeAccount?.address);

  const { data: allCampaigns, isLoading: loadingEventDetail, refetch: refetchAllCampaigns } = useReadContract({
      contract: CONTRACT,
      method: "getAllCampaigns",
  });

  // Function to shuffle the array and get 3 random campaigns
  const getRandomCampaigns = (campaigns: any[]) => {
    const shuffled = [...campaigns].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3); // Return only the first 3 items
  };

  useEffect(() => {
    if (allCampaigns) {
      const selectedCampaigns = getRandomCampaigns([...allCampaigns]);
      setRandomCampaigns(selectedCampaigns);

      selectedCampaigns.forEach(async (campaign) => {
        const profile = await getSocialProfiles({ address: campaign.owner, client: CONTRACT.client });
        setProfiles((prev) => ({ ...prev, [campaign.owner]: profile }));
      });
    }
  }, [allCampaigns]);

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

  useEffect(() => {
    if (allCampaigns) {
      allCampaigns.forEach(async (campaign) => {
        const profile = await getSocialProfiles({ address: "0x0E24901a42a0C467Bf45d5c3d48eCae42d815C91", client: CONTRACT.client });
        setProfiles((prev) => ({ ...prev, [campaign.owner]: profile }));
      });
    }
  }, [allCampaigns]);

  if (loadingEventDetail) {
    // return <p>Loading campaigns...</p>;
    // return <SvgAnimation />
    return <WelcomeUser />
}

  const handleRefreshCampaigns = async () => {
    await refetchAllCampaigns(); // Wait for campaigns to refetch
    if (allCampaigns) {
      const selectedCampaigns = getRandomCampaigns([...allCampaigns]);
      setRandomCampaigns(selectedCampaigns); // Re-shuffle and update the state
    }
  };
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <div className="welcome-heading">
          <h1 className="welcome-text">
            Welcome back, {activeAccount?.address}
          </h1>
        </div>

        {/* Campaigns Display */}
        <div className="three-random-campaigns-container">
          <h2 className="campaigns-title">Top Campaigns</h2>
          <div className="three-random-campaigns-grid">
            {randomCampaigns.map((campaign, index) => (
              <Link to={`/campaign/${campaign.campaignAddress}`} key={index} className="campaign-card-link">
                <div className="three-random-campaign-card">
                {/* <p className="campaign-address"><strong>Campaign Address:</strong> {campaign.campaignAddress}</p> */}
                <p><strong>Campaign Address:</strong> {campaign.campaignAddress}</p>

                  <div className="image-container">
                    <img src={TempCampaignPicture} alt="Campaign" className="campaign-image" />
                    <div className="overlay">
                      <Link to={`/campaign/${campaign.campaignAddress}`} className="view-more-link">
                        <p>View More</p>
                      </Link>
                    </div>
                  </div>

                  <div className="campaign-top-section">
                    <div>
                      {profiles[campaign.owner]?.avatar ? (
                        <img src={profiles[campaign.owner].avatar} alt={`${campaign.owner} profile`} className="three-random-owner-avatar" />
                      ) : (
                        <img src={DefaultProfilePicture} alt="Default profile picture" className="three-random-owner-profile" />
                      )}
                    </div>

                    <div className="campaign-top-right">
                      <h2 className="three-random-campaign-name">{campaign.name}</h2>
                      <p className="campaign-creator">
                        Created by: {campaign.owner} {campaign.owner === activeAccount?.address && <strong>(you)</strong>}
                      </p>
                    </div>
                  </div>

                  <ProgressBar percentage={parseFloat(((Number(campaign.currentContributions) / Number(campaign.goal)) * 100).toFixed(2))} />

                  <p className="campaign-create-time">
                    <strong>Created on </strong> {new Date(Number(campaign.creationTime) * 1000).toLocaleString()}
                  </p>

                  <div className="campaign-bottom-section">
                    <div className="campaign-bottom-left">
                      <p className="target-amount">{(Number(campaign.goal) / 1e18).toFixed(2)} ETH</p>
                      <p className="collected-amount">{(Number(campaign.currentContributions) / 1e18).toFixed(2)} ETH Raised</p>
                    </div>
                    <div className="campaign-bottom-right">
                      <p>{Math.max(0, Math.floor((Number(campaign.deadline) * 1000 - Date.now()) / (1000 * 60 * 60 * 24)))} days left</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="three-random-campaigns-button">
            <button onClick={handleRefreshCampaigns} className="refresh-button">
              Refresh
            </button>
            <Link to="/campaign" className="view-all-button">View All Campaigns</Link>
          </div>
        </div>

        <div className="spacing-between-sections"></div>
          <div className="advertisement-section">
            <div className="slideshow-container">
              <img src={sampleImages[currentIndex]} alt="Campaign" className="slideshow-image" />
              <button className="slide-button slide-button-left" onClick={prevSlide}>
                &#8592;
              </button>
              <button className="slide-button slide-button-right" onClick={nextSlide}>
                &#8594;
            </button>
          </div>

          {/* White Card for Details */}
          <div className="benefits-card">
            <div>
              <h2 className="benefits-title">Why Join?</h2>
              <ul className="benefits-list">
                <li>• Access to 12,000+ charging stations</li>
                <li>• Priority support</li>
                <li>• Special discounts on subscriptions</li>
                <li>• Exclusive member perks</li>
                <li>• Environmentally friendly energy sources</li>
                <li>• Early access to new charging stations</li>
              </ul>
            </div>
            <div className="learn-more-button-container">
              <Link to="/subscription">
                <button className="learn-more-button">Learn More</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;