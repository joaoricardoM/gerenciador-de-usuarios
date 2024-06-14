// src/services/accountService.ts
import axios from 'axios';

export interface Account {
    name: string;
    accountId: number;
    accountType: string;
    initialBalance: number;
}
  
const API_URL = 'http://192.168.1.201:3000/accounts';

export const createAccountRegistration = async (accountData: Account) => {
  try {
    const response = await axios.post(API_URL, accountData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAccounts = () => {
  return axios.get(API_URL);
};
