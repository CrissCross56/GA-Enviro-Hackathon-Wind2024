import React from 'react';
import './HealthRecComponent.css'; // Import your CSS for styling

const HealthRecComponent = () => {
  // Replace with your actual AQI data
  const aqi = 330;

  // Define different scenarios based on AQI levels
  let recommendations = [];
  let recommendationClass = '';

  if (aqi <= 50) {
    recommendations = [
      { icon: '/icons/enjoyOutdoorActivities.svg', text: 'Enjoy Outdoor Activities' },
      { icon: '/icons/enjoyFreshAir.svg', text: 'Enjoy the Fresh Air' },
    ];
    recommendationClass = 'safe';
  } else if (aqi > 50 && aqi <= 100) {
    recommendations = [
      { icon: '/icons/enjoyOutdoorActivities.svg', text: 'Enjoy Outdoor Activities' },
      { icon: '/icons/enjoyFreshAir.svg', text: 'Enjoy the Fresh Air' },
    ];
    recommendationClass = 'moderate';
  } else if (aqi > 100 && aqi <= 150) {
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
  } else if (aqi > 150 && aqi <= 200) {
    recommendations = [
      { icon: '/icons/avoidOutdoorActivites.svg', text: 'Avoid outdoor activity' },
      { icon: '/icons/medical_mask.svg', text: 'Wear a mask outdoors' },
    ];
    recommendationClass = 'unhealthy';
  } else if (aqi > 200 && aqi <= 300) {
    recommendations = [
      { icon: '/icons/avoidOutdoorActivites.svg', text: 'Avoid outdoor activity' },
      { icon: '/icons/medical_mask.svg', text: 'Wear a mask outdoors' },
    ];
    recommendationClass = 'very-unhealthy';
  } else if (aqi > 300) {
    recommendations = [
      { icon: '/icons/avoidOutdoors.svg', text: 'Avoid outdoors' },
    ];
    recommendationClass = 'dangerous';
  }

  return (
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
  );
};

export default HealthRecComponent;