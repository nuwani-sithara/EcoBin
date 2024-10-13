// src/components/AddWasteAdmin.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/AddWasteAdmin.css';
import SideBar from './SideBar';

export default function AddWasteAdmin() {

    const [category, setCategory] = useState("");
    const [waste, setWaste] = useState("");
    const [weight, setWeight] = useState("");
    const [weightType, setWeightType] = useState("");
    const [quantity, setQuantity] = useState("");
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

    function sendData(e) {
        e.preventDefault();

        const newWasteDetail = {
            category,
            waste,
            weight,
            weightType,
            quantity
        };

        console.log(newWasteDetail);

        axios.post("http://localhost:8070/wastedetail/add-waste", newWasteDetail)
            .then((response) => {
                alert("Successfully added waste!");
                console.log('Response:', response);
                // Reset form fields
                setCategory("");
                setWaste("");
                setWeight("");
                setWeightType("");
                setQuantity("");
            })
            .catch((err) => {
                console.error(err);
                alert("Failed to add waste. Please try again.");
            });
    }

    return (
        <div className="admin-container">
            <SideBar />
            <form className="fm1" onSubmit={sendData}>
                <div className="dvdv">
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Select Waste Category</label>
                        <select
                            className="form-control"
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        >
                            <option value="">-- Select Category --</option>
                            {categories.map(cat => (
                                <option key={cat._id} value={cat._id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="waste" className="form-label">Waste</label>
                        <input
                            type="text"
                            className="form-control"
                            id="waste"
                            placeholder="Enter Waste"
                            value={waste}
                            onChange={(e) => setWaste(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="weight" className="form-label">Enter Weight</label>
                        <div className="input-group">
                            <input
                                type="number"
                                className="form-control"
                                id="weight"
                                placeholder="Enter waste weight"
                                value={weight}
                                onChange={(e) => setWeight(e.target.value)}
                                required
                            />
                            <select
                                className="form-select"
                                id="weightType"
                                value={weightType}
                                onChange={(e) => setWeightType(e.target.value)}
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
                        <label htmlFor="quantity" className="form-label">Enter Quantity</label>
                        <input
                            type="number"
                            className="form-control"
                            id="quantity"
                            placeholder="Enter quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Add Waste</button>
                </div>
            </form>
        </div>
    );
}
