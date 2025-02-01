import { API_AUTH_CHANGE_PASSWORD_BY_EMAIL_TOKEN } from "@/lib";
import { axiosApiClientSide } from "../config";

export async function changePasswordByEmailToken(
  token: string,
  senhaNova: string,
  senhaNovaConfirmacao: string
) {
  const data = { token, senhaNova, senhaNovaConfirmacao };
  const axiosApi = axiosApiClientSide();
  return await axiosApi.post<void>(
    API_AUTH_CHANGE_PASSWORD_BY_EMAIL_TOKEN,
    data
  );
}
