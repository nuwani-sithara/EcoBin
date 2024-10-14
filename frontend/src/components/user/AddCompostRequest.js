import React, { useState } from 'react';
import './../styles/AddCompostRequest.css';
import Header from '../Header';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Footer from '../Footer';

const AddCompostRequest = () => {
    const [amount, setAmount] = useState(''); // Separate state for amount
    const [cost, setCost] = useState(''); // Separate state for cost
    const [organic, setOrganic] = useState(''); // Separate state for organic
    const [potential, setPotential] = useState(''); // Separate state for potential
    const [address, setAddress] = useState(''); // Separate state for address

    const navigate = useNavigate();
    const userEmail = localStorage.getItem('userEmail');

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Handle organic input separately and calculate potential compost output
        if (name === 'organic') {
            setOrganic(value);
            setPotential((value * 0.35).toFixed(2)); // Calculate potential as 35% of organic waste
        }

        // Handle amount change separately
        if (name === 'quantity') {
            setAmount(value);
        }

        // Handle address change
        if (name === 'address') {
            setAddress(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate that amount does not exceed potential
        if (parseFloat(amount) > parseFloat(potential)) {
            alert(`Desired amount (${amount}) cannot exceed potential compost output (${potential})`);
            return; // Prevent form submission
        }

        const newRequest = {
            email: userEmail,
            potential,
            amount,
            cost,
            address
        };

        console.log('Submitting Request:', newRequest); // Log request data before sending

        axios.post('http://localhost:8070/compostRequest/addcompostrequest', newRequest)
            .then(() => {
                alert('Compost Request Added');
                // Reset form fields after successful submission
                setAmount('');
                setCost('');
                setOrganic('');
                setPotential('');
                setAddress('');
                navigate('/myCompostRequest');
            })
            .catch((error) => {
                console.error('Error submitting compost request:', error); // Log any errors from the axios request
            });
    };

    const calculateFee = () => {
        setCost(amount * 250);
        // Calculate cost based on the desired compost amount
    };

    return (
        <>
            <Header />
            <div className="compost-request-container">
                <div className="dv1">
                    <h2>Compost Request</h2>
                    <p>{userEmail}</p>
                    <form onSubmit={handleSubmit} className="compost-request-form">
                        <div className="form-group">
                            <label htmlFor="organic">Organic Waste Weight (kg):</label>
                            <input
                                type="number"
                                id="organic"
                                name="organic"
                                value={organic}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="potential">Potential Compost Output (kg):</label>
                            <input
                                type="number"
                                id="potential"
                                name="potential"
                                value={potential}
                                readOnly
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="quantity">Desired compost Amount (kg):</label>
                            <input
                                type="number"
                                id="quantity"
                                name="quantity"
                                value={amount}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button
                            type="button" // Use type="button" to avoid form submission
                            className="btn btn-outline-light"
                            style={{ width: '100%' }}
                            onClick={calculateFee}
                        >
                            Calculate Cost
                        </button>
                        <div className="form-group">
                            <label htmlFor="cost">Cost (Rs):</label>
                            <input
                                type="number"
                                id="cost"
                                name="cost"
                                value={cost}
                                readOnly
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Delivery Address:</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={address}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="submit-button">Order</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AddCompostRequest;
