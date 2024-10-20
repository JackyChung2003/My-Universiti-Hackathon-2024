// import React from 'react';
// import { CONTRACT } from '../../utils/constants';
// import { Link } from 'react-router-dom';
// import { TransactionButton, useReadContract } from 'thirdweb/react';
// import { prepareContractCall } from 'thirdweb';

// const Campaigns: React.FC = () => {
//     const { data: allCampaigns, isLoading: loadingEventDetail, refetch: refetchAllCampaigns } = useReadContract({
//         contract: CONTRACT,
//         method: "getAllCampaigns",
//       });

//     return (
//         <div>
//             <h1>ALL Campaigns Details</h1>
//             {allCampaigns?.map((campaign, index) => (
//               <div key={index}>
//                 <p>Campaign Address: {campaign.campaignAddress}</p>
//                 <p>Owner: {campaign.owner}</p>
//                 <p>Name: {campaign.name}</p>
//                 <p>Creation Time: {campaign.creationTime.toString()}</p>
//                 <Link to={`/campaign/${campaign.campaignAddress}`}>
//                   <button>View Details</button>
//                 </Link>

//                 <TransactionButton
//                     transaction={() => prepareContractCall({
//                         contract: CONTRACT,
//                         method: "togglePause",
//                         params: [campaign.campaignAddress],
//                     })}
//                     onTransactionConfirmed={() => {
//                       refetchAllCampaigns();
//                     }}
//                 >Toggle Pause</TransactionButton>
//               </div>
//             ))}
//         </div>
//     );
// };

// export default Campaigns;

import React, { useEffect, useState } from 'react';
import { CONTRACT } from '../../utils/constants';
import { Link } from 'react-router-dom';
import { TransactionButton, useReadContract } from 'thirdweb/react';
import { prepareContractCall } from 'thirdweb';
import './index.css';  // Import a CSS file for custom styles
import GoogleMapReact from 'google-map-react';  // Import GoogleMapReact component
import TempCampaignPicture from '../../assets/images/temp-campaign-picture.jpg';
import { getSocialProfiles } from 'thirdweb/social';
import DefaultProfilePicture from '../../assets/images/default-profile-picture.jpg';
import ProgressBar from '../../components/ProgressBar';

const AnyReactComponent: React.FC<{ lat: number; lng: number; text: string }> = ({ lat, lng, text }) => <div>{text}</div>;

