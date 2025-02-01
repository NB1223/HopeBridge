import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import AboutUsPage from './Pages/About_Us.jsx';
import AddReq from "./Pages/AddReq.jsx"; // The AddReq page
import Donor_Dash from './Pages/Donor_Dashboard';
import DonationForm from './Pages/Donor_Form.jsx';
import Register_Donor from './Pages/Donor_Register.jsx';
import LandingPage from './Pages/LandingPage.jsx';
import LoginPage from './Pages/Login.jsx';
import NGO_Dash from './Pages/NGO_Dash.jsx';
import NGOsPage from './Pages/Ngo_Intro.jsx';
import Register_NGO from './Pages/NGO_Register.jsx';
import TrackReq from "./Pages/TrackReq.jsx"; // The TrackReq page
import EmergencyNotifications from './Pages/emer_notif.jsx';


function App() {
  return (
    <div className="App">
      <Router>
        {/* <NGO_Dash/> */}
        {/* <NavbarComponent /> */}
        {/* <AboutUsPage/> */}
        {/* <Register_Donor/> */}
        {/* <LoginPage/> */}
        <Routes>
          {/* parallax path */}
          <Route path="/" element={<LandingPage />} />
          {/* <Route path="/" /> */}
          <Route path="/Donor_Dashboard" element={<Donor_Dash />} />
          <Route path="/Partnered_NGOs" element={<NGOsPage/>} />
          <Route path="/About_Us" element={<AboutUsPage/>} />
          <Route path="/Donate" element={<DonationForm/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/Register_NGO" element={<Register_NGO />} />
          <Route path="/Register_Donor" element={<Register_Donor />} />
          
          <Route path="/ngo-dashboard" element={<NGO_Dash />} />
          <Route path="/add-request" element={<AddReq />} />
         <Route path="/track-requests" element={<TrackReq />} />
         <Route path="/Notifications" element={<EmergencyNotifications/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;