const React = require("react");
const ReactDOM = require("react-dom/client");
const App = require("./src/App.cjs");

console.log("React App Loaded");

document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(React.createElement(App));
  }
});
