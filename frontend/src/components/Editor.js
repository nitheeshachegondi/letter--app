import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

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

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Write Your Letter</h2>
      <ReactQuill value={content} onChange={setContent} />
      <button
        onClick={saveToGoogleDrive}
        disabled={loading} // Disable while saving
        style={{
          marginTop: "20px",
          padding: "10px",
          backgroundColor: loading ? "gray" : "#007bff",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Saving..." : "Save to Google Drive"}
      </button>
    </div>
  );
};

export default Editor;
