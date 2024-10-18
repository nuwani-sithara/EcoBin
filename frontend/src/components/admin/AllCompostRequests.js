import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from './SideBar';
import Footer from '../Footer';
import './../styles/AllCompostRequests.css'; // Import the CSS file

export default function AllCompostRequests() {
    const [compostRequests, setCompostRequests] = useState([]);
    const [editingRequest, setEditingRequest] = useState(null);
    const [newStatus, setNewStatus] = useState('');

    useEffect(() => {
        const fetchCompostRequests = async () => {
            try {
                const response = await axios.get('http://localhost:8070/compostRequest/getallcompostrequests');
                setCompostRequests(response.data);
            } catch (error) {
                console.error('Error fetching compost requests:', error);
            }
        };

        fetchCompostRequests();
    }, []);

    const handleUpdateStatus = async (id) => {
        try {
            await axios.put(`http://localhost:8070/compostRequest/updatecompostrequest/${id}`, {
                status: newStatus,
            });
            setCompostRequests((prevRequests) =>
                prevRequests.map((request) =>
                    request._id === id ? { ...request, status: newStatus } : request
                )
            );
            setEditingRequest(null);
        } catch (error) {
            console.error('Error updating compost request status:', error);
        }
    };

    const handleDeleteRequest = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/compostRequest/deletecompostrequest/${id}`);
            setCompostRequests(compostRequests.filter((request) => request._id !== id));
        } catch (error) {
            console.error('Error deleting compost request:', error);
        }
    };

    return (
        <>
            <div className="ard-page-container">
                <SideBar />
                <div className="ard-content-container">
                    <div className="ard-compost-container">
                        <h1 className="ard-compost-title">All Compost Requests</h1>
                        <div className="ard-compost-list">
                            {compostRequests.map((item) => (
                                <div key={item._id} className="ard-compost-item">
                                    <p className="ard-compost-text">Email: {item.email}</p>
                                    <p className='ard-compost-text'>Potential compost weight: {item.potential}</p>
                                    <p className="ard-compost-text">Desired compost Amount: {item.amount} kg</p>
                                    <p className="ard-compost-text">Cost: Rs. {item.cost}</p>
                                    <p className="ard-compost-text">Status: <span style={{ color: "blue" }}>{item.status}</span></p>
                                    <div className="ard-compost-actions">
                                        {editingRequest === item._id ? (
                                            <>
                                                <select
                                                    className="ard-compost-select"
                                                    value={newStatus}
                                                    onChange={(e) => setNewStatus(e.target.value)}
                                                >
                                                    <option value="">Select Status</option>
                                                    <option value="Pending">Pending</option>
                                                    <option value="Approved">Approved</option>
                                                    <option value="Rejected">Rejected</option>
                                                    <option value="Completed">Completed</option>
                                                </select>
                                                <button className="ard-btn" onClick={() => handleUpdateStatus(item._id)}>
                                                    Save
                                                </button>
                                                <button className="ard-btn ard-cancel-btn" onClick={() => setEditingRequest(null)}>
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="ard-btn ard-edit-btn" onClick={() => {
                                                    setEditingRequest(item._id);
                                                    setNewStatus(item.status);
                                                }}>
                                                    Edit Status
                                                </button>
                                                <button className="ard-btn ard-delete-btn" onClick={() => handleDeleteRequest(item._id)}>
                                                    Delete
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
