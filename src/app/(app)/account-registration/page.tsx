// src/components/AccountForm.tsx
"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
	Account,
	createAccountRegistration,
} from "../../services/accountRegistration";
import { toast } from "react-toastify";
import withAuth from "@/app/components/withAuth";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/react";

interface IFormInput {
	accountId: number;
	name: string;
	accountType: string;
	initialBalance: number;
}

const AccountForm: React.FC = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<IFormInput>();

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		try {
			const accountData: Account = {
				accountId: data.accountId,
				name: data.name,
				accountType: data.accountType,
				initialBalance: data.initialBalance,
			};

			await createAccountRegistration(accountData);
			toast.success("Conta cadastrada com sucesso!");
			router.push("/home");
			reset(); // Reset form fields
		} catch (error) {
			console.error("Error creating account:", error);
			toast.error("Falha ao cadastrar conta.");
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-400 via-gray-600 to-blue-800"
		>
			<div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
				<div className="mb-6">
					<h2 className="font-bold text-3xl text-center text-gray-800">
						Cadastro de Contas
					</h2>
				</div>
				<div className="flex flex-col space-y-4">
					<div className="flex flex-col">
						<label htmlFor="accountId" className="text-gray-700">
							Número da conta:
						</label>
						<Input
							type="number"
							{...register("accountId", {
								required: true,
								valueAsNumber: true,
								min: 1,
							})}
							id="accountId"
							placeholder="Número da Conta"
							className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
						/>
						{errors.accountId && errors.accountId.type === "required" && (
							<p className="text-red-500 text-sm mt-1">
								Número da conta é obrigatório
							</p>
						)}
						{errors.accountId && errors.accountId.type === "min" && (
							<p className="text-red-500 text-sm mt-1">
								Número da conta deve ser um número positivo
							</p>
						)}
					</div>
					<div className="flex flex-col">
						<label htmlFor="name" className="text-gray-700">
							Nome:
						</label>
						<Input
							type="text"
							{...register("name", { required: true })}
							id="name"
							placeholder="Nome"
							className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
						/>
						{errors.name && (
							<p className="text-red-500 text-sm mt-1">Nome é obrigatório</p>
						)}
					</div>
					<div className="flex flex-col">
						<label htmlFor="accountType" className="text-gray-700">
							Tipo de conta:
						</label>
						<Input
							type="text"
							{...register("accountType", { required: true })}
							id="accountType"
							placeholder="Tipo de Conta"
							className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
						/>
						{errors.accountType && (
							<p className="text-red-500 text-sm mt-1">
								Tipo de conta é obrigatório
							</p>
						)}
						<p className="text-xs text-gray-500 mt-1">
							Exemplo: Conta Corrente, Poupança
						</p>
					</div>
					<div className="flex flex-col">
						<label htmlFor="initialBalance" className="text-gray-700">
							Saldo Inicial:
						</label>
						<Input
							type="number"
							step="0.01"
							{...register("initialBalance", {
								required: true,
								valueAsNumber: true,
								min: 0,
							})}
							id="initialBalance"
							placeholder="Saldo Inicial"
							className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
						/>
						{errors.initialBalance &&
							errors.initialBalance.type === "required" && (
								<p className="text-red-500 text-sm mt-1">
									Saldo inicial é obrigatório
								</p>
							)}
						{errors.initialBalance && errors.initialBalance.type === "min" && (
							<p className="text-red-500 text-sm mt-1">
								Saldo inicial deve ser maior ou igual a zero
							</p>
						)}
					</div>
					<button
						type="submit"
						className="mt-6 px-4 py-2 bg-green-500 text-white font-semibold rounded-md shadow-md hover:bg-green-600 transition duration-200 focus:outline-none"
					>
						Cadastrar
					</button>
				</div>
			</div>
		</form>
	);
};

export default withAuth(AccountForm);
