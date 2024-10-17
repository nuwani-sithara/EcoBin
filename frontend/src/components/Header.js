import React, { useState, useEffect } from "react";
import "./styles/Header.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../Assets/logo.png";

function Header() {

    const {state} = useLocation();
    const userEmail = state?.userEmail;
    console.log(userEmail);

    const item_id = state?.item_id;
    console.log(item_id);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };


    return (
        <div>
            <nav>
                <Link to="/UserHome" className="logo">
                    <img src={logo} alt="EcoBin Logo" />
                </Link>
                <ul className={isMenuOpen ? "active" : ""}>
                    <li><Link to="/UserHome" state={{ userEmail }}>Home</Link></li>
                    <li><Link to="" state={{ userEmail }}>Waste Management</Link></li>
                    <li><Link to="/addschedule" state={{ userEmail }}>Waste Collection</Link></li>
                    <li><Link to="/addCompostReques" state={{ userEmail }}>Purchase Fertilizer</Link></li>
                    <li><Link to="/addwaste-user" state={{ userEmail }}>Garbage Handover</Link></li>
                    <li><Link to="" state={{ userEmail }}>Profile</Link></li>
                </ul>
                <i className='bx bx-menu-alt-right' id="menu" onClick={toggleMenu}></i>
            </nav>
        </div>
    );
}

export default Header;
