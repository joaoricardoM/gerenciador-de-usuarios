// src/pages/Home.tsx
"use client";

import React from "react";
import { Card, CardBody } from "@nextui-org/react";
import Link from "next/link";
import withAuth from "@/app/components/withAuth";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col w-screen h-screen items-center bg-gradient-to-r from-gray-400 via-gray-600 to-blue-800">
      <div className="flex flex-col space-y-4 w-1/3 mt-16 mb-40">
        <h1 className="text-white font-bold text-3xl">Olá, Seja bem-vindo!!</h1>
      </div>
      <div className="flex justify-around w-2/3">
        <Card className="cursor-pointer hover:shadow-lg transform hover:scale-105 transition duration-300">
          <CardBody>
            <Link href="/account-registration">
              <p className="text-xl font-semibold text-gray-800">Criar Conta</p>
            </Link>
          </CardBody>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transform hover:scale-105 transition duration-300">
          <CardBody>
            <Link href="/payment-registration">
              <p className="text-xl font-semibold text-gray-800">Efetuar Pagamento</p>
            </Link>
          </CardBody>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transform hover:scale-105 transition duration-300">
          <CardBody>
            <Link href="/generate-report">
              <p className="text-xl font-semibold text-gray-800">Gerar Relatórios</p>
            </Link>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default withAuth(Home);
