import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/AdminTable.css';

const AdminTable = () => {
  const [collections, setCollections] = useState([]);

  // Fetch collections from the backend when the component mounts
  useEffect(() => {
    fetchCollections();
  }, []);

  // Fetch collections from backend
  const fetchCollections = async () => {
    try {
      const response = await axios.get('http://localhost:8070/api/recycle');
      setCollections(response.data);
    } catch (error) {
      console.error('Error fetching collections:', error);
    }
  };

  // Handle status update and persist it to backend
  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put('http://localhost:8070/api/recycle/update-status', {
        id,
        status,
      });

      alert(res.data.msg);

      // Fetch the updated collections again to refresh the state
      fetchCollections(); // This ensures the frontend is always in sync with the backend
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  return (
    <div className="admin-table-container">
      <h2>Recycle Management</h2>
      <table className="admin-table">
        <thead>
          <tr>
            <th>Address</th>
            <th>District</th>
            <th>Date & Time</th>
            <th>Recycle Items</th>
            <th>Payment Type</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {collections.map((collection) => (
            <tr key={collection._id}>
              <td>{collection.address}</td>
              <td>{collection.district}</td>
              <td>{new Date(collection.dateTime).toLocaleString()}</td>
              <td>
                {collection.items.map((item, index) => (
                  <div key={index}>
                    {item.itemName} - {item.weight}kg
                  </div>
                ))}
              </td>
              <td>{collection.paymentType}</td>
              <td>{collection.toReceive}</td>
              <td>{collection.status || 'pending'}</td> {/* Display status */}
              <td>
                <button
                  className="status-button cancelled"
                  onClick={() => updateStatus(collection._id, 'Cancelled')}
                >
                  Cancelled
                </button>
                <button
                  className="status-button finished"
                  onClick={() => updateStatus(collection._id, 'Finished')}
                >
                  Finished
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
