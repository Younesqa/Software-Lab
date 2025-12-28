import axios from "axios";

export const API = axios.create({
  baseURL: "http://localhost:5000",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.authorization = `Bearer ${token}`; // lowercase ok
    // أو: config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
