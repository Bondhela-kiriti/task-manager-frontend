import axios from "axios";

const API = axios.create({
  baseURL: "https://taskmanager-backend-gv7s.onrender.com", // change to Render URL after deploy
});

// Add token automatically if exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
