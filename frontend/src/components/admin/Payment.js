import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SideBar from './SideBar';
import '../styles/Payment.css';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { garbageId, weight } = location.state || {};

    const [amount, setAmount] = useState('');
    const [status, setStatus] = useState('Pending');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const ratePerKg = 10; // Example rate

    useEffect(() => {
        if (weight) {
            const calculatedAmount = weight * ratePerKg; 
            setAmount(calculatedAmount);
        }
    }, [weight]);

    useEffect(() => {
        console.log('Garbage ID:', garbageId);
        console.log('Weight:', weight);
    }, [garbageId, weight]);

    // Function to handle deletion
    const handleDelete = async () => {
        if (status === 'Completed') {
            try {
                // Use garbageId instead of id
                await axios.delete(`http://localhost:8070/garbage/deletegarbageDetails/${garbageId}`); 
                setSuccessMessage('Payment details deleted successfully!');
                navigate('/allgarbageDetails'); // Navigate to a success page or update UI
            } catch (error) {
                setError('Failed to delete payment details. Please try again.');
                console.error('Error deleting payment:', error);
            }
        } else {
            setError('Cannot delete payment details unless the status is completed.');
        }
    };

    return (
        <div className="schedulepage-container">
            <SideBar />
            <div className="schedule-details-wrapper">
                <h2 className="garbage-details-title">Payment Details</h2>
                {error && <p className="error-message">{error}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <table className="garbage-details-table">
                    <thead>
                        <tr>
                            <th>Garbage ID</th>
                            <th>Weight (kg)</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{garbageId}</td>
                            <td>{weight}</td>
                            <td>{amount}</td>
                            <td>
                                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
                                </select>
                            </td>
                            <td>
                                <button className="payment-button" onClick={handleDelete}>Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Payment;






