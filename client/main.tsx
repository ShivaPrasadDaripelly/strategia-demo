import React, { StrictMode } from "react";
import { createRoot, Root } from "react-dom/client";
import App from "./App";
import "./global.css";

const container = document.getElementById("root")! as HTMLElement & { _root?: Root };

if (!container._root) {
  container._root = createRoot(container);
}

container._root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);
