import { API_AUTH_LOGOUT } from "@/lib";
import { axiosApiClientSide } from "../config";

export async function logoutRequest(userId: string) {
  const data = { userId };
  const axiosApi = axiosApiClientSide();
  return await axiosApi.post(API_AUTH_LOGOUT, data);
}
