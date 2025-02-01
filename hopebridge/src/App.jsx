import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AboutUsPage from './Pages/About_Us.jsx';
import Donor_Dash from './Pages/Donor_Dashboard';
import DonationForm from './Pages/Donor_Form.jsx';
import Register_Donor from './Pages/Donor_Register.jsx';
import LoginPage from './Pages/Login.jsx';
import NGOsPage from './Pages/Ngo_Intro.jsx';
import Register_NGO from './Pages/NGO_Register.jsx';
import NGO_Dash from './Pages/NGO_Dash.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <NGO_Dash/>
        {/* <NavbarComponent /> */}
        {/* <AboutUsPage/> */}
        {/* <Register_Donor/> */}
        {/* <LoginPage/> */}
        <Routes>
          {/* parallax path */}
          <Route path="/" />
          <Route path="/Donor_Dashboard" element={<Donor_Dash />} />
          <Route path="/Partnered_NGOs" element={<NGOsPage/>} />
          <Route path="/About_Us" element={<AboutUsPage/>} />
          <Route path="/Donate" element={<DonationForm/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Register_NGO" element={<Register_NGO />} />
          <Route path="/Register_Donor" element={<Register_Donor />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;