import React, { useState } from "react";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { client, chain, CONTRACT } from "../utils/constants"; // Import your contract setup
import { ethers } from "ethers"; // Import ethers properly for utils like parseEther
import { useContractWrite, useContract } from "@thirdweb-dev/react"; // thirdweb hooks

const Test: React.FC = () => {
  const account = useActiveAccount(); // Hook to get the current connected account
  const [campaignId, setCampaignId] = useState("");
  const [donationAmount, setDonationAmount] = useState("");

  const [title, setTitle] = useState("EV Charger"); // Example title
  const [description, setDescription] = useState("Help build a new EV charger"); // Example description
  const [target, setTarget] = useState("1.0"); // Example target (in ETH)

  // Fetch the contract using the thirdweb hook
  const { contract } = useContract(CONTRACT.address);

  // Prepare to call the createCampaign function
  const { mutate: createCampaign } = useContractWrite(contract, "createCampaign");

  // Prepare to call the donateToCampaign function
  const { mutate: donateToCampaign } = useContractWrite(contract, "donateToCampaign");

  // Function to create a new campaign
  const handleCreateCampaign = async () => {
    try {
      createCampaign({
        args: [
          title, // Campaign title
          description, // Campaign description
          ethers.utils.parseEther(target), // Convert target from ETH to Wei
          Math.floor(Date.now() / 1000) + 86400, // Deadline (1 day from now)
        ],
      });
      alert("Campaign created successfully!");
    } catch (error) {
      console.error("Error creating campaign:", error);
      alert("Error creating campaign.");
    }
  };

  // Function to donate to a campaign
  const handleDonateToCampaign = async () => {
    try {
      donateToCampaign({
        args: [campaignId], // Campaign ID
        overrides: {
          value: ethers.utils.parseEther(donationAmount), // Donation amount in ETH
        },
      });
      alert("Donation successful!");
    } catch (error) {
      console.error("Error donating to campaign:", error);
      alert("Error donating to campaign.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {account ? (
        <div style={{ textAlign: "center" }}>
          {/* Connect Button to switch accounts */}
          <ConnectButton
            client={client}
            chain={chain}
            connectModal={{
              size: "compact",
            }}
          />

          {/* Create Campaign Section */}
          <div>
            <h2>Create a New Campaign</h2>
            <button onClick={handleCreateCampaign}>Create Campaign</button>
          </div>

          {/* Donate to Campaign Section */}
          <div>
            <h2>Donate to a Campaign</h2>
            <input
              type="text"
              placeholder="Campaign ID"
              value={campaignId}
              onChange={(e) => setCampaignId(e.target.value)}
            />
            <input
              type="text"
              placeholder="Donation Amount (in ETH)"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
            />
            <button onClick={handleDonateToCampaign}>Donate</button>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          {/* Connect Button when no account is active */}
          <ConnectButton
            client={client}
            chain={chain}
            connectModal={{
              size: "compact",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Test;
