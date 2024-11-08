// PaymentSummaryPage.tsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./PaymentSummaryPage.css";

const PaymentSummaryPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure the location state with proper default values
  const {
    chargeTime = '01:25:30',                // Total charge time formatted as HH:MM:SS
    powerRating = 7.4,                       // Power rating in kW
    chargingRate = 0.20,                     // Charging rate in $ per kWh
    startTime = '14:35',                     // Start time in HH:MM format
    endTime = '16:00',                       // End time in HH:MM format
    energyConsumed,                          // Energy consumed, if provided
    totalCost,                               // Total cost, calculated if not provided
  } = location.state || {};

  // Convert chargeTime from HH:MM:SS to hours
  const [hours, minutes, seconds] = chargeTime.split(':').map(Number);
  const chargeTimeInHours = hours + minutes / 60 + seconds / 3600;

  // Calculate energyConsumed if not provided
  const calculatedEnergyConsumed = energyConsumed || (powerRating * chargeTimeInHours).toFixed(2);

  // Calculate total cost if not provided
  const calculatedTotalCost = totalCost || `$${(Number(calculatedEnergyConsumed) * chargingRate).toFixed(2)}`;

  return (
    <div style={{ textAlign: 'center', padding: '20px', height: 'calc(100dvh - 110px)' }}>
      <h1>Payment Summary</h1>
      <div style={{ marginTop: '20px', textAlign: 'left' }}>
        <p><strong>Start Time:</strong> {startTime}</p>
        <p><strong>End Time:</strong> {endTime}</p>
        <p><strong>Charge Time:</strong> {chargeTime}</p>
        <p><strong>Power Rating:</strong> {powerRating} kW</p>
        <p><strong>Energy Consumed:</strong> {calculatedEnergyConsumed} kWh</p>
        <p><strong>Charging Rate:</strong> ${chargingRate.toFixed(2)}/kWh</p>
        <p><strong>Total Cost:</strong> {calculatedTotalCost}</p>
      </div>
      <button
        onClick={() => navigate('/')}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Return to Home
      </button>
    </div>
  );
};

export default PaymentSummaryPage;
