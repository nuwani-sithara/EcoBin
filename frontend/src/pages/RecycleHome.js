import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RecycleHome.css'; // Include the CSS for styling
import sellimg1 from '../photos/recycle1.png';
import sellimg2 from '../photos/recycle2.png';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove authentication status from localStorage
    localStorage.removeItem('isLoggedIn');
    navigate('/login');
  };

   // Function to navigate to the Recycle Management Page
   const goToRecycleManagement = () => {
    navigate('/recycle-management'); // Navigate to the recycle management route
  };

  
  function handleRecycle(){
    navigate("/recycle-management");
}

function handleHistory(){
    navigate("/recycle-history");
}


  return (
    <>
            <Header />
            <div style={{marginTop:"20vh", marginBottom:"10vh"}} className="market">

            <div className="container">
                <div className="work-list">

                    <div>
                        <h1 className="top">Click below to make a recycle schedule</h1>
                    <div className="work">
                    <img className="img" src={sellimg1} alt="sellyeild" />
                        <div className="layer">
                            <h3><span>make a Schedule</span></h3>
                            <p>Plan Your Recycling Pickup – Convenient, Easy, and Eco-Friendly!
                            </p>
                            <button className="btn12" onClick={handleRecycle}>
                            <span><i class='bx bxs-chevrons-right'></i></span>
                            </button>
                        </div>
                    </div>
                    </div>

                    <div>
                        <h1 className="top">Click below to view your recycle history</h1>
                    <div className="work">
                    <img className="img" src={sellimg2} alt="buyyield" />
                        <div className="layer">
                            <h3><span>go to recycle history</span></h3>
                            <p>Explore Your Recycling Journey – Track Progress and Impact Today!
                            </p>
                            <button className="btn12" onClick={handleHistory}>
                            <span><i class='bx bxs-chevrons-right'></i></span>
                            </button>                        
                        </div>
                    </div>
                    </div>
                </div>
            </div>
            
        </div>
        <Footer />
        </>
  );
};

export default Home;
