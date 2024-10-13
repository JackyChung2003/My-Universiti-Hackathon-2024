import { TransactionButton, useReadContract, useSendTransaction  } from "thirdweb/react";
import React, { useState } from "react";
import { CONTRACT } from "../utils/constants";
import { prepareContractCall } from "thirdweb";
import { Link } from 'react-router-dom';

const CampaignInfoTemp: React.FC = () => {
  // const { contract } = useContract(CONTRACT.address);

  const [form, setForm] = useState({
    title: "",
    description: "",
    target: "",
    deadline: "",
  });
  const [campaignId, setCampaignId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // READ data from the smart contract using Method: getTotalCampaigns
  // const { data: numberOfCampaigns, isLoading: loadingTotalCampaign, refetch} = useReadContract({
  //     contract: CONTRACT,
  //     method: "getTotalCampaigns",
  // });
  
  const { data: allCampaigns, isLoading: loadingEventDetail, refetch: refetchAllCampaigns } = useReadContract({
    contract: CONTRACT,
    method: "getAllCampaigns",
  });
  
  const { data: CampaignBalance, isLoading: loadingCampaignBalance, refetch: refetchCampaignBalance} = useReadContract({
      contract: CONTRACT,
      method: "getContractBalance",
      params: ["0x479d9Fb099b6C8260629BBfee826D00F8AC1ea31"],
  });
  
  return (
      <div style={{ marginTop: "20px" }}>
          {/* Form to create a new campaign */}
          <h2>Create New Campaign</h2>
          <input
            type="text"
            name="title"
            placeholder="Campaign Title"
            value={form.title}
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            placeholder="Campaign Description"
            value={form.description}
            onChange={handleChange}
          />
          <input
            type="text"
            name="target"
            placeholder="Target Amount (in ETH)"
            value={form.target}
            onChange={handleChange}
          />
          <input
            type="date"
            name="deadline"
            placeholder="Deadline"
            value={form.deadline}
            onChange={handleChange}
          />
          {/* <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
          /> */}
          <TransactionButton
            transaction={() =>
              prepareContractCall({
                contract: CONTRACT,
                method: "createCampaign",
                params: [
                  form.title,
                  form.description,
                  BigInt(form.target), // Convert to BigInt for Solidity compatibility
                  BigInt(new Date(form.deadline).getTime() / 1000), // Deadline as Unix timestamp
                ],
              })
            }
            onTransactionSent={() => console.log("Transaction sent...")}
            // onTransactionConfirmed={() => refetch()}
            onTransactionConfirmed={(receipt) => {
              console.log("Transaction confirmed", receipt.transactionHash);
              console.log("Transaction logs:", receipt.logs); // Print all logs for debugging
              // refetch(); // Refetch campaigns on confirmation
              refetchAllCampaigns();
              refetchCampaignBalance();
            }}
          >
            Create Campaign
          </TransactionButton>
          {/* READ the number of Campaigns */}
          <h1>---------------------------------------</h1>

          {/* <h1>Total Campaigns</h1>
          {loadingTotalCampaign ? (
            <p>Loading campaign number...</p>
          ) : (
            <p>Campaign Num: {numberOfCampaigns?.toString()}</p>
          )} */}

          <h1>---------------------------------------</h1>
          
          <h1>ALL Campaigns Details</h1>
          {allCampaigns ? (
            <p>Loading campaign info...</p>
          ) : (
            <p>Campaign Info: {allCampaigns}</p>
          )}

          <h1>---------------------------------------</h1>

          <h1>Campaign Balance</h1>
          {loadingCampaignBalance ? (
            <p>Loading campaign balance...</p>
          ) : (
            <p>Campaign Balance: {CampaignBalance?.toString()}</p>
          )}

          <h1>---------------------------------------</h1>
          <p>Contract address: {CONTRACT.address}</p>
          
          <h1>---------------------------------------</h1>

          <h1>ALL Campaigns Details</h1>
          {allCampaigns?.map((campaign, index) => (
            <div key={index}>
              <p>Campaign Address: {campaign.campaignAddress}</p>
              <p>Owner: {campaign.owner}</p>
              <p>Name: {campaign.name}</p>
              <p>Creation Time: {campaign.creationTime.toString()}</p>
              <Link to={`/campaign/${campaign.campaignAddress}`}>
                <button>View Details</button>
              </Link>
            </div>
          ))}

      
      </div>
  )
}

export default CampaignInfoTemp; 