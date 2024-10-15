// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../styles/SeeSchedule.css';
// import SideBar from './SideBar';

// const SeeSchedule = () => {
//     const [schedules, setSchedules] = useState([]);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     // Fetch schedules from the backend
//     const fetchSchedules = async () => {
//         try {
//             const response = await axios.get('http://localhost:8070/schedule/allscheduleDetails');
//             setSchedules(response.data);
//         } catch (error) {
//             console.error('Error fetching schedules:', error);
//             setError('Failed to fetch schedules. Please try again later.');
//         }
//     };

//     // Delete a schedule by ID
//     const deleteSchedule = async (id) => {
//         try {
//             await axios.delete(`http://localhost:8070/schedule/deleteschedule/${id}`);
//             setSchedules(schedules.filter(schedule => schedule._id !== id));
//         } catch (error) {
//             console.error('Error deleting schedule:', error);
//             setError('Failed to delete schedule. Please try again later.');
//         }
//     };

    

//     useEffect(() => {
//         fetchSchedules();
//     }, []);

//     // Convert UTC date-time to local date-time
//     const convertToLocalTime = (utcDateTime) => {
//         const localDateTime = new Date(utcDateTime);
//         return {
//             date: localDateTime.toLocaleDateString('en-US', {
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric',
//             }),
//             time: localDateTime.toLocaleTimeString('en-US', {
//                 hour: '2-digit',
//                 minute: '2-digit',
//                 second: '2-digit',
//                 hour12: true,
//             }),
//         };
//     };

//     return (
//         <div className="schedulepage-container">
//             <SideBar />
//             <div className="schedule-details-wrapper">
//                 <h2>All Scheduled Details</h2>
//                 {error && <p className="error-message">{error}</p>}
//                 {schedules.length > 0 ? (
//                     <table className="schedule-table">
//                         <thead>
//                             <tr>
//                                 <th>ID</th>
//                                 <th>Address</th>
//                                 <th>District</th>
//                                 <th>Date</th>
//                                 <th>Time</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {schedules.map((schedule) => {
//                                 // Ensure schedule.dateTime is in correct UTC format
//                                 const { date, time } = convertToLocalTime(schedule.dateTime); // Convert the dateTime to local
//                                 return (
//                                     <tr key={schedule._id}>
//                                         <td>{schedule._id}</td>
//                                         <td>{schedule.address}</td>
//                                         <td>{schedule.district}</td>
//                                         <td>{date}</td>
//                                         <td>{time}</td>
//                                         <td>
//                                             <button
//                                                 className="delete-schedule-button"
//                                                 onClick={() => deleteSchedule(schedule._id)}
//                                             >
//                                                 Delete
//                                             </button>
//                                         </td>
//                                     </tr>
//                                 );
//                             })}
//                         </tbody>
//                     </table>
//                 ) : (
//                     <p>No schedules found.</p>
//                 )}

                
//             </div>
//         </div>
//     );
// };

// export default SeeSchedule;




// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../styles/SeeSchedule.css';
// import SideBar from './SideBar';
// import jsPDF from 'jspdf'; // Import jsPDF
// import 'jspdf-autotable'; // Import autoTable for table generation in PDF

// const SeeSchedule = () => {
//     const [schedules, setSchedules] = useState([]);
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     // Fetch schedules from the backend
//     const fetchSchedules = async () => {
//         try {
//             const response = await axios.get('http://localhost:8070/schedule/allscheduleDetails');
//             setSchedules(response.data);
//         } catch (error) {
//             console.error('Error fetching schedules:', error);
//             setError('Failed to fetch schedules. Please try again later.');
//         }
//     };

//     // Delete a schedule by ID
//     const deleteSchedule = async (id) => {
//         try {
//             await axios.delete(`http://localhost:8070/schedule/deleteschedule/${id}`);
//             setSchedules(schedules.filter(schedule => schedule._id !== id));
//         } catch (error) {
//             console.error('Error deleting schedule:', error);
//             setError('Failed to delete schedule. Please try again later.');
//         }
//     };

//     useEffect(() => {
//         fetchSchedules();
//     }, []);

//     // Convert UTC date-time to local date-time
//     const convertToLocalTime = (utcDateTime) => {
//         const localDateTime = new Date(utcDateTime);
//         return {
//             date: localDateTime.toLocaleDateString('en-US', {
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric',
//             }),
//             time: localDateTime.toLocaleTimeString('en-US', {
//                 hour: '2-digit',
//                 minute: '2-digit',
//                 second: '2-digit',
//                 hour12: true,
//             }),
//         };
//     };

//     // Function to generate the report
//     const generateReport = () => {
//         const doc = new jsPDF();
//         const tableColumn = ["ID", "Address", "District", "Date", "Time"];
//         const tableRows = [];

//         schedules.forEach(schedule => {
//             const { date, time } = convertToLocalTime(schedule.dateTime); // Convert the dateTime to local
//             const scheduleData = [
//                 schedule._id,
//                 schedule.address,
//                 schedule.district,
//                 date,
//                 time
//             ];
//             tableRows.push(scheduleData);
//         });

//         doc.text("Schedule Details Report", 14, 15);
//         doc.autoTable({
//             head: [tableColumn],
//             body: tableRows,
//             startY: 20,
//             headStyles: {
//                 fillColor: '#1e9c33',
//                 textColor: [255, 255, 255], 
//               },
//         });

