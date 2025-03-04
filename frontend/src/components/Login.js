import React from "react";
import firebase from "../firebase";
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

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Login</h2>
      <button
        onClick={signInWithGoogle}
        style={{ padding: "10px", fontSize: "16px" }}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
