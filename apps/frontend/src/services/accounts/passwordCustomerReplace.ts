/* eslint-disable @typescript-eslint/no-explicit-any */

import { getCookie } from "@/lib/actions";
import { axiosApiClientSide } from "../config";
import { ErrorResponse } from "@/types";
import { API_AUTH_CHANGE_PASSWORD_CUSTOMER } from "@/lib";

interface passwordCustomerReplaceType {
    id: string;
    senhaNova: string;
    senhaNovaConfirmacao: string;
  }

export async function passwordCustomerReplaceService(password: passwordCustomerReplaceType) {
    const data = {
        senhaNova: password.senhaNova,
        senhaNovaConfirmacao: password.senhaNovaConfirmacao,
      };
      const tokenId = await getCookie("tokenId");
      const axiosApi = axiosApiClientSide(tokenId?.value);
    
      try {
        const response = await axiosApi.put<void | ErrorResponse>(
          `${API_AUTH_CHANGE_PASSWORD_CUSTOMER}/${password.id}`,
          data
        );
    
        if (response.status >= 200 && response.status < 300) {
          return response.data;
        }
        if (response.data?.message) {
          throw new Error(response.data.message);
        }
    
        throw new Error("Erro ao alterar senha de usuário");
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




