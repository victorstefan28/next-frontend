// src/theme.ts
"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#0D47A1" }, // Deep blue
    secondary: { main: "#F9A825" }, // Vibrant yellow
    background: {
      default: "#f4f4f4", // Light grey
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: { fontSize: "2.5rem" },
    h2: { fontSize: "2rem" },
    body1: { fontSize: "1rem" },
  },
});

export default theme;
