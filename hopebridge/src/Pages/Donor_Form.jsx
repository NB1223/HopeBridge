import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBarComponent from '../Components/NavBar';
import './Donor_Form.css';

const DonationForm = () => {
  const location = useLocation();
  const navigate = useNavigate(); 


  // Extract values from navigation state (default to empty if not provided)
  const prefilledNgo = location.state?.ngo || 'Not specified';
  const prefilledItem = location.state?.donatingItems || 'Not specified';
  const requestId = location.state?.request_id || null;

  const donorEmail = localStorage.getItem('donor_email'); // Donor email from localStorage
  const [donorId, setDonorId] = useState(null); // Donor ID from backend

  // Fetch donor_id from backend using donorEmail
  useEffect(() => {
    if (donorEmail) {
      fetch(`http://127.0.0.1:5000/donor/get-id?email=${donorEmail}`)
        .then(response => response.json())
        .then(data => {
          if (data.donor_id) {
            setDonorId(data.donor_id); // Store donor ID in state
          } else {
            console.error('Error: Donor ID not found');
          }
        })
        .catch(error => console.error('Error fetching donor ID:', error));
    }
  }, [donorEmail]);

  // State hooks
  const [quantity, setQuantity] = useState(1);
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');

  // Dummy data for dropdowns
  const states = [
    'California', 'Texas', 'Florida', 'New York', 'Illinois',
    'Pennsylvania', 'Ohio', 'Georgia', 'North Carolina', 'Michigan'
  ];

  const districts = {
    'California': ['Los Angeles', 'San Diego', 'San Francisco', 'Sacramento'],
    'Texas': ['Houston', 'Dallas', 'Austin', 'San Antonio'],
    'Florida': ['Miami', 'Orlando', 'Tampa', 'Jacksonville'],
    'New York': ['New York City', 'Buffalo', 'Rochester', 'Albany'],
    'Illinois': ['Chicago', 'Springfield', 'Naperville', 'Peoria'],
    'Pennsylvania': ['Philadelphia', 'Pittsburgh', 'Allentown', 'Erie'],
    'Ohio': ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo'],
    'Georgia': ['Atlanta', 'Savannah', 'Augusta', 'Macon'],
    'North Carolina': ['Charlotte', 'Raleigh', 'Greensboro', 'Durham'],
    'Michigan': ['Detroit', 'Grand Rapids', 'Ann Arbor', 'Lansing']
  };

  // Handle State Change (Reset District on Change)
  const handleStateChange = (e) => {
    setState(e.target.value);
    setDistrict('');
  };

// Handle Form Submission (Send data to Flask API)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!state || !district || quantity < 1) {
      alert('Please fill all fields correctly.');
      return;
    }

    if (!donorId) {
      alert('Error: Donor ID not found. Please try logging in again.');
      return;
    }

    if (!requestId) {
      alert('Error: Request ID is missing or invalid.');
      return;
    }

    // Prepare donation data
    const donationData = {
      donor_id: donorId,
      request_id: requestId,
      quantity: quantity,
      items_donated: prefilledItem,  // sending the donated items
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/donor/donate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(donationData),
      });

      const data = await response.json();
      console.log('Donation Response:', data);

      if (response.ok) {
        alert('Donation submitted successfully!');
        navigate('/Donor_Dashboard');
      } else {
        alert('Error submitting donation: ' + data.error);
      }
    } catch (error) {
      console.error('Error submitting donation:', error);
      alert('An error occurred. Please try again.');
    }
  };


  return (
    <div className="donation-form">
      <div className='donation-container'>
        <NavBarComponent />
        <h1>Donation Form</h1>
        <form onSubmit={handleSubmit}>

          {/* Donating Items (Read-Only) */}
          <div className="form-group">
            <label htmlFor="donatingItems">Donating Items:</label>
            <input type="text" id="donatingItems" value={prefilledItem} readOnly />
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

          {/* State Selection */}
          <div className="form-group">
            <label htmlFor="state">State:</label>
            <select id="state" value={state} onChange={handleStateChange} required>
              <option value="">Select a state</option>
              {states.map((stateOption) => (
                <option key={stateOption} value={stateOption}>{stateOption}</option>
              ))}
            </select>
          </div>

          {/* District Selection */}
          <div className="form-group">
            <label htmlFor="district">District:</label>
            <select
              id="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
              disabled={!state}
            >
              <option value="">Select a district</option>
              {state && districts[state]?.map((districtOption) => (
                <option key={districtOption} value={districtOption}>{districtOption}</option>
              ))}
            </select>
          </div>

          {/* NGO Name (Read-Only) */}
          <div className="form-group">
            <label htmlFor="ngo">NGO Name:</label>
            <input type="text" id="ngo" value={prefilledNgo} readOnly />
          </div>

          <button type="submit">Submit Donation</button>
        </form>
      </div>
    </div>
  );
};

export default DonationForm;
