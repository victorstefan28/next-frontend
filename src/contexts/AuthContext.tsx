// contexts/AuthContext.tsx
"use client";
import { refreshTokenFunc } from "@/utils/api";
import { isJwtExpired, parseJwt } from "@/utils/isJwtExpired";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  accessToken: string | null;
  refreshToken: string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  clearTokens: () => void;
  isAdmin: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();
  const [accessToken, setAccessToken] = useState<string | null>(
    localStorage.getItem("accessToken")
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem("refreshToken")
  );

  const setTokens = (newAccessToken: string, newRefreshToken: string) => {
    setAccessToken(newAccessToken);
    setRefreshToken(newRefreshToken);
    localStorage.setItem("accessToken", newAccessToken);
    localStorage.setItem("refreshToken", newRefreshToken);
  };
  const clearTokens = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setAccessToken(null);
    setRefreshToken(null);
  };
  useEffect(() => {
    if (isJwtExpired(accessToken)) {
      refreshTokenFunc();
    }
    console.log("AuthContext: useEffect", accessToken, refreshToken);
    if (
      isJwtExpired(accessToken) &&
      isJwtExpired(refreshToken) &&
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/register"
    ) {
      router.push("/login");
    }
  }, [accessToken, refreshToken]);

  let isAdmin = false;
  if (accessToken) isAdmin = parseJwt(accessToken)?.role === "Admin";

  return (
    <AuthContext.Provider
      value={{ accessToken, refreshToken, clearTokens, setTokens, isAdmin }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
