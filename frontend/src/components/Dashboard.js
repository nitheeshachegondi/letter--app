import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Welcome, {user?.displayName || "User"}!</h2>
      <button
        onClick={() => navigate("/editor")}
        style={{ margin: "10px", padding: "10px" }}
      >
        Create Letter
      </button>
      <button onClick={handleLogout} style={{ padding: "10px" }}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
