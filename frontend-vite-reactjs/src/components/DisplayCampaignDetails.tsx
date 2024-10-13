import React from 'react';

interface CampaignData {
  name: string;
  description: string;
  goal: string;
  deadline: string;
  owner: string;
  paused: boolean;
  state: number;
}

const DisplayCampaignDetails: React.FC<{ data: CampaignData }> = ({ data }) => {
  if (!data || data.length === 0) return <p>No campaign data available.</p>;

  // Destructure the array values into meaningful variables
  const [name, description, goal, deadline, owner, paused, state] = data;

  return (
    <div>
      <h1>{name}</h1>
      <p>Description: {description}</p>
      <p>Goal: {goal} ETH</p>
      <p>Deadline: {new Date(Number(deadline) * 1000).toLocaleString()}</p>
      <p>Owner: {owner}</p>
      <p>Status: {paused ? 'Paused' : 'Active'}</p>
      <p>State: {getStateName(state)}</p>
    </div>
  );
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
    default:
      return 'Unknown';
  }
};

export default DisplayCampaignDetails;
