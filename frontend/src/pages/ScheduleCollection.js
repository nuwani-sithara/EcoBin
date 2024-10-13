import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ProgressBar from './ProgressBar';
import './ScheduleCollection.css';
import moment from 'moment-timezone'; // Import moment for precise time handling

const ScheduleCollection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  console.log('Location State:', location.state);
  const { items, totalWeight = 0, totalPrice = 0, paymentMethod = 'Cash', userName = '', userEmail = '' } = location.state || {};

  const serviceFee = 20.0;
  const toReceive = (totalPrice - serviceFee).toFixed(2);

  // Local state for Address, District, and Date-Time
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Helper function to format the date and time without conversion
  const formatDateTime = (date) => {
    return moment(date).format('YYYY-MM-DD HH:mm:ss'); // Format as local date and time
  };

  // Handle form submission
  const handleConfirm = async () => {
    if (!items || totalPrice === undefined || totalWeight === undefined) {
      console.error('Required data is missing');
      alert('Something went wrong. Please go back and try again.');
      return;
    }

    // Log the data before sending to the backend
    console.log('Data to be sent:', {
      userName,
      userEmail,
      items,
      totalWeight,
      totalPrice,
      paymentType: paymentMethod,
      toReceive,
      address,
      district,
      dateTime: formatDateTime(selectedDate), // Use formatted local date and time
    });

    // Data to be sent to the backend
    const collectionData = {
      userName,
      userEmail,
      items: Object.entries(items)
        .filter(([, itemData]) => itemData.selected)
        .map(([itemName, itemData]) => ({
          itemName,
          weight: itemData.weight.toFixed(1),
          total: itemData.total.toFixed(2),
        })),
      totalWeight: totalWeight.toFixed(1),
      totalPrice: totalPrice.toFixed(2),
      paymentType: paymentMethod,
      toReceive: Math.max(totalPrice - serviceFee, 0).toFixed(2),
      address,
      district,
      dateTime: formatDateTime(selectedDate), // Store formatted local date and time
    };

    try {
      const response = await fetch('http://localhost:8070/api/recycle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(collectionData),
      });

      if (response.ok) {
        navigate('/success', {
          state: { toReceive, paymentMethod },
        });
      } else {
        alert('Failed to schedule collection. Please try again.');
      }
    } catch (error) {
      console.error('Error scheduling collection:', error);
      alert('An error occurred while scheduling the collection.');
    }
  };

  return (
    <div>
      <ProgressBar activeStep={3} />
      
      <div className="schedule-container">
        <h3>Schedule a collections slot</h3>

        <div className="schedule-form">
          <label>
            <span>Address:</span>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your address"
            />
          </label>

          <label>
            <span>District:</span>
            <select value={district} onChange={(e) => setDistrict(e.target.value)}>
              <option value="">Select District</option>
              <option value="Colombo">Colombo</option>
              <option value="Gampaha">Gampaha</option>
              <option value="Kandy">Kandy</option>
            </select>
          </label>

          <label>
            <span>Date & Time:</span>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              showTimeSelect
              dateFormat="Pp"
              className="date-picker"
            />
          </label>

          <button className="confirm-button" onClick={handleConfirm}>
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleCollection;
