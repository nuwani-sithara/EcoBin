import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminHome from './components/admin/AdminHome';
import UserHome from './components/user/UserHome';
import GarbageDetails from './components/user/GarbageDetails';
import Schedule from './components/user/Schedule';
import UpdateSchedule from './components/user/UpdateSchedule';
import ConfirmCollection from './components/user/ConfirmCollection';
import PaymentOption from './components/user/PaymentOption';
import SeeGarbageDetails from './components/admin/SeeGarbageDetails';
import SeeSchedule from './components/admin/SeeSchedule';
import Payment from './components/admin/Payment';
import CalculatePayment from './components/user/CalculatePayment';
import Status from './components/user/Status';
import { NotificationProvider } from './context/NotificationContext';

import AddWasteAdmin from './components/admin/AddWasteAdmin';
import AddCategory from './components/admin/AddCategory';
import ManageCategories from './components/admin/ManageCategories';
import AddWasteUser from './components/user/AddWasteUser';
import ViewUserWastes from './components/user/ViewUserWastes';
import HandoverManageHome from './components/admin/HandoverManageHome';
import ManageWaste from './components/admin/ManageWaste';
import AddRoutes from './components/admin/AddRoutes';
import ManageRoutes from './components/admin/ManageRoutes';

import axios from 'axios';
import Login from './pages/Login';
import Register from './pages/Register';
import RecycleHome from './pages/RecycleHome';
import RecycleManagement from './components/user/RecycleManagement';
import Summary from './components/user/Summary';
import ScheduleCollection from './components/user/ScheduleCollection';
import PrivateRoute from './components/PrivateRoute';
import Success from './pages/Success';
import React, { useState, useEffect } from 'react';
import UserWasteDetails from './components/user/UserWasteDetails';
import Success from './components/user/Success';
import AddCompostRequest from './components/user/AddCompostRequest';
import MyCompostRequests from './components/user/MyCompostRequests';
import AllCompostRequests from './components/admin/AllCompostRequests';
import AdminTable from './components/admin/AdminTable'; // Import AdminTable page
import RecycleHistory from './components/user/RecycleHistory'; // Import the component





