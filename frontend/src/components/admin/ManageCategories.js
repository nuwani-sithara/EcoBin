import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from './SideBar'; // Ensure this path is correct
import '../styles/ManageCategories.css'; // Import the custom CSS
import { Navigate } from "react-router";

export default function ManageCategories() {
    const [categories, setCategories] = useState([]);
    const [editedItem, setEditedItem] = useState(null);


    useEffect(() => {
        getCategories();
    }, []);

    // Fetch all categories
    const getCategories = () => {
        axios.get("http://localhost:8070/category/view-categories")
            .then((res) => {
                setCategories(res.data);
            }).catch((err) => {
                console.error("Error fetching categories:", err);

            })
    };

    const handleEdit = (categoryId) => {
        setEditedItem(categoryId);
    };

    //update
    const saveEdit = (categoryId, newData) => {
        axios.put(`http://localhost:8070/category/update-category/${categoryId}`, newData)
        .then(() => {
            alert("category updated");
            setEditedItem(null);
            getCategories();
            Navigate('/manage-category');
        }).catch((err) => {
            console.error("Error updating category", err);
        })
    }

   function deleteData(categoryId){
    axios.delete(`http://localhost:8070/category/delete-category/${categoryId}`)
        .then(() => {
             alert("Category deleted!");
             axios.get("http://localhost:8070/category")
             .then(response => {
                setCategories(response.data);
                Navigate('/manage-category');

             })
             .catch(error => {
                console.error('Error fetching data', error);
             });
        })
        .catch((err) => {
            alert(err);
        })
   }

   

    return (
        <><div className="admin-container">
            <SideBar />

            <div style={{ marginTop: "0%" }} className="tb">
                <table style={{ marginTop: "0%" }} className="table table-hover">
                    <thead className="table-dark">
                        <tr className="tblrw">
                            <th scope="col">No</th>
                            <th scope="col">Category Name</th>
                            <th scope="col">Description</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>

                        </tr>
                    </thead>
                    <tbody className="tblbdy">
                        {categories.map((item, index) => (
                            <tr className="tblrw" key={item._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{editedItem === item._id ? <input type="text" defaultValue={item.name} data-id={`${item._id}-name`} /> : item.name}</td>
                                <td>{editedItem === item._id ? <input type="text" defaultValue={item.description} data-id={`${item._id}-description`} /> : item.description}</td>

                                <td>
                                    {editedItem === item._id ? (
                                        <>
                                            <button className="svebtn"
                                                onClick={() => saveEdit(item._id, {
                                                    name: document.querySelector(`input[data-id="${item._id}-name"]`).value,
                                                    description: document.querySelector(`input[data-id="${item._id}-description"]`).value,
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
        </div></>
    );
}
