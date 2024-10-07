import React, { useState, useEffect } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, CategoryScale } from "chart.js";
import "../../pages/HomePage/HomePage";
import "./AQIComponent.css";
import AlertPopup from "../AlertPopup/AlertPopup";

// Register the necessary chart elements
Chart.register(ArcElement, CategoryScale);

const AQIComponent = ({ data, onAlertCreate }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [aqiValue, setAqiValue] = useState(null);

  // Extract the AQI index from the data prop
  const aqiIndex = data?.aqi;

  // Map index to AQI value
  const mapIndexToAQI = (index) => {
    const aqiRanges = [
      { min: 0, max: 50 }, // Index 1: Good
      { min: 51, max: 100 }, // Index 2: Moderate
      { min: 101, max: 150 }, // Index 3: Unhealthy for Sensitive Groups
      { min: 151, max: 200 }, // Index 4: Unhealthy
      { min: 201, max: 300 }, // Index 5: Very Unhealthy
      { min: 301, max: 500 }, // Index 6: Hazardous
    ];

    if (typeof index !== "number" || index < 1 || index > 6) {
      return null;
    }

    const range = aqiRanges[index - 1];
    const { min, max } = range;
    const midpoint = (min + max) / 2;
    const variation = (Math.random() - 0.5) * (max - min) * 0.2;
    const aqiValue = Math.round(
      Math.max(min, Math.min(midpoint + variation, max))
    );

    return aqiValue;
  };

  // Get color for AQI index
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
      case 6:
        return "rgb(184, 163, 214)"; // Purple (Very Unhealthy/Hazardous)
      default:
        return "#7ec8a9"; // Default color if index is invalid
    }
  };

  // Get description for AQI index
  const getDescriptionForAQIIndex = (index) => {
    switch (index) {
      case 1:
        return "Air quality is considered satisfactory, and air pollution poses little or no risk.";
      case 2:
        return "Air quality is acceptable; however, there may be a moderate health concern for a very small number of people.";
      case 3:
        return "Members of sensitive groups may experience health effects. The general public is not likely to be affected.";
      case 4:
        return "Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.";
      case 5:
        return "Health alert: everyone may experience more serious health effects.";
      case 6:
        return "Health warnings of emergency conditions. The entire population is more likely to be affected.";
      default:
        return "Air quality information is unavailable.";
    }
  };

  // Update aqiValue whenever aqiIndex changes
  useEffect(() => {
    if (typeof aqiIndex === "number" && aqiIndex >= 1 && aqiIndex <= 6) {
      const newAqiValue = mapIndexToAQI(aqiIndex);
      setAqiValue(newAqiValue);
    } else {
      setAqiValue(null); // Reset aqiValue if aqiIndex is invalid
    }
  }, [aqiIndex]); // Use 'aqiIndex' as dependency

  // Now validate aqiIndex and aqiValue after hooks
  if (typeof aqiIndex !== "number" || aqiIndex < 1 || aqiIndex > 6) {
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

  if (aqiValue === null || aqiValue < 0 || aqiValue > 500) {
    console.error(
      "Invalid or missing AQI value. It must be between 0 and 500."
    );
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
  const aqiDescription = getDescriptionForAQIIndex(aqiIndex);

  const chartData = {
    datasets: [
      {
        data: [aqiValue, 500 - aqiValue],
        backgroundColor: [aqiColor, "#e0e0e0"],
        borderWidth: 0,
        cutout: "90%", // Increase this value to make the chart thinner
        rotation: -90,
        circumference: 180,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    rotation: -Math.PI,
    circumference: Math.PI,
    plugins: {
      tooltip: { enabled: false },
    },
    layout: {
      padding: {
        bottom: 20,
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };

  // Function to close the popup and trigger the notification
  const handleClosePopup = () => {
    setIsPopupVisible(false);
    if (onAlertCreate) {
      onAlertCreate(); // Trigger the notification in HomePage
    }
  };

  return (
    <div className="aqi-card">
      <div className="aqi-card-updated">
        <h1 className="aqi-title">Air Quality Index</h1>
        <div style={{ position: "relative", height: "150px" }}>
          <Doughnut data={chartData} options={options} />
          <div className="aqi-text-updated">
            <h2 className="aqi-number">{aqiValue}</h2>
            <p className="aqi-status">
              {aqiIndex === 1
                ? "GOOD"
                : aqiIndex === 2
                ? "MODERATE"
                : aqiIndex === 3
                ? "UNHEALTHY FOR SENSITIVE GROUPS"
                : aqiIndex === 4
                ? "UNHEALTHY"
                : aqiIndex === 5
                ? "VERY UNHEALTHY"
                : "HAZARDOUS"}
            </p>
          </div>
        </div>
        <div className="aqi-bottom-labels">
          <span className="aqi-min-label">0</span>
          <span className="aqi-max-label">500</span>
        </div>
        <div className="aqi-description">
          <p>{aqiDescription}</p>
        </div>
        <div className="aqi-button-container">
          <button
            className="aqi-alert-button-updated"
            onClick={() => setIsPopupVisible(true)}
          >
            Create Alerts for AQI Changes
          </button>
          <br />
          <button
            className="aqi-learn-button-updated"
            onClick={() =>
              window.open(
                "https://openweathermap.org/api/air-pollution",
                "_blank"
              )
            }
          >
            Learn more about AQI
          </button>
        </div>
      </div>

      {isPopupVisible && <AlertPopup onClose={handleClosePopup} />}
    </div>
  );
};

export default AQIComponent;
