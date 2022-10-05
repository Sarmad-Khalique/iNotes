import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import RootProvider from "./context/rootProvider";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <RootProvider>
        <App />
      </RootProvider>
    </Router>
  </React.StrictMode>
);
