import { CssBaseline, ThemeProvider } from "@mui/material";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { demo4Theme } from "./theme";
import "./tokens.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element was not found");
}

createRoot(root).render(
  <StrictMode>
    <ThemeProvider theme={demo4Theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
