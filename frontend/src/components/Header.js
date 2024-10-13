import React, { useState } from "react";
import "./styles/Header.css";
import { Link } from "react-router-dom";
import logo from "../Assets/logo.png";

function Header() {
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
                    <li><Link to="/UserHome">Home</Link></li>
                    <li><Link to="">Waste Management</Link></li>
                    <li><Link to="/addschedule">Waste Collection</Link></li>
                    <li><Link to="/addCompostRequest">Purchase Fertilizer</Link></li>
                    <li><Link to="">Garbage Handover</Link></li>
                    <li><Link to="">Profile</Link></li>
                </ul>
                <i className='bx bx-menu-alt-right' id="menu" onClick={toggleMenu}></i>
            </nav>
        </div>
    );
}

export default Header;
