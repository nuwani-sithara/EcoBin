import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ProgressBar from './ProgressBar';
import './Success.css';

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Destructure the received state or set default values to avoid crashes
  const { toReceive = 0, paymentMethod = 'Cash' } = location.state || {};

  return (
    <div className="success-container">
      {/* Display the Progress Bar with the final step highlighted */}
      <ProgressBar activeStep={4} />

      <div className="success-box">
        
        <h3 className="success-message">Successfully Completed!!</h3>
        
        <div className="success-icon">
          <div className="checkmark">✔</div>
        </div>
        
        <p className="instructions">
          {paymentMethod === 'Cash'
            ? 'Please collect cash from the driver.'
            : 'The amount will be transferred via PayCheck.'}
        </p>

        <div className="button-container">
          <button className="home-button" onClick={() => navigate('/home')}>Return to home</button>
          <button className="more-button" onClick={() => navigate('/recycle-management')}>Hand-over more recycle items</button>
        </div>
      </div>
    </div>
  );
};

export default Success;
