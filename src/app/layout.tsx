import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { ThemeProvider } from "react-bootstrap";
import theme from "@/theme/theme";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

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
  return (
    <html lang="en">
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <ThemeProvider theme={theme}>
          <body className={inter.className}>{children}</body>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
