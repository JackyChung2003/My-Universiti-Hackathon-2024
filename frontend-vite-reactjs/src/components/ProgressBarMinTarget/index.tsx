// import React from 'react';
// import './index.css'; // Import CSS file for styling

// interface ProgressBarProps {
//   percentage: number;
// }

// const ProgressBarMinTarget: React.FC<ProgressBarProps> = ({ percentage }) => {
//     const cappedPercentage = Math.min(percentage, 100); // Cap the percentage at 100
//   return (
//     <div className="progress-bar-container">
//       <div
//         className="progress-bar"
//         style={{ width: `${cappedPercentage}%` }}
//       >
//         <span className="progress-text">{percentage}%</span>
//       </div>
//     </div>
//   );
// };

// export default ProgressBarMinTarget;

import React from 'react';
import './index.css'; // Import CSS file for styling

interface ProgressBarProps {
  percentage: number;
  minPercentage: number; // New prop for minimum percentage threshold
}

const ProgressBarMinTarget: React.FC<ProgressBarProps> = ({ percentage, minPercentage }) => {
  const cappedPercentage = Math.min(percentage, 100); // Cap the percentage at 100
  const minPercentagePosition = Math.min(minPercentage, 100); // Ensure minPercentage doesn't exceed 100

  return (
    <div className="progress-bar-container">
      {/* Progress Bar */}
      <div
        className="progress-bar"
        style={{ width: `${cappedPercentage}%` }}
      >
        <span className="progress-text">{percentage}%</span>
      </div>

      {/* Minimum Target Line */}
      <div
        className="min-target-line"
        style={{ left: `${minPercentagePosition}%` }}
      >
        <span className="min-text">{minPercentage}%</span>
      </div>
    </div>
  );
};

export default ProgressBarMinTarget;
