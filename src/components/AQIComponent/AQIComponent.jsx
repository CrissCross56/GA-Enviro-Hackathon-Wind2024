import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import "./AQIComponent.css"; 

// Register the component for Chart.js
Chart.register(ArcElement);

const AQIComponent = () => {
  const aqiValue = 250; // aqi value
  const aqiDescription = "This is good. This is good. This is good..."; // AQI description is declared here

  // Check if AQI value is within the valid range (0-500)
  if (aqiValue < 0 || aqiValue > 500) {
    console.error("Invalid AQI value. It must be between 0 and 500.");
    return (
      <div className="aqi-error-message">
        <h1>Error: AQI value out of range</h1>
        <p>The AQI value provided is invalid. Please check the data source.</p>
      </div>
    );
  }

  const data = {
    datasets: [
      {
        data: [aqiValue, 500 - aqiValue], // Air Quality Index, remaining part to complete the circle
        backgroundColor: ["#7ec8a9", "#e0e0e0"], // Adjust colors
        borderWidth: 0, // Remove the border
        cutout: "80%", // Inner radius
        rotation: -90, // Start angle
        circumference: 180, // Sweep angle (half-circle)
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    rotation: -Math.PI, // Start angle (half-circle)
    circumference: Math.PI, // End angle (half-circle)
    plugins: {
      tooltip: { enabled: false }, // Disable tooltip
    },
  };

  const getAQIStatus = (value) => {
    if (value <= 50) return "GOOD";
    if (value <= 100) return "MODERATE";
    if (value <= 150) return "UNHEALTHY FOR SENSITIVE GROUPS";
    if (value <= 200) return "UNHEALTHY";
    if (value <= 300) return "VERY UNHEALTHY";
    return "HAZARDOUS";
  };

  return (
    <div className="aqi-card-updated">
      <h1 className="aqi-title">Air Quality Index</h1> {/* Add title */}
      <div style={{ position: "relative", height: "150px" }}>
        <Doughnut data={data} options={options} />
        <div className="aqi-text-updated">
          <h2 className="aqi-number">{aqiValue}</h2>
          <p className="aqi-status">{getAQIStatus(aqiValue)}</p>
        </div>
      </div>
      <div className="aqi-description">
        <p>{aqiDescription}</p> {/* Display the dynamic description */}
      </div>
      <div className="aqi-button-container">
        <button className="aqi-alert-button-updated">
          Create Alerts for AQI Changes
        </button>
        <br />
        <button className="aqi-learn-button-updated">
          Learn more about AQI
        </button>
      </div>
    </div>
  );
};

export default AQIComponent;