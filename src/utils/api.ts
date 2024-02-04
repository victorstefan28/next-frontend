import axios from "axios";
import axiosInstance from "./axiosInstance";
import { HttpMethod } from "./httpMethods";

// utils/api.ts
const BASE_URL_HTTPS = "https://localhost:7225/";
const BASE_URL_HTTP = "http://localhost:5012/";

const getTokens = () => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  return { accessToken, refreshToken };
};

const setTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
};

const refreshTokenFunc = async () => {
  const { refreshToken } = getTokens();
  // Call your refresh token API endpoint using the refresh token
  // Assume this returns new access and refresh tokens
  const newTokens: any = await axios.post(
    BASE_URL_HTTP + "Auth/refresh?refreshToken=" + refreshToken,
    {},
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  setTokens(newTokens.accessToken, newTokens.refreshToken);
  return newTokens.accessToken;
};

const isTokenExpired = (token: string | null) => {
  // Implement logic to check if the token is expired
  // Usually, you decode the JWT and check the 'exp' field
  return false;
};

const apiCall = async (
  endpoint: string,
  method: HttpMethod = HttpMethod.GET,
  data: any = null
) => {
  let { accessToken } = getTokens();

  if (isTokenExpired(accessToken)) {
    accessToken = await refreshTokenFunc();
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
    // Handle errors (e.g., network error, request rejected by server)
    throw error;
  }
};

export default apiCall;
