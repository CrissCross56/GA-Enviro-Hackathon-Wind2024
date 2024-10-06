import React, { useState } from 'react';
import './AlertPopup.css';

const AlertPopup = ({ onClose }) => {
  const [threshold, setThreshold] = useState({
    good: 'below',
    moderate: 'below',
    unhealthySensitive: 'below',
    unhealthy: 'below',
    veryUnhealthy: 'below',
    hazardous: 'below',
  });

  const handleRadioChange = (level, value) => {
    setThreshold({ ...threshold, [level]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Alert created successfully!');
    onClose(); // Close popup after submission
  };

  return (
    <div className="alert-popup-overlay" onClick={onClose}>
      <div className="alert-popup" onClick={(e) => e.stopPropagation()}>
        <h1>BreatheWell</h1>
        <p className="description">
          Create personalized alerts to get real-time air quality insights so you can make the right health decisions for you and your family.
        </p>
        <form onSubmit={handleSubmit} className="alert-form">
          {[
            { level: 'good', label: 'Good' },
            { level: 'moderate', label: 'Moderate' },
            { level: 'unhealthySensitive', label: 'Unhealthy for sensitive people' },
            { level: 'unhealthy', label: 'Unhealthy' },
            { level: 'veryUnhealthy', label: 'Very unhealthy' },
            { level: 'hazardous', label: 'Dangerous' },
          ].map(({ level, label }) => (
            <div className="alert-option" key={level}>
              <span className="left-text">Alert me when AQI goes</span>
              <label className={`radio-button ${threshold[level] === 'below' ? 'active' : ''}`}>
                Below
                <input
                  type="radio"
                  name={level}
                  value="below"
                  checked={threshold[level] === 'below'}
                  onChange={() => handleRadioChange(level, 'below')}
                  hidden
                />
              </label>
              <label className={`radio-button ${threshold[level] === 'above' ? 'active' : ''}`}>
                Above
                <input
                  type="radio"
                  name={level}
                  value="above"
                  checked={threshold[level] === 'above'}
                  onChange={() => handleRadioChange(level, 'above')}
                  hidden
                />
              </label>
              <span className="label-text">{label}</span>
            </div>
          ))}
          <button type="submit" className="save-alert-btn">Save Alert Settings</button>
        </form>
      </div>
    </div>
  );
};

export default AlertPopup;