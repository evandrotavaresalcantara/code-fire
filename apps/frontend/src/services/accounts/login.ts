import { API_AUTH_LOGIN } from "@/lib";
import { ErrorResponse } from "@/types";
import { axiosApiClientSide } from "../config";

export interface LoginResponse {
  tokenId: string;
  token: string;
}

export async function loginRequest(email: string, senha: string) {
  const data = { email, senha };
  const axiosApi = axiosApiClientSide();
  return await axiosApi.post<LoginResponse | ErrorResponse>(
    API_AUTH_LOGIN,
    data
  );
}
