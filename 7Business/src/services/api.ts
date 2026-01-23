import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? '/api',
  timeout: 10_000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Optional: add interceptors (logging/auth)
api.interceptors.request.use((config) => {
  // e.g., attach token from localStorage/context
  // config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
