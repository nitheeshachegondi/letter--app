import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const Editor = ({ user }) => {
  const [content, setContent] = useState("");

  const saveToGoogleDrive = async () => {
    try {
      await axios.post("http://localhost:5000/api/save", {
        content,
        userEmail: user.email,
      });
      alert("Saved to Google Drive!");
    } catch (error) {
      console.error("Error saving:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Write Your Letter</h2>
      <ReactQuill value={content} onChange={setContent} />
      <button
        onClick={saveToGoogleDrive}
        style={{ marginTop: "20px", padding: "10px" }}
      >
        Save to Google Drive
      </button>
    </div>
  );
};

export default Editor;
