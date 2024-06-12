"use client"

import { CreatePaymentDto, createPayment } from "@/app/services/paymentService"
import { useState } from "react";


const Payment: React.FC = () => {
    const [accountId, setAccountId] = useState('')
    const [value, setValue] = useState('')
    const [date, setDate] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState<File | null>(null)


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            console.error('No file selected');
            return;
        }

        try {
            const paymentData: CreatePaymentDto = { accountId: +accountId, value: +value, date, description };
            const data = await createPayment(paymentData, file);
            console.log('Pagamento criado com sucesso:', data);
        } catch (error) {
            console.error('Erro ao criar pagamento:', error);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <input
                type="number"
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                placeholder="Account ID"
                required
            />
            <input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Value"
                required
            />
            <input
                type="datetime-local"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
            />
            <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                required
            />
            <input
                type="file"
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
                required
            />
            <button type="submit">Create Payment</button>
        </form>
    )
}

export default Payment;