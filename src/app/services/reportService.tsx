import axios from "axios";


const API_URL = "http://192.168.1.201:3000/payments/report";

export interface GenerateReportDto {
    startDate: string;
    endDate: string;
    accountId: number;
  }
  
  export const generateReport = async (reportData: GenerateReportDto) => {
    return axios.post(API_URL, reportData);

  };
  