import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from './SideBar'; // Ensure this path is correct
import '../styles/ManageCategories.css'; // Import the custom CSS

export default function ManageRoutes() {
    const [routes, setRoutes] = useState([]);
    const [editedItem, setEditedItem] = useState(null);

    useEffect(() => {
        getRoutes();
    }, []);

    // Fetch all routes
    const getRoutes = () => {
        axios.get("http://localhost:8070/routedetail/view-route")
            .then((res) => {
                setRoutes(res.data);
            }).catch((err) => {
                console.error("Error fetching routes:", err);
            });
    };

    const handleEdit = (routeId) => {
        setEditedItem(routeId);
    };

    // Update the route
    const saveEdit = (routeId, newData) => {
        axios.put(`http://localhost:8070/routedetail/update-route/${routeId}`, newData)
            .then(() => {
                alert("Route updated");
                setEditedItem(null);
                getRoutes(); // Refetch the routes to ensure the updated data is reflected
            }).catch((err) => {
                console.error("Error updating route", err);
            });
    };

    const deleteData = (routeId) => {
        axios.delete(`http://localhost:8070/category/delete-category/${routeId}`)
            .then(() => {
                alert("Route deleted!");
                getRoutes(); // Refetch the routes after deletion
            })
            .catch((err) => {
                alert(err);
            });
    };

    return (
        <div className="admin-container">
            <SideBar />
            <div style={{ marginTop: "0%" }} className="tb">
                <table style={{ marginTop: "0%" }} className="table table-hover">
                    <thead className="table-dark">
                        <tr className="tblrw">
                            <th scope="col">No</th>
                            <th scope="col">Date</th>
                            <th scope="col">Route</th>
                            <th scope="col">Time</th>
                        </tr>
                    </thead>
                    <tbody className="tblbdy">
                        {routes && routes.map((item, index) => (
                            <tr className="tblrw" key={item._id}>
                                <th scope="row">{index + 1}</th>
                                <td>
                                    {editedItem === item._id ? (
                                        <input 
                                            type="date" 
                                            defaultValue={item.date ? new Date(item.date).toISOString().split('T')[0] : ''} 
                                            data-id={`${item._id}-date`} 
                                        />
                                    ) : (
                                        item.date
                                    )}
                                </td>

                                <td>
                                    {editedItem === item._id ? <input type="text" defaultValue={item.route} data-id={`${item._id}-route`} /> : item.route}
                                </td>
                                <td>
                                    {editedItem === item._id ? <input type="time" defaultValue={item.time} data-id={`${item._id}-time`} /> : item.time}
                                </td>
                                <td>
                                    {editedItem === item._id ? (
                                        <>
                                            <button className="svebtn" onClick={() => saveEdit(item._id, {
                                                date: document.querySelector(`input[data-id="${item._id}-date"]`).value,
                                                route: document.querySelector(`input[data-id="${item._id}-route"]`).value,
                                                time: document.querySelector(`input[data-id="${item._id}-time"]`).value,
                                            })}>
                                                Save
                                            </button>
                                            <button className="cnlbtn" onClick={() => setEditedItem(null)}>Cancel</button>
                                        </>
                                    ) : (
                                        <button type="button" className="editbtn" onClick={() => handleEdit(item._id)}>Edit</button>
                                    )}
                                </td>
                                <td>
                                    <button type="button" className="deletebtn" onClick={() => deleteData(item._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
