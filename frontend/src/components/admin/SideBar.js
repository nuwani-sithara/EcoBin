import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/SideBar.css"; // Import the CSS file

function SideBar() {
  const position = localStorage.getItem("position");
  const navigate = useNavigate();

  const renderLink = (to, label, disabled) => {
    if (disabled) {
      return <span>{label}</span>;
    } else {
      return <Link to={to}>{label}</Link>;
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (

    <div className="sidebarmenu">
        <div className="logoo-container">
            <div className="logoo"></div>
        </div>
            {renderLink("/AdminHome", "Home", false)}
            {renderLink("/admin-table", "Recycle Waste Management")}
            {renderLink("/allgarbageDetails", "Waste Collection Management")}
            {renderLink("/handover-manage-home", "Garbage Handover Management")}
            {renderLink("/AllCompostRequests", "Request and Purchase Compost Management")}
            {/* {renderLink("/", "Profile Management")} */}
            <div className="sidebarmenu-bottom">
                <button onClick={logout}>Logout</button>
            </div>
    </div>
  );
}

export default SideBar;
