import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from './SideBar';
import '../styles/ManageCategories.css'; // Import the custom CSS


export default function ManageWaste() {
    const [wastedetails, setWastesDetails] = useState([]);
    const [categories, setCategories] = useState([]); // New state for categories
    const [editedItem, setEditedItem] = useState(null);
    const [formData, setFormData] = useState({
        email: '',
        category: '',
        waste: '',
        weight: '',
        weightType: '',
        quantity: '',
        status: '' // Added status to formData
    });

    useEffect(() => {
        getWasteDetails();
        getCategories(); // Fetch categories on component mount
    }, []);

    // Fetch all waste details
    const getWasteDetails = () => {
        axios.get("http://localhost:8070/wastedetail/view-waste")
            .then((res) => {
                setWastesDetails(res.data);
            }).catch((err) => {
                console.error("Error fetching waste details:", err);
            });
    };

    // Fetch all categories
    const getCategories = () => {
        axios.get("http://localhost:8070/category/view-categories")
            .then((res) => {
                setCategories(res.data);
            }).catch((err) => {
                console.error("Error fetching categories:", err);
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
            status: item.status || '' // Include status for editing
        });
    };

    // Handle input changes for controlled components
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Update waste detail
    const saveEdit = (wasteId) => {
        // Validate that category is selected
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
                    status: '' // Reset status field
                });
                getWasteDetails();
            }).catch((err) => {
                console.error("Error updating waste detail", err);
                alert("Failed to update waste detail. Please check the console for more details.");
            });
    };

    const deleteData = (wasteId) => {
        axios.delete(`http://localhost:8070/wastedetail/delete-waste/${wasteId}`)
            .then(() => {
                alert("Waste detail deleted!");
                getWasteDetails();
            })
            .catch((err) => {
                alert("Failed to delete waste detail.");
                console.error(err);
            });
    };

    return (
        <div className="admin-container">
            <SideBar />
            <div  className="categories-table">
            <h1 className="head1">Manage Waste Details</h1>
                <table  className="table table-hover">
                    <thead className="table-dark">
                        <tr className="tblrw">
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
                    <tbody className="categories-table">
                        {wastedetails.map((item, index) => (
                            <tr className="tblrw" key={item._id}>
                                <th scope="row">{index + 1}</th>
                                <td>
                                    {editedItem === item._id ? (
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            disabled={true}
                                        />
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
                                        item.category?.name || 'N/A'
                                    )}
                                </td>
                                <td>
                                    {editedItem === item._id ? (
                                        <input
                                            type="text"
                                            name="waste"
                                            value={formData.waste}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        item.waste || 'N/A'
                                    )}
                                </td>
                                <td>
                                    {editedItem === item._id ? (
                                        <input
                                            type="number"
                                            name="weight"
                                            value={formData.weight}
                                            onChange={handleInputChange}
                                        />
                                    ) : (
                                        item.weight || 'N/A'
                                    )}
                                </td>
                                <td>
                                    {editedItem === item._id ? (
                                        <input
                                            type="text"
                                            name="route"
                                            value={formData.route}
                                            onChange={handleInputChange}
                                            disabled={true}
                                        />
                                    ) : (
                                        item.route || 'N/A'
                                    )}
                                </td>
                                <td>
                                    {editedItem === item._id ? (
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleInputChange}
                                        >
                                            <option value="Pending">Pending</option>
                                            <option value="Approved">Approved</option>
                                            <option value="On the Way">On the Way</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    ) : (
                                        item.status || 'N/A'
                                    )}
                                </td>
                                <td>
                                    {editedItem === item._id ? (
                                        <>
                                            <button className="svebtn" onClick={() => saveEdit(item._id)}>
                                                Save
                                            </button>
                                            <button className="cnlbtn" onClick={() => setEditedItem(null)}>
                                                Cancel
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button type="button" className="editbtn" onClick={() => handleEdit(item)}>
                                                Edit
                                            </button>
                                            <button type="button" className="deletebtn" onClick={() => deleteData(item._id)}>
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
        </div>
    );
}
