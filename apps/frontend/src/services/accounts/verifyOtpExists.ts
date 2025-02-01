import { API_AUTH_VERIFY_OTP } from "@/lib";
import { axiosApiServerSide } from "../config";

export interface VerifyOtpVerifyResponse {
  expired_at: Date;
}

export async function verifyOtpExists(email: string) {
  const data = { email };
  const axiosApi = axiosApiServerSide();
  return await axiosApi.post<VerifyOtpVerifyResponse>(
    API_AUTH_VERIFY_OTP,
    data
  );
}
