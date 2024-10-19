import React, { useState, useEffect } from "react";
import "./styles/Header.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../Assets/logo.png";
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    const {state} = useLocation();
    const userEmail = state?.userEmail;
    console.log(userEmail);

    const item_id = state?.item_id;
    console.log(item_id);

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const handleLogout = () => {
        // Remove authentication status from localStorage
        localStorage.removeItem('isLoggedIn');
        navigate('/login');
      };
    


    return (
        <div>
            <nav>
                <Link to="/UserHome" className="logo">
                    <img src={logo} alt="EcoBin Logo" />
                </Link>
                <ul className={isMenuOpen ? "active" : ""}>
                    <li><Link to="/UserHome" state={{ userEmail }}>Home</Link></li>
                    <li><Link to="/recyclehome">Waste Management</Link></li>
                    <li><Link to="/addschedule">Waste Collection</Link></li>
                    <li><Link to="/addCompostRequest">Purchase Fertilizer</Link></li>
                    <li><Link to="/addwaste-user" state={{ userEmail }}>Garbage Handover</Link></li>
                   
                    <button onClick={handleLogout} style={{ padding: '5px 10px', fontSize: '16px',backgroundColor: 'red', width: '120px', height: '40px' }}>
        Logout
      </button>

                </ul>
                <i className='bx bx-menu-alt-right' id="menu" onClick={toggleMenu}></i>
            </nav>
        </div>
    );
}

export default Header;
