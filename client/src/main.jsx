import React from "react"; // Import React library
import ReactDOM from "react-dom/client"; // Import ReactDOM for rendering React components
import App from "./App"; // Import the main App component
import "./index.css"; // Import global styles for the application

// Create a root element and render the App component within it
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Render the App component inside React.StrictMode for additional checks and warnings */}
    <App />
  </React.StrictMode>
);
