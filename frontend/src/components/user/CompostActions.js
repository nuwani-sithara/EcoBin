import React from 'react';
import { useNavigate } from 'react-router-dom';
import './../styles/CompostActions.css'; // Assuming you want some custom styles
import Header from '../Header';
import Footer from '../Footer';

const CompostActions = () => {
    const navigate = useNavigate();

    // Handlers to navigate to respective pages
    const goToAddCompostRequest = () => {
        navigate('/addCompostRequest'); // Navigate to Add Compost Request page
    };

    const goToMyCompostRequests = () => {
        navigate('/myCompostRequest'); // Navigate to My Compost Requests page
    };

    return (
        <>
            <Header />
            <div className="compost-actions-container">
                <h1 className="main-title">Compost Actions</h1>
                <div className="compost-sections">
                    <div className="compost-section" onClick={goToAddCompostRequest}>
                        <h2>Add Compost Request</h2>
                        <p>Click here to add a new compost request.</p>
                    </div>
                    <div className="compost-section" onClick={goToMyCompostRequests}>
                        <h2>My Compost Requests</h2>
                        <p>View your current and past compost requests here.</p>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CompostActions;
