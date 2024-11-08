import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./ChargingStationDetail.css";  // Updated to match CSS file name

interface LocationData {
  name: string;
  vicinity: string;
  photoUrl: string;
}

const ChargingStationDetail: React.FC = () => {
  const { placeId } = useParams<{ placeId: string }>();
  const navigate = useNavigate();

  // Set default dummy data for the charging station
  const locationData: LocationData = {
    name: 'Dummy Charging Station',
    vicinity: '123 Placeholder Ave, City Center',
    photoUrl: 'https://via.placeholder.com/400x300',
  };

  const handleStartCharging = () => {
    navigate(`/charging-station/${placeId}/active-charging-session`);
  };

  return (
    <div className="container">
      <h2><strong>{locationData.name}</strong></h2>
      <p>Address: {locationData.vicinity}</p>
      <img
        src={locationData.photoUrl}
        alt={locationData.name}
        className="charging-station-image"
      />
      <div className="info-details">
        <p><strong>Cost per minute:</strong> $0.20</p>
        <p><strong>Voltage:</strong> 220V</p>
        <p><strong>Amperage:</strong> 30A</p>
        <p><strong>Connector Type:</strong> Type 2</p>
      </div>
      <button onClick={handleStartCharging} className="start-button">
        Start Charging
      </button>
    </div>
  );
};

export default ChargingStationDetail;
