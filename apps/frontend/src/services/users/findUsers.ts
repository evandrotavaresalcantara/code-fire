import { API_USERS } from "@/lib";
import { axiosApiClientSide } from "../config";
import { Usuario } from "@/types/Entities";
import { getCookie } from "@/lib/actions";

export async function findUsers() {
  const tokenId = await getCookie("tokenId");
  const axiosApi = axiosApiClientSide(tokenId?.value);
  return await axiosApi.get<Usuario[]>(API_USERS);
}
