import React from 'react';
import './LatestChanges.css'; // Import the CSS styles

interface ChangeItem {
  time: string;
  description: string;
}

const changesData: ChangeItem[] = [
  { time: '2 days ago', description: 'New PAT rotation policies preview and optional expiration for fine-grained PATs' },
  { time: '2 days ago', description: 'New Terminology for GitHub Previews' },
  { time: '3 days ago', description: 'New code security configurations let you set security features at the organization level' },
  { time: '3 days ago', description: 'Actions: Runner groups now available for organizations on Free plan' },
];

const TimelineDisplay: React.FC = () => {
  return (
    <div className="latest-changes-container">
      <h4 className="latest-changes-title">Latest changes</h4>
      <ul className="latest-changes-list">
        {changesData.map((change, index) => (
          <li key={index} className="latest-changes-item">
            <span className="dot"></span>
            <div className="change-content">
              <p className="time">{change.time}</p>
              <p className="description">{change.description}</p>
            </div>
          </li>
        ))}
      </ul>
      <a href="#view-changelog" className="view-changelog-link">View changelog →</a>
    </div>
  );
};

export default TimelineDisplay;
