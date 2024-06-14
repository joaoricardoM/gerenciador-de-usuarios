import axios from "axios";

const API_URL = "http://192.168.1.201:3000/payments";

export interface CreatePaymentDto {
	accountId: number;
	value: number;
	date: string;
	description: string;
}

export const createPayment = async (
	paymentDto: CreatePaymentDto,
	files: File[]
) => {
    const requestData = {
        accountId: paymentDto.accountId,
        value: paymentDto.value,
        date: paymentDto.date,
        description: paymentDto.description,
      };

      if (files?.length > 0) {
        const formData = new FormData();
        files.forEach((file) => {
          formData.append("files", file);
        });
      }

	console.log("requestData", requestData);

	return axios.post(API_URL, requestData);
};


export const getPayment = async () => {
  return axios.get(API_URL)
}