import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import NavNgo from '../Components/NavNgo';
import './AddReq.css';


const AddReq = () => {
  const [formData, setFormData] = useState({
    ngo_name: '',
    request_type: '',
    request_description: '',
    quantity: '',
    donation_deadline: ''
  });
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Sending Data:", formData); // Debugging

    try {
      const response = await fetch('http://127.0.0.1:5000/ngo/add-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // Log response status and body for debugging
      const responseData = await response.json();
      console.log("Response Data:", responseData); // Debugging

      if (response.ok) {
        alert('Request added successfully');
        navigate('/ngo-dashboard');
      } else {
        alert(`Failed to add request: ${responseData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert("An error occurred while submitting the request");
    }
  };


  return (
    <div className="add-request">
      <NavNgo/>
      <h2>Add Donation Request</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="ngo_name" placeholder="NGO Name" onChange={handleChange} required />
        <input type="text" name="ngo_state" placeholder="State" onChange={handleChange} required />
        <input type="text" name="ngo_district" placeholder="District" onChange={handleChange} required />

        <select name="request_type" onChange={handleChange} required>
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Money">Money</option>
          <option value="Clothes">Clothes</option>
          <option value="Sanitary/Toiletries">Sanitary/Toiletries</option>
        </select>
        <textarea name="request_description" placeholder="Description" onChange={handleChange} required />
        <input type="number" name="quantity" placeholder="Quantity" onChange={handleChange} required />
        <input type="date" name="donation_deadline" onChange={handleChange} required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddReq;
