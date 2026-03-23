import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL?.trim()
  ? import.meta.env.VITE_API_URL.trim()
  : import.meta.env.PROD
    ? "https://ttt-assinment-note-app-1.onrender.com/api/v1"
    : "http://localhost:5000/api/v1";

export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
