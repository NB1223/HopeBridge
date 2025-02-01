import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Donor_Dash from './Pages/Donor_Dashboard';
import NavbarComponent from './Components/NavBar.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <NavbarComponent />
        <Donor_Dash/>
        <Routes>
          <Route path="/Donor_Dashboard" element={<Donor_Dash />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
