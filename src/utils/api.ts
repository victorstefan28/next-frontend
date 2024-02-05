import axios from "axios";
import axiosInstance from "./axiosInstance";
import { HttpMethod } from "./httpMethods";
import { isJwtExpired } from "./isJwtExpired";
import { useRouter } from "next/navigation";

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
  let { accessToken } = getTokens();

  if (
    (!accessToken || isJwtExpired(accessToken)) &&
    endpoint !== "/auth/refresh" &&
    endpoint !== "/auth/login"
  ) {
    try {
      accessToken = await refreshTokenFunc();
    } catch (error) {
      const router = useRouter();
      router.push("/login");
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
    // Handle errors (e.g., network error, request rejected by server)
    throw error;
  }
};

export default apiCall;
