// import { Link, useParams } from 'react-router-dom';
// import { useReadContract } from 'thirdweb/react';
// import { CONTRACT } from '../utils/constants';

// const UserDetails: React.FC = () => {
//   const { donorAddress } = useParams<{ donorAddress: string }>(); // Extract the donor address from the URL

//   // Fetch all campaigns where this user donated
//   const { data: userFundedCampaigns, isLoading: loadingUserCampaigns } = useReadContract({
//     contract: CONTRACT,
//     method: "getUserFundedCampaigns",
//     params: donorAddress ? [donorAddress] : [''],
//   });

//   if (!donorAddress) return <p>No donor address found in URL.</p>;

//   return (
//     <div>
//       <h1>Donor Details</h1>
//       <p>
//         <strong>Address:</strong> {donorAddress}
//       </p>

//       <h2>Campaigns Funded by This Donor</h2>
//       {loadingUserCampaigns ? (
//         <p>Loading campaigns...</p>
//       ) : userFundedCampaigns && userFundedCampaigns.length > 0 ? (
//         <ul>
//           {userFundedCampaigns.map((campaign, index) => (
//             <li key={index}>
//               <p>Campaign Address: {campaign.campaignAddress}</p>
//               <p>Owner: {campaign.owner}</p>
//               <p>Name: {campaign.name}</p>
//               <p>Creation Time: {new Date(Number(campaign.creationTime) * 1000).toLocaleString()}</p>
//               <p>
//                 <Link to={`/campaign/${campaign.campaignAddress}`}>
//                   <button>View Campaign Details</button>
//                 </Link>
//               </p>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No campaigns found for this donor.</p>
//       )}
//     </div>
//   );
// };

// export default UserDetails;
