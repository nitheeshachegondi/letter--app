import React from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("User logged in:", result.user);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>
      <button
        onClick={signInWithGoogle}
        style={{ padding: "10px", fontSize: "16px" }}
      >
        Sign in with Google
      </button>
      <br />
      <button
        onClick={handleLogin}
        style={{ padding: "10px", fontSize: "16px", marginTop: "10px" }}
      >
        Handle Login
      </button>
    </div>
  );
};

export default Login;
