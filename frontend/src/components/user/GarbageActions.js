import React from 'react';
import { useNavigate } from 'react-router-dom';
import './../styles/GarbageActions.css';
import Header from '../Header';
import Footer from '../Footer';

const GarbageActions = () => {
    const navigate = useNavigate();

    const handleAddWaste = () => {
        navigate('/addwaste-user'); // Adjust the route as necessary
    };

    const handleMyWasteDetails = () => {
        navigate('/userwastedetails'); // Adjust the route as necessary
    };

    return (
        <><Header /><div className="garbage-actions-container">
            <h1 className="main-title">Garbage Handover Actions</h1>
            <div className="garbage-sections">
                <div className="garbage-section" onClick={handleAddWaste}>
                    <h2>Add Waste Details</h2>
                    <p>Submit details of the waste you want to hand over.</p>
                </div>
                <div className="garbage-section" onClick={handleMyWasteDetails}>
                    <h2>My Added Waste Details</h2>
                    <p>View and manage the waste details you've added.</p>
                </div>
            </div>
        </div><Footer /></>
    );
};

export default GarbageActions;
