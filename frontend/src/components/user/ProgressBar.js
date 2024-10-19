import React from 'react';
import '../styles/ProgressBar.css'; // Include the CSS for styling

const ProgressBar = ({ activeStep }) => {
  return (
    <div className="progress-container1">
      <pre></pre>
      <pre></pre>
      <div className="progress-bar1">
        {/* Update the className based on the active step */}
        <div className={`progress-line1 ${activeStep >= 1 ? 'active1' : ''}`}></div>
        <div className={`progress-step1 ${activeStep >= 1 ? 'active1' : ''}`}></div>
        <div className={`progress-line1 ${activeStep >= 2 ? 'active1' : ''}`}></div>
        <div className={`progress-step1 ${activeStep >= 2 ? 'active1' : ''}`}></div>
        <div className={`progress-line1 ${activeStep >= 3 ? 'active1' : ''}`}></div>
        <div className={`progress-step1 ${activeStep >= 3 ? 'active1' : ''}`}></div>
        <div className={`progress-line1 ${activeStep >= 4 ? 'active1' : ''}`}></div>
        <div className={`progress-step1 ${activeStep >= 4 ? 'active1' : ''}`}></div>
      </div>
      <h2>Recycle Management Unit</h2>
    </div>
  );
};

export default ProgressBar;
