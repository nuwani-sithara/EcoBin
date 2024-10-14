import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminTable.css'; // CSS file for styling

const AdminTable = () => {
  const [collections, setCollections] = useState([]);

  // Fetch collection data from the backend on component mount
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await axios.get('http://localhost:8070/api/recycle'); // Adjust URL if needed
        setCollections(res.data); // Save fetched data to state
      } catch (error) {
        console.error('Error fetching collection data:', error);
      }
    };

    fetchCollections();
  }, []);

  return (
    <div className="table-container">
      <h2 className="table-title">Recycle Management</h2>
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
          </tr>
        </thead>
        <tbody>
          {collections.map((collection, index) => (
            <tr key={index}>
              <td>{collection.address}</td>
              <td>{collection.district}</td>
              <td>{new Date(collection.dateTime).toLocaleString()}</td>
              <td>
                {collection.items.map((item, i) => (
                  <div key={i}>
                    {item.itemName} - {item.weight}kg
                  </div>
                ))}
              </td>
              <td>{collection.paymentType}</td>
              <td>{collection.totalPrice}</td>
              <td className="status-cell">
                <span className={`status-badge ${collection.status?.toLowerCase() || ''}`}>
                  {collection.status || 'Pending'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminTable;
