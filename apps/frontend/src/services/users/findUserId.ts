/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_USERS } from "@/lib";
import { Usuario } from "@/types/Entities";
import { axiosApiServerSide } from "../config";

interface findUserIDProps {
  id: string;
  token?: string;
}

export async function findUserID(props: findUserIDProps) {
  const axiosApi = axiosApiServerSide(props.token);

  try {
    const response = await axiosApi.get<Usuario | null>(
      `${API_USERS}/${props.id}`
    );

    if (response.status >= 200 && response.status < 300) {
      if (response.data) {
        return response.data;
      } else {
        throw new Error("Usuário não encontrado.");
      }
    }
    // throw new Error("Erro ao buscar usuário");
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
