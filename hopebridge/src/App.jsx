import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Donor_Dash from './Pages/Donor_Dashboard';
import NavbarComponent from './Components/NavBar.jsx';
import NGOsPage from './Pages/Ngo_Intro.jsx';
import AboutUsPage from './Pages/About_Us.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <NavbarComponent />
        {/* <AboutUsPage/> */}
        <Routes>
          <Route path="/"element={<Donor_Dash />} />
          <Route path="/Donor_Dashboard" element={<Donor_Dash />} />
          <Route path="/Partnered_NGOs" element={<NGOsPage/>} />
          <Route path="/About_Us" element={<AboutUsPage/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
