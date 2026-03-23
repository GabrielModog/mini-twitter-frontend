import axios, { AxiosError } from "axios"
import { useAuthStore } from "@/features/auth/store"

export interface ApiError {
  message: string;
  status?: number;
}

const DEFAULT_ENDPOINT = "http://localhost:3000"

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_ENDPOINT || DEFAULT_ENDPOINT,
})

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().clearAuth();
    }
    return Promise.reject(error);
  }
);

export function getApiError(error: unknown): ApiError {
  if (!error || typeof error !== 'object') {
    return { message: "Algo deu errado. Tente novamente." };
  }

  if (error instanceof AxiosError) {
    if (error.code === 'ECONNABORTED' || error.code === 'ERR_NETWORK' || !error.response) {
      return { message: "Sem conexão. Verifique sua internet." };
    }
    return {
      message: error.response?.data?.error || "Algo deu errado. Tente novamente.",
      status: error.response?.status,
    };
  }

  return { message: "Algo deu errado. Tente novamente." };
}


export default apiClient