function App() {

        // Items state to manage recyclable items
    const [items, setItems] = useState({
        cardboard: { selected: false, weight: 1.0, pricePerKg: 54, total: 54 },
        newspaper: { selected: false, weight: 1.0, pricePerKg: 20, total: 20 },
        plasticCans: { selected: false, weight: 1.0, pricePerKg: 98, total: 98 },
        metals: { selected: false, weight: 1.0, pricePerKg: 124, total: 124 },
    });

    // State to store user data
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // Function to check if the user is authenticated
    const checkUserAuthentication = () => {
        const token = localStorage.getItem('token');
        return token ? true : false;
    };

    // Fetch user data after login or page reload
    useEffect(() => {
        const authenticated = checkUserAuthentication();
        setIsAuthenticated(authenticated);

        if (authenticated) {
        fetchUserData();
        }
        setLoading(false); // Stop loading after authentication check
    }, []);

    // Function to fetch user data from the backend
    const fetchUserData = async () => {
        try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/auth/user', {
            headers: {
            'x-auth-token': token,
            },
        });
        setUserName(response.data.name);
        setUserEmail(response.data.email);
        } catch (error) {
        console.error('Failed to fetch user data', error);
        }
    };

    // Calculate total weight and total price dynamically based on selected items
    const selectedItems = Object.values(items).filter((item) => item.selected);
    const totalWeight = selectedItems.reduce((acc, item) => acc + item.weight, 0);
    const totalPrice = selectedItems.reduce((acc, item) => acc + item.total, 0);
    console.log(localStorage.getItem('userEmail'));




    return (
        <NotificationProvider>
            <Router>

            {!loading && (
                <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Navigate to="/login" /> } />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Private Routes (Only accessible if authenticated) */}
                <Route
                    path="/home"
                    element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <Home userName={userName} userEmail={userEmail} />
                    </PrivateRoute>
                    }/>

          {/* Private Routes (Only accessible if authenticated) */}
          <Route
            path="/recyclehome"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <RecycleHome userName={userName} userEmail={userEmail} />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/admin-table"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <AdminTable />
              </PrivateRoute>
            }
          />
          
          <Route
            path="/recycle-history"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <RecycleHistory />
              </PrivateRoute>
            }
          />

          <Route
            path="/recycle-management"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <RecycleManagement items={items} setItems={setItems} />
              </PrivateRoute>
            }
          />
          
                <Route
                    path="/recycle-management"
                    element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <RecycleManagement items={items} setItems={setItems} />
                    </PrivateRoute>
                    }
                />
                <Route
                    path="/summary"
                    element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <Summary
                        items={items}
                        totalWeight={totalWeight}
                        totalPrice={totalPrice}
                        serviceFee={20.0}
                        userName={userName}
                        userEmail={userEmail}
                        />
                    </PrivateRoute>
                    }
                />
                <Route
                    path="/schedule-collection"
                    element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <ScheduleCollection
                        items={items}
                        userName={userName}
                        userEmail={userEmail}
                        />
                    </PrivateRoute>
                    }
                />
                <Route
                    path="/success"
                    element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <Success />
                    </PrivateRoute>
                    }
                />
            
                <Route 
                    path="/UserHome" 
                    element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <UserHome />
                    </PrivateRoute>
                    } 
                    />
                
                <Route 
                    path="/addgarbageDetails" 
                    element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <GarbageDetails />
                    </PrivateRoute>
                } />
                <Route 
                    path="/addschedule" 
                    element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <Schedule />
                    </PrivateRoute>
                
                    } />
                <Route 
                    path="/confirm" 
                    element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <ConfirmCollection />
                    </PrivateRoute>
                    } />
                <Route 
                    path="/update-schedule/:scheduleId" 
                    element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <UpdateSchedule />
                    </PrivateRoute>
                    } />
                <Route 
                    path="/addcardpayment" 
                    element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <PaymentOption/>
                    </PrivateRoute>
                    } />
                <Route 
                    path="/allgarbageDetails" 
                    element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <SeeGarbageDetails/>
                    </PrivateRoute>
                    } />
                <Route 
                    path="/allscheduleDetails" 
                    element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <SeeSchedule/>
                    </PrivateRoute>
                    } />
                <Route 
                    path="/getgarbage/:garid" 
                    element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <CalculatePayment />
                    </PrivateRoute>
                    } />
                <Route 
                    path="/addpayment" 
                    element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <Payment />
                    </PrivateRoute>
                    } />
                <Route 
                    path="/addpaymentdetails" 
                    element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <CalculatePayment />
                    </PrivateRoute>
                    } />
                <Route 
                    path="/status" 
                    element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <Status />
                    </PrivateRoute>
                    } />
                <Route 
                    path="/addwaste" 
                    element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <AddWasteAdmin />
                    </PrivateRoute>
                    } />
                 <Route 
                    path="/add-category" 
                    element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <AddCategory />
                    </PrivateRoute>
                    } />
                 <Route 
                    path="/manage-category" 
                    element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <ManageCategories />
                    </PrivateRoute>
                    } />
                <Route 
                    path="/addwaste-user" 
                    element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <AddWasteUser />
                    </PrivateRoute>
                    } />
                 <Route 
                    path="/view-waste-user" 
                    element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <ViewUserWastes />
                    </PrivateRoute>
                    } />
                 <Route 
                    path="/handover-manage-home" 
                    element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <HandoverManageHome />
                    </PrivateRoute>
                    } />
                 <Route 
                    path="/manage-waste" 
                    element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <ManageWaste />
                    </PrivateRoute>
                    } />
                 <Route 
                    path="/add-routes-admin" 
                    element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <AddRoutes />
                    </PrivateRoute>
                    } />
                <Route 
                    path="/manage-route-admin" 
                    element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <ManageRoutes />
                    </PrivateRoute>
                    } />
                <Route 
                    path="/userwastedetails" 
                    element={
                    <PrivateRoute isAuthenticated={isAuthenticated}>
                        <UserWasteDetails userEmail={userEmail}/>
                    </PrivateRoute>
                    } />


          <Route
            path="/success"
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Success />
              </PrivateRoute>
            }
          />
          <Route 
            path="/AdminHome" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <AdminHome />
                </PrivateRoute>} 
          />
          <Route 
            path="/UserHome" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <UserHome />
              </PrivateRoute>
            } 
            />
           
          <Route 
            path="/addgarbageDetails" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                 <GarbageDetails />
              </PrivateRoute>
           } />
          <Route 
            path="/addschedule" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                 <Schedule />
              </PrivateRoute>
           
            } />
          <Route 
            path="/confirm" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <ConfirmCollection />
              </PrivateRoute>
            } />
          <Route 
            path="/update-schedule/:scheduleId" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <UpdateSchedule />
              </PrivateRoute>
            } />
          <Route 
            path="/addcardpayment" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <PaymentOption/>
              </PrivateRoute>
            } />
          <Route 
            path="/allgarbageDetails" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <SeeGarbageDetails/>
              </PrivateRoute>
            } />
          <Route 
            path="/allscheduleDetails" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <SeeSchedule/>
              </PrivateRoute>
            } />
          <Route 
            path="/getgarbage/:garid" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <CalculatePayment />
              </PrivateRoute>
            } />
          <Route 
            path="/addpayment" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Payment />
              </PrivateRoute>
            } />
          <Route 
            path="/addpaymentdetails" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <CalculatePayment />
              </PrivateRoute>
            } />
          <Route 
            path="/status" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <Status />
              </PrivateRoute>
            } />
          <Route 
            path="/addCompostRequest" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <AddCompostRequest userEmail={userEmail}/>
              </PrivateRoute>
            } />
            <Route 
            path="/myCompostRequest" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <MyCompostRequests userEmail={userEmail}/>
              </PrivateRoute>
            } />
            <Route 
            path="/AllCompostRequests" 
            element={
              <PrivateRoute isAuthenticated={isAuthenticated}>
                <AllCompostRequests userEmail={userEmail}/>
              </PrivateRoute>
            } />

                </Routes>
            )}     
            </Router>
        </NotificationProvider>
    );


              
}
export default App;
