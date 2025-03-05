const React = require("react");
const { useNavigate } = require("react-router-dom");
const { auth, provider } = require("../firebase.cjs");
const { signInWithPopup } = require("firebase/auth");

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

  return React.createElement(
    "div",
    { style: { textAlign: "center", marginTop: "50px" } },
    React.createElement("h2", null, "Login"),
    React.createElement(
      "button",
      {
        onClick: signInWithGoogle,
        style: { padding: "10px", fontSize: "16px" },
      },
      "Sign in with Google"
    )
  );
};

module.exports = Login;
