// frontend/src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  withCredentials: true, // ✅ envía cookies automáticamente
});

// 🔹 Ya no necesitamos el interceptor de token porque usamos cookie 'session'

export default api;
