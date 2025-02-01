import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Donor_Register.css";
import Register_BG from "../assets/Register_BG.jpg";

export default function Register_Donor() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [password, setPassword] = useState("");

  const statesWithDistricts = {
    "Andhra Pradesh": ["Visakhapatnam", "Vijayawada", "Guntur", "Kurnool"],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
    "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore"],
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log("Registration Data:", {
      name,
      phone,
      email,
      state,
      district,
      password,
    });
  };

  return (
    <div className="container-register">
      {/* Left Image Section */}
      <div className="image-section">
        <img src={Register_BG} alt="Register Background" />
      </div>

      {/* Right Registration Section */}
      <div className="register-section">
        <h1 className="NGO-reg">Donor Registration</h1>
        <form className="register-form" onSubmit={handleRegister}>
          {/* Name Input */}
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          {/* Phone Number Input */}
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

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
