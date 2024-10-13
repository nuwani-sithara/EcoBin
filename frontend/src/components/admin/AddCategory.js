import React, { useState } from "react";
import axios from "axios";
import SideBar from './SideBar';
import "../styles/AddCategory.css";

export default function AddCategory() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    function sendData(e) {
        e.preventDefault();

        const newCategory = {
            name,
            description
        };

        axios.post("http://localhost:8070/category/add-category", newCategory)
            .then(() => {
                alert("Category Added Successfully!");
                setName("");
                setDescription("");
            })
            .catch(err => {
                console.error(err);
                alert("Failed to add category. Please try again.");
            });
    }

    return (
        <div className="admin-container">
            <SideBar />
            <form className="add-category-form" onSubmit={sendData}>
                <h2>Add New Category</h2>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Category Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        placeholder="Enter Category Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description (Optional)</label>
                    <textarea
                        className="form-control"
                        id="description"
                        placeholder="Enter Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Add Category</button>
            </form>
        </div>
    );
}
