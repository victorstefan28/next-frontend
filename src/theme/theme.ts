// src/theme.ts
"use client";

import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      default: "#2E2E2E", // Dark Gray
    },
    primary: {
      main: "#FF4500", // Red
    },
    secondary: {
      main: "#FFD700", // Gold
    },
    text: {
      primary: "#FFFFFF", // White for text
      secondary: "#D3D3D3", // Light Gray for secondary text
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#1B263B", // Dark Blue for Card components
          color: "#FFFFFF",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px", // Example of custom styling
        },
        containedPrimary: {
          backgroundColor: "#FF4500",
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#E63E00",
          },
        },
        containedSecondary: {
          backgroundColor: "#FFD700",
          color: "#000000",
          "&:hover": {
            backgroundColor: "#FFC400",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#000000", // Black for AppBar
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#1E3A5F", // Dark Blue for Paper components
          color: "#FFFFFF",
        },
      },
    },
  },
  typography: {
    allVariants: {
      color: "#FFFFFF", // White text for all variants
    },
    fontFamily: "Roboto, Arial, sans-serif",
    h1: { fontSize: "2.5rem" },
    h2: { fontSize: "2rem" },
    body1: { fontSize: "1rem" },
  },
});

export default theme;
