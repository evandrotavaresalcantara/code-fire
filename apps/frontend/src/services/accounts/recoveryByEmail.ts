import { API_AUTH_RECOVERY_BY_EMAIL } from "@/lib";
import { ErrorResponse } from "@/types";
import { axiosApiClientSide } from "../config";

export async function recoveryByEmail(email: string, baseUrl: string) {
  const data = { email, baseUrl };
  const axiosApi = axiosApiClientSide();
  return await axiosApi.post<void | ErrorResponse>(
    API_AUTH_RECOVERY_BY_EMAIL,
    data
  );
}
