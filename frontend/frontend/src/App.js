import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Editor from "./components/Editor";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route
          path="/dashboard"
          element={
            user ? <Dashboard user={user} /> : <Login setUser={setUser} />
          }
        />
        <Route
          path="/editor"
          element={user ? <Editor user={user} /> : <Login setUser={setUser} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
