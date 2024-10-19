import React from 'react';
import './index.css'; // Import CSS file for styling

interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
    const cappedPercentage = Math.min(percentage, 100); // Cap the percentage at 100
  return (
    <div className="progress-bar-container">
      <div
        className="progress-bar"
        style={{ width: `${cappedPercentage}%` }}
      >
        <span className="progress-text">{percentage}%</span>
      </div>
    </div>
  );
};

export default ProgressBar;
