import { TransactionButton, useReadContract, useSendTransaction, useActiveAccount, useContractEvents  } from "thirdweb/react";
import React, { useEffect, useState } from "react";
import { CONTRACT } from "../utils/constants";
import { prepareContractCall, prepareEvent } from "thirdweb";
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

  const activeAccount = useActiveAccount();
  console.log("address", activeAccount?.address);

  const { data: adminAddress, isLoading: loadingAdminAddress } = useReadContract({
    contract: CONTRACT,
    method: "admin",
  });

  if (loadingAdminAddress) {
    console.log("Loading admin address...");
  } else {
    console.log("Admin Address in Contract:", adminAddress);
  }

  const DonationReceivedEvent = prepareEvent({
    signature: "event DonationReceived(address indexed campaign, address indexed donor, uint256 amount)",
  });

  // // Fetch the DonationReceived events
  // const fetchDonationReceivedEvents = useContractEvents({
  //   contract: CONTRACT,
  //   // event: "DonationReceived",
  //   events: [DonationReceivedEvent],
  // });
  
  // Fetch the DonationReceived events
  const { data: events, isLoading: isDonationReceivedEventLoading, error: donationError } = useContractEvents({
    contract: CONTRACT,
    events: [DonationReceivedEvent],
  });

  // Print errors if they occur
  useEffect(() => {
    if (donationError) console.error("Failed to fetch events:", donationError);
  }, [donationError]);

    
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
                  BigInt(Number(form.target) * 1000000000000000000), // Target amount in wei
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

              <TransactionButton
                  transaction={() => prepareContractCall({
                      contract: CONTRACT,
                      method: "togglePause",
                      params: [campaign.campaignAddress],
                  })}
                  onTransactionConfirmed={() => {
                    refetchAllCampaigns();
                    refetchCampaignBalance();
                  }}
              >Toggle Pause</TransactionButton>
            </div>
          ))}

          <h1>---------------------------------------</h1>
          <p>activeAccount: {activeAccount ? activeAccount.address : "No active account"}</p>
          <p>adminAddress: {adminAddress}</p>

          <h1>---------------------------------------</h1>
          <p>Donation Received Events</p>

    {isDonationReceivedEventLoading ? (
        <p>Loading events...</p>
      ) : events && events.length > 0 ? (
        <ul>
          {events.map((event, index) => (
            <li key={index}>
              <p>
                <strong>Campaign:</strong> {event.args.campaign}
              </p>
              <p>
                <strong>Donor:</strong> {event.args.donor}
              </p>
              <p>
                <strong>Amount:</strong> {event.args.amount.toString()} wei
              </p>
              <p>
                <strong>Transaction Hash:</strong>{" "}
                <a
                  href={`https://etherscan.io/tx/${event.transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {event.transactionHash}
                </a>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No donations received yet.</p>
      )}

          
      </div>
  )
}

export default CampaignInfoTemp; 