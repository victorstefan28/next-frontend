import React, { createContext, useContext, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";
interface LoadingContextType {
  incrementLoading: () => void;
  decrementLoading: () => void;
}

export const LoadingContext = createContext<LoadingContextType | undefined>(
  undefined
);

export const LoadingProvider = ({ children }: any) => {
  const [loadingCount, setLoadingCount] = useState(0);

  const incrementLoading = () => setLoadingCount((prev) => prev + 1);
  const decrementLoading = () =>
    setLoadingCount((prev) => Math.max(prev - 1, 0));

  return (
    <LoadingContext.Provider value={{ incrementLoading, decrementLoading }}>
      {children}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => 99999 }}
        open={loadingCount > 0}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </LoadingContext.Provider>
  );
};
