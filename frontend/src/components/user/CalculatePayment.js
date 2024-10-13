import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/CalculatePayment.css';
import Header from '../Header';
import Footer from '../Footer';

const CalculatePayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { garbageId, weight } = location.state || {}; // Destructure state from navigation

  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const ratePerKg = 10; // Example rate

  useEffect(() => {
    if (weight) {
      const calculatedAmount = weight * ratePerKg; // Calculate amount based on weight
      setAmount(calculatedAmount);
    }
  }, [weight]); // Recalculate if weight changes

  const handleAddPayment = async () => {
    if (!garbageId || !amount) {
      setError('Invalid payment details. Please try again.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8070/calculatepayment/addpaymentdetails', {
        garbageId,
        amount
      });
      console.log('Payment added:', response.data);
      setSuccessMessage('Payment added successfully.');
      setError(''); // Clear error if payment is successful

      // Navigate to /addcardpayment and pass amount in state
      navigate('/addcardpayment', { state: { amount } });
    } catch (error) {
      console.error('Error adding payment:', error);
      setError('Failed to add payment. Please try again later.');
    }
  };

  return (
    <>
    <Header />
    <div className="calculate-container">
    <div className="calculate-payment" style={{ marginTop: '200px',marginBottom: '120px' }}>
      <h1>Payment Details</h1>
      {garbageId && weight ? (
        <>
          <p>Garbage ID: {garbageId}</p>
          <p>Weight: {weight} Kg</p>
          <p>Total Amount: Rs.{amount}.00</p>
          <button onClick={handleAddPayment}>OK</button>
        </>
      ) : (
        <p>No payment details available. Please go back and try again.</p>
      )}
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
    
    <div className="calculatebottom-image-container"></div>
    </div>
    
    <Footer />
    </>
  );
};

export default CalculatePayment;
