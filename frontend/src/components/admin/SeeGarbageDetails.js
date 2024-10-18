import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/SeeGarbageDetails.css';
import SideBar from './SideBar';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf'; // Correctly importing jsPDF
import 'jspdf-autotable'; // Correctly importing the autotable plugin

const SeeGarbageDetails = () => {
  const [garbageDetails, setGarbageDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGarbageDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8070/garbage/allgarbageDetails');
        setGarbageDetails(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch garbage details.');
        setLoading(false);
      }
    };

    fetchGarbageDetails();
  }, []);

  const deleteGarbageDetail = async (id) => {
    try {
      await axios.delete(`http://localhost:8070/garbage/deletegarbageDetails/${id}`);
      setGarbageDetails(garbageDetails.filter(garbage => garbage._id !== id));
    } catch (err) {
      setError('Failed to delete garbage detail.');
    }
  };

  const handleNavigate = (action, garbageId, weight) => {
    if (action === 'bookingTime') {
      const lastGarbage = garbageDetails[garbageDetails.length - 1]; // Get the last garbage item
      if (lastGarbage) {
        navigate('/allscheduleDetails', { state: { userName: lastGarbage.name } }); // Navigate to SeeSchedule
      }
    } else if (action === 'calculatePayments') {
      navigate('/addpayment', { state: { garbageId, weight } }); // Pass garbageId and weight to CalculatePayment
    }
  };

  const generatePDFReport = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Garbage Details Report', 14, 22); // Title

    // Table Headers
    const headers = [['Name', 'Contact Number', 'Type', 'Weight (Kg)', 'Additional Notes']];

    // Table Rows
    const rows = garbageDetails.map(garbage => [
      garbage.name,
      garbage.contactNumber,
      garbage.type,
      garbage.weight,
      garbage.additionalNotes || 'N/A',
    ]);

    // Add table to the PDF
    doc.autoTable({
      startY: 30,
      head: headers,
      body: rows,
      headStyles: {
        fillColor: '#1e9c33',
        textColor: [255, 255, 255], 
      },
    });

    doc.save('garbage_details_report.pdf'); // Save the PDF
  };

  // Filtered garbage details based on search term
  const filteredGarbageDetails = garbageDetails.filter(garbage =>
    garbage.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="loading-message">Loading...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="page-container">
      <SideBar />
      <div className="garbage-details-wrapper">
        <h1 className="garbage-details-title">Garbage Details</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        {/* Garbage Details Table */}
        <table className="garbage-details-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact Number</th>
              <th>Type</th>
              <th>Weight (Kg)</th>
              <th>Additional Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredGarbageDetails.map((garbage) => (
              <tr key={garbage._id}>
                <td>{garbage.name}</td>
                <td>{garbage.contactNumber}</td>
                <td>{garbage.type}</td>
                <td>{garbage.weight}</td>
                <td>{garbage.additionalNotes}</td>
                <td>
                  <div className="button-container">
                    <button className="delete-button" onClick={() => deleteGarbageDetail(garbage._id)}>Delete</button>
                    <button className="payment-button" onClick={() => handleNavigate('calculatePayments', garbage._id, garbage.weight)}>Payment</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Booking Time and Generate Report Buttons */}
        <div className="booking-time-wrapper">
          <button className="garbage-generate-button" onClick={generatePDFReport}>Generate Report</button>
          <button className="booking-time-button" onClick={() => handleNavigate('bookingTime')}>Booking Time</button>
        </div>
      </div>
    </div>
  );
};

export default SeeGarbageDetails;