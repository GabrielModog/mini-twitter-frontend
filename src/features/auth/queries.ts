import { useMutation } from "@tanstack/react-query"
import { useAuthStore } from "./store"
import apiClient from "../../lib/api-client"
import type { LoginForm, RegisterForm } from "./types"
import { useNavigate } from "react-router"

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const { login, setLoading, setError } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials: LoginForm) => {
      setLoading(true);
      const res = await apiClient.post('/auth/login', credentials)
      return res.data
    },
    onSuccess: ({ token, user }) => {
      login(user, token)
      navigate('/posts')
    },
    onError: (err: any) => {
      setError(err?.response?.data?.error || 'Credenciais inválidas')
    },
    onSettled: () => setLoading(false),
  });
};

export const useRegisterMutation = () => {
  const navigate = useNavigate();
  const { setLoading, setError } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials: RegisterForm) => {
      setLoading(true);
      const res = await apiClient.post('/auth/register', credentials)
      return res.data
    },
    onSuccess: () => {
      navigate('/')
    },
    onError: (err: any) => {
      setError(err?.response?.data?.error || 'Não foi possível fazer cadastro')
    },
    onSettled: () => setLoading(false),
  })
}
