import React, { useState, useEffect } from 'react';
import './Donor_Form.css'

const DonationForm = () => {
  // State management
  const [donatingItems, setDonatingItems] = useState('');
  const [quantity, setQuantity] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [ngo, setNgo] = useState('');

  // Dummy data for the dropdowns
  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
    'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ];

  const districts = {
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore'],
    'Bihar': ['Patna', 'Gaya', 'Muzaffarpur', 'Bhagalpur'],
    'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Nashik'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra'],
    'Karnataka': ['Bengaluru Urban', 'Mysuru', 'Dharwad', 'Kalaburagi', 'Udupi']
    // Add more states and districts as required
  };

  const ngos = ['NGO 1', 'NGO 2', 'NGO 3', 'NGO 4'];

  // Handle state change
  const handleStateChange = (e) => {
    setState(e.target.value);
    setDistrict(''); // Reset district when state changes
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const donationData = {
      donatingItems,
      quantity,
      state,
      district,
      ngo
    };
    console.log(donationData); // Handle the submission logic (e.g., sending to the backend)
    alert('Donation details submitted successfully!');
  };

  return (
    <div className="donation-form">
      <div className='donation-container'>
        <h1>Donation Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="donatingItems">Donating Items:</label>
            <select
              id="donatingItems"
              value={donatingItems}
              onChange={(e) => setDonatingItems(e.target.value)}
              required
            >
              <option >Select an item</option>
              <option value="Clothes">Clothes</option>
              <option value="Food">Food</option>
              <option value="Funds">Funds</option>
              <option value="Toiletries/Sanitary Items">Toiletries/Sanitary Items</option>
            </select>
          </div>
  
          <div className="form-group">
          <label htmlFor="quantity">Quantity:</label>
          <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              onInput={(e) => {
              if (e.target.value < 1) e.target.value = 1;
              }}
              min="1"
              required
          />
          </div>
  
  
          <div className="form-group">
            <label htmlFor="state">State:</label>
            <select
              id="state"
              value={state}
              onChange={handleStateChange}
              required
            >
              <option value="">Select a state</option>
              {states.map((stateOption) => (
                <option key={stateOption} value={stateOption}>
                  {stateOption}
                </option>
              ))}
            </select>
          </div>
  
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
                <option key={districtOption} value={districtOption}>
                  {districtOption}
                </option>
              ))}
            </select>
          </div>
  
          <div className="form-group">
            <label htmlFor="ngo">NGO Name:</label>
            <select
              id="ngo"
              value={ngo}
              onChange={(e) => setNgo(e.target.value)}
              required
            >
              <option value="">Select an NGO</option>
              {ngos.map((ngoOption) => (
                <option key={ngoOption} value={ngoOption}>
                  {ngoOption}
                </option>
              ))}
            </select>
          </div>
  
          <button type="submit">Submit Donation</button>
        </form>
      </div>  
      
    </div>
  );
};

export default DonationForm;
