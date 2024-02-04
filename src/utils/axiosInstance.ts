// utils/axiosInstance.ts

import axios from "axios";
const BASE_URL_HTTPS = "https://localhost:7225/";
const BASE_URL_HTTP = "http://localhost:5012/";
const axiosInstance = axios.create({
  baseURL: BASE_URL_HTTP, // Replace with your API base URL
  // You can add more default settings here, like headers
});

export default axiosInstance;
