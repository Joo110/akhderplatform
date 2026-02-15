import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "https://localhost:7114/api";

const axiosClient = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
  },
});

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
