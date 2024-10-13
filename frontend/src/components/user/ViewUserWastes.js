import React, { useState, useEffect } from "react";
import axios from "axios";
// import '../styles/ViewUserWastes.css';
// import SideBar from './SideBar';

export default function ViewUserWastes() {

    const [wastes, setWastes] = useState([]);

    useEffect(() => {
        fetchWastes();
    }, []);

    const fetchWastes = () => {
        axios.get("http://localhost:8070/wastedetail/view-waste")
            .then(response => {
                setWastes(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the waste details!", error);
            });
    };

    return (
        <div className="user-container">
            <div className="view-wastes">
                <h2>Your Waste Entries</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Category</th>
                            <th>Waste</th>
                            <th>Weight</th>
                            <th>Weight Type</th>
                            <th>Quantity</th>
                            <th>Date Added</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wastes.map(waste => (
                            <tr key={waste._id}>
                                <td>{waste.category.name}</td>
                                <td>{waste.waste}</td>
                                <td>{waste.weight}</td>
                                <td>{waste.weightType}</td>
                                <td>{waste.quantity}</td>
                                <td>{new Date(waste.createdAt).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
