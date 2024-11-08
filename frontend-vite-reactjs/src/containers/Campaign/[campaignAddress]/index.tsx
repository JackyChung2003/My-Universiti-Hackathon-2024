import { Link, useParams } from 'react-router-dom';
import { TransactionButton, useActiveAccount, useReadContract } from 'thirdweb/react';
import { CONTRACT } from '../../../utils/constants';
import { prepareContractCall } from 'thirdweb';
import { useEffect, useState } from 'react';
import "./index.css";
import TempCampaignPicture from '../../../assets/images/temp-campaign-picture.jpg';
import DefaultProfilePicture from '../../../assets/images/default-profile-picture.jpg';
import ProgressBar from '../../../components/ProgressBar';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import CampaignMap from '../../../components/Map'; // Adjust the path as necessary
import axios, { all } from 'axios'
import CampaignStatusBadge, { CampaignState } from '../../../components/BadgeDisplay';
import ProgressBarMinTarget from '../../../components/ProgressBarMinTarget';
import AdminOverlayCampaignDetails from '../../../components/AdminOverlay/admin_campaign_details';
import { getSocialProfiles } from 'thirdweb/social';
import SvgAnimation from '../../../components/SvgAnimationDisplay';
import WelcomeUser from '../../Authentication';

interface CampaignData  {
  name: string;
  description: string;
  goal: bigint;
  deadline: number;
  owner: string;
  paused: boolean;
  state: number;
}

// Enum for request states
export enum RequestState {
  Pending,
  Approved,
  Rejected,
  Failed,
  Completed
}

const getRequestStateColor = (state: RequestState): string => {
  switch (state) {
      case RequestState.Pending:
          return 'pending'; // Use CSS class 'pending'
      case RequestState.Approved:
          return 'approved'; // Use CSS class 'approved'
      case RequestState.Rejected:
          return 'rejected'; // Use CSS class 'rejected'
      case RequestState.Failed:
          return 'failed'; // Use CSS class 'failed'
      case RequestState.Completed:
          return 'completed'; // Use CSS class 'completed'
      default:
          return 'unknown'; // Fallback class
  }
};

