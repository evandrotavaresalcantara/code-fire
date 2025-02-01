import { API_PERMISSIONS } from "@/lib";
import { axiosApiClientSide } from "../config";
import { Permissao } from "@/types/Entities";
import { getCookie } from "@/lib/actions";


export async function findPermissions() {
     const tokenId = await getCookie("tokenId")
    const axiosApi = axiosApiClientSide(tokenId?.value)
    return await axiosApi.get<Permissao[]>(API_PERMISSIONS)
}