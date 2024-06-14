// src/services/authService.ts

import api from "../api/api";

export interface LoginDto {
  username: string;
  password: string;
}

export const login = async (credentials: LoginDto) => {
  const response = await api.post('/login', credentials);
  return response.data;
};
