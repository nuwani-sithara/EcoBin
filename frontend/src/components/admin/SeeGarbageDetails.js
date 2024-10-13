import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/SeeGarbageDetails.css';
import SideBar from './SideBar';
import { useNavigate } from 'react-router-dom';

const SeeGarbageDetails = () => {
  const [garbageDetails, setGarbageDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGarbageDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8070/garbage/allgarbageDetails');
        setGarbageDetails(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch garbage details.');
        setLoading(false);
      }
    };

    fetchGarbageDetails();
  }, []);

  const deleteGarbageDetail = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/garbage/deletegarbageDetails/${id}`);
      setGarbageDetails(garbageDetails.filter(garbage => garbage._id !== id));
    } catch (err) {
      setError('Failed to delete garbage detail.');
    }
  };

  const handleNavigate = (action, garbageId, weight) => {
    if (action === 'bookingTime') {
        const lastGarbage = garbageDetails[garbageDetails.length - 1]; // Get the last garbage item
        if (lastGarbage) {
            navigate('/allscheduleDetails', { state: { userName: lastGarbage.name } }); // Navigate to SeeSchedule
        }
    } else if (action === 'calculatePayments') {
        navigate('/addpayment', { state: { garbageId, weight } }); // Pass garbageId and weight to CalculatePayment
    }
};


  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="page-container">
      <SideBar />
      <div className="garbage-details-wrapper">
        <h1 className="garbage-details-title">Garbage Details</h1>
        <table className="garbage-details-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Number</th>
              <th>Type</th>
              <th>Weight (Kg)</th>
              <th>Additional Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {garbageDetails.map((garbage) => (
              <tr key={garbage._id}>
                <td>{garbage.name}</td>
                <td>{garbage.contactNumber}</td>
                <td>{garbage.type}</td>
                <td>{garbage.weight}</td>
                <td>{garbage.additionalNotes}</td>
                <td>
                  <div className="button-container">
                    <button className="delete-button" onClick={() => deleteGarbageDetail(garbage._id)}>Delete</button>
                    <button className="payment-button" onClick={() => handleNavigate('calculatePayments', garbage._id, garbage.weight)}>Payment</button>
                  </div>
              </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Booking Time and Calculate Payments Buttons */}
        <div className="booking-time-wrapper">
          <button className="booking-time-button" onClick={() => handleNavigate('bookingTime')}>Booking Time</button>
        </div>
      </div>
    </div>
  );
};

export default SeeGarbageDetails;