const CampaignDetails: React.FC<{ data: any[] }> = () => {
  const [form, setForm] = useState({donationAmount: ""});
  const [isModalOpen, setModalOpen] = useState(false);
  const [showMoreDonors, setShowMoreDonors] = useState(false); // For expanding the donor list
  const [ethPrice, setEthPrice] = useState<number | null>(null); // To store ETH price
  const [usdRaised, setUsdRaised] = useState<number | null>(null); // USD raised
  const [isVotingModalOpen, setIsVotingModalOpen] = useState(false);
  const [votePercentage, setVotePercentage] = useState(0);
  const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null);
  const [randomCampaigns, setRandomCampaigns] = useState<any[]>([]);
  const [profiles, setProfiles] = useState<{ [address: string]: any }>({});

  const activeAccount = useActiveAccount();

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmitDonation = () => {
    console.log("Donating", form.donationAmount, "ETH");
    setModalOpen(false); // Close the modal after donation
  };

  const { address } = useParams<{ address: string }>(); // Get the campaign address from the URL

  const { data: dataCampaignDetails, isLoading: loadingCampaignDetail, isError:errorCampaignDetail } = useReadContract({
    contract: CONTRACT,
    method: 'getCampaignDetails',
    params: address ? [address.toString()] : () => Promise.resolve(['' as const] as const),
  });
  
  const { data: allCampaignsDonors, isLoading: loadingAllCampaignsDonors, refetch: refetchAllCampaignsDonors } = useReadContract({
    contract: CONTRACT,
    method: "getCampaignDonors",
    params: address ? [address] : [''],
  });
  
  // Get the balance of the campaign
  const { data: campaignBalance, isLoading: loadingCampaignBalance, refetch: refetchCampaignBalance } = useReadContract({
    contract: CONTRACT,
    method: "getContractBalance",
    params: address ? [address] : [''],
  });

  // Get the request of the campaign
  const { data: allCampaignsRequests, isLoading: loadingAllCampaignsRequests, refetch: refetchAllCampaignsRequests } = useReadContract({
    contract: CONTRACT,
    method: "getAllRequestsForCampaign",
    params: address ? [address] : [''],
  });

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

  // Get the detail of the request of the campaign
  const { data: allRequestsDetails1, isLoading: loadingAllRequestsDetails1, refetch: refetchAllRequestsDetails1 } = useReadContract({
    contract: CONTRACT,
    method: "getRequestDetails",
    params: address ? [address, BigInt(0)] : () => Promise.resolve(['', BigInt(0)] as const),
  });

  // Get the detail of the request of the campaign 2
  const { data: allRequestsDetails2, isLoading: loadingAllRequestsDetails2, refetch: refetchAllRequestsDetails2 } = useReadContract({
    contract: CONTRACT,
    method: "getRequestDetails",
    params: address ? [address, BigInt(1)] : () => Promise.resolve(['', BigInt(1)] as const),
  });

  // Get the detail of the request of the campaign 3
  const { data: allRequestsDetails3, isLoading: loadingAllRequestsDetails3, refetch: refetchAllRequestsDetails3 } = useReadContract({
    contract: CONTRACT,
    method: "getRequestDetails",
    params: address ? [address, BigInt(2)] : () => Promise.resolve(['', BigInt(2)] as const),
  });

  // Get the detail of the request of the campaign 4
  const { data: allRequestsDetails4, isLoading: loadingAllRequestsDetails4, refetch: refetchAllRequestsDetails4 } = useReadContract({
    contract: CONTRACT,
    method: "getRequestDetails",
    params: address ? [address, BigInt(3)] : () => Promise.resolve(['', BigInt(3)] as const),
  });

  // Get the detail of the request of the campaign 5
  const { data: allRequestsDetails5, isLoading: loadingAllRequestsDetails5, refetch: refetchAllRequestsDetails5 } = useReadContract({
    contract: CONTRACT,
    method: "getRequestDetails",
    params: address ? [address, BigInt(4)] : () => Promise.resolve(['', BigInt(4)] as const),
  });

  // Get the detail of the request of the campaign 6
  const { data: allRequestsDetails6, isLoading: loadingAllRequestsDetails6, refetch: refetchAllRequestsDetails6 } = useReadContract({
    contract: CONTRACT,
    method: "getRequestDetails",
    params: address ? [address, BigInt(5)] : () => Promise.resolve(['', BigInt(5)] as const),
  });

  // Get the detail of the request of the campaign 7
  const { data: allRequestsDetails7, isLoading: loadingAllRequestsDetails7, refetch: refetchAllRequestsDetails7 } = useReadContract({
    contract: CONTRACT,
    method: "getRequestDetails",
    params: address ? [address, BigInt(6)] : () => Promise.resolve(['', BigInt(6)] as const),
  });

  // Get the detail of the request of the campaign 8
  const { data: allRequestsDetails8, isLoading: loadingAllRequestsDetails8, refetch: refetchAllRequestsDetails8 } = useReadContract({
    contract: CONTRACT,
    method: "getRequestDetails",
    params: address ? [address, BigInt(7)] : () => Promise.resolve(['', BigInt(7)] as const),
  });

  // Get the detail of the request of the campaign 9
  const { data: allRequestsDetails9, isLoading: loadingAllRequestsDetails9, refetch: refetchAllRequestsDetails9 } = useReadContract({
    contract: CONTRACT,
    method: "getRequestDetails",
    params: address ? [address, BigInt(8)] : () => Promise.resolve(['', BigInt(8)] as const),
  });

  // Get the detail of the request of the campaign 10
  const { data: allRequestsDetails10, isLoading: loadingAllRequestsDetails10, refetch: refetchAllRequestsDetails10 } = useReadContract({
    contract: CONTRACT,
    method: "getRequestDetails",
    params: address ? [address, BigInt(9)] : () => Promise.resolve(['', BigInt(9)] as const),
  });

