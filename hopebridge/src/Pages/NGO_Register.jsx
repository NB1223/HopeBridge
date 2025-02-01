import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Register_BG from "../assets/Register_BG.jpg";
import "./NGO_Register.css";

export default function Register_NGO() {
  const navigate = useNavigate();
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [sector, setSector] = useState("");
  const [ngoType, setNgoType] = useState("");
  const [ngoName, setNgoName] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  const [password, setPassword] = useState("");

  const statesWithDistricts = {
    "California": ["Los Angeles", "San Francisco", "San Diego", "Sacramento"],
    "Texas": ["Houston", "Dallas", "Austin", "San Antonio"],
    "New York": ["New York City", "Buffalo", "Rochester", "Albany"],
    "Florida": ["Miami", "Orlando", "Tampa", "Jacksonville"],
  };

  const sectors = ["Public", "Private"];

  const ngoTypes = [
    "Private Sector Companies (Sec 8/25)",
    "Registered Societies (Non-Government)",
    "Trust (Non-Government)",
    "Other Registered Entities (Non-Government)",
    "Academic Institutions (Private)",
    "Other",
  ];

  const handleRegister = async (e) => {
    e.preventDefault();

    const ngoData = {
      state,
      district,
      sector,
      ngo_type: ngoType,  
      ngo_name: ngoName,  
      unique_id: uniqueId,  
      password,
    };

    try {
      const response = await fetch("http://127.0.0.1:5000/ngo/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ngoData),
      });

      const result = await response.json();

      if (response.ok) {
        // Successfully registered
        console.log("Registration successful:", result);
        navigate("/login");  // Navigate to the login page after successful registration
      } else {
        // Handle errors (e.g., user already exists)
        console.log("Registration error:", result.message);
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  return (
    <div className="container-register">
      {/* Left Image Section */}
      <div className="image-section">
        <img src={Register_BG} alt="Register Background" />
      </div>

      {/* Right Registration Section */}
      <div className="register-section">
        <h1 className="NGO-reg">NGO Registration</h1>
        <form className="register-form" onSubmit={handleRegister}>
          {/* State Selection */}
          <select value={state} onChange={(e) => setState(e.target.value)} required>
            <option value="">Select State</option>
            {Object.keys(statesWithDistricts).map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>

          {/* District Selection */}
          <select value={district} onChange={(e) => setDistrict(e.target.value)} required>
            <option value="">Select District</option>
            {state && statesWithDistricts[state]
              ? statesWithDistricts[state].map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))
              : null}
          </select>

          {/* Sector Selection */}
          <select value={sector} onChange={(e) => setSector(e.target.value)} required>
            <option value="">Select Sector</option>
            {sectors.map((sec) => (
              <option key={sec} value={sec}>
                {sec}
              </option>
            ))}
          </select>

          {/* NGO Type Selection */}
          <select value={ngoType} onChange={(e) => setNgoType(e.target.value)} required>
            <option value="">Select NGO Type</option>
            {ngoTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          {/* NGO Name Input */}
          <input
            type="text"
            placeholder="NGO Name"
            value={ngoName}
            onChange={(e) => setNgoName(e.target.value)}
            required
          />

          {/* Unique ID Input */}
          <input
            type="text"
            placeholder="Unique ID"
            value={uniqueId}
            onChange={(e) => setUniqueId(e.target.value)}
            required
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Buttons */}
          <div className="btn-container">
            <button type="submit">Register</button>
            <button className="back-btn" onClick={() => navigate("/")}>Go Back</button>
          </div>
        </form>
      </div>
    </div>
  );
}
