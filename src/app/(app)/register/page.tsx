"use client";

import { useState } from "react";
import { Input } from "@nextui-org/react";
import { createAccount } from "../../services/accountService";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
  username: string;
  password: string;
  email: string;
}

const CreateAccount: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<IFormInput>();
  const router = useRouter();

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const response = await createAccount(data);

      setTimeout(() => {
        toast.success("Conta criada com sucesso");
        console.log(response);
        router.push("/");
      }, 2000);
    } catch (error) {
      toast.error("Erro ao criar conta");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-700 via-blue-800 to-gray-900">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Cadastrar</h2>
          <p className="text-gray-600">Crie sua conta para acessar nossos serviços</p>
        </div>
        <div>
          <label className="block text-gray-700">Nome</label>
          <Input
            type="text"
            {...register("username", { required: true })}
            placeholder="Nome"
            className="w-full mt-2"
          />
          {errors.username && <p className="text-red-500 text-sm">Nome é obrigatório</p>}
        </div>
        <div>
          <label className="block text-gray-700">Senha</label>
          <Input
            type="password"
            {...register("password", { required: true, minLength: 7 })}
            placeholder="Senha"
            className="w-full mt-2"
          />
          {errors.password?.type === 'required' && <p className="text-red-500 text-sm">Senha é obrigatória</p>}
          {errors.password?.type === 'minLength' && <p className="text-red-500 text-sm">Senha deve ter no mínimo 7 caracteres</p>}
        </div>
        <div>
          <label className="block text-gray-700">Email</label>
          <Input
            type="email"
            {...register("email", { required: true })}
            placeholder="Email"
            className="w-full mt-2"
          />
          {errors.email && <p className="text-red-500 text-sm">Email é obrigatório</p>}
        </div>
        <button
          className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition duration-200"
          type="submit"
        >
          Cadastrar
        </button>
        <div className="text-center">
          <p className="text-gray-600">Já tem uma conta? <a href="/" className="text-blue-500 hover:underline">Entre aqui</a></p>
        </div>
      </form>
    </div>
  );
};

export default CreateAccount;
