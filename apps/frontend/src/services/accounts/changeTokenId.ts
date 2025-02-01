import { API_AUTH_CHANGE_TOKENID_BY_REFRESH_TOKEN } from "@/lib";
import { axiosApiServerSide } from "../config";
import { LoginResponse } from "./login";

export async function changeTokenId(token: string, tokenId?: string) {
  // TODO: verificar a necessidade um Token Bearer para nao ser um endpoint público
  const data = { token, tokenId };
  const axiosApi = axiosApiServerSide();
  return await axiosApi.post<LoginResponse>(
    API_AUTH_CHANGE_TOKENID_BY_REFRESH_TOKEN,
    data
  );
}
