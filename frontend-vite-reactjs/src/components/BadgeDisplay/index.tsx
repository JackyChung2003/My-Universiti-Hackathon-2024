import React from 'react';
import './index.css';

// Enum for campaign states
export enum CampaignState {
    Active,
    Successful,
    Failed,
    Paused,
    Canceled,
    Finalized,
    Expired,
}

interface CampaignStatusBadgeProps {
    campaignState: CampaignState;
    isPaused: boolean;
    investorCount: number;
}

const CampaignStatusBadge: React.FC<CampaignStatusBadgeProps> = ({ campaignState, isPaused, investorCount }) => {
  // Helper function to get human-readable state
  const getStateName = (state: CampaignState): string => {
    switch (state) {
      case CampaignState.Active:
        return 'Active';
      case CampaignState.Successful:
        return 'Successful';
      case CampaignState.Failed:
        return 'Failed';
      case CampaignState.Paused:
        return 'Paused';
      case CampaignState.Canceled:
        return 'Canceled';
      case CampaignState.Finalized:
        return 'Finalized';
      case CampaignState.Expired:
        return 'Expired';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="campaign-status-badge">
      <div className={`status-badge ${getStateName(campaignState).toLowerCase()}`}>
        <p>Status: {getStateName(campaignState)}</p>
      </div>
    
      <div className={`ispaused-badge ${isPaused ? 'paused' : 'active'}`}>
        <p> {isPaused ? 'Paused' : 'Not paused'}</p>
      </div>
      <div className="investor-badge">
        <p className="investor-text"><strong>{investorCount}</strong> people funded</p>
      </div>
    </div>
  );
};

export default CampaignStatusBadge;
