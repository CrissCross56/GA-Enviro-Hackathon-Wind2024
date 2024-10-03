import React from 'react';
import './HealthRecComponent.css';

const HealthRecComponent = () => {
  // Hardcoded AQI value (replace with actual data)
  const aqi = 90;

  // Define different scenarios based on AQI levels
  let recommendations = [];
  let recommendationClass = '';

  if (aqi <= 50) {
    recommendations = [
      { icon: '🌳', text: 'You may go outdoors' },
      { icon: '🚴‍♂️', text: 'Outdoor activities are safe' }
    ];
    recommendationClass = 'safe';
  } else if (aqi > 50 && aqi <= 100) {
    recommendations = [
      { icon: '🏃‍♀️', text: 'Reduce prolonged outdoor exertion' },
      { icon: '🚴‍♂️', text: 'Limit intense outdoor activities' }
    ];
    recommendationClass = 'caution';
  } else if (aqi > 100 && aqi <= 150) {
    recommendations = [
      { icon: '😷', text: 'Consider wearing a mask outdoors' },
      { icon: '🏃‍♀️', text: 'Avoid prolonged outdoor exertion' }
    ];
    recommendationClass = 'caution';
  } else if (aqi > 150 && aqi <= 200) {
    recommendations = [
      { icon: '😷', text: 'Wear a mask outdoors' },
      { icon: '🏠', text: 'Stay indoors if possible' }
    ];
    recommendationClass = 'hazard';
  } else {
    recommendations = [
      { icon: '🚫', text: 'Avoid going outdoors' },
      { icon: '🏠', text: 'Stay indoors and close windows' }
    ];
    recommendationClass = 'hazard';
  }

  return (
    <div className="health-rec-container">
      <h2 className="health-rec-title">Health Recommendations</h2>
      <div className="health-rec-card">
        {recommendations.map((rec, index) => (
          <div key={index} className={`health-rec-item ${recommendationClass}`}>
            <div className="health-rec-icon">
              <span role="img" aria-label={rec.text}>{rec.icon}</span>
            </div>
            <div className="health-rec-text">{rec.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthRecComponent;