import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove authentication status from localStorage
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

   // Function to navigate to the Recycle Management Page
   const goToRecycleManagement = () => {
    navigate('/recycle-management'); // Navigate to the recycle management route
  };


  return (
    <div className="home-container">
       <h1>Welcome to EcoBin</h1>
      <p>Your one-stop solution for waste management.</p>
      <button className="recycle-button" onClick={goToRecycleManagement}>
        Go to Recycle Management
      </button>
      <button onClick={handleLogout} style={{ padding: '10px 20px', fontSize: '16px' }}>
        Logout
      </button>
    </div>
  );
};

export default Home;
