import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Register_BG from "../assets/Register_BG.jpg";
import "./Donor_Register.css";

export default function Register_Donor() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [password, setPassword] = useState("");

  const statesWithDistricts = {
    "California": ["Los Angeles", "San Francisco", "San Diego", "Sacramento"],
    "Texas": ["Houston", "Dallas", "Austin", "San Antonio"],
    "New York": ["New York City", "Buffalo", "Rochester", "Albany"],
    "Florida": ["Miami", "Orlando", "Tampa", "Jacksonville"],
  };

const handleRegister = async (e) => {
  e.preventDefault();

  const donorData = {
    name,
    phone,
    email,
    state,
    district,
    password,
  };

  try {
    const response = await fetch("http://127.0.0.1:5000/donor/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(donorData),
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
