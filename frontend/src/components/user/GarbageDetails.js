import React, { useState } from 'react';
import '../styles/GarbageDetails.css';
import Header from '../Header';
import Footer from '../Footer';
import axios from 'axios';
import { useNotification } from '../../context/NotificationContext';
import { useNavigate } from 'react-router-dom';

const GarbageDetails = () => {
  const notify = useNotification(); 
  const navigate = useNavigate();

  // State management for the form fields
  const [formData, setFormData] = useState({
    name: '',
    contactNumber: '',
    type: '',
    weight: '',
    additionalNotes: ''
  });

  // State for error messages
  const [errors, setErrors] = useState({
    contactNumber: '',
    weight: '',
    form: ''
  });

  // State for success message
  const [successMessage, setSuccessMessage] = useState('');

  // Handle input changes for all fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validation logic for contactNumber
    if (name === 'contactNumber') {
      if (/^\d*$/.test(value) && value.length <= 10) { 
        setErrors((prevErrors) => ({
          ...prevErrors,
          contactNumber: ''
        }));
        setFormData((prevData) => ({
          ...prevData,
          contactNumber: value
        }));
      } else if (value.length > 10) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          contactNumber: 'Contact number must be 10 digits long'
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          contactNumber: 'Contact number must be an integer'
        }));
      }
    }

    // Validation logic for weight
    if (name === 'weight') {
      if (/^\d*$/.test(value) && Number(value) > 0) { // Allow only digits and must be greater than 0
        setErrors((prevErrors) => ({
          ...prevErrors,
          weight: ''
        }));
        setFormData((prevData) => ({
          ...prevData,
          weight: value
        }));
      } else if (value === '') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          weight: ''
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          weight: 'Weight must be a positive integer greater than 0'
        }));
      }
    }

    // Update the remaining form fields without validation
    if (name !== 'contactNumber' && name !== 'weight') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  // Handle form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); 
    setErrors({ contactNumber: '', weight: '', form: '' });
    setSuccessMessage('');
  
    // Check if all fields are filled
    for (const key in formData) {
      if (!formData[key]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          form: 'All fields are required',
        }));
        setIsSubmitting(false);
        return;
      }
    }
  
    const payload = {
      ...formData,
      contactNumber: Number(formData.contactNumber),
      weight: Number(formData.weight),
    };
  
    try {
      const response = await axios.post(
        "http://localhost:8070/garbage/addgarbageDetails",
        payload
      );
  
      const { garbageId } = response.data; // Get the garbageId from the response
  
      console.log("Navigating with", garbageId, formData.weight);
      navigate('/addpaymentdetails', {
        state: { garbageId, weight: formData.weight },
      });
  
      setFormData({
        name: '',
        contactNumber: '',
        type: '',
        weight: '',
        additionalNotes: '',
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      if (error.response) {
        notify("Error: " + error.response.data.error);
      } else if (error.request) {
        notify("Network error: Unable to reach the server. Please try again later.");
      } else {
        notify("An error occurred while submitting the form. Please try again later.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <>
    <Header/>
    <div className="special-garbage-page">
      <div className="garbageform-container" style={{ padding: '20px', marginTop: '195px', marginBottom: '95px' }}>
        <h1>Special Garbage Details</h1>
        {errors.form && <span className="garbageerror-message">{errors.form}</span>} 
        {successMessage && <span className="garbagesuccess-message">{successMessage}</span>} 
        <form onSubmit={handleSubmit}>
        
          <div className="garbageform-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="garbageform-group">
            <label htmlFor="contact">Contact Number:</label>
            <input
              type="text"
              id="contact"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
            {errors.contactNumber && <span className="garbageerror-message">{errors.contactNumber}</span>}
          </div>

          {/* Type and Weight in one line */}
          <div className="garbageform-group">
            <label htmlFor="type">Type:</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="">Select Waste Type</option>
              <option value="heavy-garden-waste">Heavy Garden Waste</option>
              <option value="organic-waste">Organic Waste</option>
              <option value="electronic-waste">Electronic Waste</option>
              <option value="medical-waste">Medical and Biomedical Waste</option>
              <option value="industrial-waste">Industrial Waste</option>
              <option value="agricultural-waste">Agricultural Waste</option>
              <option value="chemical-waste">Chemical Waste</option>
            </select>
          </div>

          <div className="garbageform-group">
            <label htmlFor="weight">Weight (Kg):</label>
            <input
              type="text" // Use type="text" to control input validation
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
            />
            {errors.weight && <span className="garbageerror-message">{errors.weight}</span>}
          </div>
          
          <div className="garbageform-group full-width">
            <label htmlFor="notes">Additional Notes:</label>
            <textarea
              id="notes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <button type="submit" className="garbagenext-button full-width"  disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Next"}
          </button>
        </form>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default GarbageDetails;


