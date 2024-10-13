import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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


function App() {
    return (
        <NotificationProvider>
            <Router>
               
                <Routes>
                    <Route path="/" element={<AdminHome />} />
                    <Route path="/UserHome" element={<UserHome />} />
                   
                    <Route path="/addgarbageDetails" element={<GarbageDetails />} />
                    <Route path="/addschedule" element={<Schedule />} />
                    <Route path="/confirm" element={<ConfirmCollection />} />
                    <Route path="/update-schedule/:scheduleId" element={<UpdateSchedule />} />
                    <Route path="/addcardpayment" element={<PaymentOption/>} />
                    <Route path="/allgarbageDetails" element={<SeeGarbageDetails/>} />
                    <Route path="/allscheduleDetails" element={<SeeSchedule/>} />
                    <Route path="/getgarbage/:garid" element={<CalculatePayment />} />
                    <Route path="/addpayment" element={<Payment />} />
                    <Route path="/addpaymentdetails" element={<CalculatePayment />} />
                    <Route path="/status" element={<Status />} />

                    <Route path="/addwaste" element={<AddWasteAdmin/>} />
                    <Route path="/add-category" element={<AddCategory/>} />
                    <Route path="/manage-category" element={<ManageCategories/>} />
                    <Route path="/addwaste-user" element={<AddWasteUser/>} />
                    <Route path="/view-waste-user" element={<ViewUserWastes/>} />
                    <Route path="/handover-manage-home" element={<HandoverManageHome/>} />
                    <Route path="/manage-waste" element={<ManageWaste/>} />

                </Routes>
                
            </Router>
        </NotificationProvider>
    );
}

export default App;
