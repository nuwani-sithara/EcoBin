import React, { useState } from "react";
import axios from "axios";
import SideBar from './SideBar';
import "../styles/AddCategory.css";

export default function AddRoutes() {

    const [date, setDate] = useState("");
    const [route, setRoute] = useState("");
    const [time, setTime] = useState("");


    function sendData(e) {
        e.preventDefault();

        const newRoute = {
            date,
            route,
            time
        };

        axios.post("http://localhost:8070/routedetail/add-route", newRoute)
            .then(() => {
                alert("Route Added Successfully!");
                setDate("");
                setRoute("");
                setTime("");
            })
            .catch(err => {
                console.error(err);
                alert("Failed to add route. Please try again.");
            });
    }

    return (
        <div className="admin-container">
            <SideBar />
            <form className="add-category-form" onSubmit={sendData}>
                <h2>Add Date</h2>
                <div className="mb-3">
                    <label htmlFor="date" className="form-label">Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="date"
                        placeholder="Enter Category Name"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="route" className="form-label">Route </label>
                    <textarea
                        className="form-control"
                        id="route"
                        placeholder="Enter route"
                        value={route}
                        onChange={(e) => setRoute(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="time" className="form-label">Time</label>
                    <input
                        type="time"  // Using input type="time" for time picker
                        className="form-control"
                        id="time"
                        placeholder="Select time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary">Add Category</button>
            </form>
        </div>
    );
}
