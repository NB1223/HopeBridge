import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginNgo.css";

export default function LoginNgo() {
  const [uniqueId, setUniqueId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("NGO Login:", { uniqueId, password });
    // Handle authentication here (API call, validation, etc.)
  };

  return (
    <div className="container">
      <h1>NGO Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Unique ID"
          value={uniqueId}
          onChange={(e) => setUniqueId(e.target.value)}
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
