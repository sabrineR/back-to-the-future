import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const handleAxiosError = (err: unknown): never => {
  if (axios.isAxiosError(err)) {
    throw new Error(
      err.response?.data?.message ||
        err.message ||
        "An unexpected error occurred",
    );
  }

  throw new Error("An unexpected error occurred");
};
