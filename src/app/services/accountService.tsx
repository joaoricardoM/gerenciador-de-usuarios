import axios from "axios";

export interface CreateAccountDto {
    password: string;
    username: string;
    email: string;
  }

  const API_URL = 'http://192.168.1.201:3000/register';
  
  export const createAccount = async (credentials: CreateAccountDto) => {
    return axios.post(API_URL, credentials);
  };
  