import React, { useState } from 'react';
import './index.css';  // Assuming you want to use CSS for styles
import { TransactionButton } from 'thirdweb/react';
import { prepareContractCall } from 'thirdweb';
import { CONTRACT } from '../../utils/constants';

// finalizeCampaign -> auto capture campaign address
// togglePause -> auto capture campaign address
// extendDeadline -> auto capture campaign address + manual input deadline
// refund -> auto capture campaign address
// createRequestForCampaign -> auto capture campaign address + manual input request details
// finalizeRequest -> auto capture campaign address + manual input request index


interface AdminOverlayCampaignDetailsProps {
  campaignAddress: string;
  refetchAllCampaignsDonors: () => void;
  refetchCampaignBalance: () => void;
  refetchAllCampaignsRequests: () => void;
  refetchAllRequestsDetails1: () => void;
  refetchAllRequestsDetails2: () => void;
  refetchAllRequestsDetails3: () => void;
  refetchAllRequestsDetails4: () => void;
  refetchAllRequestsDetails5: () => void;
  refetchAllRequestsDetails6: () => void;
  refetchAllRequestsDetails7: () => void;
  refetchAllRequestsDetails8: () => void;
  refetchAllRequestsDetails9: () => void;
  refetchAllRequestsDetails10: () => void;
}
    const AdminOverlayCampaignDetails: React.FC<AdminOverlayCampaignDetailsProps> = ({
      campaignAddress,
      refetchAllCampaignsDonors,
      refetchCampaignBalance,
      refetchAllCampaignsRequests,
      refetchAllRequestsDetails1,
      refetchAllRequestsDetails2,
      refetchAllRequestsDetails3,
      refetchAllRequestsDetails4,
      refetchAllRequestsDetails5,
      refetchAllRequestsDetails6,
      refetchAllRequestsDetails7,
      refetchAllRequestsDetails8,
      refetchAllRequestsDetails9,
      refetchAllRequestsDetails10,
    }) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [form, setForm] = useState({
    requestTitle: "",
    requestDescription: "",
    requestAmount: "",
    requestRecipient: "",
    requestDeadline: "",
    processingDeadline: "",
    requiredApprovalsPercentage: "51",
    deadline: "",
    newDeadline: "",
    requestIndex: "",
  });


  // Toggle the overlay visibility
  const toggleOverlay = () => {
    setIsOverlayOpen(!isOverlayOpen);
  };

  // Handle clicks outside of the content to close the overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsOverlayOpen(false);  
    }
  };

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Refetch all necessary data after a successful transaction
  const refetchAllData = () => {
    refetchAllCampaignsDonors();
    refetchCampaignBalance();
    refetchAllCampaignsRequests();
    refetchAllRequestsDetails1();
    refetchAllRequestsDetails2();
    refetchAllRequestsDetails3();
    refetchAllRequestsDetails4();
    refetchAllRequestsDetails5();
    refetchAllRequestsDetails6();
    refetchAllRequestsDetails7();
    refetchAllRequestsDetails8();
    refetchAllRequestsDetails9();
    refetchAllRequestsDetails10();
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

            {/* Finalize Campaign Section */}
            <div className="admin-action-section">
              <h3 className="admin-action-title">Finalize Campaign</h3>
              <p className="admin-action-description">Finalize the campaign to stop accepting new funders</p>
              <p className='admin-action-description'>The funders can still withdraw their funds if the campaign is not finalized</p>
              <p className='admin-action-description'>The campaign can only create requests after being finalized</p>
              <p className='admin-action-description'>The campaign status will become success if the target is reached</p>
              <div className="create-form">
                
                <div className="admin-button-container">
                  <TransactionButton
                    transaction={() =>
                      prepareContractCall({
                        contract: CONTRACT,
                        method: "finalizeCampaign",
                        params: [campaignAddress],
                      })
                    }
                    onTransactionConfirmed={() => refetchAllData()}
                  >
                    Finalize Campaign
                  </TransactionButton>
                </div>
              </div>
            </div>

            {/* Toggle Pause Section */}
            <div className="admin-action-section">
              <h3 className="admin-action-title">Toggle Pause for this Campaign</h3>
              <p className="admin-action-description">Pause or resume the campaign</p>
              <div className="create-form">
                
                <div className="admin-button-container">
                  <TransactionButton
                    transaction={() =>
                      prepareContractCall({
                        contract: CONTRACT,
                        method: "togglePause",
                        params: [campaignAddress],
                      })
                    }
                    onTransactionConfirmed={() => refetchAllData()}
                  >
                    Toggle Pause
                  </TransactionButton>
                </div>
              </div>
            </div>

            {/* Extend Deadline Section */}
            <div className="admin-action-section">
              <h3 className="admin-action-title">Extend Deadline for this Campaign</h3>
              <p className="admin-action-description">Extend the deadline for the campaign</p>
              <div className="create-form">
                <input
                  type="number"
                  name="newDeadline"
                  placeholder="New Deadline (days)"
                  value={form.newDeadline}
                  onChange={handleChange}
                />
                
                <div className="admin-button-container">
                  <TransactionButton
                    transaction={() =>
                      prepareContractCall({
                        contract: CONTRACT,
                        method: "extendDeadline",
                        params: [campaignAddress, BigInt(Number(form.newDeadline))],
                      })
                    }
                    onTransactionConfirmed={() => refetchAllData()}
                    >
                    Extend Deadline
                  </TransactionButton>
                  </div>
              </div>
            </div>

            {/* Refund Section */}
            <div className="admin-action-section">
              <h3 className="admin-action-title">Refund Campaign</h3>
              <p className="admin-action-description">Refund all funders if the campaign is failed</p>
              <div className="create-form">
                
                <div className="admin-button-container">
                  <TransactionButton
                    transaction={() =>
                      prepareContractCall({
                        contract: CONTRACT,
                        method: "refund",
                        params: [campaignAddress],
                      })
                    }
                    onTransactionConfirmed={() => refetchAllData()}
                  >
                    Refund
                  </TransactionButton>
                </div>
              </div>
            </div>

              {/* Create Request for Campaign Section */}
            <div className="admin-action-section">
              <h3 className="admin-action-title">Create Request for Campaign</h3>
              <p className="admin-action-description">Create a new request for a campaign, to request voting from funder to approve the usage of funds.</p>
              <p className="admin-action-description">The fund is directly sent to the vendor, if the request is approved by the funder to ensure transparency and accountability.</p>

              {/* Form to create a new request for a campaign */}
              <div className="create-form">
                <input
                  type="text"
                  name="requestTitle"
                  placeholder="Request Title"
                  value={form.requestTitle}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="requestDescription"
                  placeholder="Request Description"
                  value={form.requestDescription}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="requestRecipient"
                  placeholder="Request Recipient Address"
                  value={form.requestRecipient}
                  onChange={handleChange}
                />
                <input
                  type="text"
                  name="requestAmount"
                  placeholder="Amount Used in this request (ETH)"
                  value={form.requestAmount}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="requestDeadline"
                  placeholder="Request Deadline (days needed for user to approve request)"
                  value={form.requestDeadline}
                  onChange={handleChange}
                />
                <input
                  type="number"
                  name="processingDeadline"
                  placeholder="Processing Deadline (days needed for admin to process request, after request deadline)"
                  value={form.processingDeadline}
                  onChange={handleChange}
                />
                {/* Slider for Required Approvals Percentage */}
                <label className="slider-label" htmlFor="requiredApprovalsPercentage">
                  Required Approvals Percentage: {form.requiredApprovalsPercentage}%
                </label>
                <input
                  type="range"
                  name="requiredApprovalsPercentage"
                  min="0"
                  max="100"
                  value={form.requiredApprovalsPercentage}
                  onChange={handleChange}
                />
                
                <div className="admin-button-container">
                <TransactionButton
                  transaction={() =>
                    prepareContractCall({
                      contract: CONTRACT,
                      method: "createRequestForCampaign",
                      params: [
                        campaignAddress,
                        form.requestTitle,
                        form.requestDescription,
                        form.requestRecipient,
                        BigInt(Number(form.requestAmount) * 1000000000000000000), // Amount in wei
                        BigInt(Number(form.requestDeadline)),
                        BigInt(Number(form.processingDeadline)),
                        BigInt(Number(form.requiredApprovalsPercentage)),
                      ],
                    })
                  }
                  onTransactionConfirmed={() => refetchAllData()}
                >
                  Create Request
                </TransactionButton>
              </div>
            </div>

            {/* Finalize Request Section */}
            <div className="admin-action-section">
              <h3 className="admin-action-title">Finalize Request</h3>
              <p className="admin-action-description">Finalize a request to send the funds to the recipient</p>
              <div className="create-form">
                <input
                  type="number"
                  name="requestIndex"
                  placeholder="Request Index"
                  value={form.requestIndex}
                  onChange={handleChange}
                />
                  <div className="admin-button-container">
                    <TransactionButton
                      transaction={() =>
                        prepareContractCall({
                          contract: CONTRACT,
                          method: "finalizeRequest",
                          params: [campaignAddress, BigInt(Number(form.requestIndex))],
                        })
                      }
                      onTransactionConfirmed={() => refetchAllData()}
                    >
                      Finalize Request
                    </TransactionButton>
                  </div>
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

export default AdminOverlayCampaignDetails;
