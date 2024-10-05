import React, { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, CategoryScale } from "chart.js";
import "../../pages/HomePage/HomePage";
import "./AQIComponent.css";
import AlertPopup from '../AlertPopup/AlertPopup';

// Register the necessary chart elements
Chart.register(ArcElement, CategoryScale);

const AQIComponent = ({ data }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Extract the AQI index from the data prop
  const aqiIndex = data?.aqi;

  // Validate aqiIndex
  if (typeof aqiIndex !== 'number' || aqiIndex < 1 || aqiIndex > 6) {
    console.error("Invalid or missing aqiIndex", aqiIndex);
    return (
      <div className="aqi-error-message">
        <h1>Error: AQI index is invalid or not available</h1>
        <p>
          The AQI index provided is invalid or not available. Please check the
          data source.
        </p>
      </div>
    );
  }

  const mapIndexToAQI = (index) => {
    const aqiRanges = [
      { min: 0, max: 50 },     // Index 1: Good
      { min: 51, max: 100 },   // Index 2: Moderate
      { min: 101, max: 150 },  // Index 3: Unhealthy for Sensitive Groups
      { min: 151, max: 200 },  // Index 4: Unhealthy
      { min: 201, max: 300 },  // Index 5: Very Unhealthy
      { min: 301, max: 500 },  // Index 6: Hazardous
    ];

    if (typeof index !== 'number' || index < 1 || index > 6) {
      return null;
    }

    const range = aqiRanges[index - 1];
    const { min, max } = range;
    const midpoint = (min + max) / 2;
    const variation = (Math.random() - 0.5) * (max - min) * 0.2;
    const aqiValue = Math.round(Math.max(min, Math.min(midpoint + variation, max)));

    return aqiValue;
  };

  const getColorForAQIIndex = (index) => {
    switch (index) {
      case 1:
        return "rgb(128, 190, 158)"; // Dark Green (Good/Safe)
      case 2:
        return "rgb(183, 232, 191)"; // Light Green (Moderate)
      case 3:
        return "rgb(234, 209, 163)"; // Yellow (Unhealthy for Sensitive Groups)
      case 4:
        return "rgb(234, 177, 155)"; // Orange (Unhealthy)
      case 5:
        return "rgb(184, 163, 214)"; // Purple (Hazardous)
      case 6:
        return "rgb(184, 163, 214)"; // Purple (Hazardous)
      default:
        return "#7ec8a9"; // Default color if index is invalid
    }
  };

  const aqiValue = mapIndexToAQI(aqiIndex);

  if (aqiValue === null || aqiValue < 0 || aqiValue > 500) {
    console.error("Invalid or missing AQI value. It must be between 0 and 500.");
    return (
      <div className="aqi-error-message">
        <h1>Error: AQI value out of range or not available</h1>
        <p>
          The AQI value provided is invalid or not available. Please check the
          data source.
        </p>
      </div>
    );
  }

  const aqiColor = getColorForAQIIndex(aqiIndex);

  const chartData = {
    datasets: [
      {
        data: [aqiValue, 500 - aqiValue], // AQI value and remaining to 500
        backgroundColor: [aqiColor, "#e0e0e0"], // Use the mapped color
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
    layout: {
      padding: {
        bottom: 20, // Add padding at the bottom for the labels
      },
    },
    elements: {
      arc: {
        borderWidth: 0, // Remove arc border
      },
    },
  };

  return (
    <div className="aqi-card">
      <div className="aqi-card-updated">
        <h1 className="aqi-title">Air Quality Index</h1>
        <div style={{ position: "relative", height: "150px" }}>
          <Doughnut data={chartData} options={options} />
          <div className="aqi-text-updated">
            <h2 className="aqi-number">{aqiValue}</h2>
            <p className="aqi-status">{aqiIndex < 3 ? "GOOD" : aqiIndex === 3 ? "MODERATE" : "VERY UNHEALTHY"}</p>
          </div>
        </div>
        <div className="aqi-bottom-labels">
          <span className="aqi-min-label">0</span>
          <span className="aqi-max-label">500</span>
        </div>
        <div className="aqi-description">
          <p>Air quality is considered satisfactory for sensitive groups, with health risks increasing beyond this level.</p>
        </div>
        <div className="aqi-button-container">
          <button className="aqi-alert-button-updated" onClick={() => setIsPopupVisible(true)}>
            Create Alerts for AQI Changes
          </button>
          <br />
          <button className="aqi-learn-button-updated">
            Learn more about AQI
          </button>
        </div>
      </div>

      {isPopupVisible && (
        <AlertPopup onClose={() => setIsPopupVisible(false)} /> // Show AlertPopup if isPopupVisible is true
      )}
    </div>
  );
};

export default AQIComponent;