/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { getUltimoLogin } from "@/services/reports";
import { UltimoLoginReport } from "@/types";
import React, { useEffect, useState } from "react";

export default function UltimoLoginItem({ email }: { email: string }) {
  const [ultimoLogin, setUltimoLogin] = useState<UltimoLoginReport | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const buscar = async () => {
      try {
        setLoading(true);
        const response = await getUltimoLogin(email);
        setUltimoLogin(response);
      } catch (error) {
        setError("Erro ao buscar o último login.");
      } finally {
        setLoading(false);
      }
    };
    buscar();
  }, [email]);

  if (loading) {
    return (
      <div className="flex items-center p-4 bg-black text-white rounded-lg shadow-md">
        <div className="flex justify-around flex-grow items-center">
          <Skeleton className="h-4 w-36 bg-zinc-700" />
          <Skeleton className="h-4 w-36 bg-zinc-700" />
          <Skeleton className="h-4 w-36 bg-zinc-700" />
          <Skeleton className="h-4 w-36 bg-zinc-700" />
        </div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!ultimoLogin) {
    return <div>Nenhum dado encontrado.</div>;
  }

  const loginDate = new Date(ultimoLogin.loginDate);

  return (
    <div className="flex items-center justify-between p-4 bg-black text-white rounded-lg shadow-md">
      <div className="flex flex-grow items-center justify-center flex-wrap">
        <div className=" flex text-sm text-zinc-200 flex-grow justify-center">
          LOGIN -
          <span className="text-gray-400 pl-1 ">
            [{loginDate.toLocaleString()}]
          </span>
        </div>

        <div className=" flex text-sm text-zinc-200 flex-grow justify-center">
          Tipo de acesso:
          <span className="text-gray-400 pl-1">
            {"<" + ultimoLogin.loginType.toLocaleUpperCase() + ">"}
          </span>
        </div>

        <div className=" flex text-sm text-zinc-200 flex-grow justify-center">
          Email: <span className=" text-gray-400 pl-1">{ultimoLogin.userEmail}</span>
        </div>

        <div className={" flex text-sm text-zinc-200 flex-grow justify-center"}>
          2FA:
          <span
            className={`${
              ultimoLogin.is2fa ? "text-green-400" : "text-red-400"
            } pl-1`}
          >
            {ultimoLogin.is2fa ? "Enabled" : "Disabled"}
          </span>
        </div>
      </div>
    </div>
  );
}
