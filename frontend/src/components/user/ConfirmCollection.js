import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import '../styles/ConfirmCollection.css';
import Header from '../Header';
import Footer from '../Footer';

const ConfirmCollection = () => {
  const location = useLocation();
  const navigate = useNavigate(); 
  const { scheduleId, address, district, dateTime } = location.state || {}; // Get scheduleId from state

  // Handle delete schedule
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8070/schedule/deleteschedule/${scheduleId}`);
      alert("Schedule deleted successfully!");
      navigate("/addgarbageDetails"); 
    } catch (error) {
      console.error("Error deleting schedule:", error);
      alert("Failed to delete schedule. Please try again.");
    }
  };

  // Handle update schedule - redirect to the update page
  const handleUpdate = () => {
    if (scheduleId) {
      navigate(`/update-schedule/${scheduleId}`, { 
        state: { scheduleId, address, district, dateTime } 
      });
    } else {
      alert("Schedule ID is missing.");
    }
  };

  // Handle confirm button click - navigate to the addgarbageDetails page
  const handleConfirm = () => {
    navigate("/addgarbageDetails");
  };

  return (
    <>
      <Header />
      <div className="confirm-container" style={{ paddingTop: '250px' }}>
        <div className="confirm-card">
          <div className="confirmcollection-details">
            <h2>Confirm Your Collection Details</h2>
            <p><strong>Address:</strong> {address || 'N/A'}</p>
            <p><strong>District:</strong> {district || 'N/A'}</p>
            <p><strong>Date:</strong> {new Date(dateTime).toLocaleDateString() || 'N/A'}</p>
            <p><strong>Time:</strong> {new Date(dateTime).toLocaleTimeString() || 'N/A'}</p>
          </div>

          <div className="confirmicons">
            <i className="bx bx-edit" title="Update" onClick={handleUpdate}></i>
            <i className="bx bx-trash" title="Delete" onClick={handleDelete}></i>
          </div>

          <div className="confirmimage-container"></div>

          <button className="confirm-btn" onClick={handleConfirm}>Confirm</button>
        </div>

        <div className="confirmbottom-image-container"></div>
      </div>
      <Footer />
    </>
  );
};

export default ConfirmCollection;
