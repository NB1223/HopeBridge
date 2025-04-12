import React, { useEffect, useState } from 'react';
import NavNgo from '../Components/NavNgo';
import './TrackReq.css';

const TrackReq = () => {
  const [requests, setRequests] = useState([]);
  const uniqueId = localStorage.getItem("ngo_unique_id");  // Get NGO unique_id from localStorage

  // Fetch NGO's requests
  const fetchRequests = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/ngo/requests/${uniqueId}`);
      const data = await response.json();

      // Check for empty data or errors
      if (Array.isArray(data) && data.length > 0) {
        setRequests(data);  // Set requests in the state if data is found
      } else {
        setRequests([]);  // If no requests are found, set an empty array
      }
    } catch (error) {
      console.error("Error fetching requests:", error);
      setRequests([]);  // Handle any errors gracefully
    }
  };

  useEffect(() => {
    // Fetch the requests when the component is mounted
    if (uniqueId) {
      fetchRequests();
    }
  }, [uniqueId]);

  return (
    <div className="track-requests">
      <NavNgo/>
      <h2>Your NGO's Requests</h2>
      <div className="request-list">
        {requests.length > 0 ? (
          requests.map((req) => (
            <div key={req.request_id} className="request-card">
              <h3>{req.ngo_name}</h3>
              <p>Type: {req.request_type}</p>
              <p>Description: {req.request_description}</p>
              <p>Quantity: {req.quantity}</p>
              <p>Deadline: {req.donation_deadline}</p>
            </div>
          ))
        ) : (
          <p className="error">No requests found for your NGO.</p>  // Display a message when no requests are found
        )}
      </div>
    </div>
  );
};

export default TrackReq;
