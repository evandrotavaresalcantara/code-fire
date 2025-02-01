import { API_BASE_URL_USE_CLIENT, API_BASE_URL_USE_SERVER } from "@/lib";
import axios from "axios";

export function axiosApiClientSide(token?: string) {
  const axiosClientApi = axios.create({
    withCredentials: true,
    baseURL: API_BASE_URL_USE_CLIENT,
    validateStatus: () => true,
  });
  if (token)
    axiosClientApi.defaults.headers["Authorization"] = `Bearer ${token}`;
  return axiosClientApi;
}

export function axiosApiServerSide(token?: string) {
  const axiosApi = axios.create({
    baseURL: API_BASE_URL_USE_SERVER,
    validateStatus: () => true,
  });
  if (token) axiosApi.defaults.headers["Authorization"] = `Bearer ${token}`;
  return axiosApi;
}