import React, { useState, useEffect } from 'react';
import './../styles/AddCompostRequest.css';
import Header from '../Header';
import { useNavigate } from 'react-router';
import axios from 'axios';
import Footer from '../Footer';

const AddCompostRequest = () => {
    const [amount, setAmount] = useState('');
    const [cost, setCost] = useState('');
    const [organic, setOrganic] = useState(''); // Organic waste total
    const [potential, setPotential] = useState(''); // Potential compost output
    const [address, setAddress] = useState('');
    const [categories, setCategories] = useState([]); // Categories data
    const navigate = useNavigate();
    const userEmail = localStorage.getItem('userEmail'); // Fetch user email from localStorage

    // Fetch all categories
    useEffect(() => {
        axios.get('http://localhost:8070/category/view-categories')
            .then((response) => {
                setCategories(response.data); // Store all categories
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    // Fetch organic waste details for the logged-in user
    useEffect(() => {
        if (userEmail) {
            axios.get(`http://localhost:8070/wastedetail/user-waste/${userEmail}`)
                .then((response) => {
                    const wasteData = response.data;

                    // Filter out only organic waste by mapping category ID to category name
                    const totalOrganicWaste = wasteData
                        .filter((waste) => {
                            const category = categories.find(cat => cat._id === waste.category);
                            return category && category.name === 'organic'; // Use category name
                        })
                        .reduce((sum, waste) => sum + waste.weight, 0);

                    // Set the organic waste weight and potential compost output (35% of organic waste)
                    setOrganic(totalOrganicWaste);
                    setPotential((totalOrganicWaste * 0.35).toFixed(2)); // 35% of organic waste as compost
                })
                .catch((error) => {
                    console.error('Error fetching waste data:', error);
                });
        }
    }, [userEmail, categories]); // Fetch when the component mounts or when userEmail or categories change

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'quantity') {
            setAmount(value);
        }

        if (name === 'address') {
            setAddress(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate that amount does not exceed potential
        if (parseFloat(amount) > parseFloat(potential)) {
            alert(`Desired amount (${amount}) cannot exceed potential compost output (${potential})`);
            return;
        }

        const newRequest = {
            email: userEmail,
            potential,
            amount,
            cost,
            address
        };

        axios.post('http://localhost:8070/compostRequest/addcompostrequest', newRequest)
            .then(() => {
                alert('Compost Request Added');
                setAmount('');
                setCost('');
                setOrganic('');
                setPotential('');
                setAddress('');
                navigate('/myCompostRequest');
            })
            .catch((error) => {
                console.error('Error submitting compost request:', error);
            });
    };

    const calculateFee = () => {
        setCost(amount * 250); // Calculate cost based on the desired compost amount
    };

    return (
        <>
            <Header />
            <div className='dv1'>
                <div className="compost-request-container">
                    <div className="dv1">
                        <h1 className='h1'>Compost Request</h1>
                        
                        <form onSubmit={handleSubmit} className="compost-request-form">
                            <div className="form-group">
                                <label htmlFor="organic">Organic Waste Weight (kg):</label>
                                <input
                                    type="number"
                                    id="organic"
                                    name="organic"
                                    value={organic}
                                    readOnly
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
                                type="button"
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
            </div>
            <Footer />
        </>
    );
};

export default AddCompostRequest;
