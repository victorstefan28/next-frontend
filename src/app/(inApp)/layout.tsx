"use client";
import Navbar from "@/components/navbar/navbar";
import { LoadingProvider } from "@/contexts/LoadingContext";
import theme from "@/theme/theme";
import { Container, CssBaseline, Fade, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Simulate a loading process
    setTimeout(() => {
      setLoaded(true);
    }, 1000); // Adjust the time as needed
  }, []);

  return (
    <section>
      <LoadingProvider>
        {/* // <Fade in={loaded} timeout={1000}> */}

        {children}

        {/* </Fade> */}
      </LoadingProvider>
    </section>
  );
}
