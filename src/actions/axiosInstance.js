import axios from "axios";
import { BASE_URL } from "../helpers/apiConfig";
import { logoutUser } from "./authActions";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    if (refreshToken) {
      config.headers["x-refresh-token"] = refreshToken;
    }
    config.headers["Content-Type"] = "application/json";

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    if (error.response?.status === 401) {
      console.error("Unauthorized. Redirecting to login...");
      logoutUser();
      window.location.href = "/login";
      return Promise.reject(error);
    } else {
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
