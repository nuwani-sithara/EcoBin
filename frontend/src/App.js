import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import RecycleManagement from './pages/RecycleManagement';
import Summary from './pages/Summary';
import ScheduleCollection from './pages/ScheduleCollection';
import PrivateRoute from './components/PrivateRoute';
import Success from './pages/Success';
import AdminTable from './pages/AdminTable'; // Import AdminTable page

function App() {
  // Items state to manage recyclable items
  const [items, setItems] = useState({
    cardboard: { selected: false, weight: 1.0, pricePerKg: 54, total: 54 },
    newspaper: { selected: false, weight: 1.0, pricePerKg: 20, total: 20 },
    plasticCans: { selected: false, weight: 1.0, pricePerKg: 98, total: 98 },
    metals: { selected: false, weight: 1.0, pricePerKg: 124, total: 124 },
  });

  // State to store user data
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Function to check if the user is authenticated
  const checkUserAuthentication = () => {
    const token = localStorage.getItem('token');
    return token ? true : false;
  };

  // Fetch user data after login or page reload
  useEffect(() => {
    const authenticated = checkUserAuthentication();
    setIsAuthenticated(authenticated);

    if (authenticated) {
      fetchUserData();
    }
    setLoading(false); // Stop loading after authentication check
  }, []);

  // Function to fetch user data from the backend
  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/auth/user', {
        headers: {
          'x-auth-token': token,
        },
      });
      setUserName(response.data.name);
      setUserEmail(response.data.email);
    } catch (error) {
      console.error('Failed to fetch user data', error);
    }
  };

  // Calculate total weight and total price dynamically based on selected items
  const selectedItems = Object.values(items).filter((item) => item.selected);
  const totalWeight = selectedItems.reduce((acc, item) => acc + item.weight, 0);
  const totalPrice = selectedItems.reduce((acc, item) => acc + item.total, 0);

  return (
    <Router>
      {!loading && (
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/login" /> } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private Routes (Only accessible if authenticated) */}
          <Route
            path="/home"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Home userName={userName} userEmail={userEmail} />
              </PrivateRoute>
            }
          />

          <Route
            path="/admin-table"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <AdminTable />
              </PrivateRoute>
            }
          />


          <Route
            path="/recycle-management"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <RecycleManagement items={items} setItems={setItems} />
              </PrivateRoute>
            }
          />
          <Route
            path="/summary"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Summary
                  items={items}
                  totalWeight={totalWeight}
                  totalPrice={totalPrice}
                  serviceFee={20.0}
                  userName={userName}
                  userEmail={userEmail}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/schedule-collection"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <ScheduleCollection
                  items={items}
                  userName={userName}
                  userEmail={userEmail}
                />
              </PrivateRoute>
            }
          />
          <Route
            path="/success"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Success />
              </PrivateRoute>
            }
          />
        </Routes>
      )}
    </Router>
  );
}

export default App;
