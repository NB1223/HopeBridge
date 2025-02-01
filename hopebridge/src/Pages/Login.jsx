import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Login_BG from "../assets/Login_BG.jpg"; // Ensure the path is correct

export default function LoginPage() {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState("donor"); // "donor" or "ngo"

  return (
    <div className="container-login">
      {/* Left Image Section */}
      <div className="image-section">
        <img src={Login_BG} alt="Login Background" />
      </div>

      {/* Right Login Section */}
      <div className="login-section">
        <h1>{loginType === "donor" ? "Donor Login" : "NGO Login"}</h1>

        <form className="login-form">
          {loginType === "donor" ? (
            <>
              <input type="email" placeholder="Email" required />
            </>
          ) : (
            <>
              <input type="text" placeholder="Unique ID" required />
            </>
          )}
          <input type="password" placeholder="Password" required />
          <button type="submit">Login</button>
        </form>

        {/* Toggle Login Type */}
        <p className="switch-text">
          {loginType === "donor"
            ? "Are you an NGO? "
            : "Are you a Donor? "}
          <span
            className="switch-link"
            onClick={() => setLoginType(loginType === "donor" ? "ngo" : "donor")}
          >
            Click here
          </span>
        </p>

        <button className="back-btn" onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    </div>
  );
}
