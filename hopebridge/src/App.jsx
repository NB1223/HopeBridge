import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import NavbarComponent from './Components/NavBar.jsx';
import AboutUsPage from './Pages/About_Us.jsx';
import Donor_Dash from './Pages/Donor_Dashboard';
import DonationForm from './Pages/Donor_Form.jsx';
import LoginPage from './Pages/Login.jsx';
import LoginDonor from './Pages/LoginDonor.jsx';
import LoginNgo from './Pages/LoginNgo.jsx';
import NGOsPage from './Pages/Ngo_Intro.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <NavbarComponent />
        {/* <AboutUsPage/> */}
        <LoginPage/>
        <Routes>
          <Route path="/"element={<Donor_Dash />} />
          <Route path="/Donor_Dashboard" element={<Donor_Dash />} />
          <Route path="/Partnered_NGOs" element={<NGOsPage/>} />
          <Route path="/About_Us" element={<AboutUsPage/>} />
          <Route path="/Donate" element={<DonationForm/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/login-donor" element={<LoginDonor />} />
          <Route path="/login-ngo" element={<LoginNgo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;