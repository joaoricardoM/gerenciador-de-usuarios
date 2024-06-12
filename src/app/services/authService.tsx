// src/services/authService.ts

import api from "../api/api";

export interface LoginDto {
  username: string;
  password: string;
}

export interface RegisterDto {
  username: string;
  password: string;
  email: string;
}

export const login = async (loginDto: LoginDto) => {
  const response = await api.post('/login', loginDto);
  return response.data;
};

export const register = async (registerDto: RegisterDto) => {
  const response = await api.post('/register', registerDto);
  return response.data;
};
