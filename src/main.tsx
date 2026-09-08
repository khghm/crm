import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { initializeApp } from "./utils/initialize";

// Initialize app data
initializeApp();

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
