import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./ActiveChargingSessionPage.css";

const ActiveChargingSessionPage: React.FC = () => {
  const [chargeTime, setChargeTime] = useState(0);           // Time spent charging in seconds
  const [batteryLevel, setBatteryLevel] = useState(20);      // Starting battery percentage
  const [isCharging, setIsCharging] = useState(true);
  const [estimatedCost, setEstimatedCost] = useState(0);     // Estimated cost
  const [energyConsumed, setEnergyConsumed] = useState(0);   // Energy consumed in kWh
  const chargingRate = 0.20;  // Example rate in $/kWh
  const maxBatteryLevel = 100; // Max battery level percentage
  const chargingSpeed = 0.5;   // Charging speed in % per minute
  const energyPerPercent = 0.2; // Energy consumed per 1% charge in kWh

  const { placeId } = useParams<{ placeId: string }>();
  const navigate = useNavigate();

  // Update charging session data
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCharging && batteryLevel < maxBatteryLevel) {
      timer = setInterval(() => {
        setChargeTime((prevTime) => prevTime + 1);

        // Update battery level and calculate energy consumed and estimated cost
        setBatteryLevel((prevBattery) => Math.min(prevBattery + (chargingSpeed / 60), maxBatteryLevel));
        setEnergyConsumed((prevEnergy) => prevEnergy + (chargingSpeed / 60) * energyPerPercent);
        setEstimatedCost((prevCost) => prevCost + (chargingSpeed / 60) * energyPerPercent * chargingRate);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCharging, batteryLevel]);

  // Estimated time remaining to reach full charge
  const estimatedTimeToFull = ((maxBatteryLevel - batteryLevel) / chargingSpeed) * 60; // in seconds
  const estimatedTimeToFullFormatted = new Date(estimatedTimeToFull * 1000).toISOString().substr(11, 8); // Format to HH:MM:SS

  const handleEndCharging = () => {
    setIsCharging(false);
    alert(`Charging ended. Total time: ${chargeTime} seconds`);
    navigate(`/charging-station/${placeId}/payment-summary`, {
      state: {
        chargeTime: new Date(chargeTime * 1000).toISOString().substr(11, 8), // Format to HH:MM:SS
        energyConsumed: `${energyConsumed.toFixed(2)} kWh`,
        totalCost: `$${estimatedCost.toFixed(2)}`,
        batteryLevel: `${Math.round(batteryLevel)}%`
      }
    });
  };

  return (
    <div className="charging-session-container">
      <h2>Active Charging Session</h2>
      <div className="session-details">
        <p><strong>Charge Time:</strong> {new Date(chargeTime * 1000).toISOString().substr(11, 8)}</p>
        <p><strong>Battery Level:</strong> {Math.round(batteryLevel)}%</p>
        <p><strong>Estimated Time to Full Charge:</strong> {estimatedTimeToFullFormatted}</p>
        <p><strong>Energy Consumed:</strong> {energyConsumed.toFixed(2)} kWh</p>
        <p><strong>Estimated Cost:</strong> ${estimatedCost.toFixed(2)}</p>
      </div>
      <button className="end-button" onClick={handleEndCharging}>
        End Charging
      </button>
    </div>
  );
};

export default ActiveChargingSessionPage;
