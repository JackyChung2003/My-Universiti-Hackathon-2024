import React, { useEffect, useState } from 'react';
import { CONTRACT } from '../../utils/constants';
import { Link } from 'react-router-dom';
import { TransactionButton, useActiveAccount, useReadContract } from 'thirdweb/react';
import { prepareContractCall } from 'thirdweb';
import './index.css';  // Import a CSS file for custom styles
import GoogleMapReact from 'google-map-react';  // Import GoogleMapReact component
import TempCampaignPicture from '../../assets/images/temp-campaign-picture.jpg';
import { getSocialProfiles } from 'thirdweb/social';
import DefaultProfilePicture from '../../assets/images/default-profile-picture.jpg';
import ProgressBar from '../../components/ProgressBar';
import AdminOverlayCampaign from '../../components/AdminOverlay/admin_campaign';
import SvgAnimation from '../../components/SvgAnimationDisplay';
import WelcomeUser from '../Authentication';

// const AnyReactComponent: React.FC<{ lat: number; lng: number; text: string }> = ({ lat, lng, text }) => <div>{text}</div>;

const Campaigns: React.FC = () => {
  
    const activeAccount = useActiveAccount();
    
    const { data: allCampaigns, isLoading: loadingEventDetail, refetch: refetchAllCampaigns } = useReadContract({
        contract: CONTRACT,
        method: "getAllCampaigns",
    });

    // State to store profile data for each campaign owner
    const [profiles, setProfiles] = useState<{ [address: string]: any }>({});

    // Fetch profiles for all campaign owners
    useEffect(() => {
      if (allCampaigns) {
        allCampaigns.forEach(async (campaign) => {
          const profile = await getSocialProfiles({ address: "0x0E24901a42a0C467Bf45d5c3d48eCae42d815C91", client: CONTRACT.client });
          setProfiles((prev) => ({ ...prev, [campaign.owner]: profile }));
        });
      }
    }, [allCampaigns]);

    // Function to handle Google Maps API loaded event
    const handleApiLoaded = (map: any, maps: any) => {
        console.log('Google Maps API loaded:', map, maps);
    };

    if (loadingEventDetail) {
      // return <SvgAnimation />;
      return <WelcomeUser/>
    }

    return (
        <div className="campaigns-container">
            <AdminOverlayCampaign refetchAllCampaigns={refetchAllCampaigns} />
            <h1 className='campaigns-title'>All Campaigns Details</h1>
            <div className="campaigns-grid">
                {allCampaigns?.map((campaign, index) => (
                  <Link to={`/campaign/${campaign.campaignAddress}`} key={index} className="campaign-card-link">
                    <div className="campaign-card">
                      <div className='campaign-address'>
                        <p><strong>Campaign Address:</strong> {campaign.campaignAddress}</p>
                      </div>
                      <div className="image-container">
                        <img src={TempCampaignPicture} alt="Campaign" className="campaign-image" />
                        <div className="overlay">
                          <Link to={`/campaign/${campaign.campaignAddress}`} className="view-more-link">
                            <p>View More</p>
                          </Link>
                        </div>
                      </div>

                      <div className="campaign-top-section">
                        <div className='profile-avatar-section'>
                          {profiles[campaign.owner]?.avatar ? (
                            <img
                              src={profiles[campaign.owner].avatar}
                              alt={`${campaign.owner} profile`}
                              className="owner-avatar"
                            />
                          ) : (
                            <img src={DefaultProfilePicture} alt="Default profile picture" className="owner-profile" />
                          )}
                        </div>

                        <div className='campaign-top-right'>
                          <h2 className="campaign-name">{campaign.name}</h2>
                          <p className="campaign-creator">
                            Created by: {campaign.owner} {campaign.owner === activeAccount?.address && <strong>(you)</strong>}
                          </p>
                        </div>
                      </div>
                      <ProgressBar percentage={parseFloat(((Number(campaign.currentContributions) / Number(campaign.goal)) * 100).toFixed(2))} />
                      <p className='campaign-create-time'><strong>Created on </strong> {new Date(Number(campaign.creationTime) * 1000).toLocaleString()}</p>
                      <div className="campaign-bottom-section">
                        {/* Left Section */}
                        <div className="campaign-bottom-left">

                            <p className="target-amount">{(Number(campaign.goal) / 1e18).toFixed(2)} ETH</p>
                            <p className="collected-amount">{(Number(campaign.currentContributions) / 1e18).toFixed(2)} ETH Raised</p>
                        </div>
                        {/* Right Section */}
                        <div className="campaign-bottom-right">
                            <p>{Math.max(0, Math.floor((Number(campaign.deadline) * 1000 - Date.now()) / (1000 * 60 * 60 * 24)))} days left</p>
                        </div>
                    </div>
                      <div className="campaign-actions">
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
        </div>
        
    );
};

export default Campaigns;
