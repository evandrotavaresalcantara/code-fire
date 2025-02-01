/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_AUTH_USER_REGISTER } from "@/lib";
import { ErrorResponse } from "@/types";
import { axiosApiClientSide } from "../config";


export async function register(
  nome: string,
  email: string,
  senha: string,
  senhaConfirmacao: string,
  ativo: boolean,
  telefone?: string
) {
  const data = { nome, email, senha, senhaConfirmacao, celular: telefone, ativo };
  const axiosApi = axiosApiClientSide();

  try {
      const response = await axiosApi.post<void | ErrorResponse>(
        API_AUTH_USER_REGISTER,
        data
      );
  
      if (response.status >= 200 && response.status < 300) {
        return response;
      }
      if (response.data?.message) {
        throw new Error(response.data.message);
      }
  
      throw new Error("Erro ao registrar usuário");
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
