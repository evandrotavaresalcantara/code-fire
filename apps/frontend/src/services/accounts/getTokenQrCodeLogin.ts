import { API_AUTH_QRCODE_LOGIN } from "@/lib";
import { axiosApiClientSide } from "../config";

export interface GetTokenQrCodeLoginResponse {
  token: string;
}

export async function getTokenQrCodeLogin(email: string) {
  const axiosApi = axiosApiClientSide();
  return await axiosApi.get<GetTokenQrCodeLoginResponse>(
    API_AUTH_QRCODE_LOGIN,
    {
      params: { email },
    }
  );
}
