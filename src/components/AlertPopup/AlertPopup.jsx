import React from 'react';
import './AlertPopup.css'; // Create this CSS file for styling

const AlertPopup = ({ onClose }) => {
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your alert creation logic here
    // For example, collect form data and send it to your backend or update state
    alert('Alert created successfully!');
    onClose(); // Close the popup after submission
  };

  return (
    <div className="alert-popup-overlay" onClick={onClose}>
      <div className="alert-popup" onClick={(e) => e.stopPropagation()}>
        <h2>Create AQI Alert</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Threshold AQI Value:
            <input type="number" name="threshold" min="0" max="500" required />
          </label>
          <br />
          <label>
            Notification Method:
            <select name="notificationMethod" required>
              <option value="email">Email</option>
              <option value="sms">SMS</option>
            </select>
          </label>
          <br />
          <button type="submit">Set Alert</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default AlertPopup;