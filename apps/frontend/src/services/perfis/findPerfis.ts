import { Perfil } from "@/types/Entities";
import { axiosApiClientSide } from "../config";
import { API_PERFIS } from "@/lib";
import { getCookie } from "@/lib/actions";

export async function findPerfis() {
     const tokenId = await getCookie("tokenId")
    const axiosApi = axiosApiClientSide(tokenId?.value)
    return await axiosApi.get<Perfil[]>(API_PERFIS)
}
