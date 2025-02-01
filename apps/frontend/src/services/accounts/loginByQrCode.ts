import { API_AUTH_LOGIN_BY_QRCODE } from "@/lib";
import { ErrorResponse } from "@/types";
import { axiosApiClientSide } from "../config";

export interface LoginResponse {
  tokenId: string;
  token: string;
}

export async function loginByQrCodeRequest(token: string) {
  const data = { token };
  const axiosApi = axiosApiClientSide();
  return await axiosApi.post<LoginResponse | ErrorResponse>(
    API_AUTH_LOGIN_BY_QRCODE,
    data
  );
}
