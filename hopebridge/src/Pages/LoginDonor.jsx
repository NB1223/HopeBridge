import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginDonor.css";

export default function LoginDonor() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Donor Login:", { email, password });
    // Handle authentication here (API call, validation, etc.)
  };

  return (
    <div className="container">
      <h1>Donor Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <button className="back-btn" onClick={() => navigate("/")}>
        Go Back
      </button>
    </div>
  );
}
