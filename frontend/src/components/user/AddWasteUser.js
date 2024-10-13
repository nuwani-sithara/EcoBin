import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/AddWasteUser.css";
import Header from "../Header";
import Footer from "../Footer";

export default function AddWasteUser() {
    const [wasteDetails, setWasteDetails] = useState([
        { category: "", waste: "", weight: "", weightType: "", quantity: "" }
    ]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Fetch categories from the backend
        axios.get("http://localhost:8070/category/view-categories")
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the categories!", error);
            });
    }, []);

    const handleWasteChange = (index, field, value) => {
        const updatedWasteDetails = [...wasteDetails];
        updatedWasteDetails[index][field] = value;
        setWasteDetails(updatedWasteDetails);
    };

    const addWasteField = () => {
        setWasteDetails([...wasteDetails, { category: "", waste: "", weight: "", weightType: "", quantity: "" }]);
    };

    const removeWasteField = (index) => {
        const updatedWasteDetails = [...wasteDetails];
        updatedWasteDetails.splice(index, 1);
        setWasteDetails(updatedWasteDetails);
    };

    const sendData = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8070/wastedetail/add-waste-multiple", {
            wasteDetails  // Ensure this is an array of objects
        })
        .then((response) => {
            alert("Successfully added waste!");
            console.log('Response:', response);
            
            // Reset form fields
            setWasteDetails([{ category: "", waste: "", weight: "", weightType: "", quantity: "" }]);
        })
        .catch((err) => {
            console.error("Error adding waste:", err.response ? err.response.data : err.message);
            alert("Failed to add waste. Please try again.");
        });
        
    };

    return (
        <>
            <Header />
            <div className="user-container">
                <form className="add-waste-form" onSubmit={sendData}>
                    <h2>Add Your Waste</h2>
                    {wasteDetails.map((wasteDetail, index) => (
                        <div key={index} className="waste-entry">
                            <div className="inline-group">
                                <div className="mb-3">
                                    <label htmlFor={`category-${index}`} className="form-label">Select Waste Category</label>
                                    <select
                                        className="form-control"
                                        id={`category-${index}`}
                                        value={wasteDetail.category}
                                        onChange={(e) => handleWasteChange(index, 'category', e.target.value)}
                                        required
                                    >
                                        <option value="">-- Select Category --</option>
                                        {categories.map(cat => (
                                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor={`waste-${index}`} className="form-label">Waste</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id={`waste-${index}`}
                                        placeholder="Enter Waste"
                                        value={wasteDetail.waste}
                                        onChange={(e) => handleWasteChange(index, 'waste', e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor={`weight-${index}`} className="form-label">Enter Weight</label>
                                    <div className="input-group">
                                        <input
                                            type="number"
                                            className="form-control"
                                            id={`weight-${index}`}
                                            placeholder="Enter weight"
                                            value={wasteDetail.weight}
                                            onChange={(e) => handleWasteChange(index, 'weight', e.target.value)}
                                            required
                                        />
                                        <select
                                            className="form-select"
                                            id={`weightType-${index}`}
                                            value={wasteDetail.weightType}
                                            onChange={(e) => handleWasteChange(index, 'weightType', e.target.value)}
                                            required
                                        >
                                            <option value="">-- Select Weight Type --</option>
                                            <option value="kg">kg</option>
                                            <option value="g">g</option>
                                            <option value="ton">ton</option>
                                            <option value="lbs">lbs</option>
                                            <option value="oz">oz</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor={`quantity-${index}`} className="form-label">Enter Quantity</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id={`quantity-${index}`}
                                        placeholder="Enter quantity"
                                        value={wasteDetail.quantity}
                                        onChange={(e) => handleWasteChange(index, 'quantity', e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="button" className="btn btn-danger" onClick={() => removeWasteField(index)}>
                                Remove Waste Entry
                            </button>
                        </div>
                    ))}
                    <button type="button" className="btn btn-secondary" onClick={addWasteField}>
                        Add Another Waste Entry
                    </button>
                    <button type="submit" className="btn btn-primary">Add Waste</button>
                </form>
            </div>
            <Footer />
        </>
    );
}
