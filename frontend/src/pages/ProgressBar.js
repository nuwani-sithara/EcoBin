import React from 'react';
import './ProgressBar.css'; // Include the CSS for styling

const ProgressBar = ({ activeStep }) => {
  return (
    <div className="progress-container">
      <pre></pre>
      <pre></pre>
      <div className="progress-bar">
        {/* Update the className based on the active step */}
        <div className={`progress-line ${activeStep >= 1 ? 'active' : ''}`}></div>
        <div className={`progress-step ${activeStep >= 1 ? 'active' : ''}`}></div>
        <div className={`progress-line ${activeStep >= 2 ? 'active' : ''}`}></div>
        <div className={`progress-step ${activeStep >= 2 ? 'active' : ''}`}></div>
        <div className={`progress-line ${activeStep >= 3 ? 'active' : ''}`}></div>
        <div className={`progress-step ${activeStep >= 3 ? 'active' : ''}`}></div>
        <div className={`progress-line ${activeStep >= 4 ? 'active' : ''}`}></div>
        <div className={`progress-step ${activeStep >= 4 ? 'active' : ''}`}></div>
      </div>
      <h2>Recycle Management Unit</h2>
    </div>
  );
};

export default ProgressBar;
