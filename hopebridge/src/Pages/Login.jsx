import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Login</h1>
      <button className="donor-btn" onClick={() => navigate("/login-donor")}>
        Login as Donor
      </button>
      <button className="ngo-btn" onClick={() => navigate("/login-ngo")}>
        Login as NGO
      </button>
    </div>
  );
}
