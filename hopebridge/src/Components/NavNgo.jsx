import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import the updated CSS

function NavNgo() {
  return (
    <div className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          HopeBridge
        </Link>
        <nav className="nav">
          <Link to="/About_Us" className="nav-link">About Us</Link>
          <Link to="/Notifications" className="nav-link">Notifications</Link>  
          <Link to="/add-request" className="nav-link">Add Request</Link>  
          <Link to="/Partnered_NGOs" className="nav-link">Partnered NGOs</Link>
          <Link to="/ngo-dashboard" className="nav-link">Dashboard</Link>
        </nav>
      </div>
    </div>
  );
}

export default NavNgo;
