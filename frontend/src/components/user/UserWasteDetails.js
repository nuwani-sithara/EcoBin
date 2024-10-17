import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../Header";
import "../styles/UserWasteDetails.css";
import Footer from "../Footer";

export default function UserWasteDetails() {
    const [wastedetails, setWastesDetails] = useState([]);
    const [categories, setCategories] = useState([]);
    const [editedItem, setEditedItem] = useState(null);
    const [routes, setRoutes] = useState([]);

    const [formData, setFormData] = useState({
        email: '',
        category: '',
        waste: '',
        weight: '',
        weightType: '',
        quantity: '',
        route: ''
    });

    const userEmail = localStorage.getItem("userEmail");

    useEffect(() => {
        if (userEmail) {
            getWasteDetails(userEmail);
            getCategories();
            getRoutes(); // Fetch routes on component mount
        }
    }, [userEmail]);

    const getWasteDetails = (email) => {
        axios.get(`http://localhost:8070/wastedetail/user-waste/${email}`)
            .then((res) => {
                setWastesDetails(res.data);
            }).catch((err) => {
                console.error("Error fetching waste details:", err);
            });
    };

    const getCategories = () => {
        axios.get("http://localhost:8070/category/view-categories")
            .then((res) => {
                setCategories(res.data);
            }).catch((err) => {
                console.error("Error fetching categories:", err);
            });
    };

    const getRoutes = () => {
        axios.get("http://localhost:8070/routedetail/view-route")
            .then((res) => {
                setRoutes(res.data);
            }).catch((err) => {
                console.error("Error fetching routes:", err);
            });
    };

    const handleEdit = (item) => {
        setEditedItem(item._id);
        setFormData({
            email: item.email || '',
            category: item.category?._id || '',
            waste: item.waste || '',
            weight: item.weight || '',
            weightType: item.weightType || '',
            quantity: item.quantity || '',
            route: item.route || ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const saveEdit = (wasteId) => {
        if (!formData.category) {
            alert("Please select a valid category.");
            return;
        }

        axios.put(`http://localhost:8070/wastedetail/update-waste/${wasteId}`, formData)
            .then(() => {
                alert("Waste detail updated");
                setEditedItem(null);
                setFormData({
                    email: '',
                    category: '',
                    waste: '',
                    weight: '',
                    weightType: '',
                    quantity: '',
                    route: ''
                });
                getWasteDetails(userEmail);
            }).catch((err) => {
                console.error("Error updating waste detail", err);
                alert("Failed to update waste detail.");
            });
    };

    const deleteData = (wasteId) => {
        axios.delete(`http://localhost:8070/wastedetail/delete-waste/${wasteId}`)
            .then(() => {
                alert("Waste detail deleted!");
                getWasteDetails(userEmail);
            })
            .catch((err) => {
                alert("Failed to delete waste detail.");
                console.error(err);
            });
    };

    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat._id === categoryId);
        return category ? category.name : "N/A";
    };

    return (
        <><div className="uwd-admin-container">
            <Header />
            <div className="uwd-table-wrapper">
                <table className="uwd-table uwd-table-hover">
                    <thead className="uwd-table-dark">
                        <tr className="uwd-table-row">
                            <th scope="col">No</th>
                            <th scope="col">Email</th>
                            <th scope="col">Category</th>
                            <th scope="col">Waste</th>
                            <th scope="col">Weight</th>
                            <th scope="col">Route</th>
                            <th scope="col">Status</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="uwd-table-body">
                        {wastedetails.map((item, index) => (
                            <tr className="uwd-table-row" key={item._id}>
                                <th scope="row">{index + 1}</th>
                                <td>
                                    {editedItem === item._id ? (
                                        <input
                                            type="email"
                                            className="uwd-input"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange} />
                                    ) : (
                                        item.email || 'N/A'
                                    )}
                                </td>
                                <td>
                                    {editedItem === item._id ? (
                                        <select
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select Category</option>
                                            {categories.map(category => (
                                                <option key={category._id} value={category._id}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        getCategoryName(item.category) || 'N/A'
                                    )}
                                </td>
                                <td>
                                    {editedItem === item._id ? (
                                        <input
                                            type="text"
                                            className="uwd-input"
                                            name="waste"
                                            value={formData.waste}
                                            onChange={handleInputChange} />
                                    ) : (
                                        item.waste || 'N/A'
                                    )}
                                </td>
                                <td>
                                    {editedItem === item._id ? (
                                        <input
                                            type="number"
                                            className="uwd-input"
                                            name="weight"
                                            value={formData.weight}
                                            onChange={handleInputChange} />
                                    ) : (
                                        item.weight || 'N/A'
                                    )}
                                </td>
                                <td>
                                    {editedItem === item._id ? (
                                        <select
                                            name="route"
                                            value={formData.route}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select Route</option>
                                            {routes.map(route => (
                                                <option key={route._id} value={route.route}>
                                                    {`Route: ${route.route}, Date: ${new Date(route.date).toLocaleDateString()}, Time: ${route.time}`}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        item.route || 'N/A'
                                    )}
                                </td>
                                <td>
                                    {item.status || 'N/A'}
                                </td>
                                <td>
                                    {editedItem === item._id ? (
                                        <>
                                            <button className="uwd-save-btn" onClick={() => saveEdit(item._id)}>
                                                Save
                                            </button>
                                            <button className="uwd-cancel-btn" onClick={() => setEditedItem(null)}>
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button
                                                type="button"
                                                className="uwd-edit-btn"
                                                onClick={() => handleEdit(item)}
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                className="uwd-delete-btn"
                                                onClick={() => deleteData(item._id)}
                                            >
                                                Delete
                                            </button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div><Footer/></>
    );
}
