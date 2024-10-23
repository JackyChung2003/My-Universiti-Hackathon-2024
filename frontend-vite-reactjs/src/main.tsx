import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ThirdwebProvider } from "thirdweb/react";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename="/My-Universiti-Hackathon-2024">
    <React.StrictMode>
      <ThirdwebProvider>
        <App />
      </ThirdwebProvider>
    </React.StrictMode>
  </BrowserRouter>
);
