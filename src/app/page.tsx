"use client";

// src/App.tsx
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { Button, Input } from "@nextui-org/react";
import { LoginDto, login } from "./services/authService";
import { setAuthToken } from "./api/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
	username: string;
	password: string;
}

const App: React.FC = () => {
	const { login: contextLogin } = useAuth();
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>();

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		try {
			const response = await login(data as LoginDto);
			setAuthToken(response.access_token);
			contextLogin(response.access_token);
			toast.success("Login efetuado com sucesso!");
			router.push("/home");
		} catch (error) {
			console.log("Erro Login:", error);
			toast.error("Erro ao efetuar login!");
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900">
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-6"
			>
				<div className="text-center">
					<h2 className="text-2xl font-bold text-gray-900">Internet Banking</h2>
					<p className="text-gray-600">Faça login para acessar sua conta</p>
				</div>
				<div>
					<label className="block text-gray-700">Username</label>
					<Input
						type="text"
						{...register("username", { required: true })}
						placeholder="Username"
						className="w-full mt-2"
					/>
					{errors.username && (
						<p className="text-red-500 text-sm">Username é obrigatório</p>
					)}
				</div>
				<div>
					<label className="block text-gray-700">Password</label>
					<Input
						type="password"
						{...register("password", { required: true, minLength: 7 })}
						placeholder="Password"
						className="w-full mt-2"
					/>
					{errors.password?.type === "required" && (
						<p className="text-red-500 text-sm">Password é obrigatória</p>
					)}
					{errors.password?.type === "minLength" && (
						<p className="text-red-500 text-sm">
							Password deve ter no mínimo 5 caracteres
						</p>
					)}
				</div>
				<Button
					className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-200"
					type="submit"
				>
					Login
				</Button>
				<div className="text-center">
					<p className="text-gray-600">
						Não tem uma conta? &nbsp;
						<Link className="text-blue-500 hover:underline" href="/register">
							Inscrever-se
						</Link>
					</p>
				</div>
			</form>
		</div>
	);
};

export default App;
