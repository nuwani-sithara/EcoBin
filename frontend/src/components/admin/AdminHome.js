import React from "react";
import "../styles/AdminHome.css"; // Ensure this is correctly linked
import SideBar from "./SideBar";
import { Link } from 'react-router-dom';

const AdminHome = () => {
  return (
    <div className="admin-home-container">
      <div className="sidebar">
        <SideBar />
      </div>
      <div className="admin-content">
        <header className="admin-header">
          <h1>EcoBin Admin Dashboard</h1>
          <p>Manage operations efficiently with our tools.</p>
        </header>

        <section className="admin-dashboard">
          <div className="dashboard-card">
          <i className="bx bxs-leaf dashboard-icon"></i>
            <h2>Recycle Waste Management</h2>
            <p>
              Manage all recycling activities, track waste types, and processing updates.
            </p>
            <Link to="#" className="dashboard-btn">Manage</Link>
          </div>

          <div className="dashboard-card">
            <i className="bx bxs-truck dashboard-icon"></i>
            <h2>Waste Collection Management</h2>
            <p>
              Oversee scheduled waste collections and optimize collection routes.
            </p>
            <Link to="/allgarbageDetails" className="dashboard-btn">Manage</Link>
          </div>

          <div className="dashboard-card">
            <i className="bx bxs-cart dashboard-icon"></i>
            <h2>Request & Purchase compost Management</h2>
            <p>
              Handle purchase requests for compost.
            </p>
            <Link to="/AllCompostRequests" className="dashboard-btn">Manage</Link>
          </div>

          <div className="dashboard-card">
          <i className="bx bxs-trash-alt dashboard-icon"></i>
            <h2>Garbage Handover Management</h2>
            <p>
              Monitor garbage handovers and ensure proper disposal processes.
            </p>
            <Link to="#" className="dashboard-btn">Manage</Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminHome;
