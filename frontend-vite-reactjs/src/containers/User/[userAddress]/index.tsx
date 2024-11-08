// import { Link, useParams } from 'react-router-dom';
// import { useReadContract } from 'thirdweb/react';
// // import { CONTRACT } from '../utils/constants';
// import { CONTRACT } from '../../../utils/constants';

// const UserDetails: React.FC = () => {
//   const { userAddress } = useParams<{ userAddress: string }>(); // Extract the donor address from the URL

//   // Fetch all campaigns where this user donated
//   const { data: userFundedCampaigns, isLoading: loadingUserCampaigns } = useReadContract({
//     contract: CONTRACT,
//     method: "getUserFundedCampaigns",
//     params: userAddress ? [userAddress] : [''],
//   });

//   if (!userAddress) return <p>No donor address found in URL.</p>;

//   return (
//     <div>
//       <h1>User Details</h1>
//       <p>
//         <strong>Address:</strong> {userAddress}
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
//         <p>No campaigns found for this user.</p>
//       )}
//     </div>
//   );
// };

// export default UserDetails;

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useActiveAccount, useReadContract } from 'thirdweb/react';
import { CONTRACT } from '../../../utils/constants';
import WelcomeUser from '../../Authentication';

const UserDetails: React.FC = () => {
  const { userAddress } = useParams<{ userAddress: string }>(); // Extract the user (donor) address from the URL
  
  const activeAccount = useActiveAccount();

  // Fetch all campaigns where this user donated
  const { data: userFundedCampaigns, isLoading: loadingUserCampaigns, error } = useReadContract({
    contract: CONTRACT,
    method: "getUserFundedCampaigns",
    params: userAddress ? [userAddress] : [''],
  });

  if (!userAddress) return <p className="error-message">No user address found in URL.</p>;

  return (
    <div className="container mx-auto px-4 py-8 h-dvh">
      <div className="user-details-header">
        <h1 className="text-3xl font-bold mb-4">User Details</h1>
        <p className="mb-6">
          {/* <strong>Address:</strong> {userAddress} */}
          {userAddress} {userAddress === activeAccount?.address && <strong>(you)</strong>}
        </p>
      </div>

      <div className="funded-campaigns-section">
        <h2 className="text-2xl font-semibold mb-4">Campaigns Funded by This User</h2>
        {loadingUserCampaigns ? (
          <div className="loading-state">
            {/* <p>Loading campaigns...</p> */}
            <WelcomeUser/>
          </div>
        ) : error ? (
          <div className="error-state">
            <p className="text-red-500">Error fetching campaigns: {error.message}</p>
          </div>
        ) : userFundedCampaigns && userFundedCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userFundedCampaigns.map((campaign, index) => (
              <div key={index} className="campaign-card bg-white shadow-lg rounded-lg p-6">
                <p className="font-bold mb-2">Campaign Name: {campaign.name}</p>
                <p className="text-gray-600 mb-2">
                  <strong>Campaign Address:</strong> {campaign.campaignAddress}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Owner:</strong> {campaign.owner}
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>Created On:</strong> {new Date(Number(campaign.creationTime) * 1000).toLocaleString()}
                </p>
                <Link to={`/campaign/${campaign.campaignAddress}`} className="block">
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600 transition duration-300">
                    View Campaign Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">This user has not funded any campaigns.</p>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
