import React, { useState } from 'react';
import './AlertPopup.css';

const AlertPopup = ({ onClose, onAlertCreate }) => {
  const [threshold, setThreshold] = useState({
    good: 'below',
    moderate: 'below',
    unhealthySensitive: 'below',
    unhealthy: 'below',
    veryUnhealthy: 'below',
    hazardous: 'below',
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleRadioChange = (level, value) => {
    setThreshold({ ...threshold, [level]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccessMessage(true);
    onClose(); // Close the popup immediately after submission
    if (onAlertCreate) {
      onAlertCreate(); // Trigger the notification on the homepage
    }
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
            { level: 'good', label: 'Good', disableAbove: true }, // Disable 'Above' for first option
            { level: 'moderate', label: 'Moderate' },
            { level: 'unhealthySensitive', label: 'Unhealthy for sensitive people' },
            { level: 'unhealthy', label: 'Unhealthy' },
            { level: 'veryUnhealthy', label: 'Very unhealthy' },
            { level: 'hazardous', label: 'Dangerous', disableBelow: true }, // Disable 'Below' for last option
          ].map(({ level, label, disableAbove, disableBelow }) => (
            <div className="alert-option" key={level}>
              <span className="left-text">Alert me when AQI goes</span>
              <label className={`radio-button ${threshold[level] === 'below' ? 'active' : ''} ${disableBelow ? 'disabled' : ''}`}>
                Below
                <input
                  type="radio"
                  name={level}
                  value="below"
                  checked={threshold[level] === 'below'}
                  onChange={() => handleRadioChange(level, 'below')}
                  hidden
                  disabled={disableBelow} // Disable 'Below' if necessary
                />
              </label>
              <label className={`radio-button ${threshold[level] === 'above' ? 'active' : ''} ${disableAbove ? 'disabled' : ''}`}>
                Above
                <input
                  type="radio"
                  name={level}
                  value="above"
                  checked={threshold[level] === 'above'}
                  onChange={() => handleRadioChange(level, 'above')}
                  hidden
                  disabled={disableAbove} // Disable 'Above' if necessary
                />
              </label>
              <span className="label-text">{label}</span>
            </div>
          ))}
          <button type="submit" className="save-alert-btn">Save Alert Settings</button>
        </form>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="success-message">
            <p>Alert created successfully!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertPopup;