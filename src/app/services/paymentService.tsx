import api from "../api/api";


export interface CreatePaymentDto {
    accountId: number;
    value: number;
    date: string;
    description: string;
}

export const createPayment = async (paymentDto: CreatePaymentDto, file: File) => {
    const formData = new FormData();
    formData.append('file', file)
    formData.append('accountId', paymentDto.accountId.toString());
    formData.append('value', paymentDto.value.toString());
    formData.append('date', paymentDto.date);
    formData.append('description', paymentDto.description);

    const response = await api.post('/payments', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    console.log(response)

    return response.data

}