/* eslint-disable @typescript-eslint/no-explicit-any */

import { ErrorResponse } from "@/types";
import { axiosApiClientSide } from "../config";
import { API_PERFIS } from "@/lib";
import { getCookie } from "@/lib/actions";


export async function addPerfil(nome: string, descricao: string) {
  const data = { nome, descricao };
    const tokenId = await getCookie("tokenId");
    const axiosApi = axiosApiClientSide(tokenId?.value);

  try {
    const response = await axiosApi.post<void | ErrorResponse>(
      API_PERFIS,
      data
    );

    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    if (response.data?.message) {
      throw new Error(response.data.message);
    }

    throw new Error("Erro ao criar perfil");
  } catch (error: any) {
    if (error.response) {
      if (error.response.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw new Error("Erro ao processar resposta da API");
    } else if (error.request) {
      throw new Error(
        "Erro de rede. Não foi possível se comunicar com o servidor."
      );
    } else {
      throw new Error(error.message || "Erro desconhecido");
    }
  }
}
