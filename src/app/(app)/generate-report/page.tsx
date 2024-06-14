// src/pages/report/GenerateReport.tsx
"use client";

import React from "react";
import { PDFDocument, rgb } from "pdf-lib";
import { saveAs } from "file-saver";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input } from "@nextui-org/react";
import { generateReport } from "@/app/services/reportService";
import withAuth from "@/app/components/withAuth";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface IFormInput {
	accountId: number;
	startDate: string;
	endDate: string;
}

const GenerateReport: React.FC = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IFormInput>();

	const onSubmit: SubmitHandler<IFormInput> = async (data) => {
		try {
			const reportData = {
				accountId: data.accountId,
				startDate: data.startDate,
				endDate: data.endDate,
			};
			const response = await generateReport(reportData);

			// Transformar o JSON em texto
			const reportText = JSON.stringify(response, null, 2);

			// Criar um novo documento PDF
			const pdfDoc = await PDFDocument.create();
			const page = pdfDoc.addPage();
			const { width, height } = page.getSize();

			// Adicionar texto ao PDF
			page.drawText(reportText, {
				x: 50,
				y: height - 50,
				size: 12,
				color: rgb(0, 0, 0),
			});

			// Salvar como arquivo PDF
			const pdfBytes = await pdfDoc.save();
			const blob = new Blob([pdfBytes], { type: "application/pdf" });
			saveAs(blob, "report.pdf");

			toast.success("Relatório gerado e baixado como arquivo PDF com sucesso!");

			console.log("Relatório gerado com sucesso:", response);
			setTimeout(() => router.push("/home"), 3000);

			toast.success("Relatório gerado com sucesso!");
		} catch (error) {
			console.error("Erro ao gerar relatório:", error);
			toast.error("Erro ao gerar relatório.");
		}
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-400 via-gray-600 to-blue-800"
		>
			<div className="bg-white shadow-lg rounded-lg p-8 w-80 max-w-full">
				<h1 className="text-2xl font-bold mb-4 text-center text-gray-800">
					Gerar Relatório
				</h1>
				<div className="flex flex-col space-y-4">
					<div className="flex flex-col">
						<label htmlFor="accountId" className="text-gray-700">
							ID da Conta
						</label>
						<Input
							type="number"
							{...register("accountId", {
								required: true,
								valueAsNumber: true,
							})}
							id="accountId"
							placeholder="ID da Conta"
							className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
						/>
						{errors.accountId && (
							<p className="text-red-500 text-sm mt-1">
								ID da Conta é obrigatório
							</p>
						)}
					</div>
					<div className="flex flex-col">
						<label htmlFor="startDate" className="text-gray-700">
							Data Inicial
						</label>
						<Input
							type="date"
							{...register("startDate", { required: true })}
							id="startDate"
							placeholder="Data Inicial"
							className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
						/>
						{errors.startDate && (
							<p className="text-red-500 text-sm mt-1">
								Data Inicial é obrigatória
							</p>
						)}
					</div>
					<div className="flex flex-col">
						<label htmlFor="endDate" className="text-gray-700">
							Data Final
						</label>
						<Input
							type="date"
							{...register("endDate", { required: true })}
							id="endDate"
							placeholder="Data Final"
							className="w-full mt-2 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
						/>
						{errors.endDate && (
							<p className="text-red-500 text-sm mt-1">
								Data Final é obrigatória
							</p>
						)}
					</div>
				</div>
				<button
					type="submit"
					className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-200 focus:outline-none"
				>
					Gerar Relatório
				</button>
			</div>
		</form>
	);
};

export default withAuth(GenerateReport);
