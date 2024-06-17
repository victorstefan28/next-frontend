"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import theme from "@/theme/theme";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { AuthProvider } from "@/contexts/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const meta: Metadata = {
  title: "Karate Competition Platform",
  description: "Join and manage karate competitions",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html lang="en">
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {isClient && <ToastContainer />}
          <AuthProvider>
            <body
              className={inter.className}
              style={{ backgroundColor: theme.palette.background.default }}
            >
              {children}
            </body>
          </AuthProvider>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
