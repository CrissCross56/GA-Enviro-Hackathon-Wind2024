import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import "./AQIComponent.css";

// Register the ArcElement for Chart.js
Chart.register(ArcElement);

const AQIComponent = ({ data }) => {
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

  // Function to map AQI index (1-6) to AQI value (0-500)
  const mapIndexToAQI = (index) => {
    const aqiRanges = [
      { min: 0, max: 50 },     // Index 1: Good
      { min: 51, max: 100 },   // Index 2: Moderate
      { min: 101, max: 150 },  // Index 3: Unhealthy for Sensitive Groups
      { min: 151, max: 200 },  // Index 4: Unhealthy
      { min: 201, max: 300 },  // Index 5: Very Unhealthy
      { min: 301, max: 500 },  // Index 6: Hazardous
    ];

    // Validate index within range
    if (typeof index !== 'number' || index < 1 || index > 6) {
      return null; // Invalid index
    }

    const range = aqiRanges[index - 1];
    const { min, max } = range;

    // Calculate the midpoint of the range
    const midpoint = (min + max) / 2;

    // Add a variation to avoid even hundreds (±10% of the range)
    const variation = (Math.random() - 0.5) * (max - min) * 0.2;

    // Calculate the AQI value and ensure it's within the range
    const aqiValue = Math.round(Math.max(min, Math.min(midpoint + variation, max)));

    return aqiValue;
  };

  // Function to map AQI index to color codes
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

  // Map the AQI index to the AQI value
  const aqiValue = mapIndexToAQI(aqiIndex);

  // Check if AQI value is available and valid
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

  // Get the corresponding color for the AQI index
  const aqiColor = getColorForAQIIndex(aqiIndex);

  // Function to get AQI status based on the index
  const getAQIStatus = (index) => {
    switch (index) {
      case 1:
        return "GOOD";
      case 2:
        return "MODERATE";
      case 3:
        return "UNHEALTHY FOR SENSITIVE GROUPS";
      case 4:
        return "UNHEALTHY";
      case 5:
        return "VERY UNHEALTHY";
      case 6:
        return "HAZARDOUS";
      default:
        return "UNKNOWN";
    }
  };

  // Function to get AQI description based on the index
  const getAQIDescription = (index) => {
    switch (index) {
      case 1:
        return "Air quality is considered satisfactory, and air pollution poses little or no risk.";
      case 2:
        return "Air quality is acceptable; however, some pollutants may pose a moderate health concern.";
      case 3:
        return "Members of sensitive groups may experience health effects. The general public is less likely to be affected.";
      case 4:
        return "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.";
      case 5:
        return "Health alert: The risk of health effects is increased for everyone.";
      case 6:
        return "Health warnings of emergency conditions. The entire population is more likely to be affected.";
      default:
        return "Air quality data is not available.";
    }
  };

  // Generate AQI description and status based on the AQI index
  const aqiDescription = getAQIDescription(aqiIndex);
  const aqiStatus = getAQIStatus(aqiIndex);

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
  };

  return (
    <div className="aqi-card-updated">
      <h1 className="aqi-title">Air Quality Index</h1>
      <div style={{ position: "relative", height: "150px" }}>
        <Doughnut data={chartData} options={options} />
        <div className="aqi-text-updated">
          <h2 className="aqi-number">{aqiValue}</h2>
          <p className="aqi-status">{aqiStatus}</p>
        </div>
      </div>
      <div className="aqi-description">
        <p>{aqiDescription}</p>
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