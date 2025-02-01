import { API_AUTH_VERIFY_EMAIL_TOKEN } from "@/lib";
import { axiosApiServerSide } from "../config";

export interface VerifyEmailTokenResponse {
  isValid: boolean;
}

export async function verifyEmailToken(token: string) {
  const data = { token };
  const axiosApi = axiosApiServerSide();
  return await axiosApi.post<VerifyEmailTokenResponse>(
    API_AUTH_VERIFY_EMAIL_TOKEN,
    data
  );
}
