// src/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.201:3000', // URL do seu backend NestJS
});

export const setAuthToken = (token: string | null) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
