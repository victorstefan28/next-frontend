import axios, { AxiosError } from "axios";
import axiosInstance from "./axiosInstance";
import { HttpMethod } from "./httpMethods";
import { isJwtExpired } from "./isJwtExpired";
import { useRouter } from "next/navigation";
import extractErrorMessage from "./errorHandler";
import { toast } from "react-toastify";

// utils/api.ts
const BASE_URL_HTTPS = "https://localhost:7225/";
const BASE_URL_HTTP = "http://localhost:5012/";

const getTokens = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return { accessToken, refreshToken };
};

const setTokens = (accessToken: string, refreshToken?: string) => {
  localStorage.setItem("accessToken", accessToken);
  if (refreshToken) localStorage.setItem("refreshToken", refreshToken);
};

export const refreshTokenFunc = async () => {
  const { refreshToken } = getTokens();

  const newTokens: any = await axios.post(
    BASE_URL_HTTP + "auth/refresh?refreshToken=" + refreshToken,
    {},
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  setTokens(newTokens.data.accessToken);
  return newTokens.data.accessToken;
};

const apiCall = async (
  endpoint: string,
  method: HttpMethod = HttpMethod.GET,
  data: any = null
) => {
  let { accessToken, refreshToken } = getTokens();

  if (
    (!accessToken || isJwtExpired(accessToken)) &&
    endpoint !== "/auth/refresh" &&
    endpoint !== "/auth/login" &&
    endpoint !== "/auth/register" &&
    window.location.pathname !== "/login" &&
    window.location.pathname !== "/register"
  ) {
    try {
      accessToken = await refreshTokenFunc();
    } catch (error) {
      console.error("Error refreshing token:", error);
      window.location.href = "/login";
      return;
    }
  }

  try {
    const response = await axiosInstance({
      url: endpoint,
      method,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      ...(data && { data }),
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 401) {
      try {
        accessToken = await refreshTokenFunc();
        const response = await axiosInstance({
          url: endpoint,
          method,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          ...(data && { data }),
        });

        return response.data;
      } catch (error) {
        console.error("Error refreshing token:", error);
        window.location.href = "/login";
      }
    } else {
      throw error;
    }
  }
};

export default apiCall;
