import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/UpdateSchedule.css';
import Header from '../Header';
import Footer from '../Footer';

const UpdateSchedule = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { scheduleId, address: initialAddress, district: initialDistrict, dateTime: initialDateTime } = location.state || {};
  const [address, setAddress] = useState(initialAddress);
  const [district, setDistrict] = useState(initialDistrict);
  const [dateTime, setDateTime] = useState(initialDateTime);

  const districts = [
    "Colombo",
    "Gampaha",
    "Kalutara",
    "Kandy",
    "Matale",
    "Nuwara Eliya",
    "Galle",
    "Matara",
    "Hambantota",
    "Jaffna",
    "Kilinochchi",
    "Mannar",
    "Vavuniya",
    "Mulaitivu",
    "Batticaloa",
    "Ampara",
    "Trincomalee",
    "Polonnaruwa",
    "Anuradhapura",
    "Kurunegala",
    "Kegalle",
    "Ratnapura"
  ];

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8070/schedule/updateschedule/${scheduleId}`, {
        address,
        district,
        dateTime,
      });
  
      alert("Schedule updated successfully!");
  
      navigate("/confirm", { 
        state: { 
          scheduleId, 
          address, 
          district, 
          dateTime 
        } 
      });
    } catch (error) {
      console.error("Error updating schedule:", error);
      alert("Failed to update schedule. Please try again.");
    }
  };
  

  return (
    <>
    <Header/>
    <div className='scheduleupdate'>
      <h2 className='scheduleupdate-title'>Update Schedule</h2>
      <form className='scheduleupdate-form' onSubmit={handleUpdate}>
        <div className='scheduleupdate-field'>
          <label className='scheduleupdate-label'>Address:</label>
          <input
            type="text"
            className='scheduleupdate-input'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required 
          />
        </div>
        <div className='scheduleupdate-field'>
          <label className='scheduleupdate-label'>District:</label>
          <select
            className='scheduleupdate-select'
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            required
          >
            <option value="">Select a district</option>
            {districts.map((dist) => (
              <option key={dist} value={dist}>{dist}</option>
            ))}
          </select>
        </div>
        <div className='scheduleupdate-field'>
          <label className='scheduleupdate-label'>Date and Time:</label>
          <input
            type="datetime-local"
            className='scheduleupdate-input'
            value={dateTime}
            onChange={(e) => setDateTime(e.target.value)}
            required 
          />
        </div>
        <div className='scheduleupdate-button-container'>
          <button type="submit" className='scheduleupdate-button'>Update Schedule</button>
        </div>
      </form>
    </div>
    <Footer/>
    </>
  );
};

export default UpdateSchedule;





