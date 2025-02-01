import { useNavigate } from "react-router-dom";
import "./NGO_Dash.css"; // Assuming you will create a separate CSS file for styling

export default function NGO_Dash() {
  const navigate = useNavigate();

  return (
    <div className="ngo-dash-container">
      <h1 className="dashboard-title">NGO Dashboard</h1>
      <div className="button-container">
        {/* Button for adding a request */}
        <button
          className="dashboard-btn"
          onClick={() => navigate("/add-request")} // Adjust the route to your needs
        >
          Add a Request
        </button>

        {/* Button for tracking requests */}
        <button
          className="dashboard-btn"
          onClick={() => navigate("/track-requests")} // Adjust the route to your needs
        >
          Track Your Requests
        </button>
      </div>
    </div>
  );
}
