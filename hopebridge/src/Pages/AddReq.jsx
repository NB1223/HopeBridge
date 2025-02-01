import React, { useState } from 'react';
import './AddReq.css';


const AddReq = () => {
  // State management for the request form
  const [requestType, setRequestType] = useState('');
  const [requestDescription, setRequestDescription] = useState('');
  const [donationDeadline, setDonationDeadline] = useState('');
  const [quantity, setQuantity] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const requestData = {
      requestType,
      requestDescription,
      donationDeadline,
      quantity
    };
    console.log(requestData); // Handle the submission logic (e.g., sending to the backend)
    alert('Request details submitted successfully!');
  };

  return (
    <div className="add-request-form">
      <h1>Add a Request</h1>
      <form onSubmit={handleSubmit}>
        {/* Request Type */}
        <div className="form-group">
          <label htmlFor="requestType">Request Type:</label>
          <select
            id="requestType"
            value={requestType}
            onChange={(e) => setRequestType(e.target.value)}
            required
          >
            <option value="">Select a request type</option>
            <option value="Food">Food</option>
            <option value="Money">Money</option>
            <option value="Clothes">Clothes</option>
            <option value="Sanitary/Toiletries">Sanitary/Toiletries</option>
          </select>
        </div>

        {/* Request Description */}
        <div className="form-group">
          <label htmlFor="requestDescription">Request Description:</label>
          <textarea
            id="requestDescription"
            value={requestDescription}
            onChange={(e) => setRequestDescription(e.target.value)}
            required
          />
        </div>

        {/* Donation Deadline */}
        <div className="form-group">
          <label htmlFor="donationDeadline">Donation Deadline:</label>
          <input
            type="date"
            id="donationDeadline"
            value={donationDeadline}
            onChange={(e) => setDonationDeadline(e.target.value)}
            required
          />
        </div>

        {/* Quantity */}
        <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit">Submit Request</button>
      </form>
    </div>
  );
};

export default AddReq;
