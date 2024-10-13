import React, { useState } from 'react';
import './../styles/AddCompostRequest.css';

// /c:/Users/Amith/Desktop/CSSE Project/EcoBin/frontend/src/components/user/AddCompostRequest.js


const AddCompostRequest = () => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        quantity: '',
        date: ''
    });

    const userEmail = localStorage.getItem('userEmail') ; 

    console.log(userEmail);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to handle form submission, e.g., send data to backend
        console.log('Form submitted:', formData);
    };

    return (
        <div className="compost-request-container">
            <h2>Add Compost Request</h2>
            <p value={userEmail}></p>
            <form onSubmit={handleSubmit} className="compost-request-form">
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity (kg):</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="submit-button">Submit</button>
            </form>
        </div>
    );
};

export default AddCompostRequest;