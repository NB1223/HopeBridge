import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login_BG from "../assets/Login_BG.jpg"; // Ensure the path is correct
import "./Login.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [loginType, setLoginType] = useState("donor"); // "donor" or "ngo"
  const [formData, setFormData] = useState({ email: "", unique_id: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous errors

    try {
      let url = "";
      let bodyData = {};
      
      if (loginType === "ngo") {
        url = "http://127.0.0.1:5000/ngo/login";
        bodyData = { unique_id: formData.unique_id, password: formData.password };
      } else {
        url = "http://127.0.0.1:5000/donor/login";
        bodyData = { email: formData.email, password: formData.password };
      }

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("login_type", loginType); // Store login type in localStorage
        if (loginType === "ngo") {
          localStorage.setItem("ngo_unique_id", formData.unique_id); // Store NGO unique_id
          navigate("/ngo-dashboard"); // Redirect to NGO Dashboard
        } else {
          localStorage.setItem("donor_email", formData.email); // Store Donor email
          navigate("/Donor_Dashboard"); // Redirect to Donor Dashboard
        }
        alert(`Login successful! Your Unique ID: ${formData.unique_id}`);
      } else {
        setErrorMessage(data.message || "Invalid login credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Server error. Try again.");
    }
  };

  return (
    <div className="container-login">
      {/* Left Image Section */}
      <div className="image-section">
        <img src={Login_BG} alt="Login Background" />
      </div>

      {/* Right Login Section */}
      <div className="login-section">
        <h1>{loginType === "donor" ? "Donor Login" : "NGO Login"}</h1>

        <form className="login-form" onSubmit={handleLogin}>
          {loginType === "donor" ? (
            <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
          ) : (
            <input type="text" name="unique_id" placeholder="Unique ID" required onChange={handleChange} />
          )}
          <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
          <button type="submit">Login</button>
        </form>

        {/* Show error message if login fails */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        {/* Toggle Login Type */}
        <p className="switch-text">
          {loginType === "donor" ? "Are you an NGO? " : "Are you a Donor? "}
          <span className="switch-link" onClick={() => setLoginType(loginType === "donor" ? "ngo" : "donor")}>
            Click here
          </span>
        </p>

        <button className="back-btn" onClick={() => navigate("/")}>Go Back</button>
      </div>
    </div>
  );
}
