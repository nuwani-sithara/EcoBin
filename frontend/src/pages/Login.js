import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Include the CSS for styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Handle login errors
  const navigate = useNavigate();

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the backend
      const res = await axios.post('http://localhost:8070/api/auth/login', {
        email,
        password,
      });

      const { token, userType } = res.data; // Extract token and userType from response

      // Store token and mark as logged in
      localStorage.setItem('token', token);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', email);

      // Navigate based on user type
      if (userType === 'admin') {
        navigate('/adminhome', { state: { userEmail: email } }); // Navigate to admin home if user is an admin
      } else {
        navigate('/UserHome', { state: { userEmail: email } }); // Navigate to user home otherwise
      }
    } catch (err) {
      console.error(err);
      setError('Invalid Credentials. Please try again.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2 className="login-title">Login</h2>

        {/* Display login error message */}
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleLogin}>
          {/* Email Input Field */}
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          {/* Password Input Field */}
          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          {/* Login Button */}
          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <p className="login-footer">
          Don’t have an account? <a href="/register">Register Here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
