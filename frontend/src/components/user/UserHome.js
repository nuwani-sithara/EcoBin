// import React from 'react';
// import '../styles/UserHome.css'; 
// import Header from '../Header';
// import Footer from '../Footer';
// import GarbageDetailsbg from '../../Assets/GarbageDetailsbg.png';
// import Homebg from '../../Assets/homebg.jpeg'

// const UserHome = () => {
//   return (
//     <>
//       <Header />
//       <div className="home-container">
//         {/* Hero Section */}
//         <header className="hero-section">
//           <div className="overlay"></div>
//           <div className="hero-content">
//             <h1>Welcome to EcoBin</h1>
//             <h2>Your smart solution for efficient urban waste management</h2>
//             <button className="cta-btn">Explore Our Services</button>
//           </div>
//         </header>

//         {/* Features Section */}
//         <section className="features-section">
//           <h2>Our Services</h2>
//           <div className="features-grid">
//             <div className="feature-card">
//               <img src={Homebg} alt="Waste Management" className="feature-icon" />
//               <h3>Waste Management</h3>
//               <p>Track and manage your waste disposal efficiently with real-time data and analytics.</p>
//             </div>
//             <div className="feature-card">
//               <img src={GarbageDetailsbg} alt="Waste Collection" className="feature-icon" />
//               <h3>Waste Collection</h3>
//               <p>Schedule and automate waste pickups based on your location and waste levels.</p>
//             </div>
//             <div className="feature-card">
//               <img src={GarbageDetailsbg} alt="Purchase Fertilizer" className="feature-icon" />
//               <h3>Purchase Fertilizer</h3>
//               <p>Buy eco-friendly fertilizers made from organic waste, promoting sustainable agriculture.</p>
//             </div>
//             <div className="feature-card">
//               <img src={GarbageDetailsbg} alt="Garbage Handover" className="feature-icon" />
//               <h3>Garbage Handover</h3>
//               <p>Safely hand over garbage to verified collection centers for recycling and disposal.</p>
//             </div>
//           </div>
//         </section>

//         {/* Call to Action Section */}
//         <section className="cta-section">
//           <h2>Join EcoBin Today</h2>
//           <p>Start making a difference by managing your waste responsibly with EcoBin. Let's create a cleaner and greener future together!</p>
//           <button className="cta-btn">Waste Management</button>
//           <button className="cta-btn">Waste Collection</button>
//           <button className="cta-btn">Purchase Fertilizer</button>
//           <button className="cta-btn">Garbage Handover</button>
//         </section>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default UserHome;

import React from "react";
import '../styles/UserHome.css'; 
import Header from "../Header";
import Footer from "../Footer";
import { Link } from 'react-router-dom';

function UserHome() {
    return (
        <>
            <Header />
            <div className="home-container">

                {/* Hero Section */}
                <section className="hero-section">
                    <div className="hero-content">
                        <h1>Welcome to EcoBin</h1>
                        <p>Your smart solution for efficient urban waste management</p>
                        <a href="#cta-section" className="cta-btn">
                            Explore Our Services
                        </a>
                    </div>
                </section>

                {/* Features Section */}
                <section className="features-section">
                    <h2>Our Core Services</h2>
                    <p>Discover how EcoBin can revolutionize waste management in your urban area</p>
                    <div className="feature-boxes">
                        <div className="feature-box">
                            <i className="bx bxs-trash-alt"></i>
                            <h3>Waste Management</h3>
                            <p>Track and manage waste disposal efficiently in real-time.</p>
                        </div>

                        <div className="feature-box">
                            <i className="bx bxs-truck"></i>
                            <h3>Waste Collection</h3>
                            <p>Schedule and automate waste pickups in your area with ease.</p>
                        </div>

                        <div className="feature-box">
                            <i className="bx bxs-cart"></i>
                            <h3>Purchase Fertilizer</h3>
                            <p>Buy eco-friendly fertilizers produced from recycled waste.</p>
                        </div>

                        <div className="feature-box">
                            <i className="bx bxs-hand"></i>
                            <h3>Garbage Handover</h3>
                            <p>Hand over your garbage to certified collection centers safely.</p>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="stats-section">
                    <div className="stats-box">
                        <h3>100K+</h3>
                        <p>Households Served</p>
                    </div>
                    <div className="stats-box">
                        <h3>20K+</h3>
                        <p>Waste Collections</p>
                    </div>
                    <div className="stats-box">
                        <h3>500+</h3>
                        <p>Eco-Friendly Products Sold</p>
                    </div>
                    <div className="stats-box">
                        <h3>200+</h3>
                        <p>Certified Partners</p>
                    </div>
                </section>

                {/* Testimonials Section */}
                <section className="testimonial-section">
                    <h2>What Our Customers Say</h2>
                    <div className="testimonials">
                        <div className="testimonial-box">
                            <p>"EcoBin's waste collection service is incredibly efficient, and their fertilizer is top quality."</p>
                            <h4>- Anjali, Resident of Colombo</h4>
                        </div>
                        <div className="testimonial-box">
                            <p>"With EcoBin, I no longer worry about missing waste collection days. It's all automated!"</p>
                            <h4>- Ravi, Resident of Kandy</h4>
                        </div>
                        <div className="testimonial-box">
                            <p>"EcoBin makes it easy for me to manage my household waste responsibly and sustainably."</p>
                            <h4>- Nuwan, Resident of Galle</h4>
                        </div>
                    </div>
                </section>

                {/* Call to Action Section */}
                <section id="cta-section" className="cta-section">
                    <h2>Join the Waste Management Revolution</h2>
                    <p>Take a step towards a cleaner, greener environment with EcoBin.</p>
                    <Link to="/recyclehome" className="cta-btn">
                      Waste Management
                    </Link>
                    <Link to="/addschedule" className="cta-btn">
                      Waste Collection
                    </Link>
                    <Link to="/addCompostRequest" className="cta-btn">
                        Purchase Fertilizer
                    </Link>
                    <Link to="/addwaste-user" className="cta-btn">
                       Garbage Handover
                    </Link>
                </section>
            </div>
            <Footer />
        </>
    );
}

export default UserHome;
