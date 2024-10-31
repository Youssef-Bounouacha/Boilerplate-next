import axios from "axios";
import logger from "./logger";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { "Content-Type": "application/json" },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    logger.error("Request Error:", error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response) {
      switch (response.status) {
        case 400:
          logger.error("Bad Request:", response.data);
          break;
        case 401:
          logger.error("Unauthorized:", response.data);
          break;
        case 403:
          logger.error("Forbidden:", response.data);
          break;
        case 404:
          logger.error("Not Found:", response.data);
          break;
        case 500:
          logger.error("Internal Server Error:", response.data);
          break;
        default:
          logger.error(`Unexpected error (${response.status}):`, response.data);
      }
    } else {
      logger.error("Network Error:", error.message);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
