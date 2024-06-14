// src/components/Payment.tsx

"use client";

import { CreatePaymentDto, createPayment } from "@/app/services/paymentService";
import { useForm, SubmitHandler } from "react-hook-form";
import Upload from "../../components/Upload";
import { toast } from "react-toastify";
import withAuth from "@/app/components/withAuth";
import { useRouter } from "next/navigation";

interface IFormInput {
  accountId: number;
  value: number;
  date: string;
  description: string;
  files: File[];
}

const Payment: React.FC = () => {
	const router = useRouter()
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<IFormInput>();
  const files = watch("files", []);

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    try {
      const paymentData: CreatePaymentDto = {
        accountId: data.accountId,
        value: data.value,
        date: data.date,
        description: data.description,
      };

	  console.log(paymentData)

      const responseData = await createPayment(paymentData, data.files);
      toast.success("Pagamento criado com sucesso");
	  router.push("/home");
      console.log("Pagamento criado com sucesso:", responseData);
    } catch (error) {
      console.error("Erro ao criar pagamento:", error);
      toast.error("Erro ao criar pagamento");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-screen items-center bg-gradient-to-r from-gray-200 to-gray-500 p-8 rounded-lg shadow-md">
      <div className="mt-10 mb-6">
        <h2 className="font-bold text-3xl text-gray-700">Cadastro de Pagamento</h2>
      </div>
      <div className="flex flex-col space-y-4 w-1/2 mt-4 mb-4">
        <div>
          <label className="block text-gray-700">Numero da conta:</label>
          <input
            type="number"
            {...register("accountId", { required: "Numero da conta é obrigatório", valueAsNumber: true, min: { value: 1, message: "Numero da conta deve ser um número positivo" } })}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          />
          {errors.accountId && <p className="text-red-500 text-sm">{errors.accountId.message}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Valor do Pagamento:</label>
          <input
            type="number"
            {...register("value", { required: "Valor do Pagamento é obrigatório", valueAsNumber: true, min: { value: 0, message: "Valor do Pagamento deve ser maior ou igual a zero" } })}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          />
          {errors.value && <p className="text-red-500 text-sm">{errors.value.message}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Data:</label>
          <input
            type="datetime-local"
            {...register("date", { required: "Date é obrigatória" })}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
        </div>
        <div>
          <label className="block text-gray-700">Descrição:</label>
          <input
            type="text"
            {...register("description", { required: "Descrição é obrigatória" })}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>
      </div>
      <button
        className="px-4 py-2 mt-6 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-200"
        type="submit"
      >
        Efetuar Pagamento
      </button>
    </form>
  );
};

export default withAuth(Payment);
