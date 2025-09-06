import axios from "axios";

const API = axios.create({
  baseURL: "https://52f83936-854e-486d-baff-5a833e82fd9d-00-1feeoixxxan1w.pike.replit.dev/api/", // change to Render URL after deploy
});

// Add token automatically if exists
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
