import axios from "axios"
import { useAuthStore } from "../features/auth/store"

const DEFAULT_ENDPOINT = "http://localhost:3000"

const apiClient = axios.create({
  baseURL: process.env.API_ENDPOINT || DEFAULT_ENDPOINT,
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

export default apiClient
