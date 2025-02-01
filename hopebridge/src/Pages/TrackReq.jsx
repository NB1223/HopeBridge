import React, { useEffect, useState } from 'react';
import './TrackReq.css';

const TrackReq = () => {
  const [requests, setRequests] = useState([]);
  const uniqueId = localStorage.getItem('ngo_unique_id'); // Assuming unique_id is stored on login

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:5000/ngo/${uniqueId}/requests`);
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, [uniqueId]);

  return (
    <div className="track-requests">
      <h2>Your NGO's Requests</h2>
      <div className="request-list">
        {requests.map((req) => (
          <div key={req.request_id} className="request-card">
            <h3>{req.ngo_name}</h3>
            <p>Type: {req.request_type}</p>
            <p>Description: {req.request_description}</p>
            <p>Quantity: {req.quantity}</p>
            <p>Deadline: {req.donation_deadline}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrackReq;
