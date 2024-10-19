import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css'; // Include the CSS for styling

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    district: '',
    phoneNumber: '',
  });
  const navigate = useNavigate();

  const { name, email, password, address, district, phoneNumber } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:8070/api/auth/register', formData);
      localStorage.setItem('token', res.data.token);
      
      // Navigate to the home page after successful registration
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('User registration failed. Please try again.');
    }
  };

  return (
    <div className="register-wrapper">
      <div className="register-container">
        <h2 className="register-title">Register</h2>
        <form onSubmit={handleRegister} className="register-form">
          <div className="input-group">
            <label>Name:</label>
            <input type="text" name="name" value={name} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Email:</label>
            <input type="email" name="email" value={email} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Password:</label>
            <input type="password" name="password" value={password} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Address:</label>
            <input type="text" name="address" value={address} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>District:</label>
            <input type="text" name="district" value={district} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>Phone Number:</label>
            <input type="text" name="phoneNumber" value={phoneNumber} onChange={handleChange} required />
          </div>
          <button type="submit" className="register-button">Register</button>
        </form>
        <p className="register-footer">
          Already have an account? <a href="/login">Login Here</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
