import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/RecycleHistory.css'; // Import CSS for styling
import Header from './../Header';
import Footer from './../Footer';
const RecycleHistory = () => {
  const [history, setHistory] = useState([]);
  const userEmail = localStorage.getItem('userEmail'); // Get user email from localStorage

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem('token'); // Get the token from localStorage

        // Make API call to fetch user-specific recycle history
        const response = await axios.get(`http://localhost:8070/api/recycle/history/${userEmail}`, {
          headers: {
            'x-auth-token': token, // Send token for authentication
          },
        });

        setHistory(response.data); // Store the history in the state
      } catch (error) {
        console.error('Error fetching history:', error);
      }
    };

    fetchHistory(); // Fetch history on component mount
  }, [userEmail]);

  return (
    <>
    <Header/>
    <div className="history-container">
      
      <h2>Recycle History</h2>
      {history.map((record) => (
        <div key={record._id} className="history-card">
          <div className="left-section">
          <div className="left-box">
            {record.items.map((item, index) => (
              <div className="item-row" key={index}>
                <span>{item.itemName}</span>
                <span>{item.weight} kg</span>
                <span>Rs {item.total.toFixed(2)}</span>
              </div>
            ))}
            <div className="total-row">
              <span>Total</span>
              <span>{record.totalWeight} kg</span>
              <span>Rs {record.totalPrice.toFixed(2)}</span>
            </div>
            <div className="service-fee">
              <span>Service Fee</span>
              <span>- Rs 20.00</span>
            </div>
            <div className="to-receive">
              <span>To Receive</span>
              <span>Rs {record.toReceive.toFixed(2)}</span>
            </div>
          </div>
          </div>
          <div className="right-section">
            <p><strong>Payment Method:</strong> {record.paymentType}</p>
            <p><strong>Date & Time:</strong> {new Date(record.dateTime).toLocaleString()}</p>
            <p className='statuss'><strong>Status:</strong> {record.status || 'Pending'}</p>
          </div>
        </div>
      ))}
    </div>
    <Footer/>
    </>
  );
};

export default RecycleHistory;
