const React = require("react");
const { useNavigate } = require("react-router-dom");

const Dashboard = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return React.createElement(
    "div",
    { style: { textAlign: "center", marginTop: "50px" } },
    React.createElement("h2", null, `Welcome, ${user?.displayName || "User"}!`),
    React.createElement(
      "button",
      {
        onClick: () => navigate("/editor"),
        style: { margin: "10px", padding: "10px" },
      },
      "Create Letter"
    ),
    React.createElement(
      "button",
      {
        onClick: handleLogout,
        style: { padding: "10px" },
      },
      "Logout"
    )
  );
};

module.exports = Dashboard;
