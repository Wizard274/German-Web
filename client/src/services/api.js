import axios from 'axios';

let rawUrl = import.meta.env.VITE_API_URL || '/api';
if (rawUrl !== '/api' && !rawUrl.endsWith('/api')) {
  rawUrl = rawUrl.replace(/\/+$/, '') + '/api';
}

const api = axios.create({
  baseURL: rawUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercept requests to inject Authorization token if saved in localStorage
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('lingua_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
