const React = require("react");
const { useState, useEffect } = require("react");
const { BrowserRouter, Routes, Route, Navigate } = require("react-router-dom");

const Login = require("./components/Login.cjs");
const Dashboard = require("./components/Dashboard.cjs");
const Editor = require("./components/Editor.cjs");

// 🔹 API Base URL (Handles Local & Vercel)
const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api"
    : "https://letter-app1.vercel.app/api";

function App() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // 🔹 Save Letter Function (API Call)
  const saveLetter = async (content, userEmail) => {
    try {
      const response = await fetch(`${API_BASE_URL}/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, userEmail }),
      });

      const data = await response.json();
      console.log("Save Response:", data);
    } catch (error) {
      console.error("Error saving letter:", error);
    }
  };

  return React.createElement(
    BrowserRouter,
    null,
    React.createElement(
      Routes,
      null,
      React.createElement(Route, {
        path: "/",
        element: React.createElement(Login, { setUser }),
      }),
      React.createElement(Route, {
        path: "/dashboard",
        element: user
          ? React.createElement(Dashboard, { user, saveLetter }) // 🔹 Pass `saveLetter`
          : React.createElement(Navigate, { to: "/" }),
      }),
      React.createElement(Route, {
        path: "/editor",
        element: user
          ? React.createElement(Editor, { user, saveLetter }) // 🔹 Pass `saveLetter`
          : React.createElement(Navigate, { to: "/" }),
      })
    )
  );
}

module.exports = App;
