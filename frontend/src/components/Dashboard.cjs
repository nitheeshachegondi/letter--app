const React = require("react");
const { useNavigate } = require("react-router-dom");

const Dashboard = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      background: "linear-gradient(to bottom right, #3b82f6, #9333ea)",
      color: "white",
    },
    card: {
      background: "white",
      color: "#333",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      borderRadius: "12px",
      padding: "30px",
      maxWidth: "400px",
      textAlign: "center",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "10px",
    },
    text: {
      color: "#666",
      marginBottom: "20px",
    },
    button: {
      width: "100%",
      padding: "12px",
      fontSize: "16px",
      fontWeight: "bold",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.3s ease-in-out",
    },
    createButton: {
      background: "#2563eb",
      color: "white",
      marginBottom: "10px",
    },
    logoutButton: {
      background: "#dc2626",
      color: "white",
    },
    hoverEffect: {
      transition: "background 0.3s ease-in-out",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Welcome, {user?.displayName || "User"}!</h2>

        <p style={styles.text}>Create and manage your letters with ease.</p>

        <div>
          <button
            onClick={() => navigate("/editor")}
            style={{ ...styles.button, ...styles.createButton }}
            onMouseOver={(e) => (e.target.style.background = "#1e40af")}
            onMouseOut={(e) => (e.target.style.background = "#2563eb")}
          >
            ✍️ Create Letter
          </button>

          <button
            onClick={handleLogout}
            style={{ ...styles.button, ...styles.logoutButton }}
            onMouseOver={(e) => (e.target.style.background = "#991b1b")}
            onMouseOut={(e) => (e.target.style.background = "#dc2626")}
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

module.exports = Dashboard;
