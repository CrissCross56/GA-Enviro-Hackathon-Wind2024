import React from 'react';
import "../../pages/HomePage/HomePage";
import './HealthRecComponent.css';

const HealthRecComponent = ({ aqiData }) => {
  // Show a loading message if AQI data hasn't arrived yet
  if (!aqiData) {
    return <div>Loading health recommendations...</div>;
  }

  const aqi = aqiData.aqi;

  // Define recommendations based on AQI levels (1-5 scale)
  let recommendations = [];
  let recommendationClass = '';

  if (aqi === 1) {
    recommendations = [
      { icon: '/icons/enjoyOutdoorActivities.svg', text: 'Enjoy Outdoor Activities' },
      { icon: '/icons/enjoyFreshAir.svg', text: 'Enjoy the Fresh Air' },
    ];
    recommendationClass = 'safe';
  } else if (aqi === 2) {
    recommendations = [
      { icon: '/icons/enjoyOutdoorActivities.svg', text: 'Enjoy Outdoor Activities' },
      { icon: '/icons/enjoyFreshAir.svg', text: 'Enjoy the Fresh Air' },
    ];
    recommendationClass = 'moderate';
  } else if (aqi === 3) {
    recommendations = [
      {
        icon: '/icons/avoidOutdoorActivites.svg',
        text: 'Sensitive groups should reduce outdoor activity',
      },
      {
        icon: '/icons/medical_mask.svg',
        text: 'Sensitive groups should wear a mask outdoors',
      },
    ];
    recommendationClass = 'unhealthy-sensitive';
  } else if (aqi === 4) {
    recommendations = [
      { icon: '/icons/avoidOutdoorActivites.svg', text: 'Avoid outdoor activity' },
      { icon: '/icons/medical_mask.svg', text: 'Wear a mask outdoors' },
    ];
    recommendationClass = 'unhealthy';
  } else if (aqi === 5) {
    recommendations = [
      { icon: '/icons/avoidOutdoors.svg', text: 'Avoid outdoors' },
    ];
    recommendationClass = 'dangerous';
  }

  return (
    <div className="health-rec-card-component">
    <div className="health-rec-card">
      <h1 className="health-rec-title">Health Recommendations</h1>
      <div className={`health-rec-block ${recommendationClass}`}>
        {recommendations.map((rec, index) => (
          <React.Fragment key={index}>
            <div className="health-rec-item">
              <img src={rec.icon} alt="icon" className="health-rec-icon" />
              <p className="health-rec-text">{rec.text}</p>
            </div>
            {index < recommendations.length - 1 && <hr className="health-rec-separator" />}
          </React.Fragment>
        ))}
      </div>
    </div>
    </div>
  );
};

export default HealthRecComponent;