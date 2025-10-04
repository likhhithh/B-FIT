import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_APT_URL || "http://localhost:5001/api",
  withCredentials: true, // send/receive auth cookie
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    // Optional: handle 401 globally
    return Promise.reject(err);
  }
);