const Campaigns: React.FC = () => {
    const { data: allCampaigns, isLoading: loadingEventDetail, refetch: refetchAllCampaigns } = useReadContract({
        contract: CONTRACT,
        method: "getAllCampaigns",
    });

    // const { data: allCampaignsDonors, isLoading: loadingCampaignsDonors, refetch: refetchCampaignsDonors } = useReadContract({
    //   contract: CONTRACT,
    //   method: "getCampaignDonors",
    //   params: [''], // Add appropriate params here
    // });

    // const { data: allCampaignsDonors, isLoading: loadingAllCampaignsDonors, refetch: refetchAllCampaignsDonors } = useReadContract({
    //   contract: CONTRACT,
    //   method: "getCampaignDonors",
    //   params: address ? [address] : [''],
    // });

    // State to store profile data for each campaign owner
    const [profiles, setProfiles] = useState<{ [address: string]: any }>({});

    // State to store donator counts for each campaign
    const [donatorCounts, setDonatorCounts] = useState<{ [address: string]: number }>({});

    // Fetch profiles for all campaign owners
    useEffect(() => {
      if (allCampaigns) {
        allCampaigns.forEach(async (campaign) => {
          const profile = await getSocialProfiles({ address: "0x0E24901a42a0C467Bf45d5c3d48eCae42d815C91", client: CONTRACT.client });
          setProfiles((prev) => ({ ...prev, [campaign.owner]: profile }));

          // Fetch the total number of donators for this campaign
          // const totalDonators = await CONTRACT.methods.getDonators(campaign.campaignAddress).call();
          // setDonatorCounts((prev) => ({ ...prev, [campaign.campaignAddress]: totalDonators.length }));

          // Fetch the number of donors for each campaign
          // const { data: donors } = await prepareContractCall({
          //   contract: CONTRACT,
          //   method: "getCampaignDonors",
          //   params: [campaign.campaignAddress],
          // });

          // console.log("Donors: ", donors);
          
          // if (donors && donors.length) {
          //   setDonatorCounts((prev) => ({ ...prev, [campaign.campaignAddress]: donors.length }));
          // }
        });
      }
    }, [allCampaigns]);

    // Function to handle Google Maps API loaded event
    const handleApiLoaded = (map: any, maps: any) => {
        // Add your custom logic here
        console.log('Google Maps API loaded:', map, maps);
    };

    if (loadingEventDetail) {
        return <p>Loading campaigns...</p>;
    }

    return (
        <div className="campaigns-container">
            <h1>All Campaigns Details</h1>
            <div className="campaigns-grid">
                {allCampaigns?.map((campaign, index) => (
                  <Link to={`/campaign/${campaign.campaignAddress}`} key={index} className="campaign-card-link">
                    <div className="campaign-card">
                    {/* <div key={index} className="campaign-card"> */}
                      <p><strong>Campaign Address:</strong> {campaign.campaignAddress}</p>
                      {/* <img src={TempCampaignPicture} alt="Campaign" className="campaign-image" /> */}

                      <div className="image-container">
                        <img src={TempCampaignPicture} alt="Campaign" className="campaign-image" />
                        <div className="overlay">
                          <Link to={`/campaign/${campaign.campaignAddress}`} className="view-more-link">
                            <p>View More</p>
                          </Link>
                        </div>
                      </div>


                      <div className="campaign-top-section">
                        <div >
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
                          <p className="campaign-creator">Created by: {campaign.owner}</p>
                        </div>
                      </div>

                      <ProgressBar percentage={parseFloat(((Number(campaign.currentContributions) / Number(campaign.goal)) * 100).toFixed(2))} />

                      <p className='campaign-create-time'><strong>Created on </strong> {new Date(Number(campaign.creationTime) * 1000).toLocaleString()}</p>
                      {/* <p>Creation Time: {campaign.creationTime.toString()}</p> */}

                      {/* Display the number of donors */}
                      {/* <p><strong>Total Donors:</strong> {donatorCounts[campaign.campaignAddress] || 0} people</p> */}
                      {/* <p><strong>Total Donors:</strong> {campaign.donorNumber.toString()} people</p>
                      <p><strong>Donation Goal:</strong> {(Number(campaign.goal) / 1e18).toFixed(2)} ETH</p>
                      <p><strong>Donation Amount:</strong> {(Number(campaign.currentContributions) / 1e18).toFixed(2)} ETH</p>
                      <p><strong>Donation Progress:</strong> {((Number(campaign.currentContributions) / Number(campaign.goal)) * 100).toFixed(2)}%</p>
                      <p><strong>Deadline:</strong> {new Date(Number(campaign.deadline) * 1000).toLocaleString()}</p>
                      <p><strong>Time Left:</strong> {Math.max(0, Math.floor((Number(campaign.deadline) * 1000 - Date.now()) / (1000 * 60 * 60 * 24)))} days</p> */}

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


                      {/* Display the number of donations */}

                      {/* <div className="map"> */}
                        {/* <GoogleMapReact
                              bootstrapURLKeys={{ key: "AIzaSyB1nUbJXlxsbvMJEyFojX0KQXLWeKjB5FM" }}
                              defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
                              defaultZoom={15}
                              options={{
                                styles: [], // Replace with your desired map styles or import the lightMode variable
                              }}
                            >
                            </GoogleMapReact> */}
                      {/* </div> */}



                      <div className="campaign-actions">
                        {/* <Link to={`/campaign/${campaign.campaignAddress}`}>
                          <button className="details-button">View Details</button>
                        </Link>

                        <TransactionButton
                          transaction={() => prepareContractCall({
                            contract: CONTRACT,
                            method: "togglePause",
                            params: [campaign.campaignAddress],
                          })}
                          onTransactionConfirmed={() => refetchAllCampaigns()}
                        >
                          Toggle Pause
                        </TransactionButton> */}
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
        </div>
    );
};

export default Campaigns;
