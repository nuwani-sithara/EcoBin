import React from "react";
import "./styles/Footer.css";

export default function Footer() {
    return (
        <div>
            <footer>
                <div className="col-left">
                    <div className="col-box">
                        <span><i className='bx bxs-location-plus'></i></span>
                        <span>Malabe, Sri Lanka</span>
                    </div>
                    <div className="col-box">
                        <span><i className='bx bxs-phone'></i></span>
                        <span>+94 XX XXX XXXX</span>
                    </div>
                    <div className="col-box">
                        <span><i className='bx bxs-envelope'></i></span>
                        <span>agroprolk@gmail.com</span>
                    </div>
                </div>
                <div className="col-right">
                    <span>About Our Services</span>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                    <div className="social-icons">
                        <i className='bx bxl-facebook-circle'></i>
                        <i className='bx bxl-twitter'></i>
                        <i className='bx bxl-instagram'></i>
                    </div>
                </div>
            </footer>
            <div className="footer-bottom">
                <p>&copy; 2024 AgroProLK. All rights reserved.</p>
            </div>
        </div>
    );
}
