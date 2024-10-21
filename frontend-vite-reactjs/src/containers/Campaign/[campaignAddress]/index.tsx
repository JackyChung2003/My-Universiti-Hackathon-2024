import { Link, useParams } from 'react-router-dom';
import { TransactionButton, useReadContract } from 'thirdweb/react';
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

interface CampaignData  {
  name: string;
  description: string;
  goal: bigint;
  deadline: number;
  owner: string;
  paused: boolean;
  state: number;
}

// interface RequestDetail {
//   id: string;
//   title: string;
//   description: string;
//   recipient: string;
//   amount: string | bigint;
//   deadline: string | boolean;
//   processingDeadline: string | bigint;
//   approvalPercentage: string | bigint;
// }
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
  

  // const [requests, setRequests] = useState<RequestDetail[]>([]);
  // const [totalRequests, setTotalRequests] = useState(0);

  
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
    // params: "[address]?.toString, // Pass the campaign address as an argument
    // params: ["0x479d9Fb099b6C8260629BBfee826D00F8AC1ea31"],
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

  // Get the detail of the request of the campaign
  const { data: allRequestsDetails1, isLoading: loadingAllRequestsDetails1, refetch: refetchAllRequestsDetails1 } = useReadContract({
    contract: CONTRACT,
    method: "getRequestDetails",
    // params: address ? [address] : [''],
    params: address ? [address, BigInt(0)] : () => Promise.resolve(['', BigInt(0)] as const),
    // params: address ? [address, BigInt(requestId)] : ['', BigInt(requestId)],
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

  //   const { data: CampaignBalance, isLoading: loadingCampaignBalance, refetch: refetchCampaignBalance} = useReadContract({
//     contract: CONTRACT,
//     method: "getContractBalance",
//     params: ["0x479d9Fb099b6C8260629BBfee826D00F8AC1ea31"],
// });

// Fetch request details for each request ID dynamically
// const fetchRequestDetails = async (requestId: number): Promise<RequestDetail> => {
//   const { data: requestDetails } = await useReadContract({
//     contract: CONTRACT,
//     method: 'getRequestDetails',
//     params: address ? [address, BigInt(requestId)] : ['', BigInt(requestId)],
//   });

//   return {
//     id: requestId.toString(),
//     title: requestDetails ? requestDetails[0] : '',
//     description: requestDetails ? requestDetails[1] : '',
//     recipient: requestDetails ? requestDetails[2] : '',
//     amount: requestDetails ? requestDetails[3].toString() : '',
//     deadline: requestDetails ? requestDetails[4].toString() : '',
//     processingDeadline: requestDetails ? requestDetails[5].toString() : '',
//     approvalPercentage: requestDetails ? requestDetails[6].toString() : '',
//   };
// };

// // Fetch all requests based on the total number of requests
// useEffect(() => {
//   const fetchRequests = async () => {
//     if (allCampaignsRequests && allCampaignsRequests.length > 0) {
//       setTotalRequests(allCampaignsRequests.length); // Set total number of requests

//       const requestPromises = [];
//       for (let i = 0; i < allCampaignsRequests.length; i++) {
//         requestPromises.push(fetchRequestDetails(i));
//       }

//       const requestDetailsArray = await Promise.all(requestPromises);
//       setRequests(requestDetailsArray); // Set all request details to the state
//     }
//   };

//   fetchRequests();
// }, [allCampaignsRequests]);

// if (loadingAllCampaignsRequests) {
//   return <p>Loading requests...</p>;
// }

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
  if (loadingCampaignDetail) return <p>Loading campaign details...</p>;
  if (errorCampaignDetail || !dataCampaignDetails) return <p>Error loading campaign details.</p>;

  // const [name, description, goal, deadline, owner, paused, state] = CampaignDetails as [
  //   string,
  //   string,
  //   bigint,
  //   number,
  //   string,
  //   boolean,
  //   number
  // ];

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
    // switch (state) {
    //   case 0:
    //     return 'Active';
    //   case 1:
    //     return 'Successful';
    //   case 2:
    //     return 'Failed';
    //   default:
    //     return 'Unknown';
    // }
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

  return (
    <div className="campaign-details-container">
      <AdminOverlayCampaignDetails />
        <div className="campaign-header">
            <h1>{campaignData.name}</h1>
            <p className="campaign-description">{campaignData.description}</p>
        </div>
        <div className="campaign-details-top">
            <div className='campaign-details-top-left'>
                <img src={TempCampaignPicture} alt="Campaign" className="campaign-detail-image" />

                {/* Badge section */}
                <CampaignStatusBadge isPaused={campaignData.paused} campaignState={campaignData.state} investorCount={allCampaignsDonors ? allCampaignsDonors[0].length : 0} campaignAddress={address} />

                {/* Little Navbar to jump to each section */}
                {/* <div className='campaign-details-navbar'> */}
                  {/* <nav className="campaign-details-navbar">
                    <ul>
                      <li><a href="#request-management">Request Managementr</a></li>
                      <li><a href="#roadmap">Roadmap</a></li>
                      <li><a href="#top-donator">Top Donator</a></li>
                    </ul>
                  </nav> */}
                {/* </div> */}

                {/* Request Management */}

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
                            {/* <p>Requests Num {allCampaignsRequests.length}</p>
                            {allCampaignsRequests.map((request, index) => (
                              <li key={index} className="latest-request-item">
                                <span className="dot"></span>
                                <div className="change-content">
                                  {request && <p className="time">{request[0]}</p>}
                                  {request && <p className="request-description">{request[1]}</p>}
                                </div>
                              </li>
                            ))} */}
                            <p>Requests Num: {allRequests.length}</p>
                            {allRequests.map((request, index) => (
                              // <li key={index} className="roadmap-item">
                              <li key={index} className={`roadmap-item ${getRequestStateColor(Number(request?.[9] ?? 0))}`}>
                                {/* <span className="dot"></span> */}
                                {request && <span className={`dot ${getRequestStateColor(Number(request[9]))}`}></span>}
                                <div className="change-content">
                                  {request && <p className="request-title">Title: {request[0]}</p>}
                                  {request && <p className="request-description">Description: {request[1]}</p>}
                                  {request && <p className="request-id">Request ID: {index}</p>}
                                  {/* {request && <p className="request-recipient">Recipient: {request[2]}</p>} */}
                                  {request && <Link to={`/user/${request[2]}`} className="request-recipient-link">
                                    {/* <div className="campaign-creator-section"> */}
                                    <div className="request-recipient-section">
                                      {/* <h3>Campaign Creator</h3> */}
                                      <div className="request-recipien-info">
                                        <img src={DefaultProfilePicture} alt="Recipient profile" className="recipient-avatar" /> {/* Placeholder profile picture */}
                                        <div>
                                          <p><strong>Recipient</strong></p>
                                          {request && <p>{request[2]}</p>}
                                        </div>
                                      </div>
                                    </div>
                                  </Link>}
                                  {request && <p className="request-amount">Amount: {parseFloat(request[3].toString()) / 1e18} ETH</p>}
                                  {/* {request && <p className="request-status">Status: {Number(request[4]) === 1 ? 'Complete' : 'Pending'}</p>} */}
                                  {request && <strong><p className={`request-status ${getRequestStateColor(Number(request[9]))}`}>
                                        Status: {RequestState[Number(request[9])]}
                                    </p></strong>}
                                  {/* {request && <p className="request-votes">Current votes: {Number(request[5])}</p>} */}
                                  {/* {request && <p className="request-votes-needed">Votes needed: {Number(request[6])}</p>} */}
                                  {request && <p className="request-voting-deadline">Voting Deadline: {Number(request[7])} days</p>}
                                  {/* {request && <p className="request-process-deadline">Process Deadline: {Number(request[8])} days</p>} */}
                                  {/* {request && <p className="request-process-deadline">Process Deadline: {new Date(Number(request[8]) * 1000).toLocaleString()}</p>} */}
                                  {/* {request && <p className="request-approval">Approval Percentage: {parseFloat(request[6].toString())}%</p>} */}
                                  <div className='donation-left-right-section'>
                                  
                                  <div className='donation-top-down-section'>
                                        <p className='donation-amount-display-light'>Usage</p>
                                        <div className='donation-amount-display'>
                                            <h1>{campaignBalance && request ? parseFloat(request[3].toString()) / 1e18 : 0}</h1>
                                            <p className='donation-amount-display-light'>ETH</p>
                                        </div>
                                    </div>
                                    {/* <p>{campaignBalance ? parseFloat(campaignBalance.toString()) / 1e18 : 0} ETH Collected</p> */}
                                    {/* <p><strong>Donation Goal:</strong> {Number(campaignData.goal)/ 1e18} ETH</p> */}
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
                                      {/* <p><strong>Approximate ${usdRaised ? usdRaised.toFixed(2) : '0'} USD raised</strong></p> */}
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
                              <div>
                                <p><strong>{donor.address}</strong></p>
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

                        
                {/* Donation Form */}
                {/* <div className="donation-section">
                  <h2>Fund Campaign</h2>
                  <input
                    type="text"
                    name="donationAmount"
                    placeholder="Donation amount in ETH"
                    value={form.donationAmount}
                    onChange={handleChange}
                  />
                  <TransactionButton
                    transaction={() =>
                      prepareContractCall({
                        contract: CONTRACT,
                        method: 'fundCampaign',
                        params: [address],
                        value: BigInt(Number(form.donationAmount) * 1000000000000000000), // Convert ETH to Wei
                      })
                    }
                    onTransactionConfirmed={(receipt) => {
                      console.log('Donation confirmed', receipt.transactionHash);
                      refetchAllCampaignsDonors();
                      refetchCampaignBalance();
                    }}
                  >
                    Fund Campaign
                  </TransactionButton>
                </div> */}
                
                {/* Campaign Balance */}
                {/* <div className="balance-section">
                  <h2>Campaign Balance</h2>
                  {loadingCampaignBalance ? (
                    <p>Loading campaign balance...</p>
                  ) : (
                    <p><strong>{campaignBalance ? parseFloat(campaignBalance.toString()) / 1e18 : 0} ETH</strong></p>
                  )}
                </div> */}
            </div>
            

            <div className='campaign-details-top-right'>
                {/* <p><strong>Goal:</strong> {parseFloat(campaignData.goal.toString()) / 1e18} ETH</p>
                <p><strong>Deadline:</strong> {new Date(campaignData.deadline * 1000).toLocaleString()}</p>
                <p><strong>Owner:</strong> {campaignData.owner}</p>
                <p><strong>Status:</strong> {campaignData.paused ? 'Paused' : 'Active'}</p>
                <p><strong>State:</strong> {getStateName(campaignData.state)}</p> */}
                <Link to={`/user/${campaignData.owner}`} className="campaign-creator-link">
                    <div className="campaign-creator-section">
                        <h3>Campaign Creator</h3>
                        <div className="creator-info">
                            <img src={DefaultProfilePicture} alt="Creator profile" className="creator-avatar" /> {/* Placeholder profile picture */}
                            <div>
                            <p><strong>Campaign Owner</strong></p>
                            <p>{campaignData.owner}</p>
                            </div>
                                {/* <Link to={`/user/${campaignData.owner}`}>
                                    <button className="view-button">View User</button>
                                    </Link> */}
                            </div>
                    </div>
                </Link>

                {/* <MapContainer id="map" center={[51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}> */}
                  
                {/* <MapContainer
                      id="map"
                      // where the map should start, this is for Oslo
                      center={[59.914, 10.734]} 
                    ><TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[51.505, -0.09]}>
                    <Popup>
                      A pretty popup. <br /> Easily customizable.
                    </Popup>
                  </Marker>
                </MapContainer> */}
                <div className="map-section">
                    <CampaignMap position={[3.155330, 101.718060]} />
                    <button  className="direction-button" onClick={handleGetDirections}>
                    <span className="direction-button-text">Get Directions</span>
                    {/* <span className="direction-button-svg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="20"
                        viewBox="0 0 38 15"
                        fill="none"
                      >
                        <path
                          fill="white"
                          d="M10 7.519l-.939-.344h0l.939.344zm14.386-1.205l-.981-.192.981.192zm1.276 5.509l.537.843.148-.094.107-.139-.792-.611zm4.819-4.304l-.385-.923h0l.385.923zm7.227.707a1 1 0 0 0 0-1.414L31.343.448a1 1 0 0 0-1.414 0 1 1 0 0 0 0 1.414l5.657 5.657-5.657 5.657a1 1 0 0 0 1.414 1.414l6.364-6.364zM1 7.519l.554.833.029-.019.094-.061.361-.23 1.277-.77c1.054-.609 2.397-1.32 3.629-1.787.617-.234 1.17-.392 1.623-.455.477-.066.707-.008.788.034.025.013.031.021.039.034a.56.56 0 0 1 .058.235c.029.327-.047.906-.39 1.842l1.878.689c.383-1.044.571-1.949.505-2.705-.072-.815-.45-1.493-1.16-1.865-.627-.329-1.358-.332-1.993-.244-.659.092-1.367.305-2.056.566-1.381.523-2.833 1.297-3.921 1.925l-1.341.808-.385.245-.104.068-.028.018c-.011.007-.011.007.543.84zm8.061-.344c-.198.54-.328 1.038-.36 1.484-.032.441.024.94.325 1.364.319.45.786.64 1.21.697.403.054.824-.001 1.21-.09.775-.179 1.694-.566 2.633-1.014l3.023-1.554c2.115-1.122 4.107-2.168 5.476-2.524.329-.086.573-.117.742-.115s.195.038.161.014c-.15-.105.085-.139-.076.685l1.963.384c.192-.98.152-2.083-.74-2.707-.405-.283-.868-.37-1.28-.376s-.849.069-1.274.179c-1.65.43-3.888 1.621-5.909 2.693l-2.948 1.517c-.92.439-1.673.743-2.221.87-.276.064-.429.065-.492.057-.043-.006.066.003.155.127.07.099.024.131.038-.063.014-.187.078-.49.243-.94l-1.878-.689zm14.343-1.053c-.361 1.844-.474 3.185-.413 4.161.059.95.294 1.72.811 2.215.567.544 1.242.546 1.664.459a2.34 2.34 0 0 0 .502-.167l.15-.076.049-.028.018-.011c.013-.008.013-.008-.524-.852l-.536-.844.019-.012c-.038.018-.064.027-.084.032-.037.008.053-.013.125.056.021.02-.151-.135-.198-.895-.046-.734.034-1.887.38-3.652l-1.963-.384zm2.257 5.701l.791.611.024-.031.08-.101.311-.377 1.093-1.213c.922-.954 2.005-1.894 2.904-2.27l-.771-1.846c-1.31.547-2.637 1.758-3.572 2.725l-1.184 1.314-.341.414-.093.117-.025.032c-.01.013-.01.013.781.624zm5.204-3.381c.989-.413 1.791-.42 2.697-.307.871.108 2.083.385 3.437.385v-2c-1.197 0-2.041-.226-3.19-.369-1.114-.139-2.297-.146-3.715.447l.771 1.846z"
                        ></path>
                      </svg>
                    </span> */}
                    </button>
                    {/* // https://maps.app.goo.gl/4UBrXAcGtysCXjn9A */}
                </div>


                <div className="donation-progress-section">
                    <div className='donation-left-right-section'>
                        <div className='donation-top-down-section'>
                            {/* <h3>Collected</h3> */}
                            <p className='donation-amount-display-light'>Collected</p>
                            <div className='donation-amount-display'>
                                <h1>{campaignBalance ? parseFloat(campaignBalance.toString()) / 1e18 : 0}</h1>
                                <p className='donation-amount-display-light'>ETH</p>
                            </div>
                        </div>
                        {/* <p>{campaignBalance ? parseFloat(campaignBalance.toString()) / 1e18 : 0} ETH Collected</p> */}
                        {/* <p><strong>Donation Goal:</strong> {Number(campaignData.goal)/ 1e18} ETH</p> */}
                        <div className='donation-top-down-section'>
                            <p className='donation-amount-display-light'>Target</p>
                            <div className='donation-amount-display'>
                                <h1>{Number(campaignData.goal)/ 1e18}</h1>
                                <p className='donation-amount-display-light'>ETH</p>
                            </div>
                        </div>
                    </div>
                    <ProgressBar percentage={parseFloat(((Number(campaignBalance) / Number(campaignData.goal)) * 100).toFixed(2))} />
                    <div className='donation-left-right-section'>
                        {/* <p><strong>Approximate $41,377 USD raised</strong></p> */}
                        <p><strong>Approximate ${usdRaised ? usdRaised.toFixed(2) : '0'} USD raised</strong></p>
                        <p className='donation-amount-display-light'>{Math.max(0, Math.floor((Number(campaignData.deadline) * 1000 - Date.now()) / (1000 * 60 * 60 * 24)))} days left</p>
                    </div>
                </div>

                <div className="campaign-actions">
                    {/* <button className="donate-button">Donate Now</button> */}
                    <button onClick={() => setModalOpen(true)} className="donate-button">Donate Now</button>
                    <div className="share-remind-section">
                        <button className="remind-button">Remind Me</button>
                        <button className="share-button">Share</button>
                    </div>
                </div>
                {/* Donation Modal */}
                {isModalOpen && (
                  <div className="modal-overlay">
                    <div className="modal-content">
                      <h2>Donate to Campaign</h2>
                      <input
                        type="text"
                        name="donationAmount"
                        placeholder="Enter ETH amount"
                        value={form.donationAmount}
                        onChange={handleChange}
                        required
                      />
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
                <h2>Other Campaigns You May Like</h2>
                <div className='other-campaigns-suggestions'>
                    {/* <div className='other-campaign-suggestion'>
                        <img src={TempCampaignPicture} alt="Campaign" className="campaign-suggestion-image" />
                        <p>Campaign Name</p>
                    </div>
                    <div className='other-campaign-suggestion'>
                        <img src={TempCampaignPicture} alt="Campaign" className="campaign-suggestion-image" />
                        <p>Campaign Name</p>
                    </div>
                    <div className='other-campaign-suggestion'>
                        <img src={TempCampaignPicture} alt="Campaign" className="campaign-suggestion-image" />
                        <p>Campaign Name</p>
                    </div> */}
                </div>
              </div>
            </div>
    </div>
  );
};

export default CampaignDetails;