//         doc.save("schedule_report.pdf"); // Save the PDF
//     };

//     return (
//         <div className="schedulepage-container">
//             <SideBar />
//             <div className="schedule-details-wrapper">
//                 <h2>All Scheduled Details</h2>
//                 {error && <p className="error-message">{error}</p>}
//                 {schedules.length > 0 ? (
//                     <>
//                         <table className="schedule-table">
//                             <thead>
//                                 <tr>
//                                     <th>ID</th>
//                                     <th>Address</th>
//                                     <th>District</th>
//                                     <th>Date</th>
//                                     <th>Time</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {schedules.map((schedule) => {
//                                     // Ensure schedule.dateTime is in correct UTC format
//                                     const { date, time } = convertToLocalTime(schedule.dateTime); // Convert the dateTime to local
//                                     return (
//                                         <tr key={schedule._id}>
//                                             <td>{schedule._id}</td>
//                                             <td>{schedule.address}</td>
//                                             <td>{schedule.district}</td>
//                                             <td>{date}</td>
//                                             <td>{time}</td>
//                                             <td>
//                                                 <button
//                                                     className="delete-schedule-button"
//                                                     onClick={() => deleteSchedule(schedule._id)}
//                                                 >
//                                                     Delete
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     );
//                                 })}
//                             </tbody>
//                         </table>

//                         {/* Generate Report Button */}
//                         <div className="schedule-time-wrapper">
//                         <button className="schedulegenerate-report-button" onClick={generateReport}>
//                             Generate Report
//                         </button>
//                         </div>
//                     </>
//                 ) : (
//                     <p>No schedules found.</p>
//                 )}
//             </div>
          
//         </div>
//     );
// };

// export default SeeSchedule;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/SeeSchedule.css';
import SideBar from './SideBar';
import jsPDF from 'jspdf'; // Import jsPDF
import 'jspdf-autotable'; // Import autoTable for table generation in PDF

const SeeSchedule = () => {
    const [schedules, setSchedules] = useState([]);
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState(''); // State for the search term
    const navigate = useNavigate();

    // Fetch schedules from the backend
    const fetchSchedules = async () => {
        try {
            const response = await axios.get('http://localhost:8070/schedule/allscheduleDetails');
            setSchedules(response.data);
        } catch (error) {
            console.error('Error fetching schedules:', error);
            setError('Failed to fetch schedules. Please try again later.');
        }
    };

    // Delete a schedule by ID
    const deleteSchedule = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/schedule/deleteschedule/${id}`);
            setSchedules(schedules.filter(schedule => schedule._id !== id));
        } catch (error) {
            console.error('Error deleting schedule:', error);
            setError('Failed to delete schedule. Please try again later.');
        }
    };

    useEffect(() => {
        fetchSchedules();
    }, []);

    // Convert UTC date-time to local date-time
    const convertToLocalTime = (utcDateTime) => {
        const localDateTime = new Date(utcDateTime);
        return {
            date: localDateTime.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
            time: localDateTime.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true,
            }),
        };
    };

    // Function to generate the report
    const generateReport = () => {
        const doc = new jsPDF();
        const tableColumn = ["ID", "Address", "District", "Date", "Time"];
        const tableRows = [];

        schedules.forEach(schedule => {
            const { date, time } = convertToLocalTime(schedule.dateTime); // Convert the dateTime to local
            const scheduleData = [
                schedule._id,
                schedule.address,
                schedule.district,
                date,
                time
            ];
            tableRows.push(scheduleData);
        });

        doc.text("Schedule Details Report", 14, 15);
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20,
            headStyles: {
                fillColor: '#1e9c33',
                textColor: [255, 255, 255], 
              },
        });

        doc.save("schedule_report.pdf"); // Save the PDF
    };

    // Filter schedules based on search term
    const filteredSchedules = schedules.filter(schedule =>
        schedule._id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="schedulepage-container">
            <SideBar />
            <div className="schedule-details-wrapper">
                <h2>All Scheduled Details</h2>
                
                {/* Search bar */}
                <input
                    type="text"
                    placeholder="Search by ID"
                    className="schedule-search-bar"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                
                {error && <p className="error-message">{error}</p>}
                {filteredSchedules.length > 0 ? (
                    <>
                        <table className="schedule-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Address</th>
                                    <th>District</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSchedules.map((schedule) => {
                                    const { date, time } = convertToLocalTime(schedule.dateTime); // Convert the dateTime to local
                                    return (
                                        <tr key={schedule._id}>
                                            <td>{schedule._id}</td>
                                            <td>{schedule.address}</td>
                                            <td>{schedule.district}</td>
                                            <td>{date}</td>
                                            <td>{time}</td>
                                            <td>
                                                <button
                                                    className="delete-schedule-button"
                                                    onClick={() => deleteSchedule(schedule._id)}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>

                        {/* Generate Report Button */}
                        <div className="schedule-time-wrapper">
                            <button className="schedulegenerate-report-button" onClick={generateReport}>
                                Generate Report
                            </button>
                        </div>
                    </>
                ) : (
                    <p>No schedules found.</p>
                )}
            </div>
        </div>
    );
};

export default SeeSchedule;
