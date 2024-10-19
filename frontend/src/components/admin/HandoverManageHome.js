import React from "react";
import "../styles/HandoverManageHome.css"; // Ensure this is correctly linked
import SideBar from "./SideBar";
import { Link } from 'react-router-dom';

const HandoverManageHome = () => {
  return (
    <div className="admin-home-container">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="admin-content">
        <header className="admin-header">
          <h1>Garbage-handover-manage</h1>
          <p>Manage operations efficiently with our tools.</p>
        </header>

        <section className="admin-dashboard">
          <div className="dashboard-card">
          <i className="bx bxs-leaf dashboard-icon"></i>
            <h2>Add Category</h2>
            <p>
              Add Categories of the Garbage
            </p>
            <Link to="/add-category" className="dashboard-btn">Manage</Link>
          </div>

          <div className="dashboard-card">
            <i className="bx bxs-truck dashboard-icon"></i>
            <h2>Manage Categories</h2>
            <p>
             View, Edit and Delete your categories
            </p>
            <Link to="/manage-category" className="dashboard-btn">Manage</Link>
          </div>

          <div className="dashboard-card">
            <i className="bx bxs-cart dashboard-icon"></i>
            <h2>Manage Waste Details</h2>
            <p>
              Manage user entered waste details
            </p>
            <Link to="/manage-waste" className="dashboard-btn">Manage</Link>
          </div>

          <div className="dashboard-card">
          <i className="bx bxs-trash-alt dashboard-icon"></i>
            <h2>Add Routes</h2>
            <p>
              Add routes and time
            </p>
            <Link to="/add-routes-admin" className="dashboard-btn">Manage</Link>
          </div>

          <div className="dashboard-card">
          <i className="bx bxs-trash-alt dashboard-icon"></i>
            <h2>Manage Routes</h2>
            <p>
              View, edit and delete route details
            </p>
            <Link to="/manage-route-admin" className="dashboard-btn">Manage</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HandoverManageHome;
