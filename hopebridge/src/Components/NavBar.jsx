import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import the updated CSS

function NavbarComponent() {
  return (
    <div className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          HopeBridge
        </Link>
        <nav className="nav">
          <Link to="/About_Us" className="nav-link">About Us</Link>
          <Link to="/Donate" className="nav-link">Donate</Link>  
          <Link to="/Partnered_NGOs" className="nav-link">Partnered NGOs</Link>
        </nav>
      </div>
    </div>
  );
}

export default NavbarComponent;