// Fetch real-time ETH to USD conversion rate using CoinGecko API
useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price', {
          params: {
            ids: 'ethereum',
            vs_currencies: 'usd',
          },
        });
        const ethPriceInUsd = response.data.ethereum.usd;
        setEthPrice(ethPriceInUsd);
      } catch (error) {
        console.error("Error fetching ETH price: ", error);
      }
    };

    fetchEthPrice();
  }, []);

  // Calculate the USD raised from ETH balance
  useEffect(() => {
    if (ethPrice && campaignBalance) {
      const ethAmount = parseFloat(campaignBalance.toString()) / 1e18;
      const usdAmount = ethAmount * ethPrice;
      setUsdRaised(usdAmount);
    }
  }, [ethPrice, campaignBalance]);
  
  if (!address) return <p>No campaign address found.</p>;
  // if (loadingCampaignDetail) return <SvgAnimation />;
  if (loadingCampaignDetail) return <WelcomeUser />;
  if (errorCampaignDetail || !dataCampaignDetails) return <p>Error loading campaign details.</p>;

  const campaignData: CampaignData = {
    name: dataCampaignDetails[0],
    description: dataCampaignDetails[1],
    goal: BigInt(dataCampaignDetails[2]),
    deadline: Number(dataCampaignDetails[3]),
    owner: dataCampaignDetails[4],
    paused: dataCampaignDetails[5],
    state: dataCampaignDetails[6],
  };

  // Helper function to map state codes to human-readable names
  const getStateName = (state: number): string => {
    switch (state) {
      case 0:
        return 'Active';
      case 1:
        return 'Successful';
      case 2:
        return 'Failed';
      case 3:
        return 'Paused';
      case 4:
        return 'Canceled';
      case 5:
        return 'Finalized';
      case 6:
        return 'Expired';
      default:
        return 'Unknown';
    }
  };

    const handleGetDirections = () => {
      const lat = 3.15687;
      const lng = 101.71473;
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
    };

    const scrollToRequest = (index: number) => {
      const element = document.getElementById(`request-${index}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the element
      }
    };

    // Check if the current user is a campaign funder
  const isFunder = activeAccount ? (allCampaignsDonors as unknown as [string[], bigint[]])[0].includes(activeAccount.address) : false;

  // Function to handle vote button click
  const handleVoteClick = (requestId: number) => {
    if (!isFunder) {
      alert("Only campaign funders can vote!");
      return;
    }
    // Calculate the user's vote percentage based on their contribution
    const totalContributions = allCampaignsDonors ? (allCampaignsDonors[1] as bigint[]).reduce((acc, contribution) => acc + Number(contribution), 0) : 0;
    const userContribution = activeAccount ? (allCampaignsDonors as unknown as [string[], bigint[]])[1][(allCampaignsDonors as unknown as [string[], bigint[]])[0].indexOf(activeAccount.address)] : 0;
    const userVotePercentage = (Number(userContribution) / totalContributions) * 100;
    setSelectedRequestId(requestId);  // Store the selected request ID
    setVotePercentage(userVotePercentage);
    setIsVotingModalOpen(true);  // Open the modal for voting confirmation
  };

  // Combine all fetched request details into an array
  const allRequests = [
    allRequestsDetails1,
    allRequestsDetails2,
    allRequestsDetails3,
    allRequestsDetails4,
    allRequestsDetails5,
    allRequestsDetails6,
    allRequestsDetails7,
    allRequestsDetails8,
    allRequestsDetails9,
    allRequestsDetails10,
  ].filter(Boolean); // Filter out any undefined or null values

  const pendingRequests = allRequests.filter(
    (request) => request && Number(request[9]) === RequestState.Pending // Replace "RequestState.Pending" with the actual value or enum
  );

  // Get the latest pending request
  const latestPendingRequest = pendingRequests.length > 0 ? pendingRequests[pendingRequests.length - 1] : null;
  
  // Get the oldest pending request (the first item in the filtered array)
  const oldestPendingRequest = pendingRequests.length > 0 ? pendingRequests[0] : null;

  return (
    <div className="campaign-details-container">
      <AdminOverlayCampaignDetails 
        campaignAddress={address}
        refetchAllCampaignsDonors={refetchAllCampaignsDonors}
        refetchCampaignBalance={refetchCampaignBalance}
        refetchAllCampaignsRequests={refetchAllCampaignsRequests}
        refetchAllRequestsDetails1={refetchAllRequestsDetails1}
        refetchAllRequestsDetails2={refetchAllRequestsDetails2}
        refetchAllRequestsDetails3={refetchAllRequestsDetails3}
        refetchAllRequestsDetails4={refetchAllRequestsDetails4}
        refetchAllRequestsDetails5={refetchAllRequestsDetails5}
        refetchAllRequestsDetails6={refetchAllRequestsDetails6}
        refetchAllRequestsDetails7={refetchAllRequestsDetails7}
        refetchAllRequestsDetails8={refetchAllRequestsDetails8}
        refetchAllRequestsDetails9={refetchAllRequestsDetails9}
        refetchAllRequestsDetails10={refetchAllRequestsDetails10}
      />
        <div className="campaign-header">
            <h1>{campaignData.name}</h1>
            <p className="campaign-description">{campaignData.description}</p>
        </div>
        <div className="campaign-details-top">
            <div className='campaign-details-top-left'>
                <img src={TempCampaignPicture} alt="Campaign" className="campaign-detail-image" />

                {/* Badge section */}
                <CampaignStatusBadge isPaused={campaignData.paused} campaignState={campaignData.state} investorCount={allCampaignsDonors ? allCampaignsDonors[0].length : 0} campaignAddress={address} />

                {/* Roadmap */}
                <div className="roadmap-section">
                  <h4 className="roadmap-section-title">Roadmap</h4>
                  
                  {/* Conditional rendering based on campaignData.state */}
                  {(() => {
                    switch (campaignData.state) {
                      case CampaignState.Active:
                        return <p>The campaign is currently active. Requests are being processed.</p>;
                    
                      case CampaignState.Successful:
                        return <p>The campaign has been successfully completed. Requests are being finalized.</p>;
                    
                      case CampaignState.Paused:
                        return <p>The campaign is paused. No requests are being processed at this moment.</p>;
                    
                      case CampaignState.Failed:
                        return <p>The campaign failed to meet its goal. No further requests will be made.</p>;
                    
                      case CampaignState.Canceled:
                        return <p>The campaign has been canceled. All requests have been halted.</p>;
                    
                      case CampaignState.Finalized:
                        // Combine all fetched request details into an array
                        const allRequests = [
                          allRequestsDetails1,
                          allRequestsDetails2,
                          allRequestsDetails3,
                          allRequestsDetails4,
                          allRequestsDetails5,
                          allRequestsDetails6,
                          allRequestsDetails7,
                          allRequestsDetails8,
                          allRequestsDetails9,
                          allRequestsDetails10,
                        ].filter(Boolean); // Filter out any undefined or null values
                        return allCampaignsRequests && allCampaignsRequests.length > 0 ? (
                          <ul className="roadmap-section-list">
                            <p className='roadmap-request-counter'>Requests Num: {allRequests.length}</p>
                            {allRequests.map((request, index) => (
                              <li id={`request-${index}`} key={index} className={`roadmap-item ${getRequestStateColor(Number(request?.[9] ?? 0))}`}>
                                {request && <span className={`dot ${getRequestStateColor(Number(request[9]))}`}></span>}
                                <div className="request-content">
                                  {request && <p className="request-title">Title: {request[0]}</p>}
                                  {request && <p className="request-description">Description: {request[1]}</p>}
                                  {/* {request && <p className="request-id">Request ID: {index}</p>} */}
                                  {request && <Link to={`/user/${request[2]}`} className="request-recipient-link">
                                    <div className="request-recipient-section">
                                      <div className="request-recipien-info">
                                        <img src={DefaultProfilePicture} alt="Recipient profile" className="recipient-avatar" /> {/* Placeholder profile picture */}
                                        <div>
                                          <p><strong>Recipient</strong></p>
                                          {/* {request && <p>{request[2]}</p>} */}
                                          <p className="recipient-address">{request[2]}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </Link>}
                                  <div className='donation-middle-section'>
                                    <div>
                                      {request && <p className="request-id">Request ID: {index}</p>}
                                      {/* {request && <p className="request-amount">Amount: {parseFloat(request[3].toString()) / 1e18} ETH</p>}
                                      {request && <p className="request-voting-deadline">Voting Deadline: {Number(request[7])} days</p>} */}
                                    </div>
                                    <button onClick={() => handleVoteClick(index)} className="vote-button">Vote Request</button>
                                    {/* Modal for voting details */}
                                    {isVotingModalOpen && (
                                      <div className="voting-modal">
                                        <div className="voting-modal-content">
                                          <h2>Confirm Your Vote for Request {selectedRequestId}</h2>
                                          <p>Your vote will count as <strong>{votePercentage.toFixed(2)}%</strong> of the total votes for this request.</p>
                                          <p>Are you sure you want to vote for this request?</p>
                                            <TransactionButton
                                            className='confirm-vote-button'
                                            transaction={() =>
                                              prepareContractCall({
                                              contract: CONTRACT,
                                              method: 'voteOnRequest',
                                              params: [address, selectedRequestId !== null ? BigInt(selectedRequestId) : BigInt(0)],
                                              })
                                            }
                                            onTransactionSent={() => {
                                              setIsVotingModalOpen(false)
                                              alert('Your vote has been sent. Please wait for confirmation.');
                                            }}
                                            onTransactionConfirmed={(receipt) => {
                                              console.log('Vote confirmed', receipt.transactionHash);
                                              refetchAllCampaignsDonors();
                                              refetchAllCampaignsRequests();
                                              alert('Your vote has been successfully sent!');
                                            }}
                                            >
                                            Confirm Vote
                                            </TransactionButton>
                                          <button onClick={() => setIsVotingModalOpen(false)} className="cancel-vote-button">Cancel</button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                  <div className='donation-left-right-section'>
                                  
                                  <div className='donation-top-down-section'>
                                        <p className='donation-amount-display-light'>Usage</p>
                                        <div className='donation-amount-display'>
                                            <h1 style={{ marginRight: '10px'}}>{campaignBalance && request ? parseFloat(request[3].toString()) / 1e18 : 0}</h1>
                                            <p className='donation-amount-display-light'>ETH</p>
                                        </div>
                                    </div>
                                    <div className='donation-top-down-section'>
                                        <p className='donation-amount-display-light'>Min Vote</p>
                                        <div className='donation-amount-display'>
                                            <h1>{request ? Number(request[6]) : 0}</h1>
                                            <p className='donation-amount-display-light'>%</p>
                                        </div>
                                    </div>
                                  </div>
                                  {request && <ProgressBarMinTarget percentage={Number(request[5])} minPercentage={Number(request[6])} />}
                                  <div className='donation-left-right-section'>
                                      {request && <strong><p className={`request-status ${getRequestStateColor(Number(request[9]))}`}>
                                        Status: {RequestState[Number(request[9])]}
                                      </p></strong>}
                                      {request && <p className='donation-amount-display-light'>{Number(request[7])} days</p>}
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No requests have been made for this campaign yet.</p>
                        );
                      
                      case CampaignState.Expired:
                        return <p>The campaign has expired. No further requests can be made.</p>;
                      
                      default:
                        return <p>Unknown campaign state.</p>;
                    }
                  })()}
                </div>
                {/* Donors Section */}
                {allCampaignsDonors && allCampaignsDonors[0].length > 0 ? (
                  <div className="top-donors-section">
                    <h3>Top Donors</h3>
                    <ul>
                      {allCampaignsDonors[0]
                        .map((donorAddress: string, index: number) => ({
                          address: donorAddress,
                          amount: parseFloat(allCampaignsDonors[1][index].toString()) / 1e18,
                        }))
                        .sort((a, b) => b.amount - a.amount)
                        .slice(0, showMoreDonors ? allCampaignsDonors[0].length : 3)
                        .map((donor: { address: string; amount: number }, index: number) => (
                          <li key={index}>
                            <div className="donor-info">
                              <img src={DefaultProfilePicture} alt="Donor profile" className="donor-avatar" /> {/* Placeholder profile picture */}
                              <div className='donor-address-amount'>
                                {/* <p><strong>{donor.address}</strong></p> */}
                                <p>{donor.address} {donor.address === activeAccount?.address && <strong>(you)</strong>}</p>
                                <p>Donated: {donor.amount} ETH</p>
                              </div>
                                <Link to={`/user/${donor.address}`}>
                                  <button className="view-button">View User</button>
                                </Link>
                            </div>
                          </li>
                        ))}
                    </ul>
                    
                    {/* Toggle to Show More Donors */}
                    {allCampaignsDonors[0].length > 3 && (
                      <button onClick={() => setShowMoreDonors(!showMoreDonors)}>
                        {showMoreDonors ? 'Show Less' : 'Show More'}
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="no-donors-message">
                    <p>No donors have contributed to this campaign yet.</p>
                  </div>
                )}
            </div>
            

            <div className='campaign-details-top-right'>
                <Link to={`/user/${campaignData.owner}`} className="campaign-creator-link">
                    <div className="campaign-creator-section">
                        <h3>Campaign Creator</h3>
                        <div className="creator-info">
                            <img src={DefaultProfilePicture} alt="Creator profile" className="creator-avatar" /> {/* Placeholder profile picture */}
                            <div>
                              <p><strong>Campaign Owner</strong></p>
                              <p>{campaignData.owner}</p>
                              <p>{campaignData.owner === activeAccount?.address && <strong>(you)</strong>}</p>
                            </div>
                            </div>
                    </div>
                </Link>
                <div className="map-section">
                    <CampaignMap position={[3.155330, 101.718060]} />
                    <button  className="direction-button" onClick={handleGetDirections}>
                    <span className="direction-button-text">Get Directions</span>
                    </button>
                </div>

                <div className="donation-progress-section">
                {/* Check if the campaign is finalized */}
                {campaignData.state === CampaignState.Finalized ? (
                  <div className='voting-section'>
                    <p className="funding-success-message">Funding process successfully completed.</p>

                    {oldestPendingRequest && <p className="current-request-label">Current Request Id: {oldestPendingRequest ? allRequests.indexOf(oldestPendingRequest) : 'N/A'}</p>}
                    {oldestPendingRequest ? (
                      <li id={`request-latest`} className={`only-roadmap-item ${getRequestStateColor(Number(oldestPendingRequest?.[9] ?? 0))}`}>
                        <div className="request-content">
                          <p className="request-title">{oldestPendingRequest[0]}</p>
                          <p className="request-description">{oldestPendingRequest[1]}</p>
                          <p className="request-amount">Amount: {parseFloat(oldestPendingRequest[3].toString()) / 1e18} ETH</p>
                          <strong><p className={`request-status ${getRequestStateColor(Number(oldestPendingRequest[9]))}`}>
                            Status: {RequestState[Number(oldestPendingRequest[9])]}
                          </p></strong>
                          <ProgressBarMinTarget percentage={Number(oldestPendingRequest[5])} minPercentage={Number(oldestPendingRequest[6])} />
                        </div>
                      </li>
                    ) : (
                      <p>No pending requests found.</p>
                    )}
                  </div>
                ) : (
                  <>
                    {/* Render the normal donation progress section */}
                    <div className='donation-left-right-section'>
                      <div className='donation-top-down-section'>
                        <p className='donation-amount-display-light'>Collected</p>
                        <div className='donation-amount-display'>
                          <h1>{campaignBalance ? parseFloat(campaignBalance.toString()) / 1e18 : 0}</h1>
                          <p className='donation-amount-display-light'>ETH</p>
                        </div>
                      </div>
                
                      <div className='donation-top-down-section'>
                        <p className='donation-amount-display-light'>Target</p>
                        <div className='donation-amount-display'>
                          <h1>{Number(campaignData.goal) / 1e18}</h1>
                          <p className='donation-amount-display-light'>ETH</p>
                        </div>
                      </div>
                    </div>
                
                    <ProgressBar
                      percentage={parseFloat(((Number(campaignBalance) / Number(campaignData.goal)) * 100).toFixed(2))}
                    />
              
                    <div className='donation-left-right-section'>
                      <p>
                        <strong>Approximate ${usdRaised ? usdRaised.toFixed(2) : '0'} USD raised</strong>
                      </p>
                      <p className='donation-amount-display-light'>
                        {Math.max(0, Math.floor((Number(campaignData.deadline) * 1000 - Date.now()) / (1000 * 60 * 60 * 24)))} days left
                      </p>
                    </div>
                  </>
                )}
              </div>
                <div className="campaign-actions">
                    {campaignData.state !== CampaignState.Finalized ? (
                      <button onClick={() => setModalOpen(true)} className="donate-button">Donate Now</button>
                    ) : (
                      <button 
                        onClick={() => {
                          if (oldestPendingRequest) {
                            scrollToRequest(allRequests.indexOf(oldestPendingRequest));
                          }
                        }}
                        className="donate-button"
                      >
                        Jump to Request
                      </button>
                    )}
                    <div className="share-remind-section">
                        <button className="remind-button">Remind Me</button>
                        <button className="share-button">Share</button>
                    </div>

                    {/* <div className='voting-options'>

                      <button onClick={() => scrollToRequest(1)}>Jump to Request 2</button>
                    </div> */}
                </div>
                {/* Donation Modal */}
                {isModalOpen && (
                  <div className="modal-overlay">
                    <div className="modal-content">
                      <h2>Donate to Campaign</h2>
                      <div className='create-form'>
                        <input
                          type="text"
                          name="donationAmount"
                          placeholder="Enter ETH amount"
                          value={form.donationAmount}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="modal-actions">
                        <TransactionButton
                          transaction={() =>
                            prepareContractCall({
                              contract: CONTRACT,
                              method: 'fundCampaign',
                              params: [address],
                              value: BigInt(Number(form.donationAmount) * 1e18), // Convert ETH to Wei
                            })
                          }
                          onTransactionConfirmed={(receipt) => {
                            console.log('Donation confirmed:', receipt);
                            handleSubmitDonation();
                          }}
                        >
                          Confirm Donation
                        </TransactionButton>
                        
                        <button onClick={() => setModalOpen(false)}>Cancel</button>
                      </div>
                    </div>
                  </div>
                )}
            </div>
        </div>

        <div className="campaign-details-bottom">
            <div className="other-campaigns-suggestions-section">
                <p className="other-campaigns-title">Other Campaigns You May Like</p>
                <div className='other-campaigns-suggestions'>
                </div>
                <div className="three-random-campaigns-grid">
                  {randomCampaigns.map((campaign, index) => (
                    <Link to={`/campaign/${campaign.campaignAddress}`} key={index} className="campaign-card-link">
                      <div className="three-random-campaign-card">
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
              </div>
            </div>
            
    </div>
  );
};

export default CampaignDetails;
