import React, { useEffect, useState } from 'react';
import './Donor_Dash.css';
import NavBarComponent from '../Components/NavBar.jsx'
import { useNavigate } from 'react-router-dom';


const DonorDashboard = () => {
    const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  // Fetch donation requests from the backend API
  useEffect(() => {
    const fetchDonationRequests = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/ngo/requests');
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching donation requests:", error);
      }
    };

    fetchDonationRequests();
  }, []);

  // Function to return the correct unit based on request type
  const getQuantityUnit = (requestType) => {
    switch (requestType) {
      case 'Money':
        return 'Rupees';
      case 'Food':
      case 'Clothes':
      case 'Sanitary/Toiletries':
        return 'People';
      default:
        return '';
    }
  };

  // Function to calculate urgency based on donation deadline
  const getUrgencyLevel = (donationDeadline) => {
    const currentDate = new Date();
    const deadlineDate = new Date(donationDeadline);
    const timeDiff = deadlineDate - currentDate;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days

    if (daysRemaining < 10) {
      return 'High';
    } else if (daysRemaining >= 10 && daysRemaining <= 30) {
      return 'Medium';
    } else {
      return 'Low';
    }
  };

  return (
    <div className="donor-dashboard">
      <NavBarComponent/>
      <h1 className="req-to-donor">Donation Requests</h1>
      <div className="card-container">
        {requests.map((request) => (
          <div className="donation-card" key={request.request_id}>
            <h3 className="ngo-name">{request.ngo_name}</h3>
            <p className="category">Category: {request.request_type}</p>
            <p className="amount">
              Requested Amount: {request.quantity} {getQuantityUnit(request.request_type)}
            </p>
            <p className="description">{request.request_description}</p>
            <p className={`urgency ${getUrgencyLevel(request.donation_deadline)}`}>
              Urgency: {getUrgencyLevel(request.donation_deadline)}
            </p>
            <button className="donate-button" onClick={() => navigate('/Donate')}>Donate Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonorDashboard;
