// src/Pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';  // Import the specific CSS for LandingPage

function LandingPage() {
  return (
    <div className="landing-page">
      <h1>Hope Bridge</h1>
      <h3>Bridging the gap between Generosity and Need</h3>
      
      {/* Glass box with transparent background */}
      <div className="glass-box">
        <div className="button-container">
          <Link to="/Register_Donor">
            <button className="landing-button">Donor Register</button>
          </Link>
          <Link to="/Register_NGO">
            <button className="landing-button">NGOs Register</button>
          </Link>
          <Link to="/login">
            <button className="landing-button">Donor/NGO Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
