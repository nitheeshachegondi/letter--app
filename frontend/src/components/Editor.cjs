const React = require("react");
const { useState } = require("react");
const axios = require("axios");

const Editor = ({ user }) => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const saveToGoogleDrive = async () => {
    if (!user?.email) {
      alert("You need to be logged in to save.");
      return;
    }

    try {
      setLoading(true); // Start loading
      await axios.post("http://localhost:5000/api/save", {
        content,
        userEmail: user.email,
      });
      alert("Saved to Google Drive!");
    } catch (error) {
      console.error("Error saving:", error);
      alert("Failed to save. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return React.createElement(
    "div",
    { style: { textAlign: "center", marginTop: "50px" } },
    React.createElement("h2", null, "Write Your Letter"),
    React.createElement("textarea", {
      value: content,
      onChange: (e) => setContent(e.target.value),
      style: {
        width: "80%",
        height: "200px",
        marginTop: "10px",
        padding: "10px",
        fontSize: "16px",
      },
    }),
    React.createElement(
      "button",
      {
        onClick: saveToGoogleDrive,
        disabled: loading, // Disable while saving
        style: {
          marginTop: "20px",
          padding: "10px",
          backgroundColor: loading ? "gray" : "#007bff",
          cursor: loading ? "not-allowed" : "pointer",
        },
      },
      loading ? "Saving..." : "Save to Google Drive"
    )
  );
};

module.exports = Editor;
