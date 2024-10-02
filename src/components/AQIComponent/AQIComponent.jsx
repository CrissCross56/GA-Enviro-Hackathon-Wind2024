import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import "./AQIComponent.css"; // Import the updated CSS file

// Register the component for Chart.js
Chart.register(ArcElement);

const AQIComponent = () => {
  const data = {
    datasets: [
      {
        data: [87, 100 - 87], // Air Quality Index, remaining part to complete the circle
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
      <h1 className="aqi-title">Air Quality Index</h1> {/* Add title */}
      <div style={{ position: "relative", height: "150px" }}>
        <Doughnut data={data} options={options} />
        <div className="aqi-text-updated">
          <h2 className="aqi-number">87</h2>
          <p className="aqi-status">GOOD</p>
        </div>
      </div>
      <div className="aqi-description">
        <p>This is good. This is good. This is good...</p>
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