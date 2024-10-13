import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';
import '../styles/Status.css';

const Status = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { paymentMethod, paymentStatus, amount } = location.state || {};

  const handleBackToHome = () => {
    navigate('/addschedule'); 
  };

  return (
    <>
      <Header />
      <div className="status">
      <div className="status-container">
        <h2>Payment Status</h2>
        <div className="status-details">
          <p><strong>Payment Method:</strong> {paymentMethod}</p>
          <p><strong>Payment Status:</strong> {paymentStatus}</p>
          <p><strong>Total Amount:</strong> Rs. {amount}.00</p>
        </div>
        <button onClick={handleBackToHome} className="back-home-button">
          Ok
        </button>
      </div>
      <div className="statusbottom-image-container"></div>
      </div>
      <Footer />
    </>
  );
};

export default Status;
