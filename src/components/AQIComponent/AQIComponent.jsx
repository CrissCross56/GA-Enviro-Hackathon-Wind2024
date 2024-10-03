import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import "./AQIComponent.css";

// Register the component for Chart.js
Chart.register(ArcElement);

const AQIComponent = ({ data }) => {
  // Extract the AQI value from the data prop
  const aqiValue = data?.aqi;

  // Function to get AQI status based on the value
  const getAQIStatus = (value) => {
    if (value <= 50) return "GOOD";
    if (value <= 100) return "MODERATE";
    if (value <= 150) return "UNHEALTHY FOR SENSITIVE GROUPS";
    if (value <= 200) return "UNHEALTHY";
    if (value <= 300) return "VERY UNHEALTHY";
    return "HAZARDOUS";
  };

  // Function to get AQI description based on the value
  const getAQIDescription = (value) => {
    if (value <= 50)
      return "Air quality is considered satisfactory, and air pollution poses little or no risk.";
    if (value <= 100)
      return "Air quality is acceptable; however, some pollutants may pose a moderate health concern.";
    if (value <= 150)
      return "Members of sensitive groups may experience health effects. The general public is less likely to be affected.";
    if (value <= 200)
      return "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.";
    if (value <= 300)
      return "Health alert: The risk of health effects is increased for everyone.";
    return "Health warnings of emergency conditions. The entire population is more likely to be affected.";
  };

  // Check if AQI value is available and valid
  if (aqiValue === undefined || aqiValue < 0 || aqiValue > 500) {
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

  // Generate AQI description based on the AQI value
  const aqiDescription = getAQIDescription(aqiValue);

  const chartData = {
    datasets: [
      {
        data: [aqiValue, 500 - aqiValue], // AQI value and remaining to 500
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

  return (
    <div className="aqi-card-updated">
      <h1 className="aqi-title">Air Quality Index</h1>
      <div style={{ position: "relative", height: "150px" }}>
        <Doughnut data={chartData} options={options} />
        <div className="aqi-text-updated">
          <h2 className="aqi-number">{aqiValue}</h2>
          <p className="aqi-status">{getAQIStatus(aqiValue)}</p>
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