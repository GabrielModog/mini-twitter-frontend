import { useMutation } from "@tanstack/react-query"
import { useAuthStore } from "./store"
import apiClient from "@/lib/api-client"
import { getApiError } from "@/lib/api-client"
import type { LoginForm, RegisterForm } from "./types"
import { useNavigate } from "react-router"
import { queryClient } from "@/lib/query-client"
import { useToast } from "@/contexts/toast-context"

export const useLoginMutation = () => {
  const navigate = useNavigate();
  const { login, setLoading } = useAuthStore();
  const { showToast } = useToast();

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
    onError: (err: unknown) => {
      const { message } = getApiError(err);
      showToast(message, "error");
    },
    onSettled: () => setLoading(false),
  });
};

export const useRegisterMutation = () => {
  const navigate = useNavigate();
  const { setLoading } = useAuthStore();
  const { showToast } = useToast()

  return useMutation({
    mutationFn: async (credentials: RegisterForm) => {
      setLoading(true);
      const res = await apiClient.post('/auth/register', credentials)
      return res.data
    },
    onSuccess: () => {
      showToast("Usuário criado!", "success")
      navigate("/posts")
    },
    onError: (err: unknown) => {
      const { message } = getApiError(err);
      showToast(message, "error");
    },
    onSettled: () => setLoading(false),
  })
}

export const useLogoutMutation = () => {
  const navigate = useNavigate();
  const { clearAuth, token, setLoading } = useAuthStore();
  const { showToast } = useToast();

  return useMutation({
    mutationFn: async () => {
      if (!token) throw new Error('No token');
      setLoading(true);
      await apiClient.post('/auth/logout');
    },
    onSuccess: () => {
      clearAuth();
      queryClient.clear();
      navigate('/');
    },
    onError: (err: unknown) => {
      const { message } = getApiError(err);
      showToast(message, "error");
      clearAuth();
      navigate('/');
    },
    onSettled: () => setLoading(false),
  })
}