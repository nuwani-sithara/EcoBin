import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import './../styles/MyCompostRequests.css'; // Import the CSS file
import Footer from "../Footer";

export default function MyCompostRequests() {
    const [compostRequests, setCompostRequests] = useState([]);
    const [editingRequest, setEditingRequest] = useState(null);
    const [newAmount, setNewAmount] = useState('');
    const [cost, setCost] = useState(0); // State for cost
    const navigate = useNavigate();
    
    const userEmail = localStorage.getItem('userEmail');
    
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/compostRequest/getcompostrequest/${userEmail}`);
                
                if (Array.isArray(response.data)) {
                    setCompostRequests(response.data);
                } else {
                    setCompostRequests([]);
                }

                console.log(response.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchRequests();
    }, [userEmail]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/compostRequest/deletecompostrequest/${id}`);
            setCompostRequests(compostRequests.filter((request) => request._id !== id));
        } catch (err) {
            console.error('Error deleting request', err);
        }
    };

    const handleUpdate = async (id, potential) => {
        if (newAmount > potential) {
            alert(`Amount cannot exceed the potential (${potential})`);
            return;
        }

        try {
            await axios.put(`http://localhost:8070/compostRequest/updatemycompostrequest/${id}`, {
                email: userEmail,
                amount: newAmount,
                cost: newAmount * 250 // Send the updated cost with the request
            });
            setCompostRequests(
                compostRequests.map((request) =>
                    request._id === id ? { ...request, amount: newAmount, cost: newAmount * 250 } : request
                )
            );
            setEditingRequest(null);
        } catch (err) {
            console.error('Error updating request', err);
        }
    };

    // Effect to update cost whenever newAmount changes
    useEffect(() => {
        if (newAmount) {
            setCost(newAmount * 250);
        } else {
            setCost(0);
        }
    }, [newAmount]);

    return (
        <><div className="compost-requests-page">
            <Header />
            <h1 className="page-title">My Compost Requests</h1>
            <table className="compost-requests-table">
                <thead>
                    <tr>
                        <th>Potential Weight</th>
                        <th>Desired Compost Amount</th>
                        <th>Cost</th>
                        <th>Address</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(compostRequests) && compostRequests.length > 0 ? (
                        compostRequests.map((compostRequest) => (
                            <tr key={compostRequest._id}>
                                <td>{compostRequest.potential}</td>
                                <td>
                                    {editingRequest === compostRequest._id ? (
                                        <input
                                            type="number"
                                            className="edit-input"
                                            value={newAmount}
                                            onChange={(e) => setNewAmount(e.target.value)} />
                                    ) : (
                                        compostRequest.amount
                                    )}
                                </td>
                                <td>
                                    {editingRequest === compostRequest._id ? (
                                        cost // Show updated cost in edit mode
                                    ) : (
                                        compostRequest.cost
                                    )}
                                </td>
                                <td>{compostRequest.address}</td>
                                <td>{compostRequest.status}</td>
                                <td className="action-buttons">
                                    {editingRequest === compostRequest._id ? (
                                        <>
                                            <button
                                                className="save-button"
                                                onClick={() => handleUpdate(compostRequest._id, compostRequest.potential)}
                                            >
                                                Save
                                            </button>
                                            <button
                                                className="cancel-button"
                                                onClick={() => setEditingRequest(null)}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                className="edit-button"
                                                onClick={() => {
                                                    setEditingRequest(compostRequest._id);
                                                    setNewAmount(compostRequest.amount); // Set the amount when entering edit mode
                                                } }
                                            >
                                                Edit
                                            </button>
                                            <button
                                                className="delete-button"
                                                onClick={() => handleDelete(compostRequest._id)}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="no-requests-message">
                                No compost requests found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
        </>
    );
}
