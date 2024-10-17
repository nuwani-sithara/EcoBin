import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AddWasteUser.css";
import Header from "../Header";
import Footer from "../Footer";

export default function AddWasteUser() {

    const { state } = useLocation(); 
    const userEmail = localStorage.getItem("userEmail");
    const navigate = useNavigate();

    const [, setEmail] = useState("");

    const [wasteDetails, setWasteDetails] = useState([
        { email: userEmail, category: "", waste: "", weight: "", weightType: "", route: "" }
    ]);
    const [categories, setCategories] = useState([]);
    const [routes, setRoutes] = useState([]);  // State to store routes

    // Fetch categories and routes from backend
    useEffect(() => {
        // Fetch categories from the backend
        axios.get("http://localhost:8070/category/view-categories")
            .then(response => {
                setCategories(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the categories!", error);
            });

        // Fetch routes from the backend
        axios.get("http://localhost:8070/routedetail/view-route")
            .then(response => {
                setRoutes(response.data); // Set routes in state
                console.log("Routes:", response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the routes!", error);
            });
    }, []);

    const handleWasteChange = (index, field, value) => {
        const updatedWasteDetails = [...wasteDetails];
        updatedWasteDetails[index][field] = value;
        setWasteDetails(updatedWasteDetails);
    };

    const addWasteField = () => {
        setWasteDetails([...wasteDetails, {email: userEmail, category: "", waste: "", weight: "", weightType: "", route: "" }]);
    };

    const removeWasteField = (index) => {
        const updatedWasteDetails = [...wasteDetails];
        updatedWasteDetails.splice(index, 1);
        setWasteDetails(updatedWasteDetails);
    };

    const sendData = (e) => {
        e.preventDefault();

        // Log the payload to see what is being sent
        console.log("Sending data:", wasteDetails);

        axios.post("http://localhost:8070/wastedetail/add-waste-multiple", { wasteDetails })
            .then((response) => {
                alert("Successfully added waste!");
                console.log('Response:', response);

                navigate('/userwastedetails');
                // Reset to initial state
                setWasteDetails([{ email: userEmail, category: "", waste: "", weight: "", weightType: "", route: "" }]);
            })
            .catch((err) => {
                console.error("Error adding waste:", err.response ? err.response.data : err.message);
                alert("Failed to add waste. Please try again.");
            });
    };

    return (
        <>
            <Header />
            <div className="user-body1">
            <div className="user-container">
                <form className="add-waste-form" onSubmit={sendData}>
                    <h2>Add Your Waste</h2>
                    {wasteDetails.map((wasteDetail, index) => (
                        <div key={index} className="waste-entry">
                            <div className="inline-group">
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email"
                                    style={{backgroundColor: "Black", color: "white"}}
                                    value={userEmail} disabled ></input>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor={`category-${index}`} className="form-label">Select Waste Category</label>
                                    <select
                                        className="form-control"
                                        id={`category-${index}`}
                                        value={wasteDetail.category}
                                        onChange={(e) => handleWasteChange(index, 'category', e.target.value)}
                                        required
                                    >
                                        <option value="" disabled>-- Select Category --</option>
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
                                    <label htmlFor={`weight-${index}`} className="form-label">Enter Weight (Kg)</label>
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
                                    </div>
                                </div>
                                {/* New route selection */}
                                <div className="mb-3">
                                    <label htmlFor={`route-${index}`} className="form-label">Select Route</label>
                                    <select
                                        className="form-control"
                                        id={`route-${index}`}
                                        value={wasteDetail.route}
                                        onChange={(e) => handleWasteChange(index, 'route', e.target.value)}
                                        required
                                    >
                                        <option value="">-- Select Route --</option>
                                        {routes.map(route => (
                                            <option key={route._id} value={route.route}>
                                                {`Route: ${route.route}, Date: ${new Date(route.date).toLocaleDateString()}, Time: ${route.time}`}
                                            </option>
                                        ))}

                                    </select>
                                </div>
                            </div>
                            <button type="button" className="btn btn-danger" onClick={() => removeWasteField(index)}>
                                Remove Waste Entry
                            </button>
                        </div>
                    ))}
                    <div className="btn-dv">
                    <button type="button" className="button1" onClick={addWasteField}>
                        Add Another Waste Entry field
                    </button>
                    <button type="submit" className="btn btn-primary">Add Waste</button>
                    </div>
                </form>
            </div>
            </div>
            <Footer />
        </>
    );
}
