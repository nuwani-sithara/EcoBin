import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/Summary.css';
import ProgressBar from './ProgressBar';
import Header from './../Header';
import Footer from './../Footer';

const Summary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { items, totalWeight, totalPrice, userName, userEmail } = location.state || {}; // Destructure userName and userEmail from location state
  const serviceFee = 20.0; // Fixed service fee
  const toReceive = (totalPrice - serviceFee).toFixed(2);

  // State for storing the selected payment method
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Cash');

  // Handle radio button change for payment method
  const handlePaymentMethodChange = (e) => {
    setSelectedPaymentMethod(e.target.value);
  };

  const handleNextClick = () => {
    // Pass userName and userEmail to ScheduleCollection
    navigate('/schedule-collection', {
      state: {
        items,
        totalWeight,
        totalPrice,
        paymentMethod: selectedPaymentMethod, // Make sure this is correctly defined
        userName: localStorage.getItem('userName'), // Get from local storage or context
        userEmail: localStorage.getItem('userEmail'), // Get from local storage or context
      },
    });
  };
  
  

  return (
    <>
    <Header/>
    <div>
      <ProgressBar activeStep={2} />
      <div className="summary-container">
        <h3>Calculating the total</h3>

        <div className="summary-content">
          <div className="summary-items">
            <h4>Items</h4>
            <div className="item-card2">
              {Object.entries(items).map(
                ([itemName, itemData]) =>
                  itemData.selected && (
                    <div key={itemName} className="item-row2">
                      <span>{itemName}</span>
                      <span>{itemData.weight.toFixed(1)} kg</span>
                      <span>Rs. {itemData.total.toFixed(2)}</span>
                    </div>
                  )
              )}
              <div className="item-row2 total">
                <span>Total</span>
                <span>{totalWeight.toFixed(1)} kg</span>
                <span>Rs. {totalPrice.toFixed(2)}</span>
              </div>
              <div className="item-row2 service-fee">
                <span>Service Fee</span>
                <span></span>
                <span>- Rs. {serviceFee.toFixed(2)}</span>
              </div>
              <div className="item-row2 to-receive">
                <span>To Receive</span>
                <span></span>
                <span>Rs. {toReceive}</span>
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="payment-method">
            <h4>Select the method you would like to collect your fee</h4>
            <div  className="payment-method2">
              <input
                type="radio"
                id="cash"
                name="payment-method"
                value="Cash"
                checked={selectedPaymentMethod === 'Cash'}
                onChange={handlePaymentMethodChange}
              />
              <label htmlFor="cash"> Cash</label>
            </div>
            <div  className="payment-method2">
              <input
                type="radio"
                id="paycheck"
                name="payment-method"
                value="PayCheck"
                checked={selectedPaymentMethod === 'PayCheck'}
                onChange={handlePaymentMethodChange}
              />
              <label htmlFor="paycheck"> PayCheck</label>
            </div>
          </div>
        </div>

        {/* Navigation Button */}
        <div className="next-button-container2">
          <button className="next-button2" onClick={handleNextClick}>
            Next
          </button>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Summary;
