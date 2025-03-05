const React = require("react");
const { useState, useEffect } = require("react");
const { BrowserRouter, Routes, Route, Navigate } = require("react-router-dom");

const Login = require("./components/Login.cjs");
const Dashboard = require("./components/Dashboard.cjs");
const Editor = require("./components/Editor.cjs");

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
          ? React.createElement(Dashboard, { user })
          : React.createElement(Navigate, { to: "/" }),
      }),
      React.createElement(Route, {
        path: "/editor",
        element: user
          ? React.createElement(Editor, { user })
          : React.createElement(Navigate, { to: "/" }),
      })
    )
  );
}

module.exports = App;
