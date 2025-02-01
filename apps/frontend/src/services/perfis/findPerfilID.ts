/* eslint-disable @typescript-eslint/no-explicit-any */

import { Perfil } from "@/types/Entities";
import { axiosApiClientSide } from "../config";
import { API_PERFIS } from "@/lib";
import { getCookie } from "@/lib/actions";


export async function findPerfilID(id: string) {
    const tokenId = await getCookie("tokenId");
    const axiosApi = axiosApiClientSide(tokenId?.value);

  try {
    const response = await axiosApi.get<Perfil | null>(
      `${API_PERFIS}/${id}`

    );

    if (response.status >= 200 && response.status < 300) {
      if (response.data) {
        return response.data;
      } else {
        throw new Error("Perfil não encontrado.");
      }
    }
    throw new Error("Erro ao buscar Perfil");
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data?.message || "Erro ao processar resposta da API"
      );
    } else if (error.request) {
      throw new Error(
        "Erro de rede. Não foi possível se comunicar com o servidor."
      );
    } else {
      throw new Error(error.message || "Erro desconhecido");
    }
  }
}
