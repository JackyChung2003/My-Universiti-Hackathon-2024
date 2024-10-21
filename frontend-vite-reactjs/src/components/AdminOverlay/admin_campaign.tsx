import React, { useState } from 'react';
import './index.css';  // Assuming you want to use CSS for styles
import { TransactionButton } from 'thirdweb/react';
import { prepareContractCall } from 'thirdweb';
import { CONTRACT } from '../../utils/constants';

interface AdminOverlayCampaignProps {
  refetchAllCampaigns: () => void;  // Define the refetch function prop
}

// const AdminOverlayCampaign: React.FC = () => {

const AdminOverlayCampaign: React.FC<AdminOverlayCampaignProps> = ({ refetchAllCampaigns }) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    target: "",
    deadline: "",
  });

  // Toggle the overlay visibility
  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

  // Handle clicks outside of the content to close the overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOverlayOpen(false);  // Close the overlay if clicked outside the content
    }
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {/* Floating Button */}
      <button className="try-admin-button" onClick={toggleOverlay}>
        Try as Admin
      </button>

      {/* Admin Overlay */}
      {isOverlayOpen && (
        <div className="admin-overlay" onClick={handleOverlayClick}>
          <div className="admin-overlay-content">
            <h2 className="admin-overlay-title">Admin Features</h2>
            <p className="admin-overlay-description">You're now testing the admin features!</p>

            <div className="admin-action-section">
              <h3 className="admin-action-title">Create Campaign</h3>
              <p className="admin-action-description">Create a new campaign for building EV charging stations based on crowdsourcing requests.</p>

              {/* Form to create a new campaign */}
              <div className="create-form">
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
                
                {/* Create Campaign Transaction Button */}
                <div className="admin-button-container">
                  <TransactionButton
                    className='admin-button'
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
                    onTransactionConfirmed={(receipt) => {
                      console.log("Transaction confirmed", receipt.transactionHash);
                      refetchAllCampaigns();  // Refetch all campaigns after creating a new campaign
                    }}
                  >
                    Create Campaign
                  </TransactionButton>
                </div>
              </div>

            </div>
            <button className="close-overlay" onClick={toggleOverlay}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOverlayCampaign;
