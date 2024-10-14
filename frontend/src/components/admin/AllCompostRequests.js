import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './../styles/AllCompostRequests.css'; // Import the CSS file
import SideBar from './SideBar';
import Footer from '../Footer';

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
            <div className="page-container">
                <SideBar />
                <div className="content-container">
                    <div className="compost-container">
                        <h1 className="compost-title">All Compost Requests</h1>
                        <div className="compost-list">
                            {compostRequests.map((item) => (
                                <div key={item._id} className="compost-item">
                                    <p className="compost-text">Email:   {item.email}</p>
                                    <p className='compost-text'>Potential compost weight:    {item.potential} </p>
                                    <p className="compost-text">Desired compost Amount:  {item.amount} kg</p>
                                    <p className="compost-text">Cost: Rs.   {item.cost}</p>
                                    <p className="compost-text">Status: <p style={{color:"blue", display:'inline'}}>{item.status}</p></p>
                                    <div className="compost-actions">
                                        {editingRequest === item._id ? (
                                            <>
                                                {/* Dropdown to select new status */}
                                                <select
                                                    className="compost-select"
                                                    value={newStatus}
                                                    onChange={(e) => setNewStatus(e.target.value)}
                                                >
                                                    <option value="">Select Status</option>
                                                    <option value="Pending">Pending</option>
                                                    <option value="Approved">Approved</option>
                                                    <option value="Rejected">Rejected</option>
                                                    <option value="Completed">Completed</option>
                                                </select>
                                                <button className="btn" onClick={() => handleUpdateStatus(item._id)}>
                                                    Save
                                                </button>
                                                <button className="btn cancel-btn" onClick={() => setEditingRequest(null)}>
                                                    Cancel
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="btn edit-btn" onClick={() => {
                                                    setEditingRequest(item._id);
                                                    setNewStatus(item.status);
                                                }}>
                                                    Edit Status
                                                </button>
                                                <button className="btn delete-btn" onClick={() => handleDeleteRequest(item._id)}>
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
            <Footer />
        </>
    );
}
