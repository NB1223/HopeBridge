import React, { useState, useEffect } from 'react';
import './Donor_Dash.css';

// Sample data for donation requests
const donationRequests = [
  {
    id: 1,
    ngoName: 'Hope for All',
    requestedAmount: 500,
    category: 'Food',
    description: 'Help feed 1000 families in need this winter.',
    urgency: 'high',
  },
  {
    id: 2,
    ngoName: 'Water is Life',
    requestedAmount: 300,
    category: 'Water Supply',
    description: 'Donate to build wells in rural areas.',
    urgency: 'medium',
  },
  {
    id: 3,
    ngoName: 'Green Earth',
    requestedAmount: 1000,
    category: 'Environment',
    description: 'Help plant trees and restore forests.',
    urgency: 'low',
  },
  {
    id: 4,
    ngoName: 'Children of Tomorrow',
    requestedAmount: 700,
    category: 'Education',
    description: 'Provide books and supplies for underprivileged children.',
    urgency: 'high',
  },
];

const DonorDashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    setRequests(donationRequests);
  }, []);

  return (
    <div className="donor-dashboard">
      <h1 className='req-to-donor'>Donation Requests</h1>
      <div className="card-container">
        {requests.map((request) => (
          <div className="donation-card" key={request.id}>
            <h3 className="ngo-name">{request.ngoName}</h3>
            <p className="category">Category: {request.category}</p>
            <p className="amount">Requested Amount: ${request.requestedAmount}</p>
            <p className="description">{request.description}</p>
            <p className={`urgency ${request.urgency}`}>Urgency: {request.urgency}</p>
            <button className="donate-button">Donate Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonorDashboard;
